# Bolt's Performance Journal

## 2025-02-27 - Lazy loading images in Hugo templates
**Learning:** Native `loading="lazy"` on non-critical Hugo template images reduces initial bandwidth, memory usage, and main thread blocking on page load without requiring JavaScript dependencies.
**Action:** Always add `loading="lazy"` to secondary/below-the-fold content images in static site generator templates while preserving eager loading for above-the-fold header/logo elements.

## 2025-02-27 - Caching static Hugo partials with partialCached
**Learning:** Static Hugo partials like `footer.html` that depend only on `site.Params` and `site.Menus` can be cached with `partialCached` to avoid redundant template parsing and execution across all site pages during build.
**Action:** Use `partialCached` for footer or other globally static partials that do not depend on page-specific context (`.` or `$currentPage`).

## 2025-02-28 - Event delegation and DOM query caching for inline scripts
**Learning:** Attaching separate click handlers to multiple elements and re-executing `querySelectorAll` inside click callbacks causes repetitive DOM tree traversals. Using event delegation on a common parent container and caching `querySelectorAll` references outside the handler avoids redundant DOM queries on every click.
**Action:** Always scope inline UI interaction scripts with an IIFE, delegate click listeners to parent containers, and cache element NodeLists outside event handlers.
