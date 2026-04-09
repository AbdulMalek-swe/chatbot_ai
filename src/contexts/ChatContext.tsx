import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import api from '../api/client';
import { useAuth } from './AuthContext';

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
        if (!user) return;
        try {
            const response = await api.get('/chat/threads');
            setThreads(response.data.threads);
        } catch (error) {
            console.error('Failed to fetch threads', error);
        }
    }, [user]);

    const setActiveThread = useCallback(async (threadId: string) => {
        // Optimization: if switching to current thread and we already have messages, skip fetch
        if (threadId === activeThreadId && messages.length > 0) return;

        setLoading(true);
        setActiveThreadId(threadId);
        try {
            const response = await api.get(`/chat/history/${threadId}`);
            const messagesWithData = response.data.messages.map((m: any) => {
                const updated = { ...m };
                // Extract structured data from langchain_data if matches our new worker format
                if (m.langchain_data && typeof m.langchain_data === 'object' && !Array.isArray(m.langchain_data)) {
                    if (m.langchain_data.poi_data) updated.poi_data = m.langchain_data.poi_data;
                    if (m.langchain_data.campaign_plan) updated.campaign_plan = m.langchain_data.campaign_plan;
                    if (m.langchain_data.map_data) updated.map_data = m.langchain_data.map_data;
                }
                return updated;
            });
            setMessages(messagesWithData);
        } catch (error) {
            console.error('Failed to fetch history', error);
            setMessages([]);
        } finally {
            setLoading(false);
        }
    }, [activeThreadId, messages.length]);

    const createNewChat = useCallback(async (): Promise<string> => {
        setLoading(true);
        try {
            const response = await api.post('/chat/new');
            const { thread_id } = response.data;
            await refreshThreads();
            setActiveThreadId(thread_id);
            setMessages([]);
            return thread_id;
        } catch (error) {
            console.error('Failed to create new chat', error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [refreshThreads]);

    const resetChat = useCallback(() => {
        setActiveThreadId(null);
        setMessages([]);
    }, []);

    const deleteThread = useCallback(async (threadId: string): Promise<boolean> => {
        try {
            await api.delete(`/chat/thread/${threadId}`);
            await refreshThreads();
            setActiveThreadId((prev) => {
                if (prev === threadId) {
                    setMessages([]);
                    return null;
                }
                return prev;
            });
            return true;
        } catch (error) {
            console.error('Failed to delete thread', error);
            return false;
        }
    }, [refreshThreads]);

    const sendMessage = useCallback(async (content: string): Promise<string | null> => {
        if (!content.trim()) return null;

        let currentThreadId = activeThreadId;

        // Auto-create thread if none is active
        if (!currentThreadId) {
            try {
                const response = await api.post('/chat/new');
                currentThreadId = response.data.thread_id;
                setActiveThreadId(currentThreadId);
                await refreshThreads();
            } catch (error) {
                console.error('Failed to auto-create thread', error);
                return null;
            }
        }

        if (!currentThreadId) return null;

        // Add user message optimistically
        const userMsg: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'user',
            content,
            created_at: new Date().toISOString(),
        };
        setMessages(prev => [...prev, userMsg]);

        // Prepare assistant message placeholder
        const assistantMsgId = crypto.randomUUID();
        const assistantMsg: ChatMessage = {
            id: assistantMsgId,
            role: 'assistant',
            content: '',
            created_at: new Date().toISOString(),
        };
        setMessages(prev => [...prev, assistantMsg]);
        setStreaming(true);

        const token = localStorage.getItem('access_token');
        const baseurl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const controller = new AbortController();

        try {
            const response = await fetch(`${baseurl}/chat/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    thread_id: currentThreadId,
                    message: content,
                }),
                signal: controller.signal,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ detail: 'Failed to send message' }));
                throw new Error(errorData.detail || 'Failed to send message');
            }

            const reader = response.body?.getReader();
            if (!reader) throw new Error('No reader available');

            const decoder = new TextDecoder();
            let thinking = '';
            let fullContent = '';
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });

                // SSE events use newlines (split by \n and handle buffer)
                const lines = buffer.split('\n');
                buffer = lines.pop() || ''; // Buffer the last incomplete line

                for (const line of lines) {
                    const trimmedLine = line.trim();
                    if (!trimmedLine || !trimmedLine.startsWith('data: ')) continue;

                    const dataStr = trimmedLine.slice(6).trim();
                    if (!dataStr) continue;

                    try {
                        const data = JSON.parse(dataStr);

                        if (data.type === 'step') {
                            setCurrentStepLabel(data.label || data.step || null);
                        } else if (data.type === 'token') {
                            setCurrentStepLabel(null);
                            fullContent += data.content;
                            setMessages(prev => prev.map(m =>
                                m.id === assistantMsgId ? { ...m, content: fullContent } : m
                            ));
                        } else if (data.type === 'thinking') {
                            thinking += data.content;
                            setMessages(prev => prev.map(m =>
                                m.id === assistantMsgId ? { ...m, thinking } : m
                            ));
                        } else if (data.type === 'campaign_plan') {
                            setMessages(prev => prev.map(m =>
                                m.id === assistantMsgId ? { ...m, campaign_plan: data.data } : m
                            ));
                        } else if (data.type === 'poi_data') {
                            setMessages(prev => prev.map(m =>
                                m.id === assistantMsgId ? { ...m, poi_data: data.data } : m
                            ));
                        } else if (data.type === 'map_data') {
                            setMessages(prev => prev.map(m =>
                                m.id === assistantMsgId ? { ...m, map_data: data.data } : m
                            ));
                        } else if (data.type === 'requires_approval') {
                            setMessages(prev => prev.map(m =>
                                m.id === assistantMsgId ? { ...m, requires_approval: true } : m
                            ));
                        } else if (data.type === 'error') {
                            throw new Error(data.message || 'AI Error');
                        } else if (data.type === 'done') {
                            setCurrentStepLabel(null);
                            refreshThreads();
                        }
                    } catch (e) {
                        console.warn('Failed to parse SSE data chunk', e, dataStr);
                    }
                }
            }
            return currentThreadId;
        } catch (error) {
            if (error instanceof Error && error.name === 'AbortError') return currentThreadId;
            console.error('Streaming error', error);
            const errorMessage = error instanceof Error ? error.message : 'Chat server connection issues.';
            setMessages(prev => prev.map(m =>
                m.id === assistantMsgId ? { ...m, content: `Error: ${errorMessage}` } : m
            ));
            return currentThreadId;
        } finally {
            setStreaming(false);
        }
    }, [activeThreadId, refreshThreads]);

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
