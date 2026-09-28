# Bolt's Performance Journal

## 2025-02-27 - Lazy loading images in Hugo templates
**Learning:** Native `loading="lazy"` on non-critical Hugo template images reduces initial bandwidth, memory usage, and main thread blocking on page load without requiring JavaScript dependencies.
**Action:** Always add `loading="lazy"` to secondary/below-the-fold content images in static site generator templates while preserving eager loading for above-the-fold header/logo elements.

## 2025-02-27 - Caching static Hugo partials with partialCached
**Learning:** Static Hugo partials like `footer.html` that depend only on `site.Params` and `site.Menus` can be cached with `partialCached` to avoid redundant template parsing and execution across all site pages during build.
**Action:** Use `partialCached` for footer or other globally static partials that do not depend on page-specific context (`.` or `$currentPage`).

## 2026-09-28 - Event delegation and DOM reference caching in inline component scripts
**Learning:** Attaching individual event listeners to repeated elements in templates re-evaluates DOM queries on every click. Using event delegation on container elements and caching NodeList references outside event handlers prevents layout thrashing, avoids redundant DOM queries, and reduces memory overhead.
**Action:** Always wrap interactive list filter scripts in IIFEs, cache static NodeLists, attach a single listener to the parent container, and add early exits for active states.
