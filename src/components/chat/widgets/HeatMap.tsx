"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import "leaflet/dist/leaflet.css";

// 📍 Center point (Seattle area based on your image)
const center: [number, number] = [47.6062, -122.3321];

// 🔥 Heat data points adjusted to match the 4-5 main clusters in your image
const heatData: [number, number, number][] = [
    [47.62, -122.33, 0.9],  // North cluster
    [47.6062, -122.3321, 1], // Center cluster
    [47.59, -122.335, 0.8], // South cluster
    [47.61, -122.31, 0.7],  // East cluster
    [47.615, -122.315, 0.5],
];

// Custom White Pin Marker with the Label "Shawarma Palace..."
const customIcon = new L.DivIcon({
    html: `
    <div style="display: flex; flex-direction: column; align-items: center; position: relative;">
      <div style="
        background: rgba(18, 18, 18, 0.85);
        color: white;
        padding: 6px 12px;
        border-radius: 8px;
        font-family: sans-serif;
        font-size: 13px;
        white-space: nowrap;
        border: 1px solid rgba(255,255,255,0.2);
        margin-bottom: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.5);
      ">
        Shawarma Palace at 456 Elm Street.
      </div>
      <img src="/indicator.svg" style="width: 32px; height: 32px;" alt="Marker" />
    </div>
  `,
    className: "",
    iconSize: [250, 60], // Large enough to container the text
    iconAnchor: [125, 60], // Anchors the bottom of the pin to the lat/lng
});

function HeatLayer() {
    const map = useMap();

    useEffect(() => {
        const heat = (L as any).heatLayer(heatData, {
            radius: 45,
            blur: 25,
            maxZoom: 13,
            minZoom: 4,
            gradient: {
                0.2: "blue",
                0.4: "lime",
                0.6: "yellow",
                0.8: "orange",
                1.0: "red",
            },
        });

        heat.addTo(map);
        return () => { map.removeLayer(heat); };
    }, [map]);

    return null;
}

export default function HeatMap() {
    return (
        <div style={{ height: "100vh", width: "100%", position: "relative", background: "#1a1a1a" }}>

            {/* 🛠 Custom UI Overlay (Top Right Buttons) */}
            <div style={{ position: "absolute", top: 20, right: 20, zIndex: 1000, display: "flex", gap: "8px" }}>
                <button style={uiButtonStyle}><span style={{ opacity: 0.8 }}>🥩</span></button>
                <button style={uiButtonStyle}><span style={{ opacity: 0.8 }}>📅</span></button>
            </div>

            {/* 📏 Custom UI Overlay (Bottom Left Scale/Zoom) */}
            <div style={{ position: "absolute", bottom: 20, left: 20, zIndex: 1000, display: "flex", gap: "10px", alignItems: "center" }}>
                <div style={controlGroupStyle}>
                    <button style={zoomBtnStyle}>−</button>
                    <div style={{ padding: "0 15px", color: "black", fontWeight: "600", fontSize: "14px" }}>1 km</div>
                    <button style={zoomBtnStyle}>+</button>
                </div>
            </div>

            <MapContainer
                center={center}
                zoom={12}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
                touchZoom={false}
                boxZoom={false}
                dragging={true}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                <HeatLayer />
                <Marker position={center} icon={customIcon} />

                {/* Standard zoom controls positioned bottom right like in image */}
                <ZoomControl position="bottomright" />
            </MapContainer>
        </div>
    );
}

// --- Styles to match the UI in the image ---

const uiButtonStyle: React.CSSProperties = {
    background: "white",
    border: "none",
    borderRadius: "12px",
    width: "45px",
    height: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)"
};

const controlGroupStyle: React.CSSProperties = {
    background: "white",
    display: "flex",
    alignItems: "center",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
};

const zoomBtnStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    fontSize: "24px",
    padding: "10px 15px",
    cursor: "pointer",
    color: "#555"
};