import { ArrowUp, Loader2, Mic, Plus, Settings } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import api from '../../api/client';
import { useChat } from '../../contexts/ChatContext';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { activeThreadId } = useChat();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
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
    formData.append('file', file);
    if (activeThreadId) {
      formData.append('thread_id', activeThreadId);
    }

    try {
      await api.post('/media/upload', formData);
      setUploadStatus('Uploaded!');
      setTimeout(() => setUploadStatus(null), 3000);
    } catch (error: any) {
      console.error('Upload failed', error);
      alert('Failed to upload media.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  return (
    <div className="w-full max-w-4xl mx-auto mb-2 rounded-2xl bg-white shadow-sm border border-slate-200 px-4 py-3 flex items-center gap-3 transition-all focus-within:shadow-md focus-within:border-slate-300">
      {/* Plus Icon */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileUpload}
        accept="image/*,video/*"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors flex-shrink-0"
        title="Add attachment"
      >
        <Plus size={20} />
      </button>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        rows={1}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 h-10 max-h-22 resize-none border-none p-0 bg-transparent text-slate-800 focus:outline-none focus:ring-0 text-base placeholder:text-slate-400 leading-relaxed overflow-y-auto"
        disabled={disabled || isUploading}
      />

      {/* Right Side Buttons */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {isUploading && (
          <Loader2 size={16} className="animate-spin text-slate-400" />
        )}
        <button
          className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors"
          title="Voice message"
        >
          <Mic size={18} />
        </button>
        <button
          className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors"
          title="Settings"
        >
          <Settings size={18} />
        </button>
        <button
          onClick={handleSubmit}
          disabled={!message.trim() || disabled || isUploading}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
            message.trim() && !disabled && !isUploading
              ? 'bg-slate-900 text-white hover:bg-black shadow-md'
              : 'bg-slate-100 text-slate-300 cursor-not-allowed'
          }`}
          title="Send message"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
