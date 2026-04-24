import React from 'react';
import type { CampaignBlock } from '../../../types/chat';

interface CampaignCardProps {
  block: CampaignBlock;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ block }) => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-linear-to-br from-slate-900 to-slate-800 p-8 rounded-3xl shadow-xl mb-10 text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-display">{block.campaign.name}</h2>
        <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-xs font-bold uppercase tracking-wider border border-primary-500/30">
          Ready to Launch
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Objective</p>
          <p className="text-lg font-medium">{block.campaign.objective}</p>
        </div>
        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Audience Size</p>
          <p className="text-lg font-medium">{block.campaign.audienceSize.toLocaleString()}</p>
        </div>
        <div className="bg-white/5 p-4 rounded-2xl border border-white/10 col-span-2">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Targeting</p>
          <p className="text-md text-slate-300">{block.campaign.targeting}</p>
        </div>
      </div>
      
      <button className="w-full py-4 bg-primary-500 hover:bg-primary-600 rounded-xl text-white font-bold text-lg transition-colors shadow-lg shadow-primary-500/30">
        Push Campaign Live
      </button>
    </div>
  );
};
