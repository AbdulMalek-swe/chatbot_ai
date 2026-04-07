import React, { useRef, useState, useEffect } from "react";
import { ArrowUp, Plus, Image as ImageIcon, Mic, Settings, X, Loader2 } from "lucide-react";
import { useChat } from "../../contexts/ChatContext";
import api from "../../api/client";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const { activeThreadId } = useChat();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus(null);
    const formData = new FormData();
    formData.append("file", file);
    if (activeThreadId) {
      formData.append("thread_id", activeThreadId);
    }

    try {
      await api.post("/media/upload", formData);
      setUploadStatus("Uploaded!");
      setTimeout(() => setUploadStatus(null), 3000);
    } catch (error: any) {
      console.error("Upload failed", error);
      alert("Failed to upload media.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 rounded-t-[16px] rounded-b-[20px] bg-white shadow-sm border border-slate-200 pt-[16px] pr-[8px] pb-[8px] pl-[16px] flex flex-col gap-[20px] min-h-[108px] transition-all focus-within:shadow-md focus-within:border-slate-300">
      <div className="">
        <textarea
          ref={textareaRef}
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Find me dog owners in New York"
          className="w-full max-h-[200px] resize-none border-none p-0 bg-transparent text-slate-800 focus:outline-none focus:ring-0 text-base placeholder:text-slate-300 leading-relaxed active:border-none"
          disabled={disabled || isUploading}
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
              accept="image/*,video/*"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors"
            >
              <Plus size={20} />
            </button>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100 text-[12px] font-semibold text-slate-500 shadow-sm transition-all animate-fade-in">
              <ImageIcon size={14} className={uploadStatus ? "text-green-500" : "text-slate-400"} />
              <span>{uploadStatus || "Image"}</span>
              <button 
                className="ml-1 hover:text-red-500 transition-colors"
                onClick={() => setUploadStatus(null)}
              >
                <X size={12} />
              </button>
            </div>
            {isUploading && <Loader2 size={16} className="animate-spin text-slate-400" />}
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors">
              <Mic size={18} />
            </button>
            <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors">
              <Settings size={18} />
            </button>
            <button
              onClick={handleSubmit}
              disabled={!message.trim() || disabled || isUploading}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                message.trim() && !disabled && !isUploading
                  ? "bg-slate-900 text-white hover:bg-black shadow-md"
                  : "bg-slate-100 text-slate-300 cursor-not-allowed"
              }`}
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;

