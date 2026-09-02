## 2025-02-27 - Skip to content accessibility in Hugo base templates
**Learning:** Adding a keyboard skip-to-content link targeting `<main id="main-content" tabindex="-1">` in `baseof.html` satisfies WCAG 2.4.1 Bypass Blocks across all site pages without impacting visual layout for mouse users.
**Action:** Always verify `baseof.html` or root layout templates in Hugo sites have a skip link and matching `id="main-content"` target.
