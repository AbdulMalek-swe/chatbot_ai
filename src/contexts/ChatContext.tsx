import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { swarma } from '../constant/data';

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    thinking?: string;
    campaign_plan?: any;
    poi_data?: any;
    map_data?: {
        pointer_id: string;
        total_count: number;
        pois_targeted: Array<{ lat: number, lng: number, radius_km: number }>;
        sample_maids: Array<{ maid: string, latitude: number, longitude: number }>;
    };
    requires_approval?: boolean;
    created_at: string;
    widget?: string;
    points?: any[]
}

export interface ChatThread {
    thread_id: string;
    title: string;
    status: string;
    created_at: string;
}

interface ChatContextType {
    threads: ChatThread[];
    messages: ChatMessage[];
    activeThreadId: string | null;
    loading: boolean;
    streaming: boolean;
    currentStepLabel: string | null;
    sendMessage: (content: string) => Promise<string | null>;
    createNewChat: () => Promise<string>;
    setActiveThread: (threadId: string) => Promise<void>;
    deleteThread: (threadId: string) => Promise<boolean>;
    refreshThreads: () => Promise<void>;
    resetChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [threads, setThreads] = useState<ChatThread[]>([]);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [streaming, setStreaming] = useState(false);
    const [currentStepLabel, setCurrentStepLabel] = useState<string | null>(null);

    // Reset state on logout
    useEffect(() => {
        if (!user) {
            setThreads([]);
            setMessages([]);
            setActiveThreadId(null);
            setLoading(false);
            setStreaming(false);
        } else {
            refreshThreads();
        }
    }, [user]);

    const refreshThreads = useCallback(async () => {
        // Mock threads
        setThreads([
            {
                thread_id: 'swarma-123',
                title: 'Shawarma Palace Campaign',
                status: 'active',
                created_at: new Date().toISOString()
            }
        ]);
    }, []);

    const setActiveThread = useCallback(async (threadId: string) => {
        if (threadId === activeThreadId && messages.length > 0) return;

        setLoading(true);
        setActiveThreadId(threadId);
        
        // Mock loading history
        setTimeout(() => {
            if (threadId === 'swarma-123') {
                setMessages(swarma as ChatMessage[]);
            } else {
                setMessages([]);
            }
            setLoading(false);
        }, 500);
    }, [activeThreadId, messages.length]);

    const createNewChat = useCallback(async (): Promise<string> => {
        setLoading(true);
        const newId = crypto.randomUUID();
        return new Promise((resolve) => {
            setTimeout(() => {
                setThreads(prev => [
                    {
                        thread_id: newId,
                        title: 'New Conversation',
                        status: 'active',
                        created_at: new Date().toISOString()
                    },
                    ...prev
                ]);
                setActiveThreadId(newId);
                setMessages([]);
                setLoading(false);
                resolve(newId);
            }, 500);
        });
    }, []);

    const resetChat = useCallback(() => {
        setActiveThreadId(null);
        setMessages([]);
    }, []);

    const deleteThread = useCallback(async (threadId: string): Promise<boolean> => {
        setThreads(prev => prev.filter(t => t.thread_id !== threadId));
        if (activeThreadId === threadId) {
            setActiveThreadId(null);
            setMessages([]);
        }
        return true;
    }, [activeThreadId]);

    const sendMessage = useCallback(async (content: string): Promise<string | null> => {
        if (!content.trim()) return null;

        let currentThreadId = activeThreadId;

        if (!currentThreadId) {
            currentThreadId = crypto.randomUUID();
            setActiveThreadId(currentThreadId);
            setThreads(prev => [
                {
                    thread_id: currentThreadId!,
                    title: content.slice(0, 30),
                    status: 'active',
                    created_at: new Date().toISOString()
                },
                ...prev
            ]);
        }

        // Add user message
        const userMsg: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'user',
            content,
            created_at: new Date().toISOString(),
        };
        setMessages(prev => [...prev, userMsg]);

        // Simulate AI thinking and streaming
        setStreaming(true);
        setCurrentStepLabel('Analyzing request...');
        
        setTimeout(() => {
            setCurrentStepLabel('Drafting strategy...');
            setTimeout(() => {
                setCurrentStepLabel(null);
                
                // Find matching response from swarma if possible, or generic one
                const mockResponse = swarma.find(m => m.role === 'assistant' && !messages.some(em => em.content === m.content)) 
                                    || { role: 'assistant', content: "That's an interesting point. Let me help you with that strategy." };

                const assistantMsgId = crypto.randomUUID();
                const assistantMsg: ChatMessage = {
                    ...mockResponse,
                    id: assistantMsgId,
                    role: 'assistant',
                    content: '', // Start empty for streaming
                    thinking: 'Simulated thinking process for demo...',
                    created_at: new Date().toISOString(),
                } as ChatMessage;

                // Stream the content manually
                let fullText = (mockResponse as any).content || '';
                let currentText = '';
                let i = 0;
                
                setMessages(prev => [...prev, assistantMsg]);

                const interval = setInterval(() => {
                    if (i < fullText.length) {
                        currentText += fullText[i];
                        setMessages(prev => prev.map(m => 
                            m.id === assistantMsgId ? { ...m, content: currentText } : m
                        ));
                        i++;
                    } else {
                        clearInterval(interval);
                        setStreaming(false);
                    }
                }, 30);
            }, 1000);
        }, 800);

        return currentThreadId;
    }, [activeThreadId, messages]);

    return (
        <ChatContext.Provider value={{
            threads,
            messages,
            activeThreadId,
            loading,
            streaming,
            currentStepLabel,
            sendMessage,
            createNewChat,
            setActiveThread,
            deleteThread,
            refreshThreads,
            resetChat
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};
