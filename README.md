# WebGIS Tsunami — Proyek Mata Kuliah

Deskripsi singkat
-----------------
Aplikasi WebGIS untuk visualisasi jalur evakuasi tsunami menggunakan Next.js. Dibuat sebagai proyek kelompok untuk mata kuliah Komputasi Geospasial.

Tujuan
------
- Menampilkan data titik tsunami pada peta interaktif.
- Mempraktikkan pemrosesan GeoJSON dan pembuatan antarmuka peta dengan Next.js.

Anggota tim
-----------
- M. Rouf Indhra Dewa Sambodo — 24/552974/PTK/16494
- Oktavia Nutivara Waskito — 25/562735/PTK/16612
- Saffira Noor Chotimah — 25/563053/PTK/16640
- Frans Waas — 25/566567/PTK/16709
- Zulfikar Hakki Budiono — 25/568388/PTK/16751
- Iman Taufiqqurrahman — 25/569788/PTK/16971

Teknologi
---------
- Next.js (App Router, TypeScript)
- React
- Komponen peta kustom (lihat `components/map/MapView.tsx`)

Persyaratan
-----------
- Node.js (disarankan >= 16)
- npm / pnpm / yarn

Instalasi & Menjalankan (development)
-----------------------------------
1. Install dependensi:

```powershell
npm install
```

2. Jalankan server development:

```powershell
npm run dev
```

Buka http://localhost:3000 di browser. Halaman utama terletak di `app/page.tsx`.

Build & Production
------------------
Build untuk produksi dan jalankan:

```powershell
npm run build
npm run start
```

Data
----
- File data utama: `public/data/geojson/titik-tsunami.geojson`
- Format: GeoJSON FeatureCollection (Point).
- Pastikan properti penting seperti `tanggal`, `magnitudo`, dan `lokasi` tersedia jika diperlukan oleh popup/tooltip.

Struktur proyek penting
----------------------
- `app/` — Halaman dan route Next.js (App Router)
- `components/map/MapView.tsx` — Komponen peta utama
- `public/data/geojson/` — Data GeoJSON yang digunakan

Cara pakai singkat
------------------
1. Jalankan server development.
2. Buka halaman peta.
3. Gunakan kontrol peta untuk zoom/pan. Klik titik untuk melihat detail.

Aturan kontribusi (workflow kelompok)
------------------------------------
- Gunakan branch untuk setiap fitur: `feature/<nama-fitur>`
- Buat pull request ke `main` dan minta review dari anggota tim lain.
- Sertakan catatan singkat tentang perubahan pada PR.

Catatan penilaian (opsional)
---------------------------
- Visualisasi & fungsionalitas: 60%
- Kualitas kode & dokumentasi: 25%
- Presentasi/demo: 15%

Deploy
------
Disarankan menggunakan Vercel untuk kemudahan deploy Next.js. Tidak ada variabel environment yang diperlukan secara default.

Isu diketahui
------------
- Performa dapat menurun untuk dataset sangat besar — pertimbangkan clustering atau server-side tiling jika dataset tumbuh besar.

Catatan terakhir
---------------
README ini adalah versi awal untuk keperluan tugas kelompok. Jika ingin saya sesuaikan lagi (mis. nama anggota nyata, rubrik penilaian yang spesifik, atau menambahkan link tugas), beri tahu dan saya akan perbarui.
