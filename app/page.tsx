"use client";

// =====================================================
// FILE: page.tsx
// FUNGSI:
// Halaman utama aplikasi WebGIS.
// File ini mengatur:
// 1. Top bar / header aplikasi
// 2. Navbar menu
// 3. Area peta utama
// 4. Dashboard card statistik di bawah peta
// =====================================================

import dynamic from "next/dynamic";
import Link from "next/link";

// =====================================================
// DYNAMIC IMPORT
// FUNGSI:
// Leaflet harus dimuat di sisi client.
// Karena itu komponen MapView di-import secara dynamic
// dengan SSR dimatikan.
// =====================================================
const MapView = dynamic(() => import("@/components/map/MapView"), {
  ssr: false,
});

// =====================================================
// DATA CARD SEMENTARA
// FUNGSI:
// Menyediakan data awal untuk card statistik.
// Nanti angka dan label ini bisa diganti dengan data asli.
// =====================================================
const dashboardCards = [
  {
    title: "Total Shelter",
    value: "--",
    description: "Jumlah titik shelter yang tersedia",
  },
  {
    title: "Total Zona Risiko",
    value: "--",
    description: "Jumlah area risiko tsunami terpetakan",
  },
  {
    title: "Total Populasi Terdampak",
    value: "--",
    description: "Estimasi populasi pada area terdampak",
  },
  {
    title: "Status Data",
    value: "Draft",
    description: "Status data dan analisis saat ini",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* =====================================================
          TOP BAR
          FUNGSI:
          Header utama aplikasi yang menampilkan judul
          dan deskripsi singkat project WebGIS.
         ===================================================== */}
      <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              WebGIS Tsunami
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Dashboard pemetaan dan analisis data tsunami
            </p>
          </div>

          {/* =====================================================
              NAVBAR
              FUNGSI:
              Navigasi utama aplikasi.
              Untuk saat ini masih sederhana dan statis.
             ===================================================== */}
          <nav className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20"
            >
              Main Page
            </Link>

            <Link
              href="/credit"
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
            >
              Credit
            </Link>
          </nav>
        </div>
      </header>

      {/* =====================================================
          KONTEN UTAMA
          FUNGSI:
          Menyusun area peta dan panel dashboard statistik.
         ===================================================== */}
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-6">
        {/* =====================================================
            FRAME PETA
            FUNGSI:
            Membungkus komponen peta agar tampil seperti panel
            aplikasi dashboard modern.
           ===================================================== */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
          <div className="border-b border-slate-800 px-5 py-3">
            <h2 className="text-lg font-semibold text-slate-100">
              Peta Utama
            </h2>
            <p className="text-sm text-slate-400">
              Area visualisasi layer spasial dan interaksi peta
            </p>
          </div>

          <div className="h-[70vh] w-full">
            <MapView />
          </div>
        </div>

        {/* =====================================================
            DASHBOARD STATISTIK
            FUNGSI:
            Menampilkan card statistik awal di bawah peta.
            Saat ini masih placeholder dan siap diisi data nanti.
           ===================================================== */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-slate-100">
              Dashboard Statistik
            </h2>
            <p className="text-sm text-slate-400">
              Ringkasan data utama akan ditampilkan di sini
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {dashboardCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg transition hover:border-cyan-500/30 hover:shadow-cyan-500/10"
              >
                <p className="text-sm font-medium text-slate-400">
                  {card.title}
                </p>

                <h3 className="mt-3 text-3xl font-bold tracking-tight text-cyan-300">
                  {card.value}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}