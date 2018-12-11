export interface VideoWorkbench {
  catalogLoadState: VideoCatalogAvailability;
  focusVideoIdRef: string;
}

export enum VideoCatalogAvailability {
  UNAVAILABLE = "Unavailable",
  SUBSCRIBING = "Subscribing",
  AVAILABLE = "Available",
  RELEASING = "Releasing",
  ERROR = "Error"
};
