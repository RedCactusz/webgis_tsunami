// =====================================================
// FILE: app/credit/page.tsx
// FUNGSI:
// Halaman Credit untuk aplikasi WebGIS.
// Menampilkan informasi pembuat aplikasi, teknologi yang dipakai,
// dan keterangan singkat tentang project.
// =====================================================

import Link from "next/link";

export default function CreditPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* =====================================================
          TOP BAR
          FUNGSI:
          Header halaman credit agar tetap konsisten
          dengan halaman utama aplikasi.
         ===================================================== */}
      <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              WebGIS Tsunami
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Halaman credit dan informasi project
            </p>
          </div>

          {/* =====================================================
              NAVBAR
              FUNGSI:
              Navigasi antar halaman utama aplikasi.
             ===================================================== */}
          <nav className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
            >
              Main Page
            </Link>

            <Link
              href="/credit"
              className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20"
            >
              Credit
            </Link>
          </nav>
        </div>
      </header>

      {/* =====================================================
          KONTEN HALAMAN CREDIT
          FUNGSI:
          Menampilkan informasi tentang aplikasi,
          pembuat, dan teknologi yang digunakan.
         ===================================================== */}
      <section className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* =====================================================
              CARD 1
              FUNGSI:
              Informasi singkat tentang project.
             ===================================================== */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-100">
              Tentang Project
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              WebGIS ini dibuat untuk visualisasi data spasial terkait tsunami,
              analisis wilayah terdampak, titik shelter, dan statistik pendukung
              lainnya. Halaman ini bisa kamu isi lebih lengkap nanti sesuai
              kebutuhan project.
            </p>
          </div>

          {/* =====================================================
              CARD 2
              FUNGSI:
              Informasi pembuat / author project.
             ===================================================== */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-100">
              Author / Developer
            </h2>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>
                <span className="font-semibold text-slate-100">Nama:</span>{" "}
                [Isi nama kamu di sini]
              </p>
              <p>
                <span className="font-semibold text-slate-100">Institusi:</span>{" "}
                [Isi institusi]
              </p>
              <p>
                <span className="font-semibold text-slate-100">Tahun:</span>{" "}
                2026
              </p>
              <p>
                <span className="font-semibold text-slate-100">Kontak:</span>{" "}
                [Isi email / kontak]
              </p>
            </div>
          </div>

          {/* =====================================================
              CARD 3
              FUNGSI:
              Menampilkan stack teknologi yang digunakan.
             ===================================================== */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-100">
              Teknologi yang Digunakan
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Next.js</li>
              <li>• React</li>
              <li>• Leaflet + React Leaflet</li>
              <li>• Tailwind CSS</li>
              <li>• GeoJSON lokal</li>
            </ul>
          </div>

          {/* =====================================================
              CARD 4
              FUNGSI:
              Menampilkan catatan sumber data atau lisensi.
             ===================================================== */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-100">
              Sumber Data / Lisensi
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Bagian ini bisa dipakai untuk mencantumkan sumber data spasial,
              lisensi peta dasar, referensi penelitian, atau catatan metodologi
              yang kamu gunakan dalam project WebGIS ini.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}