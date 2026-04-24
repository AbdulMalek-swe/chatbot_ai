import React from "react";
import { MessageBlockUI } from "./MessageBlockUI";
import { CompetitorListBlock } from "./CompetitorListBlock";
import { CampaignCard } from "./CampaignCard";
import { FormRenderer } from "./FormRenderer";
import CampaignDirection from "../widgets/WidgetPinPoint";
import WIdgetQuickQuestion from "../widgets/WIdgetQuickQuestion";
import type { Block, ChatBlock } from "../../../types/chat";

interface BlockRendererProps {
  block: Block | ChatBlock;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
  switch (block.type) {
    case "message":
      return <MessageBlockUI key={block.id} block={block as any} />;
    case "competitor-list":
      return <CompetitorListBlock key={block.id} block={block as any} />;
    case "action":
      return (
        <div key={block.id} className="flex gap-3 flex-wrap">
          {(block as any).actions.map((action: any) => (
            <button
              key={action.label}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium"
            >
              {action.label}
            </button>
          ))}
        </div>
      );
    case "form":
      return <FormRenderer key={block.id} block={block as any} />;
    case "campaign-preview":
      return <CampaignCard key={block.id} block={block as any} />;
    case "campaign-direction":
      return (
        <CampaignDirection key={block.id} widget={(block as any).widget} />
      );
    case "quick-question":
      return (
        <WIdgetQuickQuestion key={block.id} widget={(block as any).widget} />
      );
    default:
      return null;
  }
};
