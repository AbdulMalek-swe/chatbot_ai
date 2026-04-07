import React, { useRef, useEffect } from 'react';
import { type ChatMessage, useChat } from '../../contexts/ChatContext';
import { useAuth } from '../../contexts/AuthContext';
import MessageBubble from './MessageBubble';

interface MessageListProps {
    messages: ChatMessage[];
    streaming: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, streaming }) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const { user } = useAuth();
    const { sendMessage } = useChat();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, streaming]);

    const handleQuickAction = (text: string) => {
        sendMessage(text);
    };

    return (
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide py-6 font-body mt-12 lg:mt-0">
            <div className="flex flex-col px-4 pt-12 sm:pt-20">
                {messages.length === 0 ? (
                    <div className="flex-1 flex flex-col items-start justify-end pb-12 text-left max-w-4xl mx-auto animate-fade-in w-full">
                        <div className="flex items-center gap-3 sm:gap-4 mb-6">
                            <div className="w-8 h-8 transition-transform hover:scale-110 duration-500">
                                <img src="/logo.png" alt="Punk AI" className="w-full h-full" />
                            </div>
                            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                                Welcome back, <span className="text-primary-600">{user?.full_name?.split(' ')[0] || 'User'}</span>
                            </h2>
                        </div>

                        <p className="text-[#86868b] text-[13px] sm:text-[14px] mb-8 font-medium max-w-xl">
                            How shall we optimize your advertising infrastructure today? Select a neural protocol below or initiate a custom query.
                        </p>

                        <div className="flex flex-col gap-4 w-full max-w-md">
                            {[
                                { text: 'Plan a high-conversion multi-channel campaign' },
                                { text: 'Analyze my current ads for better performance' },
                                { text: 'Identify my most profitable customer segments' },
                                { text: 'Generate high-impact ad copy and headlines' }
                            ].map((item, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleQuickAction(item.text)}
                                    style={{ animationDelay: `${i * 100}ms` }}
                                    className=" px-5 py-3 rounded-xl text-left transition-all group active:scale-[0.98] flex items-center justify-between gap-4 animate-popup btn-gradient-border"
                                >
                                    <div className="flex flex-col">
                                        {/* <span className="text-[9px] font-black text-primary-400 group-hover:text-white transition-colors uppercase tracking-[0.2em] mb-0.5">{item.label}</span> */}
                                        <span className="text-[12px] md:text-[13px] lg:text-[14px] text-foreground transition-colors">{item.text}</span>
                                    </div>
                                    <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-[10px] text-slate-400">→</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto w-full space-y-4">
                        {messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)}
                        <div ref={bottomRef} className="h-24" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageList;
