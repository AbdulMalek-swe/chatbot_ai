import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';
import Sidebar from '../components/chat/Sidebar';
import MessageList from '../components/chat/MessageList';
// import ChatInput from '../components/chat/ChatInput';
import api from '../api/client';
import { Loader2, Code, } from 'lucide-react';
// import AgentStateView from '../components/chat/AgentStateView';
import { chat_data } from '../constant/data';
import ChatInput from '../components/chat/ChatInput';

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

    const handleSendMessage = async () => {
        // const threadId = await sendMessage(content);
        // if (threadId && !paramsThreadId) {
        //     navigate(`/chat/${threadId}`);
        // }
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
    console.log(paramsThreadId)
    return (
        <div className={`font-body flex w-full h-screen overflow-hidden bg-[#CCCBC0] text-slate-900 relative transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <Sidebar />
            <div className="flex-1 p-4 flex flex-col overflow-hidden relative">
                <div className="flex-1 bg-chat-beige rounded-[2rem] flex flex-col overflow-hidden relative shadow-sm border border-slate-200/50">

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
                            <div className="flex items-center gap-4 mb-2">
                                <img src="/logo.png" alt="Punk Logo" className="w-14 h-14" />
                                <h1 className="text-4xl sm:text-[45px] font-mono text-slate-900 tracking-[-0.04em]">Target your next buyer.</h1>
                            </div>

                            {/* <div className="w-full max-w-2xl mt-10">
                                <ChatInput onSendMessage={handleSendMessage} disabled={streaming} />

                            </div> */}``
                            <MessageList messages={chat_data[paramsThreadId ? Number(paramsThreadId) - 1 : 0].chat} streaming={true} />
                            <ChatInput onSendMessage={handleSendMessage} disabled={streaming} />
                            {/* <div className="w-full max-w-2xl mt-12">
                                <h2 className="text-sm font-bold text-slate-800 mb-4">Trending prompts:</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {[
                                        "\"Target my competitor's customer\"",
                                        "\"Target people seen at Starbucks\"",
                                        "\"Reach high income women in my city\""
                                    ].map((prompt, i) => (
                                        <div key={i} className="bg-white/60 p-5 rounded-[1.25rem] shadow-sm border border-slate-200/50 flex flex-col gap-4 hover:bg-white transition-colors cursor-pointer group">
                                            <div className="w-6 h-6 flex items-center justify-center text-slate-400 group-hover:text-amber-500 transition-colors">
                                                <Zap size={18} />
                                            </div>
                                            <p className="text-[13px] font-medium text-slate-600 leading-relaxed font-body">
                                                {prompt}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div> */}

                            {/* <div className="w-full max-w-2xl mt-12 pb-12">
                                <h2 className="text-sm font-bold text-slate-800 mb-6">Punk finds your audience using:</h2>
                                <div className="flex flex-col gap-2">
                                    {[
                                        { title: "Search behavior", desc: "What they look up online." },
                                        { title: "Location patterns", desc: "Places they visit in real life." },
                                        { title: "Purchase intent", desc: "What they're eager to buy or switch." },
                                        { title: "Real-world visitation", desc: "Where they regularly shop and browse." },
                                        { title: "Household and lifestyle data", desc: "Demographic and daily signals." }
                                    ].map((item, i) => (
                                        <div key={i} className="bg-slate-900/5 hover:bg-slate-900/10 transition-colors p-3.5 px-5 rounded-xl border border-slate-200/40 flex items-center gap-2 group">
                                            <span className="text-[13px] font-bold text-slate-800">{item.title} —</span>
                                            <span className="text-[12px] text-slate-500 font-medium">{item.desc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div> */}

                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
                            {/* <MessageList messages={messages} streaming={streaming} /> */}
                            {/* <ChatInput onSendMessage={handleSendMessage} disabled={streaming} /> */}
                        </div>
                    )}


                </div>

                {/* {showDebug && campaignJson && (
                    <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-xl z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in transition-all duration-500">
                        <div className="w-full max-w-5xl h-[90vh] lg:h-[85vh] bg-white/90 rounded-[28px] border border-slate-200/60 flex flex-col overflow-hidden shadow-[0_32px_128px_-16px_rgba(0,0,0,0.1)] animate-popup border-t-primary-500/40 relative">
                         
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />

                            <div className="flex items-center justify-between p-4 sm:p-7 border-b border-slate-100 bg-slate-50/50 backdrop-blur-sm">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center border border-primary-200 shadow-sm">
                                        <Cpu size={18} className="text-primary-600" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] sm:text-xs font-black text-slate-800 uppercase tracking-[0.25em]">Neural Data Dump</span>
                                            <span className="px-1.5 py-0.5 rounded text-[8px] bg-primary-500/10 text-primary-700 border border-primary-500/20 font-bold uppercase">System-Level</span>
                                        </div>
                                        <p className="text-[10px] text-slate-400 mt-0.5 font-medium tracking-tight">Active Thread: {activeThreadId}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setIsRawView(!isRawView)}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-[10px] font-bold uppercase tracking-wider ${isRawView
                                            ? 'bg-primary-500/10 border-primary-500/30 text-primary-700 shadow-sm'
                                            : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'
                                            }`}
                                    >
                                        <Database size={12} />
                                        {isRawView ? 'Visual View' : 'Raw JSON'}
                                    </button>
                                    <button
                                        onClick={() => setShowDebug(false)}
                                        className="p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600 border border-slate-100 bg-white"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-auto p-4 sm:p-10 custom-scrollbar bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary-rgb),0.03)_0%,transparent_70%)]">
                                {isRawView ? (
                                    <div className="relative group">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/5 to-transparent blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                        <pre className="relative text-[11px] sm:text-[13px] font-mono text-primary-800 leading-relaxed bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 overflow-x-auto whitespace-pre-wrap break-all shadow-sm">
                                            {JSON.stringify(campaignJson, null, 2)}
                                        </pre>
                                    </div>
                                ) : (
                                    <AgentStateView data={campaignJson} />
                                )}
                            </div>

                            <div className="p-4 sm:p-7 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
                                <div className="flex items-center gap-6">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1">Worker Node</span>
                                        <span className="text-[11px] text-primary-700 font-mono font-bold">{campaignJson?.agent_state?.next_worker || 'Idle'}</span>
                                    </div>
                                    <div className="h-8 w-px bg-slate-200" />
                                    <div className="flex flex-col">
                                        <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1">Sync Status</span>
                                        <span className="text-[11px] text-green-600 font-mono font-bold">Synchronized</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowDebug(false)}
                                    className="px-8 py-3 rounded-xl bg-slate-900 text-white font-black text-[11px] uppercase tracking-[0.2em] hover:bg-black transition-all active:scale-95 shadow-lg"
                                >
                                    Dismiss Analysis
                                </button>
                            </div>
                        </div>
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default ChatPage;
