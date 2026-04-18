import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Check, Minus, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { Circle, MapContainer, Marker, TileLayer } from 'react-leaflet';
import WidgetLayout from './WidgetLayout';

const competitorIcon = new L.DivIcon({
  html: `
        <div class="relative flex items-center justify-center">
            <div class="w-3 h-3 bg-slate-400 rounded-full border-2 border-white shadow-sm"></div>
        </div>
    `,
  className: 'competitor-marker-icon',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

const mainIcon = new L.DivIcon({
  html: `
        <div class="relative flex items-center justify-center">
            <div class="absolute w-12 h-12 bg-[#D62575]/20 rounded-full animate-ping"></div>
            <div class="w-8 h-8 bg-[#D62575] rounded-full flex items-center justify-center border-2 border-white shadow-lg relative z-10">
                <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div class="absolute top-[-44px] whitespace-nowrap bg-white px-3 py-2 rounded-xl shadow-xl border border-slate-100 text-[13px] font-bold text-slate-800 z-20">
                Shawarma Palace at 456 Elm Street.
                <div class="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-slate-100 rotate-45"></div>
            </div>
        </div>
    `,
  className: 'main-marker-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});


interface Competitor {
  id: string;
  type: string;
  content: string;
  lat: number;
  lng: number;
}

interface WidgetCompetitorSelectionProps {
  points?: any[];
  title?: string;
  suggestions?: string[];
  aiText?: React.ReactNode;
  showLogo?: boolean;
  children?: React.ReactNode;
}

export default function WidgetCompetitorSelection({
  points = [],
  title = 'Competitors in 1km Radius',
  suggestions = ['Local Shop', 'Regional Chain', 'Dine-in', 'Takeaway'],
  aiText,
  showLogo = false,
  children,
}: WidgetCompetitorSelectionProps) {
  const center: [number, number] = [47.6062, -122.3321];
  const [radius, setRadius] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Default competitors if points are empty for demo
  const defaultCompetitors: Competitor[] = [
    {
      id: '1',
      type: 'Shawarma King',
      content: '0.3 km away (Seattle Downtown)',
      lat: center[0] + 0.002,
      lng: center[1] - 0.003,
    },
    {
      id: '2',
      type: 'Falafel Palace',
      content: '0.6 km away (Seattle Downtown)',
      lat: center[0] - 0.002,
      lng: center[1] + 0.003,
    },
    {
      id: '3',
      type: 'Mediterranean Grill',
      content: '0.9 km away (Seattle Downtown)',
      lat: center[0] + 0.004,
      lng: center[1] + 0.002,
    },
    {
      id: '4',
      type: 'Gyro Spot',
      content: '0.4 km away (Seattle Downtown)',
      lat: center[0] - 0.004,
      lng: center[1] - 0.002,
    },
  ];

  const [selectedCompetitors, setSelectedCompetitors] = useState<Competitor[]>(
    points.length > 0
      ? points.map((p) => ({
          ...p,
          lat: p.lat || center[0] + (Math.random() - 0.5) * 0.01,
          lng: p.lng || center[1] + (Math.random() - 0.5) * 0.01,
        }))
      : defaultCompetitors,
  );

  const handleRemove = (id: string) => {
    setSelectedCompetitors((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAdd = (val: string) => {
    if (!val.trim()) return;
    const newComp: Competitor = {
      id: Date.now().toString(),
      type: val,
      content: `${(Math.random() * 1.5 + 0.1).toFixed(1)} km away`,
      lat: center[0] + (Math.random() - 0.5) * 0.02,
      lng: center[1] + (Math.random() - 0.5) * 0.02,
    };
    setSelectedCompetitors((prev) => [...prev, newComp]);
    setSearchValue('');
    setShowSuggestions(false);
  };

  const filteredSuggestions = suggestions.filter((s) =>
    s.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const leftContent = (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
            <Search size={20} className="text-slate-400" />
          </div>
          <div>
            <h3 className="text-[20px] font-bold text-slate-900 leading-tight">
              Shawarma Palace
            </h3>
            <p className="text-[14px] text-slate-400 font-medium">
              456 Elm Street.
            </p>
          </div>
        </div>
      </div>

      {/* Status items */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3 text-slate-900 font-bold text-[15px]">
          <Check size={18} className="text-slate-900" strokeWidth={3} />
          Location Confirmed
        </div>
        <div className="flex items-center gap-3 text-slate-900 font-bold text-[15px]">
          <Check size={18} className="text-slate-900" strokeWidth={3} />1 km
          Radius set
        </div>
      </div>

      <div className="w-full border-t border-dashed border-slate-200 my-8" />

      {/* Competitors Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-5 h-5 rounded-full border-2 border-slate-400 border-t-transparent animate-spin" />
          <span className="text-[16px] font-bold text-slate-900">{title}</span>
        </div>

        <div className="space-y-4 mb-8">
          {selectedCompetitors.map((competitor) => (
            <div
              key={competitor.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                <span className="text-[15px] text-slate-700 font-bold">
                  {competitor.type}{' '}
                  <span className="text-slate-400 font-medium ml-1">
                    ({competitor.content.split(' ')[0]}{' '}
                    {competitor.content.split(' ')[1]})
                  </span>
                </span>
              </div>
              <button
                onClick={() => handleRemove(competitor.id)}
                className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-black transition-all active:scale-95"
              >
                <Minus size={14} strokeWidth={3} />
              </button>
            </div>
          ))}
        </div>

        {/* Add Competitor with Autocomplete */}
        <div className="relative">
          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-2 pl-5 shadow-sm focus-within:border-slate-400 transition-colors">
            <Search size={20} className="text-slate-300" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Add Competitor"
              className="flex-1 bg-transparent border-none outline-none text-[15px] text-slate-800 font-medium placeholder:text-slate-300"
              onKeyDown={(e) => e.key === 'Enter' && handleAdd(searchValue)}
            />
            <button
              onClick={() => handleAdd(searchValue)}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[14px] font-bold hover:bg-black transition-all shadow-md active:scale-95"
            >
              Add
            </button>
          </div>

          {/* Autocomplete Dropdown */}
          {showSuggestions && searchValue && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-2000 animate-in fade-in slide-in-from-top-2 duration-200">
              {filteredSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAdd(suggestion)}
                  className="w-full px-6 py-4 text-left text-[15px] font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors border-b border-slate-50 last:border-0"
                >
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const rightContent = (
    <div className="w-full h-full relative min-h-[500px]">
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={false}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={center} icon={mainIcon} />

        <Circle
          center={center}
          radius={radius * 1000}
          pathOptions={{
            color: '#D62575',
            fillColor: '#D62575',
            fillOpacity: 0.1,
            weight: 1,
            dashArray: '5, 5',
          }}
        />
        <Circle
          center={center}
          radius={radius * 1000}
          pathOptions={{
            stroke: false,
            fillColor: '#D62575',
            fillOpacity: 0.05,
          }}
        />
        <Circle
          center={center}
          radius={radius * 950}
          pathOptions={{
            stroke: false,
            fillColor: '#D62575',
            fillOpacity: 0.03,
          }}
        />

        {selectedCompetitors.map((c) => (
          <Marker key={c.id} position={[c.lat, c.lng]} icon={competitorIcon} />
        ))}
      </MapContainer>

      <style>{`
        .leaflet-tile {
          filter: grayscale(60%) brightness(108%) contrast(92%) saturate(80%) hue-rotate(170deg);
        }
      `}</style>

      {/* Map Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-1000 flex items-center gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-xl shadow-2xl border border-white/20">
        <button
          onClick={() => setRadius((prev) => Math.max(1, prev - 1))}
          className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all active:scale-90"
        >
          <Minus size={18} />
        </button>
        <div className="px-6 h-10 flex items-center justify-center text-[14px] font-bold text-slate-900 min-w-20">
          {Math.round(radius)} km
        </div>
        <button
          onClick={() => setRadius((prev) => Math.min(20, prev + 1))}
          className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all active:scale-90"
        >
          <Plus size={18} />
        </button>
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

  return (
    <WidgetLayout
      mode="split"
      leftContent={leftContent}
      rightContent={rightContent}
      aiText={aiText}
      showLogo={showLogo}
    >
      {children}
    </WidgetLayout>
  );
}
