import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Check, Minus, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { Circle, MapContainer, Marker, TileLayer, useMap, ZoomControl } from 'react-leaflet';
import PrimaryBtn from '../../shared/PrimaryBtn';
import WidgetLayout from './WidgetLayout';
import SecondaryBtn from '../../shared/secondaryBtn';

const mainIcon = new L.DivIcon({
  html: `
         <div class="relative flex items-center justify-center">
            <div class="absolute w-12 h-12 bg-[#D62575]/20 rounded-full animate-ping"></div>
            <img src="/indicator.svg" class="w-8 h-8 relative z-10" alt="Main Marker" />
            <div class="absolute -top-11 whitespace-nowrap bg-white px-3 py-2 rounded-xl shadow-xl border border-slate-100 text-[13px] font-bold text-slate-800 z-20">
                Shawarma Palace at 456 Elm Street.
                <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-slate-100 rotate-45"></div>
            </div>
        </div>
    `,
  className: 'main-marker-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

function HeatmapCircles({ center }: { center: [number, number] }) {
  const map = useMap();
  const layersRef = React.useRef<any[]>([]);
  const initializedRef = React.useRef(false);

  React.useEffect(() => {
    if (!map || initializedRef.current) return;
    initializedRef.current = true;

    function addHeatLayers() {
      // Clean up any existing layers first
      layersRef.current.forEach((layer) => {
        try {
          map.removeLayer(layer);
        } catch (_) {
          /* ignore */
        }
      });
      layersRef.current = [];

      const heatmapCenters = [
        { lat: center[0] + 0.003, lng: center[1] - 0.003 },
        { lat: center[0] - 0.003, lng: center[1] + 0.003 },
        { lat: center[0] + 0.003, lng: center[1] + 0.003 },
        { lat: center[0] - 0.003, lng: center[1] - 0.003 },
      ];

      heatmapCenters.forEach((heatCenter) => {
        const heatmapPoints = Array.from({ length: 15 }, () => [
          heatCenter.lat + (Math.random() - 0.5) * 0.004,
          heatCenter.lng + (Math.random() - 0.5) * 0.004,
          Math.random() * 0.9 + 0.3,
        ]) as any[];

        const heat = (L as any).heatLayer(heatmapPoints, {
          radius: 22,
          blur: 15,
          maxZoom: 17,
          gradient: {
            0.1: '#313695',
            0.2: '#4575b4',
            0.3: '#74add1',
            0.4: '#abd9e9',
            0.5: '#fee090',
            0.6: '#fdae61',
            0.7: '#f46d43',
            0.8: '#d73027',
            1.0: '#a50026',
          },
        });

        heat.addTo(map);
        layersRef.current.push(heat);
      });
    }

    if (!(L as any).heatLayer) {
      // Check if script is already being loaded
      const existingScript = document.querySelector(
        'script[src*="leaflet-heat"]',
      );
      if (existingScript) {
        existingScript.addEventListener('load', addHeatLayers);
      } else {
        const script = document.createElement('script');
        script.src =
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet.heat/0.2.0/leaflet-heat.js';
        script.async = true;
        script.onload = addHeatLayers;
        document.head.appendChild(script);
      }
    } else {
      addHeatLayers();
    }

    return () => {
      layersRef.current.forEach((layer) => {
        try {
          map.removeLayer(layer);
        } catch (_) {
          /* ignore */
        }
      });
      layersRef.current = [];
      initializedRef.current = false;
    };
  }, [map, center]);

  return null;
}

function MapBoundsUpdater({
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
      // Create a bounding box that is roughly 2x the radius to show more area
      const bounds = L.latLng(center).toBounds(radius * 2000); // radius is in km, toBounds takes meters
      map.fitBounds(bounds, { animate: true, padding: [20, 20] });
    } catch (e) {
      console.warn('MapBoundsUpdater error', e);
    }
  }, [center, radius, map]);
  return null;
}

interface WidgetRadiusHeatmapProps {
  onConfirm?: (radius: number) => void;
  initialRadius?: number;
  aiText?: React.ReactNode;
  showLogo?: boolean;
  children?: React.ReactNode;
}

export default function WidgetRadiusHeatmap({
  onConfirm,
  initialRadius = 1,
  aiText,
  showLogo = false,
  children,
}: WidgetRadiusHeatmapProps) {
  const [radius, setRadius] = useState(initialRadius);
  const center: [number, number] = [47.6062, -122.3321];

  const fillRedOptions = {
    color: '#D62575',
    fillColor: '#D6257530',
    fillOpacity: 0.4,
    weight: 2,
  };

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
          <Check size={18} className="text-slate-900" strokeWidth={3} />
          Targeting Area Identified
        </div>
      </div>

      <div className="w-full border-t border-dashed border-slate-200 my-8" />

      {/* Radius Section */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-5 h-5 rounded-full border-2 border-slate-900 border-t-transparent animate-spin" />
          <span className="text-[16px] font-bold text-slate-900">
            Radius Selection
          </span>
        </div>

        <p className="text-[15px] text-slate-600 leading-relaxed font-medium mb-8">
          Select the radius around your shop to identify potential customers.
          The heat zones indicate areas with high visitor density from your
          competitors.
        </p>

        {/* Controls */}
        <div className="flex items-center justify-between mt-auto pb-4">
          <div className="flex items-center gap-2">
            <SecondaryBtn
              onClick={() => setRadius((prev) => Math.max(1, prev - 1))}
            >
              <Minus size={18} />
            </SecondaryBtn>
            <div className="min-w-20 h-12 shadow-[inset_0_-3px_2px_rgba(0,0,0,0.07)] flex items-center justify-center bg-white border border-slate-200 rounded-xl px-4 text-[16px] font-bold text-slate-900">
              {Math.round(radius)} km
            </div>
            <SecondaryBtn
              onClick={() => setRadius((prev) => Math.min(20, prev + 1))}
            >
              <Plus size={18} />
            </SecondaryBtn>
          </div>

          <div className="flex items-center gap-3">
            <PrimaryBtn className="px-8!" onClick={() => onConfirm?.(radius)}>
              Confirm Radius
            </PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );

  const rightContent = (
    <div className="w-full h-full relative min-h-125 rounded-xl overflow-hidden shadow-[0_0_0_4px_#CCCBC0]">
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
        <ZoomControl position="bottomright" />
        <MapBoundsUpdater center={center} radius={radius} />
        <HeatmapCircles center={center} />
        <Marker position={center} icon={mainIcon} />

        <Circle
          center={center}
          pathOptions={fillRedOptions}
          radius={radius * 1000}
        />
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
    >
      {children}
    </WidgetLayout>
  );
}
