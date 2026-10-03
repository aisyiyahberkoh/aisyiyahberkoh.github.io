# Bolt's Performance Journal

## 2025-02-27 - Lazy loading images in Hugo templates
**Learning:** Native `loading="lazy"` on non-critical Hugo template images reduces initial bandwidth, memory usage, and main thread blocking on page load without requiring JavaScript dependencies.
**Action:** Always add `loading="lazy"` to secondary/below-the-fold content images in static site generator templates while preserving eager loading for above-the-fold header/logo elements.

## 2025-02-27 - Caching static Hugo partials with partialCached
**Learning:** Static Hugo partials like `footer.html` that depend only on `site.Params` and `site.Menus` can be cached with `partialCached` to avoid redundant template parsing and execution across all site pages during build.
**Action:** Use `partialCached` for footer or other globally static partials that do not depend on page-specific context (`.` or `$currentPage`).

## 2025-02-27 - Speculative prefetching with Speculation Rules API in SSGs
**Learning:** Adding Speculation Rules API (`type="speculationrules"`) in document `<head>` enables modern browsers to speculatively prefetch same-origin HTML pages on link hover/focus, reducing internal page navigation latency to ~0ms without client-side script overhead. Additionally, preloading header logo resources must check `with site.Params.logo` and pipe through `relURL` to prevent empty preloads or incorrect relative paths across subpages.
**Action:** Use Speculation Rules API for instant internal navigation in static sites and always wrap Hugo parameter preloads in `with` guards piped with `relURL`.
