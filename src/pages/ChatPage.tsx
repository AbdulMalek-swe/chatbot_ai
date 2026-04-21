import { Loader2, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChatInput, MessageList, Sidebar } from '../components/chat';
import PrimaryBtn from '../components/shared/PrimaryBtn';
import { chat_data, findMockResponse } from '../constant/data';
import { useChat } from '../contexts/ChatContext';

const ChatPage = () => {
  const { threadId: paramsThreadId } = useParams<{ threadId: string }>();
  const navigate = useNavigate();
  const {
    messages: contextMessages,
    loading,
    streaming,
    setActiveThread,
    activeThreadId,
    resetChat,
  } = useChat();
  const [mounted, setMounted] = useState(false);

  // NEW LOGIC: Unified message state
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFlow, setActiveFlow] = useState<any[] | null>(null);
  const [isNewChat, setIsNewChat] = useState(true);
  const lastThreadId = useRef<string | undefined>(paramsThreadId);

  // Sync with chat_data when threadId changes
  useEffect(() => {
    if (paramsThreadId) {
      const threadIndex = Number(paramsThreadId) - 1;
      if (chat_data[threadIndex]) {
        const thread = chat_data[threadIndex];
        setMessages(thread.chat);
        setActiveFlow(thread.chat);
        setIsNewChat(false); // Loading history
      }
    } else {
      setMessages([]);
      setActiveFlow(null);
      setIsNewChat(true); // New chat
    }
  }, [paramsThreadId]);

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

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    setIsNewChat(true); // User is actively chatting, mark as new

    // Add user message immediately
    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      content,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    setTimeout(() => {
      let mock: any = null;

      // 1. Check if we're already in a specific conversation flow
      if (activeFlow) {
        const normalizedSearch = content.toLowerCase().trim();
        const currentIndex = activeFlow.findIndex(
          (m) =>
            m.content.toLowerCase().includes(normalizedSearch) ||
            normalizedSearch.includes(m.content.toLowerCase()),
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
          // Optionally update URL if we found a new thread match
          // navigate(`/chat/${result.id}`);
        }
      }

      // 3. Update messages with the found response or a fallback
      if (mock) {
        setMessages((prev) => [
          ...prev,
          {
            ...mock.answer,
            id: (Date.now() + 1).toString(),
            created_at: new Date().toISOString(),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content:
              "I've analyzed your request. Based on current market benchmarks, I suggest refining your audience parameters. Would you like to proceed with a draft campaign plan?",
            created_at: new Date().toISOString(),
          },
        ]);
      }
      setIsLoading(false);
    }, 800);
  };

  const trendingPrompts = [
    'I own a shawarma shop in a very busy area downtown.',
    'I just vibecoded a CRM built for tattoo artists.',
    'I manage a punk rock band. We are going on tour in a few months.',
    "I'm a real estate agent, I run free home valuation ads at home sellers.",
  ];

  return (
    <div
      className={`font-body flex w-full h-screen overflow-hidden bg-[#CCCBC0] text-slate-900 relative transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}
    >
      <Sidebar />
      <div className="flex-1 p-2 flex flex-col overflow-hidden relative">
        <div className="flex-1 bg-chat-beige rounded-3xl flex flex-col overflow-hidden relative shadow-sm border border-slate-200/50">
          <div className="sticky top-0 z-20 bg-linear-to-b from-chat-beige via-chat-beige to-transparent pt-6 px-8 pb-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-2 bg-white rounded-lg lowercase">
                beta
              </span>
              <div className="flex items-center gap-3">
                <PrimaryBtn>
                  <img src="/upgrade.png" alt="Upgrade" className="w-7 h-7" />
                  Upgrade
                </PrimaryBtn>
              </div>
            </div>
          </div>

          {loading && !streaming ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4 animate-fade-in">
                <Loader2 className="w-8 h-8 text-slate-400 animate-spin" />
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col items-center pt-12 pb-12 px-6">
              <div className="flex items-center gap-4 mb-10">
                <img src="/logo.png" alt="Punk Logo" className="w-14 h-14" />
                <h1 className="text-4xl sm:text-[45px] font-mono text-slate-900 tracking-[-0.04em]">
                  Target your next buyer.
                </h1>
              </div>

              <div className="w-full max-w-2xl">
                <ChatInput
                  onSendMessage={handleSendMessage}
                  disabled={isLoading}
                />
              </div>

              <div className="w-full max-w-2xl mt-12">
                <h2 className="text-sm font-bold text-slate-800 mb-4">
                  Trending prompts:
                </h2>
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
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden min-h-0 relative">
              <div className="flex-1 overflow-y-auto custom-scrollbar  pt-4">
                <MessageList
                  messages={messages}
                  streaming={isLoading}
                  isNewChat={isNewChat}
                  onSendMessage={handleSendMessage}
                />
              </div>

              <ChatInput
                onSendMessage={handleSendMessage}
                disabled={isLoading}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
