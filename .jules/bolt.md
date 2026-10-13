# Bolt's Performance Journal

## 2025-02-27 - Lazy loading images in Hugo templates
**Learning:** Native `loading="lazy"` on non-critical Hugo template images reduces initial bandwidth, memory usage, and main thread blocking on page load without requiring JavaScript dependencies.
**Action:** Always add `loading="lazy"` to secondary/below-the-fold content images in static site generator templates while preserving eager loading for above-the-fold header/logo elements.

## 2025-02-27 - Caching static Hugo partials with partialCached
**Learning:** Static Hugo partials like `footer.html` that depend only on `site.Params` and `site.Menus` can be cached with `partialCached` to avoid redundant template parsing and execution across all site pages during build.
**Action:** Use `partialCached` for footer or other globally static partials that do not depend on page-specific context (`.` or `$currentPage`).

## 2025-05-18 - Preloading above-the-fold brand assets in head
**Learning:** Preloading critical above-the-fold SVG logo assets using `<link rel="preload" as="image">` in `<head>` allows browsers to fetch key layout resources in parallel with style parsing, eliminating render delays on First Contentful Paint (FCP) and Largest Contentful Paint (LCP).
**Action:** Add resource preloading for primary site branding assets in head partials when logos are rendered above-the-fold in site headers.
