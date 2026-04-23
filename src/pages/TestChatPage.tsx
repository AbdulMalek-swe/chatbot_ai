import { Loader2, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatInput, MessageList, Sidebar } from "../components/chat";
import PrimaryBtn from "../components/shared/PrimaryBtn";
import {
  chat_data,
  findMockResponse,
  type MockChatMessage,
} from "../constant/data";
import { type ChatMessage, useChat } from "../contexts/ChatContext";

type FlowMatch = {
  answers: Array<ChatMessage & { newIndex: number }>;
  newIndex: number;
};

type MockFlowResponse = {
  question: MockChatMessage;
  answer: MockChatMessage;
  fullChat: MockChatMessage[];
  currentIndex: number;
};

const toChatMessage = (msg: MockChatMessage): ChatMessage => ({
  id: msg.id,
  role: msg.role === "assistant" ? "assistant" : "user",
  content: msg.content,
  created_at: msg.created_at || new Date().toISOString(),
  widget: msg.widget,
  points: msg.points,
});

const toChatFlow = (flow: MockChatMessage[]): ChatMessage[] =>
  flow.map(toChatMessage);

const TestChatPage = () => {
  const { threadId: paramsThreadId } = useParams<{ threadId: string }>();
  const { loading, streaming, setActiveThread, activeThreadId, resetChat } =
    useChat();
  const [mounted, setMounted] = useState(false);

  // LOGIC: Unified message state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFlow, setActiveFlow] = useState<ChatMessage[] | null>(null);
  const [currentMockIndex, setCurrentMockIndex] = useState<number>(-1);
  const [isNewChat, setIsNewChat] = useState(true);
  const lastThreadId = useRef<string | undefined>(paramsThreadId);

  useEffect(() => {
    console.log("[TestChatPage] route thread changed", {
      paramsThreadId,
      activeThreadId,
      lastThreadId: lastThreadId.current,
    });
  }, [paramsThreadId, activeThreadId]);

  // Sync with chat_data when threadId changes
  useEffect(() => {
    const applyThreadState = () => {
      if (paramsThreadId) {
        const threadIndex = Number(paramsThreadId) - 1;
        if (chat_data[threadIndex]) {
          const thread = chat_data[threadIndex];
          const mappedThread = toChatFlow(thread.chat);
          setMessages(mappedThread);
          setActiveFlow(mappedThread);
          setCurrentMockIndex(mappedThread.length - 1);
          setIsNewChat(false); // Loading history
          console.log("[TestChatPage] loaded thread history", {
            paramsThreadId,
            threadIndex,
            messageCount: mappedThread.length,
          });
        }
      } else {
        setMessages([]);
        setActiveFlow(null);
        setCurrentMockIndex(-1);
        setIsNewChat(true); // New chat
        console.log("[TestChatPage] reset to new chat state");
      }
    };

    queueMicrotask(applyThreadState);
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

  const normalizeText = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const isSimilarMessage = (input: string, target: string) => {
    const normalizedInput = normalizeText(input);
    const normalizedTarget = normalizeText(target);

    if (!normalizedInput || !normalizedTarget) return false;

    const inputTokens = new Set(normalizedInput.split(" ").filter(Boolean));
    const targetTokens = new Set(normalizedTarget.split(" ").filter(Boolean));
    let overlap = 0;

    inputTokens.forEach((token) => {
      if (targetTokens.has(token)) overlap++;
    });

    const overlapScore =
      targetTokens.size > 0 ? overlap / targetTokens.size : 0;

    return (
      normalizedTarget.includes(normalizedInput) ||
      normalizedInput.includes(normalizedTarget) ||
      overlapScore >= 0.5
    );
  };

  const collectAssistantResponses = (
    flow: ChatMessage[],
    startFromIndex: number,
  ): FlowMatch | null => {
    const answers: Array<ChatMessage & { newIndex: number }> = [];
    let lastIdx = -1;

    for (let i = startFromIndex; i < flow.length; i++) {
      if (flow[i].role === "assistant") {
        answers.push({ ...flow[i], newIndex: i });
        lastIdx = i;
      } else if (flow[i].role === "user" && answers.length > 0) {
        break;
      }
    }

    if (answers.length === 0) return null;
    return { answers, newIndex: lastIdx };
  };

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    console.log("[TestChatPage] handleSendMessage", {
      content,
      paramsThreadId,
      hasActiveFlow: Boolean(activeFlow),
      currentMockIndex,
    });

    setIsNewChat(true); // User is actively chatting, mark as new

    // Add user message immediately
    const userMsg = {
      id: Date.now().toString(),
      role: "user" as const,
      content,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    setTimeout(() => {
      let mock: FlowMatch | null = null;

      // 1. Check if we're already in a specific conversation flow
      if (activeFlow) {
        const startIndex = Math.max(0, currentMockIndex + 1);

        // Prefer the immediate next expected user turn in this flow.
        const expectedUserIndex = activeFlow.findIndex(
          (m, index) => index >= startIndex && m.role === "user",
        );

        if (
          expectedUserIndex !== -1 &&
          isSimilarMessage(content, activeFlow[expectedUserIndex].content)
        ) {
          console.log("[TestChatPage] matched expected next user turn", {
            expectedUserIndex,
          });
          mock = collectAssistantResponses(activeFlow, expectedUserIndex + 1);
        }

        // If expected turn does not match, do a forward scan for the best matching user turn.
        if (!mock) {
          let matchIndex = -1;
          for (let i = startIndex; i < activeFlow.length; i++) {
            const m = activeFlow[i];
            if (m.role === "user" && isSimilarMessage(content, m.content)) {
              matchIndex = i;
              break;
            }
          }

          if (matchIndex !== -1) {
            console.log("[TestChatPage] matched forward-scanned user turn", {
              matchIndex,
            });
            mock = collectAssistantResponses(activeFlow, matchIndex + 1);
          }
        }
      }

      // 2. If no matching flow response found, search all conversation data
      if (!mock) {
        // Keep fallback within the currently selected thread to avoid jumping into another conversation.
        const activeThreadIndex = paramsThreadId
          ? Number(paramsThreadId) - 1
          : -1;
        const currentThread =
          activeThreadIndex >= 0 ? chat_data[activeThreadIndex] : undefined;

        if (currentThread) {
          const mappedFlow = toChatFlow(currentThread.chat);
          const startIndex = Math.max(0, currentMockIndex + 1);

          for (let i = startIndex; i < mappedFlow.length; i++) {
            if (
              mappedFlow[i].role === "user" &&
              isSimilarMessage(content, mappedFlow[i].content)
            ) {
              console.log("[TestChatPage] matched message in current thread", {
                matchedIndex: i,
                startIndex,
                threadId: paramsThreadId,
              });
              mock = collectAssistantResponses(mappedFlow, i + 1);
              break;
            }
          }
        } else {
          const result = findMockResponse(content) as MockFlowResponse | null;
          if (result) {
            const mappedFlow = toChatFlow(result.fullChat);
            setActiveFlow(mappedFlow);
            console.log(
              "[TestChatPage] fallback global mock response matched",
              {
                resultCurrentIndex: result.currentIndex,
                flowLength: mappedFlow.length,
              },
            );
            mock = collectAssistantResponses(mappedFlow, result.currentIndex);
          }
        }
      }

      // 3. Update messages with the found response or a fallback
      if (mock) {
        setCurrentMockIndex(mock.newIndex);
        console.log("[TestChatPage] assistant response resolved", {
          responseCount: mock.answers.length,
          newIndex: mock.newIndex,
        });
        const newMessages = mock.answers.map((ans, idx: number) => ({
          ...ans,
          id: (Date.now() + idx + 1).toString(),
          created_at: new Date().toISOString(),
        }));
        setMessages((prev) => [...prev, ...newMessages]);
      } else {
        console.log("[TestChatPage] no mock match, using generic fallback");
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
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
    "I own a shawarma shop in a very busy area downtown.",
    "I just vibecoded a CRM built for tattoo artists.",
    "I manage a punk rock band. We are going on tour in a few months.",
    "I'm a real estate agent, I run free home valuation ads at home sellers.",
  ];

  return (
    <div
      className={`font-body flex w-full h-screen overflow-hidden bg-[#CCCBC0] text-slate-900 relative transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}
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

export default TestChatPage;
