# Bolt's Performance Journal

## 2025-02-27 - Lazy loading images in Hugo templates
**Learning:** Native `loading="lazy"` on non-critical Hugo template images reduces initial bandwidth, memory usage, and main thread blocking on page load without requiring JavaScript dependencies.
**Action:** Always add `loading="lazy"` to secondary/below-the-fold content images in static site generator templates while preserving eager loading for above-the-fold header/logo elements.

## 2025-02-27 - Caching static Hugo partials with partialCached
**Learning:** Static Hugo partials like `footer.html` that depend only on `site.Params` and `site.Menus` can be cached with `partialCached` to avoid redundant template parsing and execution across all site pages during build.
**Action:** Use `partialCached` for footer or other globally static partials that do not depend on page-specific context (`.` or `$currentPage`).

## 2025-02-27 - Preloading critical above-the-fold site logo in Hugo head
**Learning:** Preloading the site logo asset in `<head>` via `<link rel="preload" href="{{ . | relURL }}" as="image">` eliminates resource discovery delay during HTML parsing, improving LCP and FCP. Matching `relURL` between preload hint and `<img>` src prevents duplicate asset fetches.
**Action:** Always wrap parameter logo preloads in `{{ with site.Params.logo }}` and pipe through `relURL` to safely handle relative pathing and missing parameters.
