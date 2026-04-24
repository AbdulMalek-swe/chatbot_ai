import React, { useEffect, useState } from 'react';
import { type MessageBlock } from '../../../types/chat';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Cpu } from 'lucide-react';

interface MessageBlockUIProps {
  block: MessageBlock;
}

export const MessageBlockUI: React.FC<MessageBlockUIProps> = ({ block }) => {
  const isAI = block.role === 'assistant' || block.role === 'system';
  
  const mainContentPart = (
    <div className={`w-full ${isAI ? "text-md leading-relaxed font-medium tracking-tight text-foreground/90" : "font-inter font-normal text-md leading-6 tracking-[0px] text-foreground"}`}>
      {block.status === 'streaming' && !block.content ? (
         <div className="flex flex-col gap-3 py-4">
           <div className="h-2 bg-slate-200 rounded-full w-[90%] animate-pulse"></div>
           <div className="h-2 bg-slate-200 rounded-full w-[70%] animate-pulse" style={{ animationDelay: "200ms" }}></div>
           <div className="h-2 bg-slate-200 rounded-full w-[50%] animate-pulse" style={{ animationDelay: "400ms" }}></div>
         </div>
      ) : isAI ? (
         <div className="chat-markdown max-w-none">
           <StreamingMarkdown content={block.content} isStreaming={block.status === 'streaming'} />
         </div>
      ) : (
         <div className="whitespace-pre-wrap text-left">
           {block.content}
         </div>
      )}
    </div>
  );

  const thinkingPart = block.thinking && isAI && (
    <div className="p-px rounded-2xl bg-gradient-moving shadow-xl overflow-hidden mt-2 w-full">
      <div className="bg-white/90 backdrop-blur-xl p-6 rounded-[14.5px]">
        <div className="flex items-center gap-2 text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] mb-4">
          <Cpu size={14} className="text-primary-400" />
          Cognitive Sequence
        </div>
        <div className="text-slate-600 text-[14px] italic whitespace-pre-wrap leading-relaxed font-medium font-body transition-all duration-300">
          {block.thinking}
        </div>
      </div>
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

  return (
    <div className="group w-full animate-fade-in font-body flex justify-start mb-10 max-w-4xl mx-auto px-1.5">
      <div className="w-full flex flex-row gap-4">
        <div className="shrink-0 flex items-center justify-center transition-all self-start">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 transition-transform group-hover:scale-110 duration-500 rounded-full" />
        </div>
        <div className="flex-1 flex flex-col gap-6 min-w-0">
           <div className="w-full">
             {thinkingPart}
             {mainContentPart}
           </div>
        </div>
      </div>
    </div>
  );
};

const StreamingMarkdown = ({ content, isStreaming }: { content: string, isStreaming: boolean }) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a> }}>
      {content}
    </ReactMarkdown>
  );
};
