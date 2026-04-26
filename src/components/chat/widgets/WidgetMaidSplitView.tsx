import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Check } from "lucide-react";
import React, { useEffect } from "react";
import {
  CircleMarker,
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  ZoomControl,
} from "react-leaflet";
import WidgetLayout from "./WidgetLayout";
import type { MaidSplitViewData } from "../../../types/chat";

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
      map.fitBounds(bounds.pad(0.2), { animate: true, padding: [20, 20] });
    } catch (e) {
      console.warn("MapBoundsUpdater error", e);
    }
  }, [center, pois, map]);
  return null;
}

interface WidgetMaidSplitViewProps {
  content: MaidSplitViewData;
  onConfirm?: () => void;
  aiText?: React.ReactNode;
  showLogo?: boolean;
}

export default function WidgetMaidSplitView({
  content,
  onConfirm,
  aiText,
  showLogo = false,
}: WidgetMaidSplitViewProps) {
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
              {content.center.location_name || content.center.name || "Target Area"}
            </h3>
            <p className="text-[14px] text-slate-400 font-medium">
              {content.pois.length} POIs Found
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto pr-2">
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm">
           <div className="flex items-center justify-between mb-4">
              <span className="text-[12px] font-black text-slate-400 uppercase tracking-widest">Audience Intelligence</span>
              <div className="px-2 py-0.5 rounded-full bg-primary-500/10 text-[10px] font-bold text-primary-600">LIVE</div>
           </div>
           <div className="flex items-end gap-2">
              <h4 className="text-4xl font-bold text-slate-900">{(content.maid_count || 0).toLocaleString()}</h4>
              <span className="text-[14px] text-slate-500 font-medium pb-1.5">Unique Visitors</span>
           </div>
           <p className="text-[12px] text-slate-400 mt-2 italic">
              Based on {content.lookback_days || 30} days lookback window
           </p>
        </div>

        <div className="space-y-3">
          <h5 className="text-[12px] font-black text-slate-400 uppercase tracking-widest px-1">Confirmed POIs</h5>
          {content.pois.slice(0, 5).map((poi, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl hover:border-primary-200 transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                <Check size={14} className="text-slate-400 group-hover:text-primary-500" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-bold text-slate-900 truncate">{poi.name}</span>
                <span className="text-[10px] text-slate-400 truncate">{poi.types?.join(', ')}</span>
              </div>
            </div>
          ))}
          {content.pois.length > 5 && (
            <p className="text-[11px] text-slate-400 text-center font-medium">+ {content.pois.length - 5} more locations</p>
          )}
        </div>
      </div>

      <button
        onClick={() => onConfirm?.()}
        className="w-full mt-8 px-6 py-4 bg-slate-900 text-white rounded-2xl text-[15px] font-bold hover:bg-black transition-all shadow-lg active:scale-[0.98]"
      >
        Continue with this Audience
      </button>
    </div>
  );

  const rightContent = (
    <div className="w-full h-full relative rounded-xl overflow-hidden shadow-[0_0_0_4px_#CCCBC0]">
      <MapContainer
        center={center}
        zoom={13}
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
        
        {/* POI Markers */}
        {content.pois.map((poi, idx) => (
          <Marker
            key={idx}
            position={[poi.lat, poi.lng]}
            icon={createPoiIcon(poi.name)}
          />
        ))}

        {/* MAID Observations (Heatmap dots) */}
        {content.maid_observations.map((obs, idx) => (
          <CircleMarker
            key={idx}
            center={[obs.lat, obs.lng]}
            radius={2}
            pathOptions={{
              fillColor: "#D62575",
              fillOpacity: 0.6,
              color: "transparent",
              weight: 0
            }}
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
