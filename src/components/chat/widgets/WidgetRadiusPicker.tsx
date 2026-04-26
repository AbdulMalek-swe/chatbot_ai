import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Edit } from 'lucide-react';
import React, { useState } from 'react';
import { Circle, MapContainer, Marker, TileLayer, useMap, ZoomControl } from 'react-leaflet';
import Upload from '../../shared/Upload';
import WidgetLayout from './WidgetLayout';
import type { RadiusPickerData } from '../../../types/chat';

// Custom Marker to match the screenshot style
const createCustomIcon = (name: string, address?: string) => new L.DivIcon({
  html: `
        <div class="relative flex items-center justify-center">
            <img src="/indicator.svg" class="w-8 h-8 relative z-10" alt="Marker" />
            <div class="absolute -top-10 whitespace-nowrap bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md border border-slate-200 text-[12px] font-bold text-slate-800">
                ${name} ${address ? 'at ' + address : ''}
                <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/90 border-r border-b border-slate-200 rotate-45"></div>
            </div>
        </div>
    `,
  className: 'custom-marker-icon',
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
          map.invalidateSize();
          const bounds = circle.getBounds();
          if (bounds.isValid()) {
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
          }
        } catch (e) {
          console.warn('fitBounds failed', e);
        }
      }, 200);
      return () => clearTimeout(timeoutId);
    } catch (e) {
      console.warn('MapRadiusUpdater error', e);
    }
  }, [center, radius, map]);
  return null;
}

interface WidgetRadiusPickerProps {
  content: RadiusPickerData;
  onConfirm?: (radius: number) => void;
  aiText?: React.ReactNode;
  showLogo?: boolean;
  children?: React.ReactNode;
}

export default function WidgetRadiusPicker({
  content,
  onConfirm,
  aiText,
  showLogo = false,
  children,
}: WidgetRadiusPickerProps) {
  const [radius, setRadius] = useState(content.default_radius_km || content.default_radius_miles || 1);
  const center: [number, number] = [content.center.lat, content.center.lng];

  const leftContent = (
    <div className="p-6 h-full flex flex-col bg-white">
      <div className="flex flex-col gap-4">
        {content.locations?.map((loc, idx) => (
          <Upload
            key={idx}
            imgSrc="/locationIcon.png"
            title={loc.location_name || loc.name || "Location"}
            text={loc.formatted_address || `${radius} km zone`}
            className=""
          />
        ))}

        <div className="flex flex-col gap-4 bg-[#F7F7F7] rounded-xl pt-3 pb-6 px-2 w-100">
           <div className="px-3 py-2 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900">Adjust Radius</span>
              <button className="text-[12px] text-slate-500 hover:text-slate-900 font-medium flex items-center gap-1">
                <Edit size={14} /> Edit
              </button>
           </div>

          <div className="px-3 flex gap-2 items-end justify-start">
            <h3 className="text-4xl font-semibold text-[#151515] font-inter">
              {Math.round(radius * 8400)} 
            </h3>
            <p className="text-sm font-semibold text-[#6C6C6C] pb-1">
              Potential customers
            </p>
          </div>
          
          <div className="px-3 mt-2">
            <input 
              type="range" 
              min="1" 
              max="50" 
              value={radius} 
              onChange={(e) => setRadius(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between mt-1 text-[10px] text-slate-400 font-bold">
              <span>1 KM</span>
              <span>{radius} KM</span>
              <span>50 KM</span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => onConfirm?.(radius)}
          className="w-full mt-4 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all active:scale-95 shadow-lg"
        >
          Confirm Radius
        </button>
      </div>
    </div>
  );

  const rightContent = (
    <div className="w-full h-full relative min-h-125 rounded-xl">
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
        <Marker position={center} icon={createCustomIcon("Center", "")} />
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
      </MapContainer>

      <style>{`
        .leaflet-tile {
          filter: grayscale(60%) brightness(108%) contrast(92%) saturate(80%) hue-rotate(170deg);
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
