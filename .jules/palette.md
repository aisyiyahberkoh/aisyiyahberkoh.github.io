# Palette's Journal - UX & Accessibility Learnings

## 2025-09-03 - Modal Lightbox Focus Management & Semantic Buttons
**Learning:** Standard static gallery grids often render non-interactive `<div>` elements with image lightboxes, blocking keyboard accessibility and screen readers. Changing items to `<button type="button">` with focus-visible indicators and managing modal focus (focusing the close button on open, restoring focus on close) significantly improves a11y without extra heavy JS dependencies.
**Action:** Always ensure custom image modal/lightbox triggers use native `<button>` elements with `aria-label` and `aria-modal="true"` dialog containers with focus restoration.

## 2025-09-04 - Skip Link Pattern for Fixed Header Navigation
**Learning:** Fixed/sticky headers obscure top-level content when navigating via keyboard if focus isn't moved explicitly. Adding a skip link (`sr-only focus:not-sr-only`) targeting `<main id="main-content" tabindex="-1">` ensures keyboard users can immediately bypass fixed navigation headers without extra JS.
**Action:** In base layout templates with fixed headers, include an accessible skip link as the first focusable element inside `<body>` pointing to `<main id="main-content" tabindex="-1">`.
