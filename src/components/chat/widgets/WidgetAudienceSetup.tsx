import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Check, Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Circle, MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import WidgetLayout from './WidgetLayout';

// Custom Marker for competitors - Small pink dots as seen in the design
const competitorIcon = new L.DivIcon({
  html: `
        <div class="relative flex items-center justify-center">
            <div class="w-2.5 h-2.5 bg-[#E91E63] rounded-full border border-white shadow-sm"></div>
        </div>
    `,
  className: 'competitor-marker-icon',
  iconSize: [10, 10],
  iconAnchor: [5, 5],
});

// Main shop icon (pink) to match the Frame exactly
const mainIcon = new L.DivIcon({
  html: `
        <div class="relative flex items-center justify-center">
            <div class="w-6 h-6 bg-[#E91E63] rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
            <div class="absolute top-[-38px] whitespace-nowrap bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-100 text-[11px] font-bold text-slate-800">
                Shawarma Palace at 456 Elm Street.
                <div class="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-slate-100 rotate-45"></div>
            </div>
        </div>
    `,
  className: 'main-marker-icon',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

function MapBoundsUpdater({
  center,
  radius,
}: {
  center: [number, number];
  radius: number;
}) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    try {
      const circle = L.circle(center, { radius: radius });
      const timeoutId = setTimeout(() => {
        if (!map) return;
        try {
          map.invalidateSize();
          const bounds = circle.getBounds();
          if (bounds.isValid()) {
            map.fitBounds(bounds, { padding: [100, 100], maxZoom: 15 });
          }
        } catch (e) {
          console.warn('fitBounds failed', e);
        }
      }, 200);
      return () => clearTimeout(timeoutId);
    } catch (e) {
      console.warn('MapBoundsUpdater error', e);
    }
  }, [center, radius, map]);
  return null;
}

export default function WidgetAudienceSetup() {
  const center: [number, number] = [47.6062, -122.3321];
  const [radius, setRadius] = useState(500);

  const competitors = [
    { id: '1', lat: center[0] + 0.003, lng: center[1] - 0.004 },
    { id: '2', lat: center[0] - 0.003, lng: center[1] + 0.003 },
    { id: '3', lat: center[0] + 0.004, lng: center[1] + 0.002 },
    { id: '4', lat: center[0] - 0.004, lng: center[1] - 0.002 },
    { id: '5', lat: center[0] + 0.001, lng: center[1] + 0.005 },
  ];

  const checklist = [
    { label: 'Location Confirmed', completed: true },
    { label: '1km Radius set', completed: true },
    { label: 'All 4 competitor locations selected', completed: true },
    { label: 'Individual Radius Selected to 500 meter', completed: true },
    { label: 'Lookback window is 30 days', completed: true },
    { label: 'Demographics', completed: false, loading: true },
  ];

  const leftContent = (
    <div className="bg-white flex flex-col p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm">
            <div className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-slate-300">
              <div className="w-1 h-1 bg-slate-400 rounded-full" />
            </div>
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-slate-900 leading-tight">
              Shawarma Palace
            </h3>
            <p className="text-[13px] text-slate-400 font-medium">
              456 Elm Street.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-slate-100 mb-6" />

      {/* Checklist */}
      <div className="space-y-4 mb-6">
        {checklist.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            {item.completed ? (
              <div className="shrink-0">
                <Check size={16} className="text-slate-900" strokeWidth={3} />
              </div>
            ) : item.loading ? (
              <div className="shrink-0 w-4 h-4 rounded-full border-2 border-slate-900 border-t-transparent animate-spin" />
            ) : (
              <div className="shrink-0 w-4 h-4 rounded-full border-2 border-slate-200" />
            )}
            <span
              className={`text-[15px] font-bold ${item.completed ? 'text-slate-900' : 'text-slate-900'}`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full border-t border-dashed border-slate-200 mb-6" />

      {/* Prompt Text */}
      <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
        Before I build the audience, any specific demographics you want to focus
        on? (I recommend 18–45 for food lovers, but you can narrow it.)
      </p>
    </div>
  );

  const rightContent = (
    <div className="w-full h-full relative min-h-100">
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={false}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          url="https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=eTv72QZ1tQRMGSvSdUtUadKcClkD6xYlPVSy85fiE88lfHT8NC1JngM8jchQ3f7W"
          attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapBoundsUpdater center={center} radius={radius} />

        {/* Main Marker with Circle Labels */}
        <Marker position={center} icon={mainIcon} />

        {/* Main Radius */}
        <Circle
          center={center}
          radius={radius}
          pathOptions={{
            color: '#e91e63',
            fillColor: '#e91e63',
            fillOpacity: 0.1,
            weight: 1,
          }}
        />

        {/* Competitor Markers and Their Radii */}
        {competitors.map((c) => (
          <div key={c.id}>
            <Marker position={[c.lat, c.lng]} icon={competitorIcon} />
            <Circle
              center={[c.lat, c.lng]}
              radius={radius * 0.6} // Slightly smaller for visual variety or as seen in image
              pathOptions={{
                color: '#e91e63',
                fillColor: '#e91e63',
                fillOpacity: 0.1,
                weight: 1,
              }}
            />
          </div>
        ))}
      </MapContainer>

      {/* Bottom Center Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-1000 flex items-center bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-slate-200 overflow-hidden">
        <button
          onClick={() => setRadius((prev) => Math.max(100, prev - 100))}
          className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors"
        >
          <Minus size={20} />
        </button>
        <div className="px-6 min-w-25 text-center text-[15px] font-bold text-slate-800 border-x border-slate-100">
          {radius}m
        </div>
        <button
          onClick={() => setRadius((prev) => Math.min(5000, prev + 100))}
          className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Zoom Controls (Bottom Right) */}
      <div className="absolute bottom-6 right-6 z-1000 flex flex-col bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 border-b border-slate-100">
          <Plus size={18} />
        </button>
        <button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50">
          <Minus size={18} />
        </button>
      </div>

      <style>{`
                .leaflet-container {
                    background: #fdfdfb !important;
                }
                .leaflet-control-attribution {
                    display: none !important;
                }
                .main-marker-icon, .competitor-marker-icon {
                    background: transparent !important;
                    border: none !important;
                }
            `}</style>
    </div>
  );

  return (
    <WidgetLayout
      mode="split"
      leftContent={leftContent}
      rightContent={rightContent}
    />
  );
}
