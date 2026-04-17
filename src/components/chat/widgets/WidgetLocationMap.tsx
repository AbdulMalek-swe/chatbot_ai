import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import PrimaryBtn from '../../shared/PrimaryBtn';
import WidgetLayout from './WidgetLayout';

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

export default function LocationMapWidget({ 
  address,
  onConfirm 
}: { 
  address?: string,
  onConfirm?: (val: string) => void
}) {
  const center: [number, number] = [47.6062, -122.3321];

  return (
    <WidgetLayout mode="single">
      <div className="w-full bg-[#F7F7F7] rounded-xl overflow-hidden border border-slate-200">
       {/* Header / Address Card */}
        <div className="p-4 bg-white flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full ">
                                <img src="/locationIcon.png" alt="Location" />
          </div>
          <div className="flex-1 min-w-0">
              <h4 className="text-md font-semibold text-[#151515] font-inter">
              Location Locked
            </h4>
              <p className="text-[14px] font-normal text-[#62646A] truncate">
              {address || 'Detecting Location...'}
            </p>
          </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="h-70 w-full relative z-10 bg-slate-50 overflow-hidden px-3">
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={false}
        zoomControl={false}
        className="h-full w-full leaflet-grayscale"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapCenter center={center} />
        <Marker position={center} icon={customIcon} />
      </MapContainer>
    </div>
        {/* Footer Actions */}
        <div className="p-4 bg-[#F7F7F7] flex items-center justify-between gap-4">
          <p className="text-md text-[#151515] font-normal">
            Is this your business location?
          </p>
          <div className="flex items-center gap-3">
            <PrimaryBtn className="bg-white! text-[#1D1D1D]! px-6!">
              No
            </PrimaryBtn>

            <PrimaryBtn 
              className="px-6!"
              onClick={() => onConfirm?.("Yes, that’s me.")}
    >
              Yes
            </PrimaryBtn>
          </div>
        </div>
      </div>
    </WidgetLayout>
  );
}
