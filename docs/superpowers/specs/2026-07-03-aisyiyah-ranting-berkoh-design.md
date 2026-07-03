# Aisyiyah Ranting Berkoh — Website Design Spec

## Overview

Website profil untuk Aisyiyah Ranting Berkoh, organisasi wanita Islam tingkat ranting di bawah
Aisyiyah/Muhammadiyah. Berisi informasi organisasi, program kerja (KB/TK ABA, pengajian, kegiatan
sosial), berita kegiatan, galeri foto, dan kontak. Dibangun dengan Hugo + Decap CMS, di-host di
GitHub Pages.

Non-coders perlu bisa update konten lewat GUI (Decap CMS) tanpa menyentuh kode.

---

## Tech Stack

| Layer | Teknologi | Alasan |
|-------|-----------|--------|
| Static Site Generator | Hugo | Build cepat, templating bersih, cocok GH Pages |
| CMS | Decap CMS (dulu Netlify CMS) | GUI untuk non-coders, simpan ke GitHub sebagai Markdown |
| Hosting | GitHub Pages | Gratis, integrasi langsung |
| CI/CD | GitHub Actions | Build & deploy otomatis tiap commit |
| CSS Framework | Tailwind CSS (via Hugo Pipes) | Utility-first, mudah bikin custom design |
| Font | Inter / Plus Jakarta Sans | Modern, readable, gratis dari Google Fonts |
| Icons | Feather Icons | Minimalis, ringan |

---

## Visual Identity

### Color Palette

| Peran | Warna | Hex |
|-------|-------|-----|
| Primary | Hijau Muhammadiyah | `#00843D` |
| Secondary | Gold/Emas | `#C9A84C` |
| Gradient Hero | Diagonal Hijau → Gold | — |
| Background | Putih | `#FFFFFF` |
| Surface | Soft Cream | `#FCFAF2` |
| Text Primary | Dark Navy | `#1A2B3D` |
| Text Muted | Gray | `#6B7280` |

### Typography

- **Headings:** Plus Jakarta Sans (700/600)
- **Body:** Inter (400)
- **Base size:** 16px, scale 1.25 untuk headings

### Logo

- Logo Aisyiyah resmi di header & footer
- Tulisan "Aisyiyah Ranting Berkoh" di sebelah logo

---

## Pages & Layout

### Global Layout

- **Header:** Sticky, background putih transparan + backdrop-blur. Logo kiri, nav kanan.
- **Footer:** Background hijau tua. 3 kolom: alamat/kontak, nav, sosial media + maps. Copyright bar.
- **Container:** Max-width 1200px, centered.
- **Responsive:** Mobile-first, hamburger menu di <768px.

### Navigation

Beranda | Tentang | Program | Berita | Galeri | Kontak

### Page Details

#### 1. Beranda (Home)
- Hero full-screen: gradient diagonal hijau→gold, teks putih, subteks singkat
- CTA tombol "Lihat Program Kami"
- Section "Sekilas Tentang" — foto + deskripsi singkat
- Section "Program Unggulan" — 4 card (KB/TK ABA, Pengajian Rutin, Kegiatan Sosial, dll)
- Section "Berita Terbaru" — 3 card highlight
- Section "Lokasi" — Google Maps embed + alamat

#### 2. Tentang Kami (About)
- Hero kecil (gradient sama)
- Sejarah Ranting Berkoh
- Visi & Misi
- Struktur Pengurus (card with foto, nama, jabatan)
- Lokasi & Fasilitas (Gedung Aisyiyah, Masjid Al Ikhlash)

#### 3. Program (Programs)
- Card grid dengan ikon, nama program, deskripsi, jadwal
- Kategori: Pendidikan (KB/TK ABA), Keagamaan, Sosial
- Halaman detail program (opsional, tergantung konten)

#### 4. Berita (News)
- Blog-style list: thumbnail, judul, tanggal, cuplikan
- Sort by date descending
- Pagination
- Halaman detail: full artikel + foto

#### 5. Galeri (Gallery)
- Grid foto (uniform grid)
- Lightbox click
- Filter per kategori kegiatan

#### 6. Kontak (Contact)
- Alamat lengkap
- Google Maps embed
- WhatsApp direct link
- Email, Instagram, YouTube
- Contact form (Formspree atau Netlify Forms)

#### 7. Admin (Decap CMS)
- `/admin/` — login via GitHub OAuth
- Collections: Berita, Program, Galeri, Pengurus
- Media library untuk upload foto

---

## Data Model (Decap CMS Collections)

### Berita
```
title, date, description, image (featured), body (markdown), tags
```

### Program
```
title, icon, description, schedule, category (pendidikan/keagamaan/sosial), body
```

### Galeri
```
title, date, category, images (multiple)
```

### Pengurus
```
name, position, photo, bio
```

### Pengaturan
```
site_title, description, logo, alamat, maps_url, whatsapp, email, instagram, youtube
```

---

## Content Strategy

- Semua konten ditulis dalam Bahasa Indonesia
- Foto kegiatan dari pengurus langsung (upload via Decap CMS)
- Berita diupdate minimal 1x per kegiatan
- Program diupdate saat ada perubahan jadwal

---

## Maintainability

- Non-coders hanya perlu akses `/admin/` → login GitHub → edit via form
- Tidak perlu sentuh kode untuk update konten
- Semua perubahan konten otomatis build & deploy via GitHub Actions
- Dokumentasi singkat cara pakai Decap CMS disertakan di repo (README)

---

## Deliverables

1. Hugo project dengan Tailwind CSS
2. Decap CMS config (collections, media, etc.)
3. Full layout: header, footer, homepage, all pages
4. Responsive design (mobile-first)
5. GitHub Actions workflow untuk build & deploy ke GH Pages
6. README dengan panduan singkat untuk pengurus
