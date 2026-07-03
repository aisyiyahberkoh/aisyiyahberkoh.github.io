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
npm run build
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
