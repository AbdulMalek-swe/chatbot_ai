import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Check, Plus, Minus, Edit2 } from 'lucide-react';
import WidgetLayout from './WidgetLayout';

// Custom Marker to match the screenshot style
const customIcon = new L.DivIcon({
    html: `
        <div class="relative flex items-center justify-center">
            <div class="w-8 h-8 bg-[#E91E63] rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div class="absolute top-[-40px] whitespace-nowrap bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md border border-slate-200 text-[12px] font-bold text-slate-800">
                Shawarma Palace at 456 Elm Street.
                <div class="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white/90 border-r border-b border-slate-200 rotate-45"></div>
            </div>
        </div>
    `,
    className: 'custom-marker-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

function MapRadiusUpdater({ center, radius }: { center: [number, number], radius: number }) {
    const map = useMap();
    React.useEffect(() => {
        if (!map) return;
        try {
            const circle = L.circle(center, { radius: radius * 1000 });
            const timeoutId = setTimeout(() => {
                try {
                    map.fitBounds(circle.getBounds(), { padding: [50, 50], maxZoom: 15 });
                } catch (e) {
                    console.warn('fitBounds failed', e);
                }
            }, 100);
            return () => clearTimeout(timeoutId);
        } catch (e) {
            console.warn('MapRadiusUpdater error', e);
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
}

export default function WidgetRadiusSelection({ 
    onConfirm,
    initialRadius = 1,
    aiText,
    showLogo = false
}: WidgetRadiusSelectionProps) {
    const [radius, setRadius] = useState(initialRadius);
    const center: [number, number] = [47.6062, -122.3321];

    const leftContent = (
        <div className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                        <div className="w-6 h-6 rounded-full border-2 border-slate-400 flex items-center justify-center">
                            <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-[18px] font-bold text-slate-900 leading-tight">Shawarma Palace</h3>
                        <p className="text-[14px] text-slate-400 font-medium">456 Elm Street.</p>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-[14px] font-bold text-slate-600 hover:bg-slate-50 transition-all">
                    <Edit2 size={14} />
                    Edit
                </button>
            </div>

            {/* Status */}
            <div className="flex items-center gap-3 py-4 text-[#111] font-bold text-[14px]">
                <Check size={18} className="text-slate-900" strokeWidth={3} />
                Location Confirmed
            </div>

            <div className="w-full border-t border-dashed border-slate-200 my-4" />

            {/* Radius Section */}
            <div className="mt-4 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                     <div className="w-5 h-5 rounded-full border-2 border-slate-900 border-t-transparent animate-spin" />
                     <span className="text-[16px] font-bold text-slate-900">Radius Selection</span>
                </div>
                <p className="text-[15px] text-slate-600 leading-[1.6] font-medium mb-8">
                    Great. How far away from your shop do you want to reach? I recommend a 1 km radius so we can pick up the competitor stores in that zone and still stay local. You can always choose something different like 2 km if you want wider reach.
                </p>

                {/* Controls */}
                <div className="flex items-center justify-between mt-auto pb-4">
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setRadius(prev => Math.max(0.1, prev - 1))}
                            className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-white hover:shadow-sm transition-all active:scale-95"
                        >
                            <Minus size={18} />
                        </button>
                        <div className="min-w-[70px] h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl px-4 text-[14px] font-bold text-slate-900">
                            {Math.round(radius)} km
                        </div>
                        <button 
                            onClick={() => setRadius(prev => Math.min(20, prev + 1))}
                            className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-white hover:shadow-sm transition-all active:scale-95"
                        >
                            <Plus size={18} />
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="px-6 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[14px] font-bold text-slate-600 hover:bg-white transition-all">
                            No
                        </button>
                        <button 
                            onClick={() => onConfirm?.(radius)}
                            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-[14px] font-bold hover:bg-black transition-all shadow-lg active:scale-95"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const rightContent = (
        <div className="w-full h-full relative min-h-[400px]">
            <MapContainer
                center={center}
                zoom={14}
                scrollWheelZoom={false}
                zoomControl={false}
                className="h-full w-full grayscale-[0.2] contrast-[0.9]"
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapRadiusUpdater center={center} radius={radius} />
                <Marker position={center} icon={customIcon} />
                <Circle
                    center={center}
                    radius={radius * 1000}
                    pathOptions={{
                        color: '#E91E63',
                        fillColor: '#E91E63',
                        fillOpacity: 0.1,
                        weight: 1,
                        dashArray: '5, 5'
                    }}
                />
            </MapContainer>

            {/* Map Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-1000 flex items-center gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-2xl border border-white/20">
                <button 
                    onClick={() => setRadius(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all active:scale-90"
                >
                    <Minus size={18} />
                </button>
                <div className="px-6 h-10 flex items-center justify-center text-[14px] font-bold text-slate-900 min-w-[80px]">
                    {Math.round(radius)} km
                </div>
                <button 
                    onClick={() => setRadius(prev => Math.min(20, prev + 1))}
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
        />
    );
}
