Stomatrade frontend UI notes

- Single static landing page in `component.html` built with Tailwind CDN; no build toolchain referenced beyond `tailwind.config.js` font/size extensions.
- Layout: full-page hero on light gray body (`#edf2f7`) with white main card; header fixed at top-right containing uppercase nav links (visible only on xl) plus hamburger.
- Hero: left column uses Abhaya Libre for large “Nature.” + “Landing page” headings, Alegreya Sans body copy, and Montserrat pill CTA (`Read more`) on dark green (#006400-ish via `bg-green-900`).
- Right column (hidden on small screens) shows a large inline pastel illustration SVG occupying two-thirds width; flex alignment centers on sm, right-aligns on xl.
- Responsive behavior: mobile stacks content column-first, hides nav links and illustration; spacing via Tailwind utilities (`py-24`/`py-32`, `tracking-widest`, custom `text-10xl`).
- External assets: Google Fonts for Abhaya Libre (400/800), Montserrat (600), Alegreya Sans (500) loaded in `<body>`; Tailwind included via CDN rather than compiled CSS.
