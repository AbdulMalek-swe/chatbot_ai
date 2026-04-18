import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Edit } from 'lucide-react';
import React, { useState } from 'react';
import { Circle, MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import Upload from '../../shared/Upload';
import WidgetLayout from './WidgetLayout';

// Custom Marker to match the screenshot style
const customIcon = new L.DivIcon({
  html: `
        <div class="relative flex items-center justify-center">
            <div class="w-8 h-8 bg-[#D62575] rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div class="absolute -top-10 whitespace-nowrap bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md border border-slate-200 text-[12px] font-bold text-slate-800">
                Shawarma Palace at 456 Elm Street.
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
          // Ensure map has a valid size and is ready
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

interface WidgetPotentialCustomerProps {
  address?: string;
  onConfirm?: (radius: number) => void;
  initialRadius?: number;
  aiText?: React.ReactNode;
  showLogo?: boolean;
  children?: React.ReactNode;
}

export default function WidgetPotentialCustomer({
  onConfirm,
  initialRadius = 1,
  aiText,
  showLogo = false,
  children,
}: WidgetPotentialCustomerProps) {
  const [radius, setRadius] = useState(initialRadius);
  const center: [number, number] = [47.6062, -122.3321];

  const leftContent = (
    <div className="p-6 h-full flex flex-col bg-white">
      <div className="flex flex-col gap-4">
        <Upload
          imgSrc="/locationIcon.png"
          title="Shawarma Palace"
          text="456 Elm Street. (1 km zone)"
          className=""
        />

        <div className="flex flex-col gap-4 bg-[#F7F7F7] rounded-xl pt-3 pb-6 px-2 w-100">
          <Upload
            imgSrc="/locationIcon.png"
            title="Shawarma Palace"
            text="456 Elm Street. (1 km zone)"
            btnLabel="Edit"
            btnOnClick={() => console.log('clicked')}
            btnLeftSection={<Edit size={16} />}
            btnClassName="text-[12px] text-[#151515]! bg-white font-medium"
          />

          <div className="px-3 flex gap-2 items-end justify-start">
            <h3 className="text-4xl font-semibold text-[#151515] font-inter">
              8,400
            </h3>
            <p className="text-sm font-semibold text-[#6C6C6C] pb-1">
              Potential customers
            </p>
          </div>
        </div>

        <Upload
          imgSrc="/locationIcon.png"
          title="Shawarma Palace"
          text="456 Elm Street. (1 km zone)"
          className=""
        />
      </div>
    </div>
  );

  const rightContent = (
    <div className="w-full h-full relative min-h-[500px] rounded-[12px] overflow-hidden">
      <MapContainer
        center={center}
        zoom={14}
        scrollWheelZoom={false}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapRadiusUpdater center={center} radius={radius} />
        <Marker position={center} icon={customIcon} />
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
        {/* Inner shadow simulation circles */}
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
