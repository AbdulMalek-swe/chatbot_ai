import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useAuth } from './AuthContext';
import type { Conversation, Block, ActionId, ChatMessage, SplitMapBlock } from '../types/chat';
import { findMockResponse, chat_data, findNextUserMessage } from '../constant/data';

interface ChatThread {
    thread_id: string;
    title: string;
    status: string;
    created_at: string;
}

interface ChatContextType {
    threads: ChatThread[];
    conversation: Conversation | undefined;
    activeThreadId: string | null;
    loading: boolean;
    streaming: boolean;
    currentStepLabel: string | null;
    updateBlock: (blockId: string, updater: (b: Block) => Block) => void;
    handleAction: (actionId: ActionId, payload?: any) => void;
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
    const [conversation, setConversation] = useState<Conversation | undefined>(undefined);
    const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [streaming, setStreaming] = useState(false);
    const [currentStepLabel, setCurrentStepLabel] = useState<string | null>(null);

    // Reset state on logout
    useEffect(() => {
        if (!user) {
            setThreads([]);
            setConversation(undefined);
            setActiveThreadId(null);
            setLoading(false);
            setStreaming(false);
        } else {
            refreshThreads();
        }
    }, [user]);

    const refreshThreads = useCallback(async () => {
        const historyThreads = chat_data.map(item => ({
            thread_id: item.id.toString(),
            title: item.title,
            status: 'active',
            created_at: new Date().toISOString()
        }));
        setThreads(historyThreads);
    }, []);

    const setActiveThread = useCallback(async (threadId: string) => {
        if (threadId === activeThreadId && conversation) return;

        setLoading(true);
        setActiveThreadId(threadId);
        
        setTimeout(() => {
            const mockThread = chat_data.find(t => t.id === threadId);
            if (mockThread) {
                setConversation({
                    id: threadId,
                    blocks: mockThread.chat
                });
            } else {
                setConversation({ id: threadId, blocks: [] });
            }
            setLoading(false);
        }, 500);
    }, [activeThreadId, conversation]);

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
                setConversation({ id: newId, blocks: [] });
                setLoading(false);
                resolve(newId);
            }, 500);
        });
    }, []);

    const resetChat = useCallback(() => {
        setActiveThreadId(null);
        setConversation(undefined);
    }, []);

    const deleteThread = useCallback(async (threadId: string): Promise<boolean> => {
        setThreads(prev => prev.filter(t => t.thread_id !== threadId));
        if (activeThreadId === threadId) {
            setActiveThreadId(null);
            setConversation(undefined);
        }
        return true;
    }, [activeThreadId]);

    const updateBlock = useCallback((blockId: string, updater: (b: Block) => Block) => {
        setConversation(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                blocks: prev.blocks.map(b => {
                    if (b.id === blockId) return updater(b);
                    if (b.type === 'split-map') {
                        if (b.chat.some(cb => cb.id === blockId)) {
                            return {
                                ...b,
                                chat: b.chat.map(cb => cb.id === blockId ? updater(cb as any) as any : cb)
                            };
                        }
                    }
                    return b;
                }),
            };
        });
    }, []);

    const handleAction = useCallback((actionId: ActionId, payload?: any) => {
        if (!conversation) return;

        switch (actionId) {
            case "SET_LOCATION":
                // Handle updating map center + mainLocation
                break;
            case "SET_RADIUS":
                // update radius layer
                break;
            case "TOGGLE_COMPETITOR":
                // toggle selected
                break;
            case "NEXT_STAGE":
                // move map.stage forward
                break;
            case "OPEN_FORM":
                // push FormBlock
                break;
            case "GENERATE_CAMPAIGN":
                // push CampaignBlock
                break;
        }
    }, [conversation]);

    const sendMessage = useCallback(async (content: string): Promise<string | null> => {
        if (!content.trim()) return null;

        let currentThreadId = activeThreadId;

        if (!currentThreadId || !conversation) {
            currentThreadId = crypto.randomUUID();
            setActiveThreadId(currentThreadId);
            setConversation({ id: currentThreadId, blocks: [] });
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

        const userBlockId = crypto.randomUUID();
        setConversation(prev => {
            const blocks = [...prev!.blocks];
            const lastBlock = blocks[blocks.length - 1];
            
            const userMsg: Block = {
                id: userBlockId,
                type: 'message',
                role: 'user',
                content,
                status: 'complete',
                createdAt: new Date().toISOString(),
            };

            if (lastBlock?.type === 'split-map') {
                lastBlock.chat = [...lastBlock.chat, userMsg as any];
            } else {
                blocks.push(userMsg);
            }
            return { id: prev!.id, blocks };
        });

        setStreaming(true);
        setCurrentStepLabel('Analyzing request...');
        
        setTimeout(() => {
            setCurrentStepLabel('Drafting strategy...');
            setTimeout(() => {
                setCurrentStepLabel(null);
                
                const result = findMockResponse(content);
                const mockResponse = result?.answer || { 
                    role: 'assistant', 
                    content: "I've analyzed that parameter. Let's proceed with the optimization. Is there anything else you'd like to adjust?" 
                };
                const parentBlock = result?.parent;

                const assistantMsgId = crypto.randomUUID();
                const assistantMsg: Block = {
                    id: assistantMsgId,
                    type: 'message',
                    role: 'assistant',
                    content: '', // Start empty for streaming
                    status: 'streaming',
                    createdAt: new Date().toISOString(),
                    thinking: 'Simulated thinking process for demo...'
                };
                
                setConversation(prev => {
                    const blocks = [...prev!.blocks];
                    const lastBlock = blocks[blocks.length - 1];

                    if (parentBlock && parentBlock.type === 'split-map') {
                        if (lastBlock?.type === 'split-map' && lastBlock.id === parentBlock.id) {
                            // Append to existing split map
                            lastBlock.chat = [...lastBlock.chat, assistantMsg as any];
                        } else {
                            // Start new split map stage
                            const newSplitMap: SplitMapBlock = {
                                ...parentBlock,
                                chat: [assistantMsg as any] // Only insert the assistant msg for now
                            };
                            blocks.push(newSplitMap);
                        }
                    } else if (lastBlock?.type === 'split-map') {
                        // Keep appending to active split-map
                        lastBlock.chat = [...lastBlock.chat, assistantMsg as any];
                    } else {
                        // Normal top level append
                        blocks.push(assistantMsg);
                    }
                    return { id: prev!.id, blocks };
                });

                // Stream the content manually
                let fullText = (mockResponse as any).content || '';
                let currentText = '';
                let i = 0;
                
                const interval = setInterval(() => {
                    if (i < fullText.length) {
                        currentText += fullText[i];
                        updateBlock(assistantMsgId, (b) => ({
                            ...b,
                            content: currentText
                        }));
                        i++;
                    } else {
                        clearInterval(interval);
                        updateBlock(assistantMsgId, (b) => ({
                            ...b,
                            status: 'complete'
                        }));
                        setStreaming(false);

                        // If the mock response wasn't a text message (e.g. a widget), we need to handle it.
                        // Currently streaming assumes text. 
                        // To keep it simple, we just leave it for now.
                        
                        const nextUserMsg = findNextUserMessage(fullText);
                        if (nextUserMsg) {
                            setTimeout(() => {
                                sendMessage(nextUserMsg);
                            }, 1000);
                        }
                    }
                }, 30);
            }, 1000);
        }, 800);

        return currentThreadId!;
    }, [activeThreadId, conversation, updateBlock]);

    return (
        <ChatContext.Provider value={{
            threads,
            conversation,
            activeThreadId,
            loading,
            streaming,
            currentStepLabel,
            updateBlock,
            handleAction,
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
