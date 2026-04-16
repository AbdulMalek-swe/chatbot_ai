import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';
import { Sidebar, MessageList, ChatInput } from '../components/chat';
import api from '../api/client';
import { Loader2, Code, } from 'lucide-react';
import { chat_data } from '../constant/data';

const ChatPage = () => {
    const { threadId: paramsThreadId } = useParams<{ threadId: string }>();
    // const navigate = useNavigate();
    const { messages, loading, streaming, setActiveThread, activeThreadId, resetChat } = useChat();
    const [mounted, setMounted] = useState(false);
    const [campaignJson, setCampaignJson] = useState<any>(null);
    const [showDebug, setShowDebug] = useState(false);
    const [debugLoading, setDebugLoading] = useState(false);
    // const [isRawView, setIsRawView] = useState(false);
    const lastThreadId = useRef<string | undefined>(paramsThreadId);
    console.log(campaignJson, showDebug)
    const [newMessage, setNewMessage] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setNewMessage(chat_data[paramsThreadId ? Number(paramsThreadId) - 1 : 0].chat)
    }, [paramsThreadId])

    useEffect(() => {
        setMounted(true);
        const urlChanged = paramsThreadId !== lastThreadId.current;

        if (urlChanged) {
            if (paramsThreadId) {
                if (paramsThreadId !== activeThreadId) {
                    setActiveThread(paramsThreadId);
                }
            } else {
                if (activeThreadId) {
                    resetChat();
                }
            }
            lastThreadId.current = paramsThreadId;
        }
    }, [paramsThreadId, activeThreadId, setActiveThread, resetChat]);
   

    const handleSendMessage = (value: string) => {
        if (!value) return;

        // Find index of the question
        const index = newMessage.findIndex(
            (item: any) => item.content === value
        );

        if (index === -1) return;

        const question = newMessage[index];
        const answer = newMessage[index + 1];

        // Add question immediately
        setNewMessage((prev: any) => [...prev, question]);

        // Show bot typing
        setIsLoading(true);

        setTimeout(() => {
            if (answer) {
                setNewMessage((prev: any) => [...prev, answer]);
            }
            setIsLoading(false);
        }, 800);
    };

    const fetchCampaignStatus = async () => {
        if (!activeThreadId) return;
        setDebugLoading(true);
        try {
            const response = await api.get(`/chat/campaign/status/${activeThreadId}`);
            setCampaignJson(response.data);
            setShowDebug(true);
        } catch (error) {
            console.error('Failed to fetch campaign status', error);
            alert('No campaign found or error fetching status.');
        } finally {
            setDebugLoading(false);
        }
    };

    return (
        <div className={`font-body flex w-full h-screen overflow-hidden bg-[#CCCBC0] text-slate-900 relative transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <Sidebar />
            <div className="flex-1 p-4 flex flex-col overflow-hidden relative">
                <div className="flex-1 bg-chat-beige rounded-4xl flex flex-col overflow-hidden relative shadow-sm border border-slate-200/50">

                    <div className="absolute top-6 left-8 z-20">
                        <span className="px-3 py-1 bg-white rounded-lg text-[10px] font-bold text-slate-400 border border-slate-100 uppercase tracking-tighter">beta</span>
                    </div>

                    <div className="absolute top-6 right-8 z-20 flex items-center gap-3">
                        {activeThreadId && (
                            <button
                                onClick={fetchCampaignStatus}
                                disabled={debugLoading}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 border border-black/5 text-slate-600 hover:bg-white transition-all font-bold text-[10px] uppercase tracking-wider backdrop-blur-md"
                            >
                                {debugLoading ? <Loader2 size={12} className="animate-spin" /> : <Code size={12} />}
                                {debugLoading ? 'Syncing...' : 'Debug'}
                            </button>
                        )}
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-[10px] uppercase tracking-wider hover:bg-black transition-all shadow-lg">
                            <img src="/logo.png" alt="Upgrade" className="w-3 h-3 invert" />
                            Upgrade
                        </button>
                    </div>

                    {loading && !streaming ? (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="flex flex-col items-center gap-4 animate-fade-in">
                                <Loader2 className="w-8 h-8 text-slate-400 animate-spin" />
                            </div>
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col items-center pt-24 pb-12 px-6">
                            
                            <MessageList messages={newMessage} streaming={isLoading} />
                            <ChatInput onSendMessage={handleSendMessage} disabled={streaming} />
                           

                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
                        </div>
                    )}


                </div>

               
            </div>
        </div>
    );
};

export default ChatPage;
