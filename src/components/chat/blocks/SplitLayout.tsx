import React from 'react';
import type { ChatBlock, MapBlock } from '../../../types/chat';
import { MessageBlockUI } from './MessageBlockUI';
import { CompetitorListBlock } from './CompetitorListBlock';
import { WidgetRadiusSelection, WidgetRadiusHeatmap, WidgetCompetitorSelection, WidgetSelectedLocations } from '../widgets';

interface SplitLayoutProps {
  chat: ChatBlock[];
  map: MapBlock;
}

export const SplitLayout: React.FC<SplitLayoutProps> = ({ chat, map }) => {
  // Mock business info for now, will extract from state properly
  const businessName = "Your Business";
  const businessAddress = "Current Location";
  
  const mapCenter: [number, number] = [map.center.lat, map.center.lng];

  const chatFlow = (
    <div className="flex flex-col gap-4 w-full">
      {chat.map(block => {
        if (block.type === 'message') {
          return <MessageBlockUI key={block.id} block={{ ...block, status: 'complete' }} />;
        }
        if (block.type === 'competitor-list') {
           return <CompetitorListBlock key={block.id} block={block} />;
        }
        if (block.type === 'action') {
          return (
             <div key={block.id} className="flex gap-3 flex-wrap">
                {block.actions.map(action => (
                   <button key={action.label} className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium">
                     {action.label}
                   </button>
                ))}
             </div>
          );
        }
        return null;
      })}
    </div>
  );

  return (
    <div className="group w-full font-body flex mb-10 max-w-8xl mx-auto px-4 sm:px-6 animate-fade-in">
      {map.stage === 'radius-selection' && (
        <WidgetRadiusSelection center={mapCenter} businessName={businessName} address={businessAddress} aiText={chatFlow} />
      )}
      {map.stage === 'competitor-selection' && (
        <WidgetCompetitorSelection center={mapCenter} businessName={businessName} businessAddress={businessAddress} points={map.layers.competitors as any} aiText={chatFlow} />
      )}
      {map.stage === 'audience-result' && (
        <WidgetRadiusHeatmap center={mapCenter} businessName={businessName} businessAddress={businessAddress} aiText={chatFlow} />
      )}
      {map.stage === 'select-location' && (
        <WidgetSelectedLocations locations={[]} aiText={chatFlow} />
      )}
    </div>
  );
};
