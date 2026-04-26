import React from "react";
import { MessageBlockUI } from "./MessageBlockUI";
import {
  WidgetTextInput,
  WidgetOptionSelection,
  WidgetPermission,
  WidgetMapInteraction,
  WidgetFileUpload,
  WidgetOauthConnect,
  WidgetStepperInput,
  WidgetRadiusPicker,
  WidgetConfirmLocations,
  WidgetMaidSplitView,
  WidgetPoiRadiusPicker,
} from "../widgets";
import type { Block, PendingActionBlock, MapDataBlock } from "../../../types/chat";
import { useChat } from "../../../contexts/ChatContext";

interface BlockRendererProps {
  block: Block;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
  const { sendMessage } = useChat();

  const handleConfirm = (value: string | number) => {
    sendMessage(value.toString());
  };

  switch (block.type) {
    case "message":
      return <MessageBlockUI key={block.id} block={block} />;

    case "pending_action": {
      const { action_type } = block.content;
      switch (action_type) {
        case "text_input":
          return <WidgetTextInput key={block.id} content={block.content} onConfirm={handleConfirm} />;
        case "option_selection":
          return <WidgetOptionSelection key={block.id} content={block.content} onConfirm={handleConfirm} />;
        case "permission":
          return <WidgetPermission key={block.id} content={block.content} onConfirm={handleConfirm} />;
        case "map_interaction":
          return <WidgetMapInteraction key={block.id} content={block.content} onConfirm={handleConfirm} />;
        case "file_upload":
          return <WidgetFileUpload key={block.id} content={block.content} onConfirm={handleConfirm} />;
        case "oauth_connect":
          return <WidgetOauthConnect key={block.id} content={block.content} onConfirm={handleConfirm} />;
        case "stepper_input":
          return <WidgetStepperInput key={block.id} content={block.content} onConfirm={handleConfirm} />;
        default:
          return <div key={block.id}>Unknown action type: {action_type}</div>;
      }
    }

    case "map_data": {
      const { action_type } = block.content;
      switch (action_type) {
        case "radius_picker":
          return <WidgetRadiusPicker key={block.id} content={block.content} onConfirm={handleConfirm} />;
        case "confirm_locations":
          return <WidgetConfirmLocations key={block.id} content={block.content} onConfirm={() => handleConfirm("confirmed")} />;
        case "maid_split_view":
          return <WidgetMaidSplitView key={block.id} content={block.content} onConfirm={() => handleConfirm("confirmed")} />;
        case "poi_radius_picker":
          return <WidgetPoiRadiusPicker key={block.id} content={block.content} onConfirm={handleConfirm} />;
        default:
          return <div key={block.id}>Unknown map data type: {action_type}</div>;
      }
    }

    default:
      return null;
  }
};
