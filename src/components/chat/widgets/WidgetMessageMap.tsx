import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';
import WidgetLayout from './WidgetLayout';

// Specialized icon to match the premium theme
const customIcon = new L.DivIcon({
    html: `
        <div class="relative flex items-center justify-center">
            <div class="absolute w-8 h-8 bg-primary-500/30 rounded-full animate-ping"></div>
            <div class="relative w-4 h-4 bg-primary-500 border-2 border-white rounded-full shadow-[0_0_15px_rgba(215,124,164,0.8)]"></div>
        </div>
    `,
    className: 'custom-marker-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

interface Coordinate {
    lat: number;
    lng: number;
    name?: string;
    label?: string;
}

interface MessageMapProps {
    coordinates?: Coordinate[];
    mapData?: {
        pointer_id: string;
        total_count: number;
        pois_targeted: Array<{ lat: number, lng: number, radius_km: number, label?: string }>;
        sample_maids: Array<{ maid: string, latitude: number, longitude: number }>;
    };
    zoom?: number;
}

// Helper to update map view when coordinates change
const MapUpdater: React.FC<{ coords: L.LatLngExpression[], zoom: number }> = ({ coords, zoom }) => {
    const map = useMap();

    useEffect(() => {
        if (!coords || coords.length === 0) return;

        try {
            if (coords.length === 1) {
                map.setView(coords[0], zoom);
            } else {
                const bounds = L.latLngBounds(coords);
                if (bounds.isValid()) {
                    map.fitBounds(bounds, { padding: [50, 50], maxZoom: zoom });
                }
            }
        } catch (e) {
            console.warn('Map update failed', e);
        }
    }, [coords, zoom, map]);

    return null;
};

// Manual Recenter Control
const RecenterControl: React.FC<{ coords: L.LatLngExpression[], zoom: number }> = ({ coords, zoom }) => {
    const map = useMap();
    if (!coords || coords.length === 0) return null;

    const handleRecenter = () => {
        try {
            if (coords.length === 1) {
                map.setView(coords[0], zoom);
            } else {
                const bounds = L.latLngBounds(coords);
                if (bounds.isValid()) {
                    map.fitBounds(bounds, { padding: [50, 50], maxZoom: zoom });
                }
            }
        } catch (e) {
            console.warn('Recenter failed', e);
        }
    };

    return (
        <div className="leaflet-bottom leaflet-right mb-4! mr-4! z-1000">
            <button
                onClick={handleRecenter}
                className="bg-white/90 hover:bg-slate-50 text-slate-600 hover:text-primary-600 p-2 rounded-xl border border-slate-200 shadow-xl transition-all active:scale-95 group"
                title="Recenter Map"
            >
                <div className="flex items-center gap-2 px-2 py-1">
                    <MapPin size={14} className="group-hover:animate-bounce" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Recenter</span>
                </div>
            </button>
        </div>
    );
};

// Individual Hub Component to handle interactions
const Hub: React.FC<{ poi: any }> = ({ poi }) => {
    const map = useMap();
    const lat = parseFloat(poi.lat);
    const lng = parseFloat(poi.lng);
    const radiusKm = parseFloat(poi.radius_km || 0.1);

    if (isNaN(lat) || isNaN(lng)) return null;

    const handleHubClick = () => {
        // Calculate bounds for the circle to fit perfectly
        const circle = L.circle([lat, lng], { radius: radiusKm * 1000 });
        map.fitBounds(circle.getBounds(), { padding: [20, 20], maxZoom: 16 });
    };

    return (
        <React.Fragment>
            <Circle
                center={[lat, lng]}
                radius={radiusKm * 1000}
                eventHandlers={{ click: handleHubClick }}
                pathOptions={{
                    color: '#D77CA4',
                    fillColor: '#D77CA4',
                    fillOpacity: 0.15,
                    weight: 2,
                    dashArray: poi.label ? 'none' : '5, 10',
                    className: 'cursor-pointer hover:fill-opacity-30 transition-all duration-300'
                }}
            />
            <Marker 
                position={[lat, lng]} 
                icon={customIcon}
                eventHandlers={{ click: handleHubClick }}
            >
                <Popup className="premium-popup">
                    <div className="p-2 min-w-[150px]">
                        <div className="flex items-center gap-2 mb-2 border-b border-gray-100 pb-2">
                            <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                            <span className="text-[11px] font-black uppercase tracking-wider text-gray-400">Target Hub</span>
                        </div>
                        <h4 className="text-[14px] font-bold text-gray-900 mb-1 leading-tight">
                            {poi.label || poi.name || poi.location_name || 'Core Target Area'}
                        </h4>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between text-[10px] text-gray-500">
                                <span>Radius Spectrum</span>
                                <span className="font-mono font-bold text-primary-600">{radiusKm}km</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-gray-500">
                                <span>Coordinates</span>
                                <span className="font-mono">{lat.toFixed(4)}, {lng.toFixed(4)}</span>
                            </div>
                        </div>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleHubClick();
                            }}
                            className="mt-3 w-full py-1.5 bg-gray-900 hover:bg-primary-600 text-white text-[9px] font-black uppercase tracking-widest rounded transition-colors"
                        >
                            Focus Intelligence
                        </button>
                    </div>
                </Popup>
            </Marker>
        </React.Fragment>
    );
};

const MessageMap: React.FC<MessageMapProps> = ({ coordinates = [], mapData, zoom = 12 }) => {
    // 1. Prepare data points for bounds calculation
    const pointsToFit = useMemo(() => {
        const pts: L.LatLngExpression[] = [];

        if (mapData?.pois_targeted) {
            mapData.pois_targeted.forEach(p => {
                const lat = parseFloat(p.lat as any);
                const lng = parseFloat(p.lng as any);
                if (!isNaN(lat) && !isNaN(lng)) pts.push([lat, lng]);
            });
        }

        if (coordinates) {
            coordinates.forEach(c => {
                const lat = parseFloat(c.lat as any);
                const lng = parseFloat(c.lng as any);
                if (!isNaN(lat) && !isNaN(lng)) pts.push([lat, lng]);
            });
        }

        return pts;
    }, [coordinates, mapData]);

    if (pointsToFit.length === 0) return null;

    const center = pointsToFit[0];

    return (
        <WidgetLayout mode="single">
            <div className="my-4 rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-fade-in group relative">
                <div className="absolute top-4 left-10 z-1000 flex flex-col gap-2">
                    {mapData ? (
                        <div className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 text-[10px] font-bold text-slate-700 shadow-lg">
                            <span className="text-primary-600 font-black mr-2">LIVE</span>
                            {(mapData.total_count || 0).toLocaleString()} Device Signals Identified
                        </div>
                    ) : (
                        coordinates.slice(0, 2).map((coord, i) => (
                            <div key={i} className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 text-[10px] font-bold text-slate-700 shadow-lg">
                                <MapPin size={12} className="text-primary-600" />
                                <span className="truncate max-w-[120px]">{coord.name || coord.label || `Target ${i + 1}`}</span>
                            </div>
                        ))
                    )}
                </div>

                <div className="h-[400px] w-full relative z-10 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                    <MapContainer
                        center={center}
                        zoom={zoom}
                        scrollWheelZoom={false}
                        className="h-full w-full"
                    >
                        <MapUpdater coords={pointsToFit} zoom={zoom} />
                        <RecenterControl coords={pointsToFit} zoom={zoom} />
                        <TileLayer
                                    url="https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token=eTv72QZ1tQRMGSvSdUtUadKcClkD6xYlPVSy85fiE88lfHT8NC1JngM8jchQ3f7W"
                                     attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                   />

                        {/* Render POIs with Radius */}
                        {mapData?.pois_targeted.map((poi, idx) => (
                            <Hub key={`poi-${idx}`} poi={poi} />
                        ))}

                        {/* Render Sample Device Locations */}
                        {mapData?.sample_maids.map((maid, idx) => {
                            const lat = parseFloat(maid.latitude as any);
                            const lng = parseFloat(maid.longitude as any);
                            if (isNaN(lat) || isNaN(lng)) return null;

                            return (
                                <CircleMarker
                                    key={`maid-${idx}`}
                                    center={[lat, lng]}
                                    radius={2}
                                    pathOptions={{
                                        color: '#6366f1',
                                        fillColor: '#6366f1',
                                        fillOpacity: 0.8,
                                        weight: 1
                                    }}
                                >
                                    <Popup>
                                        <div className="text-[9px] font-mono">Device ID: {maid.maid?.slice(0, 8) || 'Unknown'}...</div>
                                    </Popup>
                                </CircleMarker>
                            );
                        })}

                        {/* Standard Coordinates (Fallback/Static) */}
                        {!mapData && coordinates.map((coord, idx) => {
                            const lat = parseFloat(coord.lat as any);
                            const lng = parseFloat(coord.lng as any);
                            if (isNaN(lat) || isNaN(lng)) return null;

                            return (
                                <Marker
                                    key={`coord-${idx}`}
                                    position={[lat, lng]}
                                    icon={customIcon}
                                >
                                    <Popup>
                                        <div className="p-1 font-sans">
                                            <p className="font-bold text-gray-900 m-0">{coord.name || 'Target Area'}</p>
                                            <p className="text-[10px] text-gray-500 m-0">{lat.toFixed(6)}, {lng.toFixed(6)}</p>
                                        </div>
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </MapContainer>
                </div>

                <div className="bg-slate-50 p-4 flex items-center justify-between border-t border-slate-100 relative z-10">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Geospatial Intelligence Engine</span>
                        <span className="text-[12px] font-medium text-slate-600 italic">
                            {mapData ? `Visualizing ${mapData.sample_maids?.length || 0} representative device signals across hubs.` : `${pointsToFit.length} coordinates mapped.`}
                        </span>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-[9px] font-black text-primary-400 uppercase tracking-widest">
                        OSM Protocol
                    </div>
                </div>

                <style>{`
                    .leaflet-container {
                        background: #fdfdfb !important;
                    }
                    .leaflet-control-attribution {
                        background: rgba(0,0,0,0.5) !important;
                        color: rgba(255,255,255,0.3) !important;
                        font-size: 8px !important;
                    }
                    .leaflet-bar a {
                        background-color: #ffffff !important;
                        color: #1a1a1a !important;
                        border-bottom: 1px solid rgba(0,0,0,0.1) !important;
                    }
                    .leaflet-bar a:hover {
                        background-color: #f8f8f8 !important;
                    }
                    .premium-popup .leaflet-popup-content-wrapper {
                        background: #ffffff !important;
                        color: #000000 !important;
                        border-radius: 12px !important;
                        padding: 0 !important;
                        box-shadow: 0 10px 25px rgba(0,0,0,0.2) !important;
                    }
                    .premium-popup .leaflet-popup-tip {
                        background: #ffffff !important;
                    }
                    .premium-popup .leaflet-popup-content {
                        margin: 0 !important;
                        width: auto !important;
                    }
                `}</style>
            </div>
        </WidgetLayout>
    );
};

export default MessageMap;
