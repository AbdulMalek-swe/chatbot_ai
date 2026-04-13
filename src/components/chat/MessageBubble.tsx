import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { type ChatMessage, useChat } from '../../contexts/ChatContext';
import { Cpu } from 'lucide-react';
import MessageMap from './MessageMap';
import CampaignDirection from './WidgetPinPoint';
import LocationMapWidget from './LocationMapWidget';

interface MessageBubbleProps {
    message: ChatMessage;
    allMessages?: ChatMessage[];
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, allMessages }) => {
    const isAI = message.role === 'assistant';
    const { streaming, messages: contextMessages, currentStepLabel } = useChat();
    const messages = allMessages || contextMessages;
    
    const isLatestMessage = messages[messages.length - 1]?.id === message.id;
    const isSynthesizing = isAI && isLatestMessage && streaming && !message.content && !message.thinking && !message.poi_data && !message.map_data;
    const extractCoordinates = () => {
        const coords: Array<{ lat: number, lng: number, name?: string }> = [];
        if (message.map_data?.pois_targeted) {
            message.map_data.pois_targeted.forEach((p: any) => {
                coords.push({ lat: p.lat, lng: p.lng, name: p.label || p.name || `POI (${p.radius_km}km)` });
            });
        }

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

        if (coords.length === 0 && message.campaign_plan?.geo_targets) {
            message.campaign_plan.geo_targets.forEach((t: any) => {
                const lat = parseFloat(t.latitude || t.lat);
                const lng = parseFloat(t.longitude || t.lng);
                if (!isNaN(lat) && !isNaN(lng)) {
                    coords.push({ lat, lng, name: t.location_name || t.name });
                }
            });
        }
        if (coords.length === 0 && message.content) {
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

    const hasText = !!message.content?.trim() || !!message.thinking || isSynthesizing;
    const hasWidget = !!(message.widget === "pin_point" || message.widget === "map_selection") || coordinates.length > 0 || !!message.map_data;

    const thinkingPart = message.thinking && isAI && (
        <div className="p-px rounded-2xl bg-gradient-moving shadow-xl overflow-hidden mt-2 w-full">
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
    );

    const mainContentPart = (
        <div className={`text-[15px] sm:text-[16px] leading-relaxed font-medium tracking-tight w-full ${isAI ? 'text-foreground/90' : 'text-foreground'}`}>
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
                </div>
            ) : (
                <div className={`whitespace-pre-wrap ${!isAI ? 'text-right' : ''}`}>{message.content}</div>
            )}
        </div>
    );

    const widgetPart = (
        <div className={`flex flex-col gap-6 w-full ${isAI ? 'items-start' : 'items-end'}`}>
            {isAI && (
                <>
                    {message.widget === "pin_point" && <CampaignDirection widget={message.points} />}
                    {message.widget === "map_selection" && (
                        <LocationMapWidget 
                            address={messages[messages.indexOf(message) - 1]?.content || "Current Location"} 
                        />
                    )}
                </>
            )}

            {(coordinates.length > 0 || message.map_data) && (
                <div className={`space-y-2 w-full flex flex-col ${isAI ? 'items-start' : 'items-end'}`}>
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
                <div className="mt-4 p-4 rounded-xl border border-primary-500/20 bg-primary-500/5 backdrop-blur-md animate-pulse w-full">
                    <p className="text-[12px] font-display font-medium text-slate-600 italic text-center">
                        Drafting Campaign Infrastructure... Pipeline awaiting user approval.
                    </p>
                </div>
            )}
        </div>
    );

    return (
        <div className={`group w-full animate-fade-in font-body flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}>
            <div className={`${isAI ? 'max-w-4xl w-full' : 'max-w-2xl bg-white shadow-sm border border-slate-200/50 rounded-tl-[16px] rounded-tr-[4px] rounded-br-[16px] rounded-bl-[16px] p-4 opacity-100'} flex flex-col transition-all`}>
                <div className={`flex items-start gap-4 sm:gap-6 ${isAI ? 'p-4 sm:p-6 flex-row' : 'flex-row-reverse'}`}>
                    <div className="shrink-0 flex items-center justify-center transition-all top-0">
                        {isAI ? (
                            <img src="/logo.png" alt="Logo" className="w-10 h-10 transition-transform group-hover:scale-110 duration-500" />
                        ) : null}
                    </div>

                    <div className={`flex-1 space-y-4 overflow-hidden flex flex-col ${isAI ? 'items-start' : 'items-end'}`}>
                        <div className="flex flex-col gap-6 w-full">
                            {thinkingPart}
                            {mainContentPart}
                            {/* Render widget beside logo ONLY if there is no text/thinking */}
                            {isAI && !hasText && hasWidget && widgetPart}
                        </div>
                    </div>
                </div>

                {/* Render widget full width below ONLY if there is text/thinking */}
                {isAI && hasText && hasWidget && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 w-full">
                        {widgetPart}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageBubble;
