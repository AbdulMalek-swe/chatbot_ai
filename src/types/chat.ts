
export type Conversation = {
  id: string;
  blocks: Block[];
};

export type Block =
  | MessageBlock
  | PendingActionBlock
  | MapDataBlock;

export type MessageBlock = {
  id: string;
  type: "message";
  role: "user" | "assistant" | "system";
  content: string;
  status?: "streaming" | "complete";
  createdAt?: string;
  thinking?: string;
};

// --- Pending Actions ---

export type PendingActionType =
  | "text_input"
  | "option_selection"
  | "permission"
  | "map_interaction"
  | "file_upload"
  | "oauth_connect"
  | "stepper_input"
  | "question_collection";

export type PendingActionBlock = {
  id: string;
  type: "pending_action";
  content: {
    action_type: PendingActionType;
    field?: string;
    prompt: string;
    options?: string[];
    prefill?: string | null;
    stepper?: StepperConfig | null;
    progress?: ProgressItem[] | null;
  };
};

export type StepperConfig = {
  default: number;
  min: number;
  max: number;
  step: number;
  unit: string;
};

export type ProgressItem = {
  label: string;
  value: string;
};

// --- Map Data ---

export type MapDataType =
  | "radius_picker"
  | "confirm_locations"
  | "maid_split_view"
  | "poi_radius_picker";

export type MapDataBlock = {
  id: string;
  type: "map_data";
  content: RadiusPickerData | ConfirmLocationsData | MaidSplitViewData | PoiRadiusPickerData;
};

export type RadiusPickerData = {
  action_type: "radius_picker";
  center: LatLng;
  locations?: LocationItem[];
  default_radius_miles?: number | null;
  default_radius_km?: number | null;
};

export type ConfirmLocationsData = {
  action_type: "confirm_locations";
  locations: LocationItem[];
  editable?: boolean;
};

export type MaidSplitViewData = {
  action_type: "maid_split_view";
  pois: PoiItem[];
  maid_observations: LatLng[];
  center: LocationItem;
  maid_count: number;
  radius_km?: number | null;
  lookback_days?: number | null;
  event_date_ranges?: string[] | null;
};

export type PoiRadiusPickerData = {
  action_type: "poi_radius_picker";
  pois: PoiItem[];
  center: LocationItem;
  default_radius_km: number;
};

// --- Shared Types ---

export type LatLng = {
  lat: number;
  lng: number;
};

export type LocationItem = {
  id?: string;
  location_name?: string;
  name?: string; // Some events use 'name' instead of 'location_name'
  formatted_address?: string;
  latitude?: number;
  longitude?: number;
  lat?: number; // Some events use 'lat'/'lng'
  lng?: number;
  is_city?: boolean;
  radius_km?: number | null;
  parent_location?: string;
};

export type PoiItem = {
  id?: string;
  name: string;
  lat: number;
  lng: number;
  radius_km?: number | null;
  parent_location?: string;
  types?: string[];
  brand?: string | null;
  event_start_date?: string | null;
  event_end_date?: string | null;
};
