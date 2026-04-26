import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Check, Crosshair } from "lucide-react";
import React, { useEffect } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  ZoomControl,
} from "react-leaflet";
import WidgetLayout from "./WidgetLayout";
import type { ConfirmLocationsData } from "../../../types/chat";

// Main location marker with label tooltip
const createMainIcon = (name: string, address: string) =>
  new L.DivIcon({
    html: `
        <div class="relative flex items-center justify-center">
            <div class="absolute w-12 h-12 bg-[#D62575]/20 rounded-full animate-ping"></div>
            <div class="w-8 h-8 bg-[#D62575] rounded-full flex items-center justify-center border-2 border-white shadow-lg relative z-10">
                <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div class="absolute top-[-44px] whitespace-nowrap bg-white px-3 py-2 rounded-xl shadow-xl border border-slate-100 text-[13px] font-bold text-slate-800 z-20">
                ${name} ${address ? 'at ' + address : ''}
                <div class="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-slate-100 rotate-45"></div>
            </div>
        </div>
    `,
    className: "main-marker-icon",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

function MapBoundsUpdater({
  locations,
}: {
  locations: Array<{ lat: number; lng: number }>;
}) {
  const map = useMap();
  useEffect(() => {
    if (!map || locations.length === 0) return;
    try {
      const bounds = L.latLngBounds(locations.map((loc) => [loc.lat, loc.lng]));
      const timeoutId = setTimeout(() => {
        if (!map) return;
        map.invalidateSize();
        map.fitBounds(bounds.pad(0.3), { padding: [50, 50], maxZoom: 15 });
      }, 300);
      return () => clearTimeout(timeoutId);
    } catch (e) {
      console.warn("MapBoundsUpdater error", e);
    }
  }, [locations, map]);
  return null;
}

interface WidgetConfirmLocationsProps {
  content: ConfirmLocationsData;
  aiText?: React.ReactNode;
  showLogo?: boolean;
  onConfirm?: () => void;
}

export default function WidgetConfirmLocations({
  content,
  aiText,
  showLogo = false,
  onConfirm,
}: WidgetConfirmLocationsProps) {
  const locations = content.locations.map(loc => ({
    ...loc,
    lat: loc.lat || loc.latitude || 0,
    lng: loc.lng || loc.longitude || 0,
    name: loc.location_name || loc.name || "Location",
    address: loc.formatted_address || ""
  }));

  const leftContent = (
    <div className="p-8 h-full flex flex-col bg-white">
      {/* Header - Shop name with edit button */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
            <Crosshair size={20} className="text-slate-400" />
          </div>
          <div>
            <h3 className="text-[20px] font-bold text-slate-900 leading-tight">
              {locations.length} Location(s) Identified
            </h3>
            <p className="text-[14px] text-slate-400 font-medium">
              Confirm the mapping below to proceed.
            </p>
          </div>
        </div>
      </div>

      {/* Checklist items */}
      <div className="space-y-5 flex-1 overflow-y-auto max-h-[400px] pr-2">
        {locations.map((loc, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
             <div className="w-6 h-6 rounded-full bg-primary-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-primary-600">{idx + 1}</span>
             </div>
             <div className="flex flex-col">
                <span className="text-[14px] font-bold text-slate-900">{loc.name}</span>
                <span className="text-[12px] text-slate-500">{loc.address}</span>
             </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button
        className={`w-full mt-8 px-6 py-4 bg-slate-900 text-white rounded-2xl text-[15px] font-bold hover:bg-black transition-all shadow-lg active:scale-[0.98] ${!onConfirm ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => onConfirm?.()}
      >
        Confirm {locations.length} Location(s)
      </button>
    </div>
  );

  const rightContent = (
    <div className="w-full h-full relative rounded-xl overflow-hidden shadow-[0_0_0_4px_#CCCBC0]">
      <MapContainer
        center={locations.length > 0 ? [locations[0].lat, locations[0].lng] : [0, 0]}
        zoom={14}
        scrollWheelZoom={false}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          url="https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=eTv72QZ1tQRMGSvSdUtUadKcClkD6xYlPVSy85fiE88lfHT8NC1JngM8jchQ3f7W"
          attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapBoundsUpdater locations={locations} />
        <ZoomControl position="bottomright" />

        {/* Location markers */}
        {locations.map((loc, idx) => (
          <Marker
            key={idx}
            position={[loc.lat, loc.lng]}
            icon={createMainIcon(loc.name, loc.address)}
          />
        ))}
      </MapContainer>

      <style>{`
        .leaflet-tile {
          filter: grayscale(60%) brightness(108%) contrast(92%) saturate(80%) hue-rotate(170deg);
        }
        .leaflet-container {
          background: #fdfdfb !important;
        }
        .leaflet-control-attribution {
          display: none;
        }
      `}</style>
    </div>
  );

  return (
    <WidgetLayout
      mode="split"
      leftContent={leftContent}
      rightContent={rightContent}
      aiText={aiText}
      showLogo={showLogo}
    />
  );
}
