import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { type ChatMessage, useChat } from '../../contexts/ChatContext';
import { User, Cpu } from 'lucide-react';
import MessageMap from './MessageMap';
import CampaignDirection from './WidgetPinPoint';

interface MessageBubbleProps {
    message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const isAI = message.role === 'assistant';
    const { streaming, messages, currentStepLabel } = useChat();
    const isLatestMessage = messages[messages.length - 1]?.id === message.id;
    const isSynthesizing = isAI && isLatestMessage && streaming && !message.content && !message.thinking && !message.poi_data && !message.map_data;

    // Coordinate Extraction Logic
    const extractCoordinates = () => {
        const coords: Array<{ lat: number, lng: number, name?: string }> = [];

        // 1. From Map Data (New SSE format)
        if (message.map_data?.pois_targeted) {
            message.map_data.pois_targeted.forEach((p: any) => {
                coords.push({ lat: p.lat, lng: p.lng, name: p.label || p.name || `POI (${p.radius_km}km)` });
            });
        }

        // 2. From POI Data (Structured - legacy fallbacks)
        const poiData = message.poi_data || (message.campaign_plan?.targetable_poi_coordinates);

        if (coords.length === 0 && poiData && Array.isArray(poiData)) {
            poiData.forEach((p: any) => {
                const lat = parseFloat(p.lat || p.latitude);
                const lng = parseFloat(p.lng || p.longitude);
                if (!isNaN(lat) && !isNaN(lng)) {
                    coords.push({ lat, lng, name: p.name || p.location_name });
                }
            });
        }

        // 3. From Campaign Plan Geo Targets
        if (coords.length === 0 && message.campaign_plan?.geo_targets) {
            message.campaign_plan.geo_targets.forEach((t: any) => {
                const lat = parseFloat(t.latitude || t.lat);
                const lng = parseFloat(t.longitude || t.lng);
                if (!isNaN(lat) && !isNaN(lng)) {
                    coords.push({ lat, lng, name: t.location_name || t.name });
                }
            });
        }

        // 4. From Text Content (Fallback/Regex)
        if (coords.length === 0 && message.content) {
            // Enhanced regex for: "lat: 40.7, lng: -74.1", "(40.7, -74.1)", "latitude 40.7, longitude -74.1"
            const latLngRegex = /(?:lat|latitude)[:\s,]*(-?\d+\.\d+)[:\s,]*?(?:lng|longitude)[:\s]*(-?\d+\.\d+)|(?:\()(-?\d+\.\d+)[:\s,]*(-?\d+\.\d+)(?:\))/gi;
            let match;
            while ((match = latLngRegex.exec(message.content)) !== null) {
                const lat = parseFloat(match[1] || match[3]);
                const lng = parseFloat(match[2] || match[4]);
                if (!isNaN(lat) && !isNaN(lng)) {
                    coords.push({
                        lat,
                        lng,
                        name: 'Position Sync'
                    });
                }
            }
        }

        return coords;
    };

    const coordinates = extractCoordinates();

    return (
        <div className={`group w-full animate-fade-in font-body`}>
            <div className={`max-w-4xl mx-auto flex gap-4 sm:gap-6 p-4 sm:p-6 transition-all rounded-3xl ${isAI ? 'card-glass' : 'bg-transparent'}`}>
                <div className="shrink-0 w-12 h-12 flex items-center justify-center transition-all">
                    {isAI ? <img src="/logo.png" alt="Logo" className="w-10 h-10 transition-transform group-hover:scale-110 duration-500" /> : <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center border border-slate-300 transition-transform group-hover:scale-110 duration-500"><User size={20} className="text-slate-600" /></div>}
                </div>

                <div className="flex-1 space-y-4 overflow-hidden">
                    <div className="flex items-center gap-3">
                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] font-display">
                            {isAI ? 'Punk AI' : 'You'}
                        </span>
                        {/* {isAI && (
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                                <span className={`w-1.5 h-1.5 rounded-full ${isSynthesizing ? 'bg-primary-500 animate-pulse' : 'bg-success-500 animate-pulse'}`} />
                                <span className="text-[9px] font-black text-white/40 uppercase tracking-widest leading-none pb-[1px]">
                                    {isSynthesizing ? 'Synthesizing' : ''}
                                </span>
                            </div>
                        )} */}
                    </div>

                    <div className="flex flex-col gap-6">
                        {message.thinking && isAI && (
                            <div className="p-[1px] rounded-2xl bg-gradient-moving shadow-xl overflow-hidden mt-2">
                                <div className="bg-white/90 backdrop-blur-xl p-6 rounded-[14.5px]">
                                    <div className="flex items-center gap-2 text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] mb-4">
                                        <Cpu size={14} className="text-primary-400" />
                                        Cognitive Sequence
                                    </div>
                                    <div className="text-slate-600 text-[14px] italic whitespace-pre-wrap leading-relaxed font-medium font-body transition-all duration-300">
                                        {message.thinking}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className={`text-[15px] sm:text-[16px] leading-relaxed font-medium tracking-tight ${isAI ? 'text-foreground/90' : 'text-foreground'}`}>
                            {isSynthesizing ? (
                                <div className="flex flex-col gap-3 py-4">
                                    {currentStepLabel ? (
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                                            <span className="text-[13px] text-slate-500 font-medium animate-pulse">
                                                {currentStepLabel}
                                            </span>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="h-2 bg-slate-200 rounded-full w-[90%] animate-pulse"></div>
                                            <div className="h-2 bg-slate-200 rounded-full w-[70%] animate-pulse" style={{ animationDelay: '200ms' }}></div>
                                            <div className="h-2 bg-slate-200 rounded-full w-[50%] animate-pulse" style={{ animationDelay: '400ms' }}></div>
                                        </>
                                    )}
                                </div>
                            ) : isAI ? (
                                <div className="chat-markdown max-w-none">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            a: ({ href, children }) => (
                                                <a href={href} target="_blank" rel="noopener noreferrer">
                                                    {children}
                                                </a>
                                            ),
                                        }}
                                    >
                                        {message.content}

                                    </ReactMarkdown>
                                    {message.widget === "pin_point" && <CampaignDirection widget={message.points} />}
                                    {/* {message.widget === "normal_map" && <CampaignDirection widget={message.points} />} */}
                                </div>
                            ) : (
                                <div className="whitespace-pre-wrap">{message.content}</div>
                            )}
                        </div>

                        {(coordinates.length > 0 || message.map_data) && (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-success-500/10 border border-success-500/20 w-fit">
                                    <div className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse" />
                                    <span className="text-[10px] font-black text-success-400 uppercase tracking-widest">
                                        Geolocation Sync: {message.map_data ? (message.map_data.total_count || 0).toLocaleString() : coordinates.length} data points mapped
                                    </span>
                                </div>
                                {message.map_data ? (
                                    <MessageMap mapData={message.map_data} />
                                ) : (
                                    <MessageMap coordinates={coordinates} />
                                )}
                            </div>
                        )}

                        {message.requires_approval && isAI && (
                            <div className="mt-4 p-4 rounded-xl border border-primary-500/20 bg-primary-500/5 backdrop-blur-md animate-pulse">
                                <p className="text-[12px] font-display font-medium text-slate-600 italic text-center">
                                    Drafting Campaign Infrastructure... Pipeline awaiting user approval.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
