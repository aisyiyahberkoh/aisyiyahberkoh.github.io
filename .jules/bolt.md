# Bolt's Performance Journal

## 2025-02-27 - Lazy loading images in Hugo templates
**Learning:** Native `loading="lazy"` on non-critical Hugo template images reduces initial bandwidth, memory usage, and main thread blocking on page load without requiring JavaScript dependencies.
**Action:** Always add `loading="lazy"` to secondary/below-the-fold content images in static site generator templates while preserving eager loading for above-the-fold header/logo elements.

## 2025-02-27 - Caching static Hugo partials with partialCached
**Learning:** Static Hugo partials like `footer.html` that depend only on `site.Params` and `site.Menus` can be cached with `partialCached` to avoid redundant template parsing and execution across all site pages during build.
**Action:** Use `partialCached` for footer or other globally static partials that do not depend on page-specific context (`.` or `$currentPage`).

## 2025-02-27 - Conditional loading of Netlify Identity Widget
**Learning:** Unconditionally loading Netlify Identity Widget on every site page downloads ~70KB gzipped JS and consumes main-thread execution for public visitors who do not use CMS auth. Conditionally injecting the script only when URL hash contains identity tokens (`access_token`, `invite_token`, `recovery_token`) saves bandwidth and improves page load metrics while preserving CMS auth workflows.
**Action:** Load Netlify Identity Widget conditionally based on location hash tokens or on `/admin/` instead of globally on all pages.
