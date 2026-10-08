(function () {
  'use strict';

  var data = window.SITE_DATA;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /* ---------- Ranked casino cards ---------- */
  function renderCards() {
    var list = document.getElementById('casino-list');
    data.casinos.forEach(function (c, i) {
      var li = el('li', 'casino-card');

      var head = el('div', 'card-head');
      var name = el('h3', 'card-name');
      name.appendChild(el('span', 'num', (i + 1) + '.'));
      name.appendChild(document.createTextNode(c.name));
      head.appendChild(name);
      var rating = el('span', 'rating');
      rating.appendChild(el('strong', null, c.rating.toFixed(1)));
      rating.appendChild(el('small', null, '/5'));
      head.appendChild(rating);
      li.appendChild(head);

      var body = el('div', 'card-body');
      var logo = el('div', 'card-logo', c.name.replace(/ casino$/i, ''));
      logo.setAttribute('role', 'img');
      logo.setAttribute('aria-label', c.name + ' Logo');
      body.appendChild(logo);

      var offer = el('div', 'offer-box');
      offer.appendChild(el('strong', 'bonus', c.bonus));
      offer.appendChild(el('span', 'offer', c.offer));
      body.appendChild(offer);

      var cta = el('a', 'btn', 'Jetzt spielen');
      cta.href = c.url;
      cta.rel = 'nofollow sponsored noopener';
      body.appendChild(cta);

      li.appendChild(body);
      list.appendChild(li);
    });
  }

  /* ---------- Comparison table (sortable) ---------- */
  function renderCompare() {
    var table = document.getElementById('compare-table');
    var rows = data.compareRows.slice();
    var sort = { col: -1, asc: true };

    function build() {
      table.textContent = '';
      var cap = el('caption', 'visually-hidden', 'Vergleich der Casinos; Spalten sind sortierbar');
      table.appendChild(cap);
      var thead = el('thead');
      var tr = el('tr');
      data.compareHeaders.forEach(function (h, i) {
        var th = el('th', 'sortable', h);
        th.scope = 'col';
        th.tabIndex = 0;
        th.setAttribute('aria-sort', sort.col === i ? (sort.asc ? 'ascending' : 'descending') : 'none');
        var handler = function () {
          sort.asc = sort.col === i ? !sort.asc : true;
          sort.col = i;
          rows.sort(function (a, b) {
            return a[i].localeCompare(b[i], 'de', { numeric: true }) * (sort.asc ? 1 : -1);
          });
          build();
        };
        th.addEventListener('click', handler);
        th.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
        tr.appendChild(th);
      });
      thead.appendChild(tr);
      table.appendChild(thead);

      var tbody = el('tbody');
      rows.forEach(function (r) {
        var row = el('tr');
        r.forEach(function (cell, i) { row.appendChild(el(i === 0 ? 'th' : 'td', null, cell)); if (i === 0) row.lastChild.scope = 'row'; });
        tbody.appendChild(row);
      });
      table.appendChild(tbody);
    }
    build();
  }

  /* ---------- Search (highlights matches in page text) ---------- */
  function initSearch() {
    var form = document.getElementById('search-form');
    var input = document.getElementById('search-input');
    var count = document.getElementById('search-count');

    function clearMarks() {
      document.querySelectorAll('mark.hit').forEach(function (m) {
        m.replaceWith(document.createTextNode(m.textContent));
      });
      document.body.normalize();
    }

    function run(term) {
      clearMarks();
      count.textContent = '';
      if (term.length < 2) return;
      var re = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      var walker = document.createTreeWalker(document.querySelector('main'), NodeFilter.SHOW_TEXT);
      var nodes = [], n;
      while ((n = walker.nextNode())) {
        if (n.parentNode.closest('script,style,mark') || !re.test(n.nodeValue)) { re.lastIndex = 0; continue; }
        re.lastIndex = 0;
        nodes.push(n);
      }
      var total = 0;
      nodes.forEach(function (node) {
        var frag = document.createDocumentFragment(), last = 0, m, text = node.nodeValue;
        re.lastIndex = 0;
        while ((m = re.exec(text))) {
          frag.appendChild(document.createTextNode(text.slice(last, m.index)));
          var mark = el('mark', 'hit', m[0]);
          frag.appendChild(mark);
          last = m.index + m[0].length;
          total++;
        }
        frag.appendChild(document.createTextNode(text.slice(last)));
        node.replaceWith(frag);
      });
      count.textContent = total + ' Treffer';
      var first = document.querySelector('mark.hit');
      if (first) first.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }

    form.addEventListener('submit', function (e) { e.preventDefault(); });
    input.addEventListener('input', function () { run(input.value.trim()); });
    input.addEventListener('keydown', function (e) { if (e.key === 'Escape') { input.value = ''; run(''); } });
  }

  /* ---------- Anchor nav highlight ---------- */
  function initScrollSpy() {
    var links = document.querySelectorAll('.anchor-nav a');
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.remove('active'); });
          map[e.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    Object.keys(map).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) io.observe(s);
    });
  }

  /* ---------- Promo banner (dismissible, remembered per session) ---------- */
  function initBanner() {
    var banner = document.getElementById('promo-banner');
    var key = 'promoDismissed';
    try { if (sessionStorage.getItem(key)) return; } catch (e) { /* storage unavailable */ }
    setTimeout(function () { banner.hidden = false; }, 1500);
    banner.querySelector('.promo-close').addEventListener('click', function () {
      banner.hidden = true;
      try { sessionStorage.setItem(key, '1'); } catch (e) { /* ignore */ }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderCards();
    renderCompare();
    initSearch();
    initScrollSpy();
    initBanner();
  });
})();
