// =====================================================
// FILE: MapView.tsx
// FUNGSI:
// Komponen React untuk menampilkan peta Leaflet.
// File ini:
// 1. Membuat peta
// 2. Menambahkan basemap OpenStreetMap
// 3. Menambahkan marker contoh
// 4. Menampilkan popup saat marker diklik
// 5. Memuat dan menampilkan GeoJSON batas administrasi
// =====================================================

"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap, LayersControl } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import type { GeoJsonObject } from "geojson";
import type { LatLngBoundsExpression } from "leaflet";
import proj4 from "proj4";

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

function FitBounds({ bounds }: { bounds: LatLngBoundsExpression }) {
  const map = useMap();
  useEffect(() => {
    if (!bounds) return;
    try {
      map.fitBounds(bounds, { padding: [20, 20] });
    } catch (e) {
      console.error("FitBounds error:", e);
    }
  }, [map, bounds]);
  return null;
}

export default function MapView() {
  // state untuk menyimpan GeoJSON batas administrasi
  const [batasGeoJson, setBatasGeoJson] = useState<GeoJsonObject | null>(null);
  const [bounds, setBounds] = useState<LatLngBoundsExpression | null>(null);
  // bounds khusus untuk fokus awal ke batas administrasi
  const [batasBounds, setBatasBounds] = useState<LatLngBoundsExpression | null>(null);
  // state untuk layer patahan (java-fault)
  const [faultGeoJson, setFaultGeoJson] = useState<GeoJsonObject | null>(null);

  useEffect(() => {
    // fetch file GeoJSON dari folder public
    // public/ di-serve pada root path, jadi URL relatif: /data/geojson/batas-administrasi.geojson
    const url = "/data/geojson/batas-administrasi.geojson";

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Gagal memuat GeoJSON: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // jika GeoJSON memiliki CRS yang bukan lon/lat (contoh: EPSG:32749), reproject ke WGS84
        let gj: GeoJsonObject = data as GeoJsonObject;

        const crsName = (data as any)?.crs?.properties?.name || "";
        if (typeof crsName === "string" && crsName.includes("32749")) {
          // definisi EPSG:32749 (UTM zone 49S) — south
          proj4.defs(
            "EPSG:32749",
            "+proj=utm +zone=49 +south +datum=WGS84 +units=m +no_defs"
          );

          // fungsi rekursif untuk mentransformasi koordinat GeoJSON
          function transformCoords(coords: any): any {
            if (typeof coords[0] === "number") {
              // [x, y, z?] -> proj4 returns [lon, lat]
              const x = coords[0];
              const y = coords[1];
              const [lon, lat] = proj4("EPSG:32749", "WGS84", [x, y]);
              return [lon, lat].concat(coords.slice(2));
            }
            return coords.map(transformCoords);
          }

          function transformGeometry(geom: any): any {
            if (!geom) return geom;
            const t = { ...geom };
            if (t.type === "Point") t.coordinates = transformCoords(t.coordinates);
            else if (t.type === "MultiPoint" || t.type === "LineString") t.coordinates = t.coordinates.map(transformCoords);
            else if (t.type === "MultiLineString" || t.type === "Polygon") t.coordinates = t.coordinates.map((c: any) => c.map(transformCoords));
            else if (t.type === "MultiPolygon") t.coordinates = t.coordinates.map((p: any) => p.map((r: any) => r.map(transformCoords)));
            else if (t.type === "GeometryCollection" && Array.isArray(t.geometries)) t.geometries = t.geometries.map(transformGeometry);
            return t;
          }

          // buat salinan fitur yang telah ditransformasi
          try {
            const newFeatures = (data as any).features.map((f: any) => ({
              ...f,
              geometry: transformGeometry(f.geometry),
            }));
            gj = { ...(data as any), features: newFeatures } as GeoJsonObject;
          } catch (e) {
            console.error("Error saat mereproject GeoJSON:", e);
          }
        }

        setBatasGeoJson(gj);

        // hitung bounds dari (mungkin sudah ter-reproject) GeoJSON dan simpan jika valid
        try {
          const layer = L.geoJSON(gj as GeoJsonObject);
          const b = layer.getBounds();
          if (b && (b as L.LatLngBounds).isValid && (b as L.LatLngBounds).isValid()) {
            // simpan batas khusus untuk fit pertama kali ke batas administrasi
            setBatasBounds(b);
            // gunakan functional update untuk menggabungkan bounds tanpa dependency
            setBounds((prev) => {
              if (prev) {
                try {
                  const combined = (L.latLngBounds(prev as any) as L.LatLngBounds).extend(b);
                  return combined;
                } catch (err) {
                  console.error("Error combining bounds:", err);
                  return b;
                }
              }
              return b;
            });
          }
        } catch (e) {
          console.error("Error menghitung bounds GeoJSON:", e);
        }
      })
      .catch((err) => {
        // gagal memuat tidak menyebabkan crash, cukup log
        console.error("Gagal memuat batas administrasi:", err);
      });
  }, []);

  // fetch untuk java-fault.geojson (layer patahan)
  useEffect(() => {
    const url = "/data/geojson/java-fault.geojson";
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Gagal memuat GeoJSON patahan: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // file ini sudah dalam CRS lon/lat (CRS84) sehingga tidak perlu reprojection
        const gj = data as GeoJsonObject;
        setFaultGeoJson(gj);

        // hitung bounds dan gabungkan ke bounds utama
        try {
          const layer = L.geoJSON(gj as GeoJsonObject);
          const b2 = layer.getBounds();
          if (b2 && (b2 as L.LatLngBounds).isValid && (b2 as L.LatLngBounds).isValid()) {
            setBounds((prev) => {
              if (prev) {
                try {
                  const combined = (L.latLngBounds(prev as any) as L.LatLngBounds).extend(b2);
                  return combined;
                } catch (err) {
                  console.error("Error combining bounds:", err);
                  return b2;
                }
              }
              return b2;
            });
          }
        } catch (err) {
          console.error("Error menghitung bounds java-fault:", err);
        }
      })
      .catch((err) => console.error("Gagal memuat java-fault.geojson:", err));
   }, []);

   // style default untuk batas administrasi
   const batasStyle = {
     color: "#1e88e5",
     weight: 2,
     opacity: 0.9,
     fillColor: "#90caf9",
     fillOpacity: 0.2,
   };

   const faultStyle = {
     color: "#e53935",
     weight: 2,
     opacity: 0.9,
     dashArray: "6,4",
   };

   // Fungsi untuk menambahkan popup pada tiap fitur GeoJSON
   function onEachFeature(feature: any, layer: L.Layer) {
     try {
       const props = (feature as any)?.properties || {};
       // Properti yang ingin ditampilkan di popup (urutkan sesuai prioritas)
       const fields = [
         { key: "NAMOBJ", label: "Nama Kelurahan/Desa" },
         { key: "WADMKD", label: "Kelurahan" },
         { key: "WADMKK", label: "Kecamatan" },
         { key: "WADMPR", label: "Provinsi" },
         { key: "Penduduk", label: "Penduduk" },
         { key: "REMARK", label: "Keterangan" },
       ];

       // Bangun HTML tabel untuk popup
       let html = "<div style=\"min-width:180px\">";
       html += `<h3 style=\"margin:0 0 8px 0; font-size:14px\">${props.NAMOBJ || props.WADMKD || props.WADMKK || "(nama tidak tersedia)"}</h3>`;
       html += '<table style="font-size:13px">';
       for (const f of fields) {
         if (props[f.key] !== undefined && props[f.key] !== null && props[f.key] !== "") {
           let value: any = props[f.key];
           // format angka penduduk jika perlu
           if (f.key === "Penduduk") {
             const n = Number(String(value).replace(/[^0-9.-]+/g, ""));
             value = Number.isFinite(n) ? n.toLocaleString("id-ID") : String(value);
           }
           html += `<tr><td style="padding:2px 6px;color:#94a3b8">${f.label}</td><td style="padding:2px 6px;font-weight:600">${value}</td></tr>`;
         }
       }
       html += "</table></div>";

       if (layer && typeof (layer as any).bindPopup === "function") {
         (layer as any).bindPopup(html);
       }
     } catch (e) {
       console.error("Error onEachFeature:", e);
     }
   }

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

         {/* =====================================================
             BOUNDARY GEOJSON
             FUNGSI:
             Jika data batas administrasi sudah dimuat, render layer GeoJSON dan fit bounds.
            ===================================================== */}
         <LayersControl position="topright">
           <LayersControl.Overlay name="Batas Administrasi" checked>
             {batasGeoJson ? (
               <GeoJSON data={batasGeoJson} style={batasStyle} onEachFeature={onEachFeature} />
             ) : null}
           </LayersControl.Overlay>

           <LayersControl.Overlay name="Patahan Jawa (java-fault.geojson)" checked>
             {faultGeoJson ? (
               <GeoJSON data={faultGeoJson} style={faultStyle} onEachFeature={onEachFeature} />
             ) : null}
           </LayersControl.Overlay>
         </LayersControl>
         {/* Fokus pertama kali hanya ke batas administrasi agar saat load peta langsung ke sana */}
         {batasBounds ? <FitBounds bounds={batasBounds} /> : null}
       </MapContainer>
     </div>
   );
 }

