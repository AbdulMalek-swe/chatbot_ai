import React from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Pencil, Check, X } from 'lucide-react';

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

export default function LocationMapWidget({ address }: { address?: string }) {
    const center: [number, number] = [47.6062, -122.3321];

    return (
        <div className="w-full bg-[#DAD9CD]/10 rounded-4xl overflow-hidden border border-slate-200 shadow-2xl animate-fade-up">
            {/* Header / Address Card */}
            <div className="p-6 bg-white flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm">
                        <MapPin size={22} className="text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5 whitespace-nowrap">Location Locked</h4>
                        <p className="text-[15px] font-bold text-slate-900 truncate">{address || 'Detecting Location...'}</p>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 transition-all group">
                    <Pencil size={14} className="group-hover:rotate-12 transition-transform" />
                    <span className="text-[12px] font-bold">Edit</span>
                </button>
            </div>

            {/* Map Container */}
            <div className="h-[280px] w-full relative z-10 bg-slate-50 overflow-hidden">
                <MapContainer
                    center={center}
                    zoom={15}
                    scrollWheelZoom={false}
                    zoomControl={false}
                    className="h-full w-full grayscale-[0.2] contrast-[0.9]"
                >
                    <TileLayer
                        attribution='&copy; OpenStreetMap'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapCenter center={center} />
                    <Marker position={center} icon={customIcon} />
                </MapContainer>
                
                {/* Floating Map Label */}
                <div className="absolute top-4 left-4 z-1000 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 text-[10px] font-black text-slate-800 shadow-xl uppercase tracking-widest">
                    Precision Sync Active
                </div>
            </div>

            {/* Footer Actions */}
            <div className="p-5 bg-[#F7F7F7] flex items-center justify-between gap-4">
                <p className="text-[13px] text-slate-500 font-medium italic">
                    Is this your business location?
                </p>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
                        <X size={16} />
                        Cancel
                    </button>
                    <button className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-[13px] hover:bg-black transition-all active:scale-95 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)]">
                        <Check size={16} className="text-primary-400" />
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
