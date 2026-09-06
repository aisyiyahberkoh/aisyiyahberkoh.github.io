# Bolt's Performance Journal

## 2025-02-27 - Lazy loading images in Hugo templates
**Learning:** Native `loading="lazy"` on non-critical Hugo template images reduces initial bandwidth, memory usage, and main thread blocking on page load without requiring JavaScript dependencies.
**Action:** Always add `loading="lazy"` to secondary/below-the-fold content images in static site generator templates while preserving eager loading for above-the-fold header/logo elements.

## 2025-02-27 - Caching static Hugo partials with partialCached
**Learning:** Static Hugo partials like `footer.html` that depend only on `site.Params` and `site.Menus` can be cached with `partialCached` to avoid redundant template parsing and execution across all site pages during build.
**Action:** Use `partialCached` for footer or other globally static partials that do not depend on page-specific context (`.` or `$currentPage`).

## 2025-02-28 - Caching section-aware Hugo header partials with partialCached variant key
**Learning:** For Hugo header templates that highlight active navigation menu items based on `.Section`, using `partialCached` with `.Section` as a variant key avoids re-rendering `header.html` on every page within the same section while preserving active menu highlights.
**Action:** Use `partialCached "header.html" . .Section` for section-dependent header templates during Hugo site generation.
