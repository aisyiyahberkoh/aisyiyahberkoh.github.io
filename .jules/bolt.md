# Bolt's Performance Journal

## 2025-02-27 - Lazy loading images in Hugo templates
**Learning:** Native `loading="lazy"` on non-critical Hugo template images reduces initial bandwidth, memory usage, and main thread blocking on page load without requiring JavaScript dependencies.
**Action:** Always add `loading="lazy"` to secondary/below-the-fold content images in static site generator templates while preserving eager loading for above-the-fold header/logo elements.

## 2025-02-27 - Caching static Hugo partials with partialCached
**Learning:** Static Hugo partials like `footer.html` that depend only on `site.Params` and `site.Menus` can be cached with `partialCached` to avoid redundant template parsing and execution across all site pages during build.
**Action:** Use `partialCached` for footer or other globally static partials that do not depend on page-specific context (`.` or `$currentPage`).

## 2025-02-27 - Preloading critical header logo image assets
**Learning:** Preloading the site header logo image in `<head>` using `<link rel="preload" href="..." as="image">` enables browser preloader discovery during document header parsing before layout/header rendering. Omitting `type` attribute on configurable image parameters ensures compatibility across all image formats (SVG, PNG, JPG, WebP).
**Action:** Always preload above-the-fold critical brand assets in `<head>` using `as="image"` without hardcoding format-specific `type` hints.
