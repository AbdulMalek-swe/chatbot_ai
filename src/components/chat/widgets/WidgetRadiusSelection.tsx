import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Check, Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import {
  Circle,
  CircleMarker,
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  ZoomControl,
} from "react-leaflet";
import PrimaryBtn from "../../shared/PrimaryBtn";
import WidgetLayout from "./WidgetLayout";
import SecondaryBtn from "../../shared/secondaryBtn";

// Custom Marker to match the screenshot style
const customIcon = new L.DivIcon({
  html: `
        <div class="relative flex items-center justify-center">
            <img src="/indicator.svg" class="w-8 h-8 relative z-10" alt="Marker" />
            <div class="absolute -top-10 whitespace-nowrap bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md border border-slate-200 text-[12px] font-bold text-slate-800">
                Shawarma Palace at 456 Elm Street.
                <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/90 border-r border-b border-slate-100 rotate-45"></div>
            </div>
        </div>
    `,
  className: "custom-marker-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

function MapRadiusUpdater({
  center,
  radius,
}: {
  center: [number, number];
  radius: number;
}) {
  const map = useMap();
  React.useEffect(() => {
    if (!map) return;
    try {
      const circle = L.circle(center, { radius: radius * 1000 });
      const timeoutId = setTimeout(() => {
        if (!map) return;
        try {
          // Ensure map has a valid size and is ready
          map.invalidateSize();
          const bounds = circle.getBounds();
          if (bounds.isValid()) {
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
          }
        } catch (e) {
          console.warn("fitBounds failed", e);
        }
      }, 200);
      return () => clearTimeout(timeoutId);
    } catch (e) {
      console.warn("MapRadiusUpdater error", e);
    }
  }, [center, radius, map]);
  return null;
}

interface WidgetRadiusSelectionProps {
  address?: string;
  onConfirm?: (radius: number) => void;
  initialRadius?: number;
  aiText?: React.ReactNode;
  showLogo?: boolean;
  children?: React.ReactNode;
}

export default function WidgetRadiusSelection({
  onConfirm,
  initialRadius = 1,
  aiText,
  showLogo = false,
  children,
}: WidgetRadiusSelectionProps) {
  const [radius, setRadius] = useState(initialRadius);
  const center: [number, number] = [47.6062, -122.3321];

  const fillRedOptions = {
    color: "#D62575",
    fillColor: "#D6257530",
    fillOpacity: 0.3,
    weight: 2,
  };

  const leftContent = (
    <div className="p-6 h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center justify-between my-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full border">
              <img src="/locationIcon.png" alt="Location" />
            </div>
            <div>
              <p className="text-[#151515] font-inter font-semibold text-md">
                Campaign Direction
              </p>
              <p className="text-sm text-[#62646A]">456 Elm Street.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 text-[#111] font-semibold text-[14px]">
        <Check size={18} className="text-slate-900" strokeWidth={3} />
        Location Confirmed
      </div>

      <div className="w-full border-t border-dashed border-slate-200 my-4" />

      {/* Radius Section */}
      <div className="mt-4 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-5 h-5 rounded-full border-2 border-slate-900 border-t-transparent animate-spin" />
          <span className="text-[14px] font-semibold text-slate-900">
            Radius Selection
          </span>
        </div>
        <p className="text-[15px] text-slate-600 leading-[1.6] font-medium mb-8">
          Great. How far away from your shop do you want to reach? I recommend a
          1 km radius so we can pick up the competitor stores in that zone and
          still stay local. You can always choose something different like 2 km
          if you want wider reach.
        </p>

        {/* Controls */}
        <div className="flex items-center justify-between mt-auto pb-4">
          <div className="flex items-center gap-2">
            <SecondaryBtn
              onClick={() => setRadius((prev) => Math.max(0.1, prev - 1))}
            >
              <Minus size={18} />
            </SecondaryBtn>
            <div className="min-w-17.5 h-10 flex shadow-[inset_0_-3px_2px_rgba(0,0,0,0.07)] items-center justify-center bg-white border border-slate-200 rounded-xl px-4 text-[14px] font-bold text-slate-900">
              {Math.round(radius)} km
            </div>

            <SecondaryBtn
              onClick={() => setRadius((prev) => Math.min(20, prev + 1))}
            >
              <Plus size={18} />
            </SecondaryBtn>
          </div>

          <div className="flex items-center gap-3">
            <SecondaryBtn>No</SecondaryBtn>

            <PrimaryBtn className="px-6!" onClick={() => onConfirm?.(radius)}>
              Yes
            </PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );

  const rightContent = (
    <div className="w-full h-[80vh] relative min-h-125 rounded-xl overflow-hidden shadow-[0_0_0_4px_#CCCBC0]">
      <MapContainer
        center={center}
        zoom={14}
        scrollWheelZoom={false}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          url="https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=eTv72QZ1tQRMGSvSdUtUadKcClkD6xYlPVSy85fiE88lfHT8NC1JngM8jchQ3f7W"
          attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ZoomControl position="bottomright" />
        <MapRadiusUpdater center={center} radius={radius} />
        <Marker position={center} icon={customIcon} />
        <Circle
          center={center}
          pathOptions={fillRedOptions}
          radius={radius * 1000}
        />

        <CircleMarker
          center={[51.51, -0.12]}
          pathOptions={fillRedOptions}
          radius={20}
        ></CircleMarker>
      </MapContainer>

      <style>{`
        .leaflet-tile {
          filter: grayscale(60%) brightness(108%) contrast(92%) saturate(80%) hue-rotate(170deg);
        }
      `}</style>

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
    >
      {children}
    </WidgetLayout>
  );
}
