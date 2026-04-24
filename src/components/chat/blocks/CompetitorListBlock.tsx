import React from 'react';
import { Minus } from 'lucide-react';
import type { CompetitorListWidget } from '../../../types/chat';

interface CompetitorListBlockProps {
  block: CompetitorListWidget;
}

export const CompetitorListBlock: React.FC<CompetitorListBlockProps> = ({ block }) => {
  return (
    <div className="space-y-3 mb-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-5 h-5 rounded-full border-2 border-slate-400 border-t-transparent animate-spin" />
        <span className="text-[16px] font-bold text-slate-900">
          Competitors found in radius:
        </span>
      </div>
      <div className="space-y-2">
        {block.items.map((competitor) => (
          <div
            key={competitor.id}
            className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-slate-200/50 hover:bg-white transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-1.5 h-1.5 rounded-full ${competitor.selected ? 'bg-slate-900' : 'bg-slate-300'}`} />
              <span className={`text-[14px] font-bold ${competitor.selected ? 'text-slate-700' : 'text-slate-400'}`}>
                {competitor.name}{' '}
                <span className="text-slate-400 font-medium ml-1">
                  ({competitor.distance})
                </span>
              </span>
            </div>
            {competitor.selected && (
              <button
                className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center hover:bg-black transition-all active:scale-95"
              >
                <Minus size={12} strokeWidth={3} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
