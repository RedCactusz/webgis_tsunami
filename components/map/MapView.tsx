// =====================================================
// FILE: MapView.tsx
// FUNGSI:
// Komponen React untuk menampilkan peta Leaflet.
// File ini:
// 1. Membuat peta
// 2. Menambahkan basemap OpenStreetMap
// 3. Menambahkan marker contoh
// 4. Menampilkan popup saat marker diklik
// =====================================================

"use client";

import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// =====================================================
// FIX ICON LEAFLET
// FUNGSI:
// Memperbaiki icon marker default Leaflet di environment Next.js.
// Tanpa ini, marker kadang tidak muncul.
// =====================================================
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapView() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <MapContainer
        center={[-7.7956, 110.3695]}
        zoom={10}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
      >
        {/* =====================================================
            BASEMAP
            FUNGSI:
            Mengambil tile peta dari OpenStreetMap.
           ===================================================== */}
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* =====================================================
            MARKER CONTOH
            FUNGSI:
            Menampilkan titik contoh di peta.
           ===================================================== */}
        <Marker position={[-7.7956, 110.3695]}>
          <Popup>
            <strong>Shelter 1</strong>
            <br />
            Titik contoh untuk WebGIS tsunami.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}