# Bolt's Performance Journal

## 2025-02-27 - Lazy loading images in Hugo templates
**Learning:** Native `loading="lazy"` on non-critical Hugo template images reduces initial bandwidth, memory usage, and main thread blocking on page load without requiring JavaScript dependencies.
**Action:** Always add `loading="lazy"` to secondary/below-the-fold content images in static site generator templates while preserving eager loading for above-the-fold header/logo elements.

## 2025-02-27 - Caching static Hugo partials with partialCached
**Learning:** Static Hugo partials like `footer.html` that depend only on `site.Params` and `site.Menus` can be cached with `partialCached` to avoid redundant template parsing and execution across all site pages during build.
**Action:** Use `partialCached` for footer or other globally static partials that do not depend on page-specific context (`.` or `$currentPage`).

## 2025-05-20 - Event delegation & DOM caching vs Hugo partialCached in single-eval templates
**Learning:** Using `partialCached` on templates that evaluate only once per site build (like `layouts/index.html`) yields zero build performance gains. Instead, client-side event delegation and DOM node caching in list filter scripts eliminate redundant DOM queries and event listener memory overhead during user interactions.
**Action:** For client-side UI filters, cache DOM query selectors outside event handlers and use event delegation on parent containers.
