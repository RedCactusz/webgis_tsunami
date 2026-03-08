"use client";

import dynamic from "next/dynamic";

// Muat MapView secara dinamis di client tanpa SSR karena MapView bergantung pada
// objek browser (window, document) dan library Leaflet.
const MapView = dynamic(() => import("./MapView"), { ssr: false });

export default function MapClient() {
  return <MapView />;
}
