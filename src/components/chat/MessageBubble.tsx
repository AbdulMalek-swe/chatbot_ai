import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { type ChatMessage, useChat } from '../../contexts/ChatContext';
import { Cpu } from 'lucide-react';
import { 
    WidgetMessageMap as MessageMap, 
    WidgetPinPoint as CampaignDirection, 
    WidgetLocationMap as LocationMapWidget, 
    WidgetRadiusSelection, 
    WidgetRadiusHeatmap,
    WidgetCompetitorSelection,
    WidgetSelectedLocations
} from './widgets';
import { useEffect, useState } from 'react';


interface MessageBubbleProps {
    message: ChatMessage;
    allMessages?: ChatMessage[];
    children?: React.ReactNode;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, allMessages, children }) => {
    const isAI = message.role === 'assistant';
    const { streaming, messages: contextMessages, currentStepLabel, sendMessage } = useChat();
    const messages = allMessages || contextMessages;
    const [widgetShow, setWidgetShow] = useState(false);

    const assistantMessages = messages.filter(m => m.role === 'assistant');
    const isFirstAI = isAI && assistantMessages.length > 0 && assistantMessages[0].id === message.id;
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
    const hasWidget = !!(message.widget === "pin_point" || message.widget === "map_selection" || message.widget === "radius_selection" || message.widget === "radius_heatmap" || message.widget === "competitor_selection") || coordinates.length > 0 || !!message.map_data;

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
                    <StreamingMarkdown content={message.content} setWidgetShow={setWidgetShow} />
                </div>
            ) : (
                <div className={`whitespace-pre-wrap ${!isAI ? 'text-left' : ''}`}>{message.content}</div>
            )}
        </div>
    );

    const isSplitWidget = isAI && (message.widget === "radius_selection" || message.widget === "radius_heatmap" || message.widget === "competitor_selection" || message.widget === "selected_locations");

    const widgetContent = (
        <div className={`flex flex-col gap-6 w-full ${isAI ? 'items-start' : 'items-end'}`}>
            {isAI && (
                <>
                    {message.widget === "pin_point" && <CampaignDirection widget={message.points} />}
                    {message.widget === "map_selection" && (
                        <LocationMapWidget
                            address={messages[messages.indexOf(message) - 1]?.content || "Current Location"}
                            onConfirm={(val) => sendMessage(val)}
                        />
                    )}
                    {message.widget === "radius_selection" && (
                        <WidgetRadiusSelection
                            address={messages[messages.indexOf(message) - 3]?.content || messages[messages.indexOf(message) - 1]?.content || "Current Location"}
                            onConfirm={(radius) => {
                                sendMessage(`${radius} km is perfect.`);
                            }}
                        />
                    )}
                    {message.widget === "radius_heatmap" && (
                        <WidgetRadiusHeatmap
                            onConfirm={(radius) => {
                                sendMessage(`${radius} km is perfect.`);
                            }}
                        />
                    )}
                    {message.widget === "competitor_selection" && (
                        <WidgetCompetitorSelection
                            points={message.points}
                            title={(message as any).widget_title}
                            suggestions={(message as any).widget_suggestions}
                        />
                    )}
                    {message.widget === "selected_locations" && (
                        <WidgetSelectedLocations
                            locations={message.points}
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

    if (!isAI) {
        return (
            <div className="group w-full animate-fade-in font-body flex justify-end mb-6 max-w-4xl mx-auto">
                <div className="max-w-2xl bg-white shadow-sm border border-slate-200/50 rounded-tl-[16px] rounded-tr-[4px] rounded-br-[16px] rounded-bl-[16px] p-4 text-left">
                    {mainContentPart}
                </div>
            </div>
        );
    }

    if (isSplitWidget) {
        return (
            <div className="group w-full font-body flex mb-10 max-w-8xl mx-auto px-4 sm:px-6">
                <div className="w-full">
                    {message.widget === "radius_selection" && (
                        <WidgetRadiusSelection
                            address={messages[messages.indexOf(message) - 3]?.content || messages[messages.indexOf(message) - 1]?.content || "Current Location"}
                            aiText={
                                <div className="space-y-4">
                                    {thinkingPart}
                                    {mainContentPart}
                                </div>
                            }
                            showLogo={isFirstAI}
                            onConfirm={(radius) => {
                                sendMessage(`${radius} km is perfect.`);
                            }}
                        >
                            {children}
                        </WidgetRadiusSelection>
                    )}
                    {message.widget === "radius_heatmap" && (
                        <WidgetRadiusHeatmap
                            aiText={
                                <div className="space-y-4">
                                    {thinkingPart}
                                    {mainContentPart}
                                </div>
                            }
                            showLogo={isFirstAI}
                            onConfirm={(radius) => {
                                sendMessage(`${radius} km is perfect.`);
                            }}
                        >
                            {children}
                        </WidgetRadiusHeatmap>
                    )}
                    {message.widget === "competitor_selection" && (
                        <WidgetCompetitorSelection
                            points={message.points}
                            title={(message as any).widget_title}
                            suggestions={(message as any).widget_suggestions}
                            aiText={
                                <div className="space-y-4">
                                    {thinkingPart}
                                    {mainContentPart}
                                </div>
                            }
                            showLogo={isFirstAI}
                        >
                            {children}
                        </WidgetCompetitorSelection>
                    )}
                    {message.widget === "selected_locations" && (
                        <WidgetSelectedLocations
                            locations={message.points}
                            aiText={
                                <div className="space-y-4">
                                    {thinkingPart}
                                    {mainContentPart}
                                </div>
                            }
                            showLogo={isFirstAI}
                        />
                    )}

                </div>
            </div>
        );
    }

    return (
        <div className="group w-full animate-fade-in font-body flex justify-start mb-10 max-w-4xl mx-auto pl-2">
            <div className="w-full flex flex-row gap-4">
                {isFirstAI && (
                    <div className="shrink-0 flex items-center justify-center transition-all self-start">
                        <img src="/logo.png" alt="Logo" className="w-8 h-8 transition-transform group-hover:scale-110 duration-500 rounded-full" />
                    </div>
                )}
                <div className="flex-1 flex flex-col gap-6 min-w-0">
                    {hasText && (
                        <div className="w-full">
                            {thinkingPart}
                            {mainContentPart}
                        </div>
                    )}
                    {widgetShow && widgetContent}
                    {!hasText && hasWidget && widgetContent}
                </div>
            </div>
        </div>
    );


};

export default MessageBubble;

const StreamingMarkdown = ({ content, setWidgetShow }: { content: any, setWidgetShow: (show: boolean) => any }) => {
    const [displayedText, setDisplayedText] = useState("");
    useEffect(() => {
        let words = content.split(" ");
        let index = 0;
        const interval = setInterval(() => {
            setDisplayedText((prev: any) => prev + (index === 0 ? "" : " ") + words[index]);
            index++;
            if (index >= words.length - 1) {
                setWidgetShow(true);
                clearInterval(interval);
            }
        }, 100); // speed control
        return () => clearInterval(interval);
    }, [content]);
    return (
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
            {displayedText}
        </ReactMarkdown>
    );
};


