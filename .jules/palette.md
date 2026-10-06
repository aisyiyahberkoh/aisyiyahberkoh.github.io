# Palette's Journal - UX & Accessibility Learnings

## 2025-09-04 - Skip-to-Content & Mobile Menu Escape Dismissal
**Learning:** In Hugo static sites with sticky headers, keyboard users must tab through all navigation items on every page unless a skip link (`Lompat ke konten utama`) is provided pointing to `<main id="main-content" tabindex="-1">`. Additionally, mobile drawer navigation menus should always support `Escape` key dismissal to restore focus back to the menu toggle button.
**Action:** Include visually hidden skip links (`sr-only focus:not-sr-only`) targeting `<main id="main-content" tabindex="-1">` in base templates, and attach `Escape` key event listeners to mobile navigation overlays.

## 2025-09-03 - Modal Lightbox Focus Management & Semantic Buttons
**Learning:** Standard static gallery grids often render non-interactive `<div>` elements with image lightboxes, blocking keyboard accessibility and screen readers. Changing items to `<button type="button">` with focus-visible indicators and managing modal focus (focusing the close button on open, restoring focus on close) significantly improves a11y without extra heavy JS dependencies.
**Action:** Always ensure custom image modal/lightbox triggers use native `<button>` elements with `aria-label` and `aria-modal="true"` dialog containers with focus restoration.
