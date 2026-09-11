# Bolt's Performance Journal

## 2025-02-27 - Lazy loading images in Hugo templates
**Learning:** Native `loading="lazy"` on non-critical Hugo template images reduces initial bandwidth, memory usage, and main thread blocking on page load without requiring JavaScript dependencies.
**Action:** Always add `loading="lazy"` to secondary/below-the-fold content images in static site generator templates while preserving eager loading for above-the-fold header/logo elements.

## 2025-02-27 - Caching static Hugo partials with partialCached
**Learning:** Static Hugo partials like `footer.html` that depend only on `site.Params` and `site.Menus` can be cached with `partialCached` to avoid redundant template parsing and execution across all site pages during build.
**Action:** Use `partialCached` for footer or other globally static partials that do not depend on page-specific context (`.` or `$currentPage`).

## 2025-02-27 - Caching partials in single-instance layouts
**Learning:** `partialCached` in Hugo layout templates that execute only once per build (such as `layouts/index.html`) provides no build speedup since the layout runs once anyway.
**Action:** Reserve `partialCached` for partials evaluated repeatedly across multiple pages (like `footer.html` in `baseof.html`).

## 2025-02-27 - Client-side event delegation and DOM caching
**Learning:** Attaching individual event listeners to filter buttons and executing `querySelectorAll` on every click causes unnecessary event listener overhead and DOM tree traversals.
**Action:** Use event delegation on a parent container (`e.target.closest()`) and cache DOM references in an IIFE closure to ensure zero-cost DOM lookups on user interactions.
