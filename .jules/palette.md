# Palette's Journal - UX & Accessibility Learnings

## 2025-09-03 - Modal Lightbox Focus Management & Semantic Buttons
**Learning:** Standard static gallery grids often render non-interactive `<div>` elements with image lightboxes, blocking keyboard accessibility and screen readers. Changing items to `<button type="button">` with focus-visible indicators and managing modal focus (focusing the close button on open, restoring focus on close) significantly improves a11y without extra heavy JS dependencies.
**Action:** Always ensure custom image modal/lightbox triggers use native `<button>` elements with `aria-label` and `aria-modal="true"` dialog containers with focus restoration.
