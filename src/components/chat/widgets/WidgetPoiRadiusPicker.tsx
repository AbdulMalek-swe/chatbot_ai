import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Check, Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  ZoomControl,
} from "react-leaflet";
import WidgetLayout from "./WidgetLayout";
import type { PoiRadiusPickerData } from "../../../types/chat";
import SecondaryBtn from "../../shared/secondaryBtn";

const createPoiIcon = (name: string) =>
  new L.DivIcon({
    html: `
         <div class="relative flex items-center justify-center">
            <img src="/indicator.svg" class="w-6 h-6 relative z-10" alt="POI Marker" />
            <div class="absolute -top-8 whitespace-nowrap bg-white px-2 py-1 rounded-lg shadow-md border border-slate-100 text-[10px] font-bold text-slate-800 z-20">
                ${name}
                <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-slate-100 rotate-45"></div>
            </div>
        </div>
    `,
    className: "poi-marker-icon",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

function MapBoundsUpdater({
  center,
  pois,
}: {
  center: [number, number];
  pois: any[];
}) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    try {
      const bounds = L.latLngBounds([center, ...pois.map(p => [p.lat, p.lng])]);
      map.fitBounds(bounds.pad(0.3), { animate: true, padding: [50, 50] });
    } catch (e) {
      console.warn("MapBoundsUpdater error", e);
    }
  }, [center, pois, map]);
  return null;
}

interface WidgetPoiRadiusPickerProps {
  content: PoiRadiusPickerData;
  onConfirm?: (radius: number) => void;
  aiText?: React.ReactNode;
  showLogo?: boolean;
}

export default function WidgetPoiRadiusPicker({
  content,
  onConfirm,
  aiText,
  showLogo = false,
}: WidgetPoiRadiusPickerProps) {
  const [radius, setRadius] = useState(content.default_radius_km || 0.5);
  const center: [number, number] = [
    content.center.lat || content.center.latitude || 0,
    content.center.lng || content.center.longitude || 0
  ];

  const leftContent = (
    <div className="p-8 h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
            <img src="/locationIcon.png" alt="Location" className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[20px] font-bold text-slate-900 leading-tight">
              Adjust Geofence Radius
            </h3>
            <p className="text-[14px] text-slate-400 font-medium">
              Updating all {content.pois.length} POIs live.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center gap-8">
         <div className="flex flex-col items-center">
            <div className="text-6xl font-black text-slate-900 tracking-tighter">
              {radius < 1 ? Math.round(radius * 1000) : radius}
            </div>
            <div className="text-xs font-black text-primary-500 uppercase tracking-[0.3em] mt-2">
              {radius < 1 ? "Meters" : "Kilometers"}
            </div>
         </div>

         <div className="flex items-center gap-4 w-full px-4">
            <SecondaryBtn 
                onClick={() => setRadius(prev => Math.max(0.1, parseFloat((prev - 0.1).toFixed(1))))}
                className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200"
            >
                <Minus size={24} />
            </SecondaryBtn>
            
            <input 
              type="range" 
              min="0.1" 
              max="5" 
              step="0.1"
              value={radius} 
              onChange={(e) => setRadius(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />

            <SecondaryBtn 
                onClick={() => setRadius(prev => Math.min(5, parseFloat((prev + 0.1).toFixed(1))))}
                className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200"
            >
                <Plus size={24} />
            </SecondaryBtn>
         </div>

         <p className="text-[14px] text-slate-500 text-center font-medium px-4 leading-relaxed">
            All circles on the map share this same radius value for geofencing precision.
         </p>
      </div>

      <button
        onClick={() => onConfirm?.(radius)}
        className="w-full mt-8 px-6 py-4 bg-slate-900 text-white rounded-2xl text-[15px] font-bold hover:bg-black transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <Check size={20} className="text-primary-400" />
        Apply Geofence to {content.pois.length} POIs
      </button>
    </div>
  );

  const rightContent = (
    <div className="w-full h-full relative rounded-xl overflow-hidden shadow-[0_0_0_4px_#CCCBC0]">
      <MapContainer
        center={center}
        zoom={14}
        scrollWheelZoom={false}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          url="https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=eTv72QZ1tQRMGSvSdUtUadKcClkD6xYlPVSy85fiE88lfHT8NC1JngM8jchQ3f7W"
          attribution='&copy; JawgMaps'
        />
        <ZoomControl position="bottomright" />
        <MapBoundsUpdater center={center} pois={content.pois} />
        
        {/* POI Markers and Circles */}
        {content.pois.map((poi, idx) => (
          <React.Fragment key={idx}>
            <Marker
                position={[poi.lat, poi.lng]}
                icon={createPoiIcon(poi.name)}
            />
            <Circle 
                center={[poi.lat, poi.lng]}
                radius={radius * 1000}
                pathOptions={{
                    color: "#D62575",
                    fillColor: "#D62575",
                    fillOpacity: 0.15,
                    weight: 2,
                    dashArray: "5, 10"
                }}
            />
          </React.Fragment>
        ))}
      </MapContainer>

      <style>{`
        .leaflet-tile {
          filter: grayscale(60%) brightness(108%) contrast(92%) saturate(80%) hue-rotate(170deg);
        }
        .leaflet-container {
          background: #fdfdfb !important;
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
