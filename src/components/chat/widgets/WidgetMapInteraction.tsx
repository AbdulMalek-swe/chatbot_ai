import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Check, MapPin, Pencil, X } from 'lucide-react';
import React, { useState } from 'react';
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
  ZoomControl,
} from 'react-leaflet';
import type { PendingActionBlock } from '../../../types/chat';

// Custom Marker to match the dashboard style
const customIcon = new L.DivIcon({
  html: `
        <div class="relative flex items-center justify-center">
            <div class="absolute w-12 h-12 bg-primary-500/20 rounded-full animate-ping"></div>
            <div class="relative w-5 h-5 bg-primary-600 border-2 border-white rounded-full shadow-2xl"></div>
        </div>
    `,
  className: 'custom-marker-icon',
  iconSize: [48, 48],
  iconAnchor: [24, 24],
});

// Helper component to center map
function MapCenter({ center }: { center: [number, number] }) {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);
  return null;
}

function MapEvents({ onLocationSelect }: { onLocationSelect: (latlng: L.LatLng) => void }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });
  return null;
}

export default function WidgetMapInteraction({ 
  content, 
  onConfirm 
}: { 
  content: PendingActionBlock['content'], 
  onConfirm?: (val: string) => void 
}) {
  const initialCenter: [number, number] = [0, 0]; // Default
  const [markerPos, setMarkerPos] = useState<[number, number] | null>(null);

  const handleConfirm = () => {
    if (markerPos) {
      onConfirm?.(JSON.stringify({ lat: markerPos[0], lng: markerPos[1] }));
    }
  };

  return (
    <div className="w-full max-w-[630px] bg-[#DAD9CD]/10 rounded-xl overflow-hidden border border-slate-200 shadow-2xl animate-fade-up">
      {/* Header / Address Card */}
      <div className="p-6 bg-white flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
            <MapPin size={22} className="text-primary-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5 whitespace-nowrap">
              Action Required
            </h4>
            <p className="text-[15px] font-bold text-slate-900 truncate">
              {content.prompt || 'Pin your target location'}
            </p>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="h-[350px] w-full relative z-10 bg-slate-50 overflow-hidden">
        <MapContainer
          center={initialCenter}
          zoom={2}
          scrollWheelZoom={true}
          zoomControl={false}
          className="h-full w-full grayscale-[0.2] contrast-[0.9]"
        >
          <TileLayer
            url="https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=eTv72QZ1tQRMGSvSdUtUadKcClkD6xYlPVSy85fiE88lfHT8NC1JngM8jchQ3f7W"
            attribution='&copy; JawgMaps'
          />
          <ZoomControl position="bottomright" />
          <MapEvents onLocationSelect={(latlng) => setMarkerPos([latlng.lat, latlng.lng])} />
          {markerPos && <Marker position={markerPos} icon={customIcon} />}
        </MapContainer>

        {/* Floating Map Label */}
        <div className="absolute top-4 left-4 z-1000 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 text-[10px] font-black text-slate-800 shadow-xl uppercase tracking-widest">
          Interactive Selection Mode
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 bg-[#F7F7F7] flex items-center justify-between gap-4">
        <p className="text-[13px] text-slate-500 font-medium italic">
          {markerPos ? `Location selected: ${markerPos[0].toFixed(4)}, ${markerPos[1].toFixed(4)}` : 'Click on the map to pin a location'}
        </p>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleConfirm}
            disabled={!markerPos || !onConfirm}
            className={`flex items-center gap-2 px-8 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-[13px] hover:bg-black transition-all active:scale-95 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)] ${(!onConfirm || !markerPos) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Check size={16} className="text-primary-400" />
            Confirm Pin
          </button>
        </div>
      </div>

      <style>{`
                .leaflet-container {
                    background: #fdfdfb !important;
                }
                .leaflet-control-attribution {
                    display: none;
                }
            `}</style>
    </div>
  );
}
