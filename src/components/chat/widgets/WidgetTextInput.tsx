import { Send } from 'lucide-react';
import { useState } from 'react';
import type { PendingActionBlock } from '../../../types/chat';
import WidgetLayout from './WidgetLayout';

interface WidgetTextInputProps {
  content: PendingActionBlock['content'];
  onConfirm?: (value: string) => void;
}

export default function WidgetTextInput({
  content,
  onConfirm,
}: WidgetTextInputProps) {
  const [value, setValue] = useState(content.prefill || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onConfirm?.(value);
    }
  };

  return (
    <WidgetLayout mode="single">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-6 animate-fade-up">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
            <Send size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{content.prompt}</h3>
            <p className="text-sm text-slate-500 font-medium">Type your response below.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Type here..."
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium text-slate-900"
              autoFocus
            />
          </div>
          
          <button
            type="submit"
            disabled={!value.trim() || !onConfirm}
            className={`w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-md hover:bg-black transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 ${(!value.trim() || !onConfirm) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Submit Response
            <Send size={18} />
          </button>
        </form>
      </div>
    </WidgetLayout>
  );
}
