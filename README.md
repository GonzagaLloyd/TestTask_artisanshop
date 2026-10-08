# Front-end recreation – "Online Casino im Ausland spielen" page

Static HTML/CSS/vanilla JS rebuild of the page layout and behaviour served at artisanshop.ch (subdomain `bestecasinos`).
No build step, no dependencies: open `index.html` in a browser.

## Structure
```
index.html                single semantic page (skip link, header/nav, main > article > sections, footer, aside)
assets/css/styles.css     design tokens (:root), layout, components, a11y helpers, responsive (<=820px)
assets/js/data.js         content config (casinos, comparison table) – edit here, not in the code
assets/js/main.js         rendering + behaviour (IIFE, no globals besides SITE_DATA)
assets/img/favicon.svg    icon
.editorconfig             formatting rules
```

## Functionality
- Ranked casino cards and comparison table rendered from `data.js`; table columns are sortable (click / Enter).
- Always-visible search field: in-page search that highlights matches (Esc closes).
- Anchor nav (Intro / Casinos / FAQ).
- FAQ as accessible `<details>` accordions.
- Dismissible promo banner (appears after 1.5 s, stays closed for the session).
- Sticky header, responsive layout, keyboard accessible.

## Notes
- The original site was not recoverable from web archives; the structure (headings, table columns, sections) follows the live page as of 2026-10-08.
- Brand names, bonuses, RTP/payout figures, photos and affiliate links are **placeholders** – no original assets or tracking URLs were copied. Figures are illustrative, not factual claims.
