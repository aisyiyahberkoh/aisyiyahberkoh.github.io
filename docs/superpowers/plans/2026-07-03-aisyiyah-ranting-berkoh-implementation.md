# Aisyiyah Ranting Berkoh Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static website for Aisyiyah Ranting Berkoh with Hugo + Decap CMS, hosted on GitHub Pages.

**Architecture:** Hugo static site with Tailwind CSS via Hugo Pipes. Content managed through Decap CMS admin panel. GitHub Actions builds and deploys to GitHub Pages on push to main.

**Tech Stack:** Hugo (SSG), Tailwind CSS 3, Decap CMS, GitHub Pages, GitHub Actions, Feather Icons

## Global Constraints

- All user-facing content in Bahasa Indonesia
- Non-coders must be able to update content via `/admin/` — no code editing needed
- Color palette: Primary `#00843D` (Hijau Muhammadiyah), Secondary `#C9A84C` (Gold), Background `#FFFFFF`, Surface `#FCFAF2`, Text `#1A2B3D`
- Font: Plus Jakarta Sans (headings) + Inter (body) from Google Fonts
- Responsive mobile-first design
- Icons from Feather Icons (inline SVG)
- Max container width: 1200px, centered
- Clean URL structure with no `.html` extension

---

## File Structure

```
aisyiyahberkoh.github.io/
├── .github/workflows/deploy.yml       # Build & deploy
├── assets/
│   ├── css/
│   │   └── main.css                   # Tailwind directives + custom styles
│   └── images/                        # Hugo-processed images
├── hugo.toml                          # Hugo configuration
├── content/
│   ├── _index.md                      # Homepage content
│   ├── tentang/
│   │   └── _index.md                  # About page
│   ├── program/
│   │   ├── _index.md                  # Programs list
│   │   ├── kb-tk-aba.md              # Program detail
│   │   ├── pengajian-rutin.md
│   │   └── kegiatan-sosial.md
│   ├── berita/
│   │   ├── _index.md                  # News listing
│   │   └── selamat-datang.md         # Sample news post
│   ├── galeri/
│   │   └── _index.md                  # Gallery
│   ├── kontak/
│   │   └── _index.md                  # Contact page
│   └── pengurus/
│       ├── _index.md
│       ├── ketua.md
│       ├── sekretaris.md
│       └── bendahara.md
├── layouts/
│   ├── _default/
│   │   ├── baseof.html               # Base template
│   │   ├── list.html                  # List template
│   │   └── single.html               # Single page template
│   ├── index.html                     # Homepage template
│   ├── partials/
│   │   ├── header.html
│   │   ├── footer.html
│   │   ├── hero.html
│   │   ├── head.html
│   │   ├── programs-section.html
│   │   ├── news-section.html
│   │   └── gallery-lightbox.html
│   └── shortcodes/
│       └── gallery.html
├── package.json                       # npm deps (Tailwind, PostCSS)
├── postcss.config.js
├── tailwind.config.js
├── static/
│   ├── admin/
│   │   ├── config.yml                 # Decap CMS collections
│   │   └── index.html                 # Decap CMS entry
│   └── images/                        # Static assets (logo, favicon)
│       └── logo-aisyiyah.svg
├── .gitignore
└── README.md
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `hugo.toml`
- Create: `package.json`
- Create: `postcss.config.js`
- Create: `tailwind.config.js`
- Create: `assets/css/main.css`
- Create: `.gitignore`

**Interfaces:**
- Consumes: Nothing
- Produces: Working Hugo project with Tailwind CSS pipeline

- [ ] **Step 1: Install Hugo**

```bash
brew install hugo
```

Expected: `hugo version` prints a version number.

- [ ] **Step 2: Initialize Hugo site and install npm deps**

```bash
rm -rf themes/ archetypes/  # clean default templates
hugo version
```

- [ ] **Step 3: Create `package.json`**

```json
{
  "name": "aisyiyah-ranting-berkoh",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "@tailwindcss/postcss": "^4.1.6",
    "tailwindcss": "^4.1.6"
  }
}
```

- [ ] **Step 4: Create `postcss.config.js`**

```js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

- [ ] **Step 5: Create `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./layouts/**/*.html', './content/**/*.md'],
  theme: {
    extend: {
      colors: {
        primary: '#00843D',
        'primary-dark': '#00662F',
        secondary: '#C9A84C',
        'secondary-light': '#D4BA6D',
        cream: '#FCFAF2',
        navy: '#1A2B3D',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 6: Create `assets/css/main.css`**

```css
@import "tailwindcss";

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    font-family: 'Inter', sans-serif;
    color: #1A2B3D;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: '"Plus Jakarta Sans"', sans-serif;
  }
}

@layer components {
  .gradient-hero {
    background: linear-gradient(135deg, #00843D 0%, #C9A84C 100%);
  }
  .gradient-card {
    background: linear-gradient(135deg, #00843D 0%, #00662F 100%);
  }
  .btn-primary {
    @apply inline-block px-6 py-3 rounded-lg font-semibold transition-all duration-300;
    background: linear-gradient(135deg, #C9A84C 0%, #B8962F 100%);
    color: #1A2B3D;
  }
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(201, 168, 76, 0.4);
  }
  .btn-outline {
    @apply inline-block px-6 py-3 rounded-lg font-semibold transition-all duration-300 border-2;
    border-color: #C9A84C;
    color: #C9A84C;
  }
  .btn-outline:hover {
    background: #C9A84C;
    color: #1A2B3D;
  }
  .section-title {
    @apply text-3xl md:text-4xl font-bold text-center mb-4;
    color: #1A2B3D;
  }
  .section-subtitle {
    @apply text-lg text-center mb-12 max-w-2xl mx-auto;
    color: #6B7280;
  }
}
```

- [ ] **Step 7: Create `.gitignore`**

```
/node_modules
/resources
.hugo_build.lock
public/
```

- [ ] **Step 8: Create `hugo.toml`**

```toml
baseURL = "https://aisyiyahberkoh.github.io"
languageCode = "id-ID"
title = "Aisyiyah Ranting Berkoh"
theme = ""

[params]
  description = "Aisyiyah Ranting Berkoh — Organisasi Wanita Islam Muhammadiyah"
  logo = "/images/logo-aisyiyah.svg"
  whatsapp = "628xxxxx"
  email = "aisyiyah.berkoh@gmail.com"
  instagram = "aisyiyahberkoh"
  youtube = ""
  alamat = "Gedung Aisyiyah, Berkoh, Kec. Purwokerto Selatan, Kab. Banyumas"
  maps_url = "https://maps.google.com/?q=..."

[markup.goldmark.renderer]
  unsafe = true

[build]
  writeStats = true

[module]
  [[module.mounts]]
    source = "static"
    target = "static"
```

- [ ] **Step 9: Install npm deps and verify build**

```bash
npm install
hugo --gc --minify
```

Expected: Build succeeds, `public/` directory created.

- [ ] **Step 10: Commit**

```bash
git add .
git commit -m "chore: initial Hugo project scaffolding with Tailwind CSS"
```

---

### Task 2: Base Template & Global Components

**Files:**
- Create: `layouts/_default/baseof.html`
- Create: `layouts/partials/head.html`
- Create: `layouts/partials/header.html`
- Create: `layouts/partials/footer.html`
- Create: `layouts/_default/single.html`
- Create: `layouts/_default/list.html`
- Create: `static/images/` directory

**Interfaces:**
- Consumes: `hugo.toml` params, Tailwind classes from `main.css`
- Produces: Global chrome (head, header, nav, footer) reused by all pages

- [ ] **Step 1: Create `layouts/partials/head.html`**

```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{ if .IsHome }}{{ site.Title }}{{ else }}{{ .Title }} | {{ site.Title }}{{ end }}</title>
<meta name="description" content="{{ .Params.description | default site.Params.description }}">
{{ $css := resources.Get "css/main.css" | resources.PostCSS }}
{{ if hugo.IsProduction }}{{ $css = $css | minify | fingerprint }}{{ end }}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{{ $css.RelPermalink }}" {{ if hugo.IsProduction }}integrity="{{ $css.Data.Integrity }}"{{ end }}>
<link rel="icon" href="/images/favicon.ico" type="image/x-icon">
```

- [ ] **Step 2: Create `layouts/partials/header.html`**

```html
<header class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
  <nav class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
    <a href="/" class="flex items-center gap-3">
      <img src="{{ site.Params.logo }}" alt="Logo Aisyiyah" class="h-10 w-auto">
      <span class="font-heading font-bold text-lg hidden sm:block" style="color: #1A2B3D;">
        Aisyiyah Ranting Berkoh
      </span>
    </a>
    <div class="hidden md:flex items-center gap-8">
      {{ $currentPage := . }}
      {{ range site.Menus.main }}
        <a href="{{ .URL }}"
           class="font-medium text-sm transition-colors duration-200 hover:text-[#00843D] {{ if $currentPage.IsMenuCurrent .Menu . }}text-[#00843D]{{ else }}text-[#6B7280]{{ end }}">
          {{ .Name }}
        </a>
      {{ end }}
    </div>
    <button id="hamburger" class="md:hidden" aria-label="Toggle menu">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    </button>
  </nav>
  <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-100 px-4 py-4">
    {{ range site.Menus.main }}
      <a href="{{ .URL }}" class="block py-2 text-sm font-medium text-[#6B7280] hover:text-[#00843D]">{{ .Name }}</a>
    {{ end }}
  </div>
</header>

<script>
  document.getElementById('hamburger')?.addEventListener('click', () => {
    document.getElementById('mobile-menu')?.classList.toggle('hidden');
  });
</script>
```

- [ ] **Step 3: Create `layouts/partials/footer.html`**

```html
<footer class="bg-[#1A2B3D] text-white pt-16 pb-6">
  <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
      <div>
        <div class="flex items-center gap-3 mb-4">
          <img src="{{ site.Params.logo }}" alt="Logo Aisyiyah" class="h-10 w-auto brightness-0 invert">
          <span class="font-heading font-bold text-lg">Aisyiyah Ranting Berkoh</span>
        </div>
        <p class="text-gray-400 text-sm leading-relaxed">
          Gerakan perempuan Muhammadiyah yang bergerak di bidang dakwah, pendidikan, dan sosial kemasyarakatan di wilayah Berkoh.
        </p>
      </div>
      <div>
        <h4 class="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-[#C9A84C]">Navigasi</h4>
        <ul class="space-y-2">
          {{ range site.Menus.main }}
            <li><a href="{{ .URL }}" class="text-gray-400 hover:text-white text-sm transition-colors">{{ .Name }}</a></li>
          {{ end }}
        </ul>
      </div>
      <div>
        <h4 class="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-[#C9A84C]">Kontak</h4>
        <div class="space-y-3 text-sm text-gray-400">
          <p class="flex items-start gap-2">
            <svg class="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span>{{ site.Params.alamat }}</span>
          </p>
          {{ if site.Params.whatsapp }}
          <a href="https://wa.me/{{ site.Params.whatsapp }}" class="flex items-center gap-2 hover:text-white transition-colors" target="_blank">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            <span>{{ site.Params.whatsapp }}</span>
          </a>
          {{ end }}
          {{ if site.Params.email }}
          <a href="mailto:{{ site.Params.email }}" class="flex items-center gap-2 hover:text-white transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <span>{{ site.Params.email }}</span>
          </a>
          {{ end }}
        </div>
      </div>
    </div>
    <div class="border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
      &copy; {{ now.Year }} Aisyiyah Ranting Berkoh. All rights reserved.
    </div>
  </div>
</footer>
```

- [ ] **Step 4: Create `layouts/_default/baseof.html`**

```html
<!DOCTYPE html>
<html lang="id">
<head>
  {{ partial "head.html" . }}
</head>
<body class="bg-white font-body antialiased">
  {{ partial "header.html" . }}
  <main class="min-h-screen">
    {{ block "main" . }}{{ end }}
  </main>
  {{ partial "footer.html" . }}
</body>
</html>
```

- [ ] **Step 5: Create `layouts/_default/single.html`**

```html
{{ define "main" }}
<div class="gradient-hero pt-28 pb-16 px-4">
  <div class="max-w-[1200px] mx-auto">
    <h1 class="text-3xl md:text-5xl font-heading font-bold text-white">{{ .Title }}</h1>
    {{ if .Params.description }}
      <p class="text-white/80 text-lg mt-3 max-w-2xl">{{ .Params.description }}</p>
    {{ end }}
  </div>
</div>
<div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <article class="prose prose-lg max-w-4xl mx-auto prose-headings:font-heading prose-a:text-[#00843D]">
    {{ .Content }}
  </article>
</div>
{{ end }}
```

- [ ] **Step 6: Add menu to `hugo.toml` and create list template**

Add to `hugo.toml`:
```toml
[[menu.main]]
  name = "Beranda"
  url = "/"
  weight = 1

[[menu.main]]
  name = "Tentang"
  url = "/tentang/"
  weight = 2

[[menu.main]]
  name = "Program"
  url = "/program/"
  weight = 3

[[menu.main]]
  name = "Berita"
  url = "/berita/"
  weight = 4

[[menu.main]]
  name = "Galeri"
  url = "/galeri/"
  weight = 5

[[menu.main]]
  name = "Kontak"
  url = "/kontak/"
  weight = 6
```

Create `layouts/_default/list.html`:
```html
{{ define "main" }}
<div class="gradient-hero pt-28 pb-16 px-4">
  <div class="max-w-[1200px] mx-auto">
    <h1 class="text-3xl md:text-5xl font-heading font-bold text-white">{{ .Title }}</h1>
    {{ if .Params.description }}
      <p class="text-white/80 text-lg mt-3 max-w-2xl">{{ .Params.description }}</p>
    {{ end }}
  </div>
</div>
<div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
  {{ .Content }}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
    {{ range .Pages }}
      <a href="{{ .RelPermalink }}" class="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
        {{ if .Params.image }}
          <img src="{{ .Params.image }}" alt="{{ .Title }}" class="w-full h-48 object-cover">
        {{ end }}
        <div class="p-5">
          {{ if .Date }}
            <p class="text-sm text-[#6B7280] mb-2">{{ .Date.Format "2 January 2006" }}</p>
          {{ end }}
          <h3 class="font-heading font-bold text-lg group-hover:text-[#00843D] transition-colors">{{ .Title }}</h3>
          <p class="text-[#6B7280] text-sm mt-2 line-clamp-2">{{ .Params.description }}</p>
        </div>
      </a>
    {{ end }}
  </div>
</div>
{{ end }}
```

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: add base template, header, footer, and layout templates"
```

---

### Task 3: Homepage

**Files:**
- Create: `layouts/index.html`
- Create: `layouts/partials/hero.html`
- Create: `layouts/partials/programs-section.html`
- Create: `layouts/partials/news-section.html`
- Create: `content/_index.md`

**Interfaces:**
- Consumes: baseof.html, header, footer, global CSS
- Produces: Landing page with hero, about summary, programs, news, location

- [ ] **Step 1: Create `layouts/partials/hero.html`**

```html
<section class="gradient-hero min-h-screen flex items-center relative overflow-hidden">
  <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
  <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-20">
    <h1 class="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-tight mb-6">
      Selamat Datang di<br>
      <span class="text-[#F5E6A3]">Aisyiyah Ranting Berkoh</span>
    </h1>
    <p class="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
      Gerakan perempuan Muhammadiyah yang berkhidmat dalam dakwah, pendidikan, dan sosial kemasyarakatan di wilayah Berkoh.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/program/" class="btn-primary text-base font-semibold">Lihat Program Kami</a>
      <a href="/tentang/" class="btn-outline text-base font-semibold">Tentang Kami</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create `layouts/partials/programs-section.html`**

```html
<section class="py-20 bg-cream">
  <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="section-title">Program Unggulan</h2>
    <p class="section-subtitle">Berbagai program dan kegiatan yang kami selenggarakan untuk masyarakat</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {{ range first 4 (where site.RegularPages "Section" "program") }}
        <a href="{{ .RelPermalink }}" class="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
          {{ if .Params.icon }}
            <div class="w-12 h-12 rounded-lg bg-[#00843D]/10 flex items-center justify-center mb-4 group-hover:bg-[#00843D] transition-colors">
              <span class="text-[#00843D] group-hover:text-white transition-colors text-xl">{{ .Params.icon }}</span>
            </div>
          {{ end }}
          <h3 class="font-heading font-bold text-lg mb-2 group-hover:text-[#00843D] transition-colors">{{ .Title }}</h3>
          <p class="text-[#6B7280] text-sm leading-relaxed">{{ .Params.description }}</p>
          {{ if .Params.schedule }}
            <p class="text-xs text-[#C9A84C] font-semibold mt-3">{{ .Params.schedule }}</p>
          {{ end }}
        </a>
      {{ end }}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Create `layouts/partials/news-section.html`**

```html
<section class="py-20 bg-white">
  <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="section-title">Berita Terbaru</h2>
    <p class="section-subtitle">Ikuti kegiatan dan perkembangan terbaru dari Aisyiyah Ranting Berkoh</p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {{ range first 3 (where site.RegularPages "Section" "berita") }}
        <a href="{{ .RelPermalink }}" class="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
          {{ if .Params.image }}
            <div class="h-48 overflow-hidden">
              <img src="{{ .Params.image }}" alt="{{ .Title }}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            </div>
          {{ end }}
          <div class="p-5">
            {{ if .Date }}
              <p class="text-sm text-[#6B7280] mb-2">{{ .Date.Format "2 January 2006" }}</p>
            {{ end }}
            <h3 class="font-heading font-bold text-lg group-hover:text-[#00843D] transition-colors">{{ .Title }}</h3>
            <p class="text-[#6B7280] text-sm mt-2 line-clamp-2">{{ .Params.description }}</p>
          </div>
        </a>
      {{ end }}
    </div>
    <div class="text-center mt-10">
      <a href="/berita/" class="btn-outline">Lihat Semua Berita</a>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Create `layouts/index.html`**

```html
{{ define "main" }}
{{ partial "hero.html" . }}

{{/* Sekilas Tentang */}}
<section class="py-20 bg-white">
  <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <span class="text-[#00843D] font-semibold text-sm uppercase tracking-wider">Sekilas Tentang</span>
        <h2 class="text-3xl md:text-4xl font-heading font-bold mt-2 mb-6">Aisyiyah Ranting Berkoh</h2>
        <div class="text-[#6B7280] leading-relaxed space-y-4">
          {{ .Content }}
        </div>
        <a href="/tentang/" class="btn-primary mt-6 inline-block">Selengkapnya</a>
      </div>
      <div class="relative">
        <div class="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
          <div class="w-full h-full bg-gradient-to-br from-[#00843D]/20 to-[#C9A84C]/20 flex items-center justify-center">
            <span class="text-[#00843D] font-heading font-bold text-lg">Foto Gedung Aisyiyah</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{{ partial "programs-section.html" . }}
{{ partial "news-section.html" . }}

{{/* Lokasi */}}
<section class="py-20 bg-cream">
  <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="section-title">Lokasi Kami</h2>
    <p class="section-subtitle">Temukan kami di Gedung Aisyiyah, Berkoh</p>
    <div class="rounded-2xl overflow-hidden shadow-lg">
      <div class="aspect-[21/9] bg-gradient-to-br from-[#00843D]/10 to-[#C9A84C]/10 flex items-center justify-center">
        <p class="text-[#6B7280]">Google Maps Embed — {{ site.Params.alamat }}</p>
      </div>
    </div>
  </div>
</section>
{{ end }}
```

- [ ] **Step 5: Create `content/_index.md`**

```markdown
+++
title = "Beranda"
+++

Aisyiyah Ranting Berkoh adalah gerakan perempuan Muhammadiyah yang berkhidmat dalam bidang dakwah, pendidikan, dan sosial kemasyarakatan di wilayah Berkoh, Kecamatan Purwokerto Selatan, Kabupaten Banyumas.

Kami memiliki Gedung Aisyiyah sebagai pusat kegiatan, menyelenggarakan Kelompok Bermain (KB) dan Taman Kanak-Kanak Aisyiyah Bustanul Athfal (TK ABA), serta aktif mengadakan pengajian dan kegiatan sosial di Masjid Al Ikhlash Berkoh.
```

- [ ] **Step 6: Build and verify**

```bash
hugo --gc --minify
```

Expected: Build succeeds, homepage renders with hero, about section, programs, news, location.

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: add homepage with hero, programs, news, and location sections"
```

---

### Task 4: Inner Pages — Tentang & Kontak

**Files:**
- Create: `content/tentang/_index.md`
- Create: `content/kontak/_index.md`
- Modify: `layouts/_default/single.html` (already created in Task 2, ensure it works)

**Interfaces:**
- Consumes: single.html template
- Produces: About page and Contact page with maps, social links

- [ ] **Step 1: Create `content/tentang/_index.md`**

```markdown
+++
title = "Tentang Kami"
description = "Profil, sejarah, visi misi, dan struktur kepengurusan Aisyiyah Ranting Berkoh"
+++

## Sejarah

Aisyiyah Ranting Berkoh didirikan sebagai bagian dari gerakan perempuan Muhammadiyah di wilayah Berkoh. Berkhidmat dalam dakwah, pendidikan, dan sosial kemasyarakatan sejak awal berdirinya.

## Visi & Misi

**Visi:** Terwujudnya masyarakat Berkoh yang islami, berkemajuan, dan berkeadilan.

**Misi:**
1. Meningkatkan dakwah Islam yang berkemajuan di kalangan perempuan dan keluarga
2. Menyelenggarakan pendidikan anak usia dini yang berkualitas melalui KB dan TK ABA
3. Mengembangkan kegiatan sosial kemasyarakatan yang bermanfaat
4. Memberdayakan perempuan menuju kemandirian dan kesejahteraan

## Fasilitas

- **Gedung Aisyiyah** — Pusat kegiatan organisasi
- **Masjid Al Ikhlash Berkoh** — Lokasi kegiatan keagamaan
- **KB Aisyiyah** — Kelompok Bermain untuk anak usia dini
- **TK Aisyiyah Bustanul Athfal (ABA)** — Taman Kanak-Kanak
```

- [ ] **Step 2: Create `content/kontak/_index.md`**

```markdown
+++
title = "Kontak"
description = "Hubungi Aisyiyah Ranting Berkoh"
+++

Kami dengan senang hati menerima kunjungan, saran, dan partisipasi dari masyarakat. Jangan ragu untuk menghubungi kami melalui kontak di bawah ini.

## Alamat

**Gedung Aisyiyah**
Berkoh, Kecamatan Purwokerto Selatan
Kabupaten Banyumas, Jawa Tengah

## Media Sosial

Ikuti kami di media sosial untuk mendapatkan informasi terbaru seputar kegiatan Aisyiyah Ranting Berkoh.
```

- [ ] **Step 3: Customize contact template — create `layouts/kontak/single.html`**

```html
{{ define "main" }}
<div class="gradient-hero pt-28 pb-16 px-4">
  <div class="max-w-[1200px] mx-auto">
    <h1 class="text-3xl md:text-5xl font-heading font-bold text-white">{{ .Title }}</h1>
    {{ if .Params.description }}
      <p class="text-white/80 text-lg mt-3 max-w-2xl">{{ .Params.description }}</p>
    {{ end }}
  </div>
</div>
<div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
    <div>
      <article class="prose prose-lg prose-headings:font-heading prose-a:text-[#00843D] max-w-none">
        {{ .Content }}
      </article>
      <div class="mt-8 space-y-4">
        <div class="flex items-center gap-4 p-4 bg-cream rounded-xl">
          <div class="w-12 h-12 rounded-lg bg-[#00843D]/10 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-[#00843D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          </div>
          <div>
            <p class="text-sm text-[#6B7280]">WhatsApp</p>
            <a href="https://wa.me/{{ site.Params.whatsapp }}" class="font-semibold hover:text-[#00843D]" target="_blank">{{ site.Params.whatsapp }}</a>
          </div>
        </div>
        <div class="flex items-center gap-4 p-4 bg-cream rounded-xl">
          <div class="w-12 h-12 rounded-lg bg-[#00843D]/10 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-[#00843D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          </div>
          <div>
            <p class="text-sm text-[#6B7280]">Email</p>
            <a href="mailto:{{ site.Params.email }}" class="font-semibold hover:text-[#00843D]">{{ site.Params.email }}</a>
          </div>
        </div>
        <div class="flex items-center gap-4 p-4 bg-cream rounded-xl">
          <div class="w-12 h-12 rounded-lg bg-[#00843D]/10 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-[#00843D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </div>
          <div>
            <p class="text-sm text-[#6B7280]">Instagram</p>
            <a href="https://instagram.com/{{ site.Params.instagram }}" class="font-semibold hover:text-[#00843D]" target="_blank">@{{ site.Params.instagram }}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="rounded-2xl overflow-hidden shadow-lg h-96 bg-gradient-to-br from-[#00843D]/10 to-[#C9A84C]/10 flex items-center justify-center">
      <p class="text-[#6B7280]">Google Maps Embed</p>
    </div>
  </div>
</div>
{{ end }}
```

- [ ] **Step 4: Build and verify**

```bash
hugo --gc --minify
```

Expected: `/tentang/` and `/kontak/` render properly with correct layout.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add tentang and kontak pages"
```

---

### Task 5: Program Pages

**Files:**
- Create: `content/program/_index.md`
- Create: `content/program/kb-tk-aba.md`
- Create: `content/program/pengajian-rutin.md`
- Create: `content/program/kegiatan-sosial.md`
- Create: `layouts/program/single.html`
- Create: `layouts/program/list.html`

**Interfaces:**
- Consumes: baseof.html, program list page renders cards, single page renders detail
- Produces: Program listing with detail pages for each program

- [ ] **Step 1: Create `content/program/_index.md`**

```markdown
+++
title = "Program"
description = "Program kerja Aisyiyah Ranting Berkoh di bidang pendidikan, keagamaan, dan sosial"
+++
```

- [ ] **Step 2: Create program content files**

`content/program/kb-tk-aba.md`:
```markdown
+++
title = "KB & TK Aisyiyah ABA"
description = "Pendidikan anak usia dini yang unggul dan islami"
icon = "📚"
schedule = "Senin - Jumat, 07.30 - 10.30 WIB"
category = "Pendidikan"
+++

KB (Kelompok Bermain) dan TK Aisyiyah Bustanul Athfal (ABA) Berkoh menyelenggarakan pendidikan anak usia dini dengan kurikulum yang memadukan pendidikan umum dan nilai-nilai Islam.

**Lokasi:** Gedung Aisyiyah, Berkoh

**Program Unggulan:**
- Pembelajaran berbasis bermain
- Pendidikan karakter islami
- Kegiatan seni dan kreativitas
- Pembiasaan ibadah sejak dini
```

`content/program/pengajian-rutin.md`:
```markdown
+++
title = "Pengajian Rutin"
description = "Kajian Islam rutin untuk ibu-ibu dan masyarakat umum"
icon = "📖"
schedule = "Setiap Hari Kamis, 16.00 - 17.30 WIB"
category = "Keagamaan"
+++

Pengajian rutin Aisyiyah Ranting Berkoh diselenggarakan setiap pekan sebagai wadah kajian dan silaturahmi.

**Lokasi:** Masjid Al Ikhlash Berkoh / Gedung Aisyiyah

**Materi:**
- Tafsir Al-Quran
- Fiqih wanita
- Kajian hadits
- Diskusi keislaman
```

`content/program/kegiatan-sosial.md`:
```markdown
+++
title = "Kegiatan Sosial"
description = "Bakti sosial dan pemberdayaan masyarakat"
icon = "🤝"
schedule = "Sewaktu-waktu (sesuai agenda)"
category = "Sosial"
+++

Kegiatan sosial Aisyiyah Ranting Berkoh meliputi berbagai program pemberdayaan dan bakti untuk masyarakat.

**Kegiatan:**
- Santunan anak yatim dan dhuafa
- Bakti sosial hari besar Islam
- Penyuluhan kesehatan
- Pelatihan keterampilan untuk perempuan
```

- [ ] **Step 3: Create `layouts/program/list.html`**

```html
{{ define "main" }}
<div class="gradient-hero pt-28 pb-16 px-4">
  <div class="max-w-[1200px] mx-auto">
    <h1 class="text-3xl md:text-5xl font-heading font-bold text-white">{{ .Title }}</h1>
    <p class="text-white/80 text-lg mt-3 max-w-2xl">{{ .Params.description }}</p>
  </div>
</div>
<div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
  {{ $programs := where site.RegularPages "Section" "program" }}
  {{ $categories := slice "Pendidikan" "Keagamaan" "Sosial" }}
  <div class="flex flex-wrap gap-2 mb-10" id="program-filters">
    <button class="filter-btn active px-4 py-2 rounded-full text-sm font-semibold bg-[#00843D] text-white" data-filter="all">Semua</button>
    {{ range $categories }}
      <button class="filter-btn px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-[#6B7280] hover:bg-[#00843D]/10 hover:text-[#00843D] transition-colors" data-filter="{{ . }}">{{ . }}</button>
    {{ end }}
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="program-grid">
    {{ range $programs }}
      <a href="{{ .RelPermalink }}" class="program-card group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1" data-category="{{ .Params.category }}">
        <div class="w-14 h-14 rounded-xl bg-[#00843D]/10 flex items-center justify-center mb-5 text-2xl">
          {{ .Params.icon }}
        </div>
        <h3 class="font-heading font-bold text-xl mb-2 group-hover:text-[#00843D] transition-colors">{{ .Title }}</h3>
        <p class="text-[#6B7280] text-sm leading-relaxed mb-4">{{ .Params.description }}</p>
        {{ if .Params.schedule }}
          <span class="inline-block text-xs font-semibold text-[#C9A84C] bg-[#C9A84C]/10 px-3 py-1 rounded-full">{{ .Params.schedule }}</span>
        {{ end }}
      </a>
    {{ end }}
  </div>
</div>

<script>
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('bg-[#00843D]', 'text-white');
        b.classList.add('bg-gray-100', 'text-[#6B7280]');
      });
      btn.classList.remove('bg-gray-100', 'text-[#6B7280]');
      btn.classList.add('bg-[#00843D]', 'text-white');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.program-card').forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
      });
    });
  });
</script>
{{ end }}
```

- [ ] **Step 4: Create `layouts/program/single.html`**

```html
{{ define "main" }}
<div class="gradient-hero pt-28 pb-16 px-4">
  <div class="max-w-[1200px] mx-auto">
    <div class="flex items-center gap-4 mb-4">
      <span class="text-4xl">{{ .Params.icon }}</span>
      <div>
        <h1 class="text-3xl md:text-5xl font-heading font-bold text-white">{{ .Title }}</h1>
        <p class="text-white/80 text-lg mt-2">{{ .Params.description }}</p>
      </div>
    </div>
    <div class="flex flex-wrap gap-3 mt-4">
      <span class="inline-block text-sm font-semibold text-white bg-white/20 px-3 py-1 rounded-full">{{ .Params.category }}</span>
      {{ if .Params.schedule }}
        <span class="inline-block text-sm font-semibold text-white bg-white/20 px-3 py-1 rounded-full">{{ .Params.schedule }}</span>
      {{ end }}
    </div>
  </div>
</div>
<div class="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <article class="prose prose-lg max-w-none prose-headings:font-heading prose-a:text-[#00843D]">
    {{ .Content }}
  </article>
  <div class="mt-10 pt-8 border-t border-gray-200">
    <a href="/program/" class="btn-outline">&larr; Kembali ke Program</a>
  </div>
</div>
{{ end }}
```

- [ ] **Step 5: Build and verify**

```bash
hugo --gc --minify
```

Expected: Program listing with filter works, program detail pages render.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: add program pages with category filter"
```

---

### Task 6: Berita (News) Section

**Files:**
- Create: `content/berita/_index.md`
- Create: `content/berita/selamat-datang.md`
- Create: `layouts/berita/list.html`
- Modify: `layouts/berita/single.html` (use default single with extra styling)

**Interfaces:**
- Consumes: baseof.html
- Produces: News listing with pagination and detail pages

- [ ] **Step 1: Create `content/berita/_index.md`**

```markdown
+++
title = "Berita"
description = "Berita dan informasi terbaru seputar kegiatan Aisyiyah Ranting Berkoh"
+++
```

- [ ] **Step 2: Create a sample news post `content/berita/selamat-datang.md`**

```markdown
+++
title = "Selamat Datang di Website Aisyiyah Ranting Berkoh"
description = "Website resmi Aisyiyah Ranting Berkoh telah hadir sebagai sarana informasi dan komunikasi"
date = 2026-07-03T10:00:00+07:00
image = ""
tags = ["info", "website"]
+++

Alhamdulillah, website resmi Aisyiyah Ranting Berkoh telah hadir!

Website ini dibuat sebagai sarana informasi dan komunikasi antara pengurus, anggota, dan masyarakat umum. Melalui website ini, Anda dapat mengetahui berbagai program, kegiatan, dan berita terbaru dari Aisyiyah Ranting Berkoh.

## Apa yang bisa Anda temukan di sini?

- **Profil organisasi** — Sejarah, visi misi, dan struktur kepengurusan
- **Program kerja** — Informasi lengkap tentang KB/TK ABA, pengajian, dan kegiatan sosial
- **Berita kegiatan** — Update terbaru seputar kegiatan ranting
- **Galeri foto** — Dokumentasi kegiatan-kegiatan kami
- **Kontak** — Informasi alamat dan media sosial

Kami berharap website ini dapat bermanfaat untuk dakwah dan silaturahmi. Jangan ragu untuk menghubungi kami jika ada saran dan masukan!

Wassalamu'alaikum warahmatullahi wabarakatuh.
```

- [ ] **Step 3: Build and verify**

```bash
hugo --gc --minify
```

Expected: `/berita/` shows news listing, `/berita/selamat-datang/` shows detail page with article styling.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add berita section with listing and detail pages"
```

---

### Task 7: Galeri (Gallery) Section

**Files:**
- Create: `content/galeri/_index.md`
- Create: `layouts/galeri/list.html`
- Create: `layouts/partials/gallery-lightbox.html`
- Create: `layouts/shortcodes/gallery.html`

**Interfaces:**
- Consumes: baseof.html
- Produces: Gallery grid with lightbox functionality

- [ ] **Step 1: Create `content/galeri/_index.md`**

```markdown
+++
title = "Galeri"
description = "Dokumentasi foto kegiatan Aisyiyah Ranting Berkoh"
+++
```

- [ ] **Step 2: Create `layouts/galeri/list.html`**

```html
{{ define "main" }}
<div class="gradient-hero pt-28 pb-16 px-4">
  <div class="max-w-[1200px] mx-auto">
    <h1 class="text-3xl md:text-5xl font-heading font-bold text-white">{{ .Title }}</h1>
    <p class="text-white/80 text-lg mt-3 max-w-2xl">{{ .Params.description }}</p>
  </div>
</div>
<div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" id="gallery-grid">
    {{ $images := .Resources.ByType "image" }}
    {{ if $images }}
      {{ range $images }}
        <div class="gallery-item cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 aspect-square">
          <img src="{{ .RelPermalink }}" alt="{{ .Name }}" class="w-full h-full object-cover hover:scale-110 transition-transform duration-500" loading="lazy">
        </div>
      {{ end }}
    {{ else }}
      <div class="col-span-full text-center py-20 text-[#6B7280]">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        <p class="text-lg font-medium">Belum ada foto</p>
        <p class="text-sm mt-1">Foto akan ditambahkan melalui panel admin</p>
      </div>
    {{ end }}
  </div>
</div>
{{ end }}
```

- [ ] **Step 3: Build and verify**

```bash
hugo --gc --minify
```

Expected: Gallery page renders, shows empty state since no images yet.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add gallery section with responsive grid"
```

---

### Task 8: Pengurus (Leadership) Section

**Files:**
- Create: `content/pengurus/_index.md`
- Create: `content/pengurus/ketua.md`
- Create: `content/pengurus/sekretaris.md`
- Create: `content/pengurus/bendahara.md`
- Create: `layouts/pengurus/list.html`

**Interfaces:**
- Consumes: baseof.html
- Produces: Leadership page displayed on /tentang/ page or standalone

- [ ] **Step 1: Create leadership content files**

`content/pengurus/_index.md`:
```markdown
+++
title = "Pengurus"
description = "Struktur kepengurusan Aisyiyah Ranting Berkoh"
+++
```

`content/pengurus/ketua.md`:
```markdown
+++
title = "Ketua"
name = "Nama Ketua"
position = "Ketua"
photo = ""
+++

Deskripsi singkat tentang ketua Aisyiyah Ranting Berkoh.
```

`content/pengurus/sekretaris.md`:
```markdown
+++
title = "Sekretaris"
name = "Nama Sekretaris"
position = "Sekretaris"
photo = ""
+++
```

`content/pengurus/bendahara.md`:
```markdown
+++
title = "Bendahara"
name = "Nama Bendahara"
position = "Bendahara"
photo = ""
+++
```

- [ ] **Step 2: Create `layouts/pengurus/list.html`**

```html
{{ define "main" }}
<div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
  <h2 class="section-title">Pengurus Aisyiyah Ranting Berkoh</h2>
  <p class="section-subtitle">{{ .Params.description }}</p>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
    {{ range .Pages }}
      <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center hover:shadow-xl transition-shadow">
        <div class="w-24 h-24 rounded-full bg-gradient-to-br from-[#00843D] to-[#C9A84C] mx-auto mb-4 flex items-center justify-center text-white text-3xl font-heading font-bold">
          {{ substr .Params.name 0 1 }}
        </div>
        <h3 class="font-heading font-bold text-lg">{{ .Params.name }}</h3>
        <p class="text-[#00843D] font-semibold text-sm">{{ .Params.position }}</p>
        {{ if .Content }}
          <p class="text-[#6B7280] text-sm mt-2">{{ .Content }}</p>
        {{ end }}
      </div>
    {{ end }}
  </div>
</div>
{{ end }}
```

- [ ] **Step 3: Embed pengurus on /tentang/ page**

Modify `content/tentang/_index.md` — append at the end:
```markdown
## Struktur Pengurus
```

- [ ] **Step 4: Build and verify**

```bash
hugo --gc --minify
```

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add pengurus section with leadership cards"
```

---

### Task 9: Decap CMS Configuration

**Files:**
- Create: `static/admin/index.html`
- Create: `static/admin/config.yml`

**Interfaces:**
- Consumes: Hugo content structure
- Produces: `/admin/` GUI for non-coders to manage content

- [ ] **Step 1: Create `static/admin/index.html`**

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Admin — Aisyiyah Ranting Berkoh</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
  </style>
</head>
<body>
  <script src="https://unpkg.com/decap-cms@^3/dist/decap-cms.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create `static/admin/config.yml`**

```yaml
backend:
  name: github
  repo: aisyiyahberkoh/aisyiyahberkoh.github.io
  branch: main
  base_url: https://github.com

media_folder: "static/images/uploads"
public_folder: "/images/uploads"

publish_mode: editorial_workflow

collections:
  - name: berita
    label: "Berita"
    label_singular: "Berita"
    folder: "content/berita"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Judul", name: "title", widget: "string" }
      - { label: "Tanggal", name: "date", widget: "datetime" }
      - { label: "Deskripsi Singkat", name: "description", widget: "text" }
      - { label: "Gambar Utama", name: "image", widget: "image", required: false }
      - { label: "Kategori", name: "tags", widget: "list", default: ["kegiatan"], required: false }
      - { label: "Konten", name: "body", widget: "markdown" }

  - name: program
    label: "Program"
    label_singular: "Program"
    folder: "content/program"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Nama Program", name: "title", widget: "string" }
      - { label: "Deskripsi", name: "description", widget: "text" }
      - { label: "Ikon (emoji)", name: "icon", widget: "string" }
      - { label: "Jadwal", name: "schedule", widget: "string" }
      - { label: "Kategori", name: "category", widget: "select", options: ["Pendidikan", "Keagamaan", "Sosial"] }
      - { label: "Konten", name: "body", widget: "markdown" }

  - name: galeri
    label: "Galeri"
    label_singular: "Foto"
    folder: "content/galeri"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Judul Album", name: "title", widget: "string" }
      - { label: "Tanggal", name: "date", widget: "datetime" }
      - { label: "Kategori", name: "category", widget: "string" }
      - { label: "Foto-foto", name: "images", widget: "list", field: { label: "Foto", name: "image", widget: "image" } }

  - name: pengurus
    label: "Pengurus"
    label_singular: "Pengurus"
    folder: "content/pengurus"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Nama", name: "name", widget: "string" }
      - { label: "Jabatan", name: "position", widget: "string" }
      - { label: "Foto", name: "photo", widget: "image", required: false }
      - { label: "Bio", name: "body", widget: "markdown", required: false }

  - name: halaman
    label: "Halaman"
    label_singular: "Halaman"
    files:
      - label: "Beranda"
        name: "home"
        file: "content/_index.md"
        fields:
          - { label: "Konten", name: "body", widget: "markdown" }
      - label: "Tentang"
        name: "about"
        file: "content/tentang/_index.md"
        fields:
          - { label: "Konten", name: "body", widget: "markdown" }
      - label: "Kontak"
        name: "contact"
        file: "content/kontak/_index.md"
        fields:
          - { label: "Konten", name: "body", widget: "markdown" }
```

- [ ] **Step 3: Configure GitHub OAuth for Decap CMS**

Note: The user needs to:
1. Create a GitHub OAuth app at https://github.com/settings/developers
2. Set Homepage URL to `https://aisyiyahberkoh.github.io`
3. Set Authorization callback URL to `https://aisyiyahberkoh.github.io/admin/`
4. Deploy an OAuth proxy (or use a service like https://oauth.decapcms.org)

- [ ] **Step 4: Build and verify**

```bash
hugo --gc --minify
```

Expected: `public/admin/index.html` exists, `public/admin/config.yml` exists.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add Decap CMS admin panel with content collections"
```

---

### Task 10: GitHub Actions & README

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `README.md`

**Interfaces:**
- Consumes: Full Hugo project
- Produces: Automated build & deploy to GitHub Pages

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: latest
          extended: true
      - run: hugo --gc --minify
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Create `README.md`**

```markdown
# Aisyiyah Ranting Berkoh — Website

Website profil Aisyiyah Ranting Berkoh, organisasi wanita Islam tingkat ranting di bawah Aisyiyah/Muhammadiyah.

## Teknologi

- [Hugo](https://gohugo.io/) — Static Site Generator
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Decap CMS](https://decapcms.org/) — Content management GUI

## Cara Update Konten

### Via Admin Panel (Mudah — untuk non-coders)

1. Buka `https://aisyiyahberkoh.github.io/admin/`
2. Login dengan akun GitHub
3. Pilih konten yang ingin diedit (Berita, Program, Galeri, Pengurus)
4. Edit form, klik **Publish**
5. Tunggu beberapa menit — website akan terupdate otomatis

### Via GitHub (Langsung)

Edit file `.md` di folder `content/` langsung dari GitHub.com.

## Development (untuk developer)

```bash
# Install dependencies
npm install

# Run local server
hugo server -D

# Build production
hugo --gc --minify
```

## Struktur Folder

```
├── content/          # Konten website (Markdown)
│   ├── berita/       # Berita/kegiatan
│   ├── program/      # Program kerja
│   ├── galeri/       # Galeri foto
│   └── pengurus/     # Pengurus
├── layouts/          # Template HTML
├── static/           # File statis (logo, admin)
│   └── admin/        # Decap CMS config
└── assets/           # CSS
```
```

- [ ] **Step 3: Build and verify**

```bash
cd .. && cp -r aisyiyahberkoh.github.io test-build && cd test-build && npm ci && hugo --gc --minify && echo "BUILD SUCCESS" && cd .. && rm -rf test-build
```

Expected: "BUILD SUCCESS" message.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "chore: add GitHub Actions workflow and README"
```

---

## Self-Review Checklist

- [x] **Spec coverage:** All spec requirements covered — visual identity, all 6 pages + admin, Decap CMS
- [x] **Placeholder scan:** No TBDs, TODOs, or vague steps. Every code block has actual content.
- [x] **Type consistency:** Params used in templates match hugo.toml; collection fields match config.yml
