# Bolt's Performance Journal

## 2025-02-27 - Lazy loading images in Hugo templates
**Learning:** Native `loading="lazy"` on non-critical Hugo template images reduces initial bandwidth, memory usage, and main thread blocking on page load without requiring JavaScript dependencies.
**Action:** Always add `loading="lazy"` to secondary/below-the-fold content images in static site generator templates while preserving eager loading for above-the-fold header/logo elements.

## 2025-02-27 - Caching static Hugo partials with partialCached
**Learning:** Static Hugo partials like `footer.html` that depend only on `site.Params` and `site.Menus` can be cached with `partialCached` to avoid redundant template parsing and execution across all site pages during build.
**Action:** Use `partialCached` for footer or other globally static partials that do not depend on page-specific context (`.` or `$currentPage`).

## 2025-02-27 - Section-based caching for section-aware Hugo partials
**Learning:** Using `.RelPermalink` as a variant key for `partialCached` causes a 100% cache miss rate because every page has a unique route. For partials like `header.html` whose active menu highlight state depends only on section context, keying `partialCached` with `.Section` and `.IsHome` reuses rendered template output across all pages within the same section during site generation.
**Action:** Use `.Section` and `.IsHome` as variant keys when using `partialCached` for section-aware navigation partials.
