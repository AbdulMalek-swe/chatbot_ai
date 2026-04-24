import { WidgetMapSelection } from "../components/chat";

export type Conversation = {
  id: string;
  blocks: Block[];
};

export type Block =
  | MessageBlock
  | SplitMapBlock
  | FormBlock
  | CampaignBlock
  | CampaignDirectionWidget
  | QuickQuestionWidget;

export type MessageBlock = {
  id: string;
  type: "message";
  role: "user" | "assistant" | "system";
  content: string;
  status?: "streaming" | "complete";
  createdAt?: string;
  thinking?: string;
};

export type SplitMapBlock = {
  id: string;
  type: "split-map";
  version: number;
  chat: ChatBlock[];
  map: MapBlock;
};

export type ChatBlock =
  | ChatMessage
  | CompetitorListWidget
  | StatsWidget
  | ActionWidget
  | CampaignDirectionWidget
  | QuickQuestionWidget;
  
export type CampaignDirectionWidget = {
  id: string;
  type: "campaign-direction";
  widget: {
    id: string;
    type: string;
    content: string;
  }[];
};

export type ChatMessage = {
  id: string;
  type: "message";
  role: "user" | "assistant" | "system";
  content: string;
};

export type CompetitorListWidget = {
  id: string;
  type: "competitor-list";
  items: {
    id: string;
    name: string;
    distance: string;
    selected: boolean;
  }[];
};

export type StatsWidget = {
  id: string;
  type: "stats";
  items: {
    label: string;
    value: string | number;
  }[];
};

export type ActionWidget = {
  id: string;
  type: "action";
  actions: {
    label: string;
    actionId: ActionId;
    payload?: any;
  }[];
};

export type QuickQuestionWidget = {
  id: string;
  type: "quick-question";
  widget: {
    id: string;
    type: string;
    content: string;
  }[];
};

export type ActionId =
  | "SET_LOCATION"
  | "SET_RADIUS"
  | "TOGGLE_COMPETITOR"
  | "CONFIRM_COMPETITORS"
  | "NEXT_STAGE"
  | "OPEN_FORM"
  | "SUBMIT_FORM"
  | "GENERATE_CAMPAIGN";

export type MapStage =
  | "select-location"
  | "radius-selection"
  | "competitor-selection"
  | "audience-result";

export type MapBlock = {
  id: string;
  type: "map";
  stage: MapStage;
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  layers: {
    mainLocation?: LatLng;
    radius?: {
      lat: number;
      lng: number;
      value: number;
    };
    competitors?: Competitor[];
    heatmap?: HeatPoint[];
  };
};

export type LatLng = {
  lat: number;
  lng: number;
};

export type Competitor = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  selected: boolean;
};

export type HeatPoint = {
  lat: number;
  lng: number;
  intensity?: number;
};

export type FormBlock = {
  id: string;
  type: "form";
  formType:
    | "meta-connect"
    | "budget"
    | "demographics"
    | "creative-upload"
    | "confirmation";
  data?: Record<string, any>;
};

export type CampaignBlock = {
  id: string;
  type: "campaign-preview";
  campaign: {
    name: string;
    objective: string;
    audienceSize: number;
    targeting: string;
    format: string;
    business: string;
    budget?: number;
  };
};
