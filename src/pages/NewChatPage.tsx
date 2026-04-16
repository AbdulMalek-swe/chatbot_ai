import { useState, useEffect } from 'react';
import { Sidebar, MessageList, ChatInput } from '../components/chat';
import { findMockResponse } from '../constant/data';
import { Zap } from 'lucide-react';

const NewChatPage = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeFlow, setActiveFlow] = useState<any[] | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSendMessage = (content: string) => {
        if (!content.trim()) return;
        
        // Add user message immediately
        const userMsg = { 
            id: Date.now().toString(), 
            role: 'user', 
            content 
        };
        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        setTimeout(() => {
            let mock: any = null;
            
            // 1. Check if we're already in a specific conversation flow
            if (activeFlow) {
                const normalizedSearch = content.toLowerCase().trim();
                const currentIndex = activeFlow.findIndex(m => 
                    m.content.toLowerCase().includes(normalizedSearch) || 
                    normalizedSearch.includes(m.content.toLowerCase())
                );
                
                if (currentIndex !== -1) {
                    // Look for the next message from the assistant in this flow
                    for (let i = currentIndex + 1; i < activeFlow.length; i++) {
                        if (activeFlow[i].role === 'assistant') {
                            mock = { answer: activeFlow[i] };
                            break;
                        }
                    }
                }
            }
            
            // 2. If no matching flow response found, search all conversation data
            if (!mock) {
                const result = findMockResponse(content);
                if (result) {
                    setActiveFlow(result.fullChat);
                    mock = { answer: result.answer };
                }
            }

            // 3. Update messages with the found response or a fallback
            if (mock) {
                setMessages(prev => [...prev, { 
                    ...mock.answer, 
                    id: (Date.now() + 1).toString(),
                    created_at: new Date().toISOString()
                }]);
            } else {
                setMessages(prev => [...prev, { 
                    id: (Date.now() + 1).toString(), 
                    role: 'assistant', 
                    content: "I've analyzed your situation. Based on current market signals, I recommend a cross-channel targeting approach. Would you like to see a drafted campaign plan or shall we refine the audience parameters first?",
                    created_at: new Date().toISOString()
                }]);
            }
            setIsLoading(false);
        }, 1000);
    };

    const trendingPrompts = [
        "I own a shawarma shop in a very busy area downtown.",
        "I just vibecoded a CRM built for tattoo artists.",
        "I manage a punk rock band. We are going on tour in a few months.",
        "I'm a real estate agent, I run free home valuation ads at home sellers."
    ];

    return (
        <div className={`font-body flex w-full h-screen overflow-hidden bg-[#CCCBC0] text-slate-900 relative transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <Sidebar />
            <div className="flex-1 p-4 flex flex-col overflow-hidden relative">
                <div className="flex-1 bg-chat-beige rounded-4xl flex flex-col overflow-hidden relative shadow-sm border border-slate-200/50">
                    
                    <div className="absolute top-6 left-8 z-20">
                        <span className="px-3 py-1 bg-white rounded-lg text-[10px] font-bold text-slate-400 border border-slate-100 uppercase tracking-tighter">beta</span>
                    </div>

                    <div className="absolute top-6 right-8 z-20 flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-[10px] uppercase tracking-wider hover:bg-black transition-all shadow-lg">
                            <img src="/logo.png" alt="Upgrade" className="w-3 h-3 invert" />
                            Upgrade
                        </button>
                    </div>

                    {messages.length === 0 ? (
                        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col items-center pt-24 pb-12 px-6">
                            <div className="flex items-center gap-4 mb-10">
                                <img src="/logo.png" alt="Punk Logo" className="w-14 h-14" />
                                <h1 className="text-4xl sm:text-[45px] font-mono text-slate-900 tracking-[-0.04em]">Target your next buyer.</h1>
                            </div>

                            <div className="w-full max-w-2xl">
                                <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
                            </div>

                            <div className="w-full max-w-2xl mt-12">
                                <h2 className="text-sm font-bold text-slate-800 mb-4">Trending prompts:</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {trendingPrompts.map((prompt, i) => (
                                        <div 
                                            key={i} 
                                            onClick={() => handleSendMessage(prompt)}
                                            className="bg-white/60 p-5 rounded-[1.25rem] shadow-sm border border-slate-200/50 flex flex-col gap-4 hover:bg-white transition-colors cursor-pointer group"
                                        >
                                            <div className="w-6 h-6 flex items-center justify-center text-slate-400 group-hover:text-amber-500 transition-colors">
                                                <Zap size={18} />
                                            </div>
                                            <p className="text-[13px] font-medium text-slate-600 leading-relaxed font-body line-clamp-2">
                                                "{prompt}"
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full max-w-2xl mt-12 pb-12">
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
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col overflow-hidden min-h-0 relative">
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                                <MessageList messages={messages} streaming={isLoading} />
                            </div>
                            <div className="p-6 bg-linear-to-t from-chat-beige via-chat-beige to-transparent">
                                <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewChatPage;
