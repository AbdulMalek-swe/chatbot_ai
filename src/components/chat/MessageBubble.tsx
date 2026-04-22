import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { type ChatMessage, useChat } from '../../contexts/ChatContext';
import { findNextUserMessage } from '../../constant/data';
import { Cpu } from 'lucide-react';
import { 
    WidgetMessageMap as MessageMap, 
    WidgetPinPoint as CampaignDirection, 
    WidgetLocationMap as LocationMapWidget, 
    WidgetRadiusSelection, 
    WidgetRadiusHeatmap,
    WidgetCompetitorSelection,
    WidgetSelectedLocations,
    WidgetAccountConnect,
    WidgetUploadCreative
} from './widgets';
import { useEffect, useState } from 'react';
import WIdgetQuickQuestion from './widgets/WIdgetQuickQuestion';


interface MessageBubbleProps {
    message: ChatMessage;
    allMessages?: ChatMessage[];
    children?: React.ReactNode;
    isNewChat?: boolean;
    onSendMessage?: (content: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, allMessages, children, isNewChat = true, onSendMessage }) => {
    const isAI = message.role === 'assistant';
    const { streaming, messages: contextMessages, currentStepLabel, sendMessage } = useChat();
    const messages = allMessages || contextMessages;

    // Determine if this widget's confirm button should be active
    const messageIndex = messages.indexOf(message);
    const hasSubsequentUserMessage = messages.slice(messageIndex + 1).some(m => m.role === 'user');
    const canConfirm = isNewChat && !streaming && !hasSubsequentUserMessage;

    // Generic confirm handler: finds next user message from mock data and sends it
    const handleWidgetConfirm = () => {
        const nextUserMsg = findNextUserMessage(message.content);
        if (nextUserMsg) {
            if (onSendMessage) {
                onSendMessage(nextUserMsg);
            } else {
                sendMessage(nextUserMsg);
            }
        }
    };
    const [widgetShow, setWidgetShow] = useState(false);

    const assistantMessages = messages.filter(m => m.role === 'assistant');
    const isFirstAI = isAI && assistantMessages.length > 0 && assistantMessages[0].id === message.id;
    const isLatestMessage = messages[messages.length - 1]?.id === message.id;
    const isSynthesizing = isAI && isLatestMessage && streaming && !message.content && !message.thinking && !message.poi_data && !message.map_data;
    const extractCoordinatesForMessage = (msg: ChatMessage) => {
        const coords: Array<{ lat: number, lng: number, name?: string }> = [];
        if (msg.map_data?.pois_targeted) {
            msg.map_data.pois_targeted.forEach((p: any) => {
                coords.push({ lat: p.lat, lng: p.lng, name: p.label || p.name || `POI (${p.radius_km}km)` });
            });
        }

        const poiData = msg.poi_data || (msg.campaign_plan?.targetable_poi_coordinates);

        if (coords.length === 0 && poiData && Array.isArray(poiData)) {
            poiData.forEach((p: any) => {
                const lat = parseFloat(p.lat || p.latitude);
                const lng = parseFloat(p.lng || p.longitude);
                if (!isNaN(lat) && !isNaN(lng)) {
                    coords.push({ lat, lng, name: p.name || p.location_name });
                }
            });
        }

        if (coords.length === 0 && msg.campaign_plan?.geo_targets) {
            msg.campaign_plan.geo_targets.forEach((t: any) => {
                const lat = parseFloat(t.latitude || t.lat);
                const lng = parseFloat(t.longitude || t.lng);
                if (!isNaN(lat) && !isNaN(lng)) {
                    coords.push({ lat, lng, name: t.location_name || t.name });
                }
            });
        }
        if (coords.length === 0 && msg.content) {
            const latLngRegex = /(?:lat|latitude)[:\s,]*(-?\d+\.\d+)[:\s,]*?(?:lng|longitude)[:\s]*(-?\d+\.\d+)|(?:\()(-?\d+\.\d+)[:\s,]*(-?\d+\.\d+)(?:\))/gi;
            let match;
            while ((match = latLngRegex.exec(msg.content)) !== null) {
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

    const extractCoordinates = () => extractCoordinatesForMessage(message);

    const coordinates = extractCoordinates();

    const hasText = !!message.content?.trim() || !!message.thinking || isSynthesizing;
    const hasWidget = !!(message.widget === "pin_point" || message.widget === "map_selection" || message.widget === "radius_selection" || message.widget === "radius_heatmap" || message.widget === "competitor_selection" || message.widget === "account_connect" || message.widget === "upload_creatives" || message.widget === "selected_locations" || message.widget === "QuickQuestion") || coordinates.length > 0 || !!message.map_data;

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
        <div className={`w-full ${isAI 
            ? 'text-[15px] sm:text-2xl leading-relaxed font-medium tracking-tight text-foreground/90' 
            : 'font-inter font-normal text-2xl leading-6 tracking-[0px] text-foreground'}`}>
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

    const getContext = () => {
        let name = "Your Business";
        let address = "Current Location";
        
        let businessLat = 47.6062;
        let businessLng = -122.3321;
        let hasCustomCoords = false;

        const currentIndex = messages.findIndex(m => m.id === message.id);
        const scanUntil = currentIndex !== -1 ? currentIndex : messages.length - 1;

        // Scan history backwards to find name and address
        for (let i = scanUntil; i >= 0; i--) {
            const m = messages[i];
            
            // 1. Try points
            if (m.points && m.points.length > 0) {
                const p = m.points[0];
                if (p.name && !["Audience Size", "Confidence", "Minimum Budget", "Reach Estimate"].includes(p.name)) {
                    if (name === "Your Business") name = p.name;
                }
                if (p.type && !["Audience Size", "Confidence", "Minimum Budget", "Reach Estimate"].includes(p.type)) {
                    if (name === "Your Business") name = p.type;
                }
                if (p.address && address === "Current Location") address = p.address;
                
                if (!hasCustomCoords && p.lat && p.lng) {
                    businessLat = p.lat;
                    businessLng = p.lng;
                    hasCustomCoords = true;
                }
            }

            // 2. Try coordinates from map_data or content
            if (!hasCustomCoords) {
                const coords = extractCoordinatesForMessage(m);
                if (coords.length > 0) {
                    businessLat = coords[0].lat;
                    businessLng = coords[0].lng;
                    hasCustomCoords = true;
                    if (coords[0].name && coords[0].name !== 'Position Sync' && name === "Your Business") name = coords[0].name;
                }
            }

            // 3. Look for user responses to assistant questions
            if (i > 0) {
                const prevM = messages[i - 1];
                if (prevM.role === 'assistant') {
                    const content = prevM.content.toLowerCase();
                    if (content.includes("name of your") || content.includes("what is the name")) {
                        if (name === "Your Business") name = m.content.replace(/[.]$/, "");
                    }
                    if (content.includes("exact address") || content.includes("what city") || content.includes("what is the address")) {
                        if (address === "Current Location") address = m.content.replace(/[.]$/, "");
                        
                        // Check for city fallbacks if no coords yet
                        if (!hasCustomCoords) {
                             const cityContent = m.content.toLowerCase();
                             if (cityContent.includes("seattle")) { businessLat = 47.6062; businessLng = -122.3321; hasCustomCoords = true; }
                             else if (cityContent.includes("portland")) { businessLat = 45.5122; businessLng = -122.6587; hasCustomCoords = true; }
                             else if (cityContent.includes("austin")) { businessLat = 30.2672; businessLng = -97.7431; hasCustomCoords = true; }
                        }
                    }
                }
            }
        }

        // Final Heuristic: if name is still default, look at first message
        if (name === "Your Business" && messages.length > 0) {
            const firstMsg = messages[0].content;
            const match = firstMsg.match(/i (?:own|manage|built|vibecoded|have) (?:a|an)?\s*([^.,?!]+)/i);
            if (match && match[1]) {
                const candidate = match[1].trim();
                name = candidate.split(' ').slice(0, 4).join(' ').replace(/\s+/g, ' ');
                // Capitalize
                name = name.charAt(0).toUpperCase() + name.slice(1);
            }
        }

        return { businessName: name, businessAddress: address, center: [businessLat, businessLng] as [number, number] };
    };

    const { businessName, businessAddress, center } = getContext();

    const widgetContent = (
        <div className={`flex flex-col gap-6 w-full ${isAI ? 'items-start' : 'items-end'}`}>
            {isAI && (
                <>
                    {message.widget === "pin_point" && (
                        <CampaignDirection 
                            widget={message.points} 
                            businessName={businessName}
                            businessAddress={businessAddress}
                            onConfirm={canConfirm ? handleWidgetConfirm : undefined} 
                        />
                    )}
                    {message.widget === "map_selection" && (
                        <LocationMapWidget
                            address={businessAddress}
                            businessName={businessName}
                            center={center}
                            onConfirm={canConfirm ? (val) => {
                                if (onSendMessage) onSendMessage(val);
                                else sendMessage(val);
                            } : undefined}
                        />
                    )}
                    {message.widget === "radius_selection" && (
                        <WidgetRadiusSelection
                            address={businessAddress}
                            businessName={businessName}
                            center={center}
                            onConfirm={canConfirm ? (radius) => {
                                const msg = `${radius} km is perfect.`;
                                if (onSendMessage) onSendMessage(msg);
                                else sendMessage(msg);
                            } : undefined}
                        />
                    )}
                    {message.widget === "radius_heatmap" && (
                        <WidgetRadiusHeatmap
                            businessName={businessName}
                            businessAddress={businessAddress}
                            center={center}
                            onConfirm={canConfirm ? (radius) => {
                                const msg = `${radius} km is perfect.`;
                                if (onSendMessage) onSendMessage(msg);
                                else sendMessage(msg);
                            } : undefined}
                        />
                    )}
                    {message.widget === "competitor_selection" && (
                        <WidgetCompetitorSelection
                            points={message.points}
                            title={(message as any).widget_title}
                            suggestions={(message as any).widget_suggestions}
                            businessName={businessName}
                            businessAddress={businessAddress}
                            center={center}
                            onConfirm={canConfirm ? handleWidgetConfirm : undefined}
                        />
                    )}
                    {message.widget === "selected_locations" && (
                        <WidgetSelectedLocations
                            locations={message.points}
                            onConfirm={canConfirm ? handleWidgetConfirm : undefined}
                        />
                    )}
                    {message.widget === "account_connect" && (
                        <WidgetAccountConnect onConfirm={canConfirm ? handleWidgetConfirm : undefined} />
                    )}
                    {message.widget === "upload_creatives" && (
                        <WidgetUploadCreative onConfirm={canConfirm ? handleWidgetConfirm : undefined} />
                    )}
                     {message.widget === "QuickQuestion" && (
                        <WIdgetQuickQuestion
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
                <div className="max-w-2xl bg-white shadow-sm border border-slate-200/50 rounded-tl-2xl rounded-tr-sm rounded-br-2xl rounded-bl-2xl p-4 text-left">
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
                            address={businessAddress}
                            businessName={businessName}
                            center={center}
                            aiText={
                                <div className="space-y-4">
                                    {thinkingPart}
                                    {mainContentPart}
                                </div>
                            }
                            showLogo={isFirstAI}
                            onConfirm={canConfirm ? (radius) => {
                                const msg = `${radius} km is perfect.`;
                                if (onSendMessage) onSendMessage(msg);
                                else sendMessage(msg);
                            } : undefined}
                        >
                            {children}
                        </WidgetRadiusSelection>
                    )}
                    {message.widget === "radius_heatmap" && (
                        <WidgetRadiusHeatmap
                            businessName={businessName}
                            businessAddress={businessAddress}
                            center={center}
                            aiText={
                                <div className="space-y-4">
                                    {thinkingPart}
                                    {mainContentPart}
                                </div>
                            }
                            showLogo={isFirstAI}
                            onConfirm={canConfirm ? (radius) => {
                                const msg = `${radius} km is perfect.`;
                                if (onSendMessage) onSendMessage(msg);
                                else sendMessage(msg);
                            } : undefined}
                        >
                            {children}
                        </WidgetRadiusHeatmap>
                    )}
                    {message.widget === "competitor_selection" && (
                        <WidgetCompetitorSelection
                            points={message.points}
                            title={(message as any).widget_title}
                            suggestions={(message as any).widget_suggestions}
                            businessName={businessName}
                            businessAddress={businessAddress}
                            center={center}
                            aiText={
                                <div className="space-y-4">
                                    {thinkingPart}
                                    {mainContentPart}
                                </div>
                            }
                            showLogo={isFirstAI}
                            onConfirm={canConfirm ? handleWidgetConfirm : undefined}
                        >
                            {children}
                        </WidgetCompetitorSelection>
                    )}
                    {message.widget === "selected_locations" && (
                        <WidgetSelectedLocations
                            locations={message.points}
                            center={center}
                            businessName={businessName}
                            businessAddress={businessAddress}
                            aiText={
                                <div className="space-y-4">
                                    {thinkingPart}
                                    {mainContentPart}
                                </div>
                            }
                            showLogo={isFirstAI}
                            onConfirm={canConfirm ? handleWidgetConfirm : undefined}
                        />
                    )}
                      {message.widget === "QuickQuestion" && (
                        <WIdgetQuickQuestion />
                    )}

                </div>
            </div>
        );
    }

    return (
        <div className="group w-full animate-fade-in font-body flex justify-start mb-10 max-w-4xl mx-auto px-1.5">
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


