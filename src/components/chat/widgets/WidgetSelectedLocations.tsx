import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Check, Crosshair, Minus, Plus } from "lucide-react";
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
import SecondaryBtn from "../../shared/secondaryBtn";

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
                ${name} at ${address}
                <div class="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-slate-100 rotate-45"></div>
            </div>
        </div>
    `,
    className: "main-marker-icon",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

// Competitor/secondary location marker (small dot)
const competitorIcon = new L.DivIcon({
  html: `
        <div class="relative flex items-center justify-center">
            <div class="w-4 h-4 bg-[#D62575] rounded-full border-2 border-white shadow-md"></div>
        </div>
    `,
  className: "competitor-marker-icon",
  iconSize: [16, 16],
  iconAnchor: [8, 8],
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

interface Location {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  radius?: number;
}

interface WidgetSelectedLocationsProps {
  locations?: Location[];
  aiText?: React.ReactNode;
  showLogo?: boolean;
}

export default function WidgetSelectedLocations({
  locations = [
    {
      id: "1",
      name: "Shawarma Palace",
      address: "456 Elm Street.",
      lat: 47.6062,
      lng: -122.3321,
      radius: 1000,
    },
    {
      id: "2",
      name: "Shawarma King",
      address: "0.3 km away",
      lat: 47.6082,
      lng: -122.3351,
      radius: 500,
    },
    {
      id: "3",
      name: "Falafel Palace",
      address: "0.6 km away",
      lat: 47.6042,
      lng: -122.3291,
      radius: 500,
    },
    {
      id: "4",
      name: "Mediterranean Grill",
      address: "0.9 km away",
      lat: 47.6102,
      lng: -122.3301,
      radius: 500,
    },
    {
      id: "5",
      name: "Gyro Spot",
      address: "0.4 km away",
      lat: 47.6032,
      lng: -122.3341,
      radius: 500,
    },
  ],
  aiText,
  showLogo = false,
}: WidgetSelectedLocationsProps) {
  const [radius, setRadius] = useState(1);
  const mainLocation = locations[0];
  const competitorCount = locations.length - 1;

  const fillRedOptions = {
    color: "#D62575",
    fillColor: "#D62575",
    fillOpacity: 0.15,
    weight: 1.5,
  };

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
              {mainLocation?.name || "Location"}
            </h3>
            <p className="text-[14px] text-slate-400 font-medium">
              {mainLocation?.address || "Address"}
            </p>
          </div>
        </div>
      </div>

      {/* Checklist items */}
      <div className="space-y-5 flex-1">
        <div className="flex items-center gap-3">
          <Check
            size={18}
            className="text-slate-900 shrink-0"
            strokeWidth={3}
          />
          <span className="text-[15px] font-bold text-slate-900">
            Location Confirmed
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Check
            size={18}
            className="text-slate-900 shrink-0"
            strokeWidth={3}
          />
          <span className="text-[15px] font-bold text-slate-900">
            1km Radius set
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Check
            size={18}
            className="text-slate-900 shrink-0"
            strokeWidth={3}
          />
          <span className="text-[15px] font-bold text-slate-900">
            All {competitorCount} competitor locations selected
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Check
            size={18}
            className="text-slate-900 shrink-0"
            strokeWidth={3}
          />
          <span className="text-[15px] font-bold text-slate-900">
            Individual Radius Selected to 500 meter
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Check
            size={18}
            className="text-slate-900 shrink-0"
            strokeWidth={3}
          />
          <span className="text-[15px] font-bold text-slate-900">
            Lookback window is 30 days
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Check
            size={18}
            className="text-slate-900 shrink-0"
            strokeWidth={3}
          />
          <span className="text-[15px] font-bold text-slate-900">
            Demographics applied to 15-50
          </span>
        </div>
      </div>

      {/* CTA Button */}
      <button className="w-full mt-8 px-6 py-4 bg-slate-900 text-white rounded-2xl text-[15px] font-bold hover:bg-black transition-all shadow-lg active:scale-[0.98]">
        Run Target People mode on Meta...
      </button>
    </div>
  );

  const rightContent = (
    <div className="w-full h-[80vh] relative min-h-125 rounded-xl overflow-hidden shadow-[0_0_0_4px_#CCCBC0]">
      <MapContainer
        center={[mainLocation.lat, mainLocation.lng]}
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

        {/* Main location marker with label */}
        {mainLocation && (
          <Marker
            position={[mainLocation.lat, mainLocation.lng]}
            icon={createMainIcon(mainLocation.name, mainLocation.address)}
          />
        )}

        {/* Competitor locations */}
        {locations.slice(1).map((loc) => (
          <React.Fragment key={loc.id}>
            <Marker position={[loc.lat, loc.lng]} icon={competitorIcon} />
            <Circle
              center={[loc.lat, loc.lng]}
              pathOptions={fillRedOptions}
              radius={200}
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
        .leaflet-control-attribution {
          display: none;
        }
      `}</style>

      {/* Map Radius Controls - Moved to left side */}
      <div className="absolute bottom-6 left-6 z-1000 flex items-center gap-2 rounded-xl">
        <SecondaryBtn
          className="bg-white"
          onClick={() => setRadius((prev) => Math.max(1, prev - 1))}
        >
          <Minus size={18} />
        </SecondaryBtn>
        <div className="px-3 h-10 flex items-center shadow-[inset_0_-3px_2px_rgba(0,0,0,0.07)] bg-white rounded-md justify-center text-[14px] font-bold text-slate-900 min-w-20">
          {Math.round(radius)} km
        </div>
        <SecondaryBtn
          className="bg-white"
          onClick={() => setRadius((prev) => Math.min(20, prev + 1))}
        >
          <Plus size={18} />
        </SecondaryBtn>
      </div>
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
