# Front-end recreation – "Online Casino im Ausland spielen" page

Static HTML/CSS/vanilla JS rebuild of the page layout and behaviour served at artisanshop.ch (subdomain `bestecasinos`).
No build step, no dependencies: open `index.html` in a browser.

## Structure
```
index.html                single page (header, article sections, footer, promo banner)
assets/css/styles.css     design tokens (:root), layout, components, responsive (<=820px)
assets/js/main.js         promo banner close button
assets/img/               favicon, logo, hero, author photo, casinos/ and badges/ images
.editorconfig             formatting rules
```

## Functionality (same as the live page)
- Anchor nav (Intro / Casinos / FAQ).
- Search field as a plain GET form.
- Promo banner shown only below 700px width, closable.

## Notes
- The original site was not recoverable from web archives; the structure (headings, table columns, sections) follows the live page as of 2026-10-08.
- Layout, styling, section order and wording follow the original page.
- Images (site logo, hero, author photo, casino logos, footer badges) and the ranked casino names/bonuses were taken from artisanshop.ch with the site owner's permission for this test task; they live in `assets/img/`.
