# Palette's Journal - UX & Accessibility Learnings

## 2025-09-03 - Modal Lightbox Focus Management & Semantic Buttons
**Learning:** Standard static gallery grids often render non-interactive `<div>` elements with image lightboxes, blocking keyboard accessibility and screen readers. Changing items to `<button type="button">` with focus-visible indicators and managing modal focus (focusing the close button on open, restoring focus on close) significantly improves a11y without extra heavy JS dependencies.
**Action:** Always ensure custom image modal/lightbox triggers use native `<button>` elements with `aria-label` and `aria-modal="true"` dialog containers with focus restoration.

## 2025-09-04 - Tablist Roving Tabindex & Keyboard Navigation
**Learning:** Category filter buttons assigned `role="tablist"` and `role="tab"` without roving `tabindex` forcing keyboard users to tab through every inactive tab stop before reaching filtered content.
**Action:** Implement roving `tabindex` (`0` on active tab, `-1` on inactive tabs) and keydown listeners (`ArrowLeft`, `ArrowRight`, `Home`, `End`) for accessible tablist navigation, paired with an informative empty state when filters return no results.
