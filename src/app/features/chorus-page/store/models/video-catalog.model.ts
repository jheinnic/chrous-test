export interface VideoCatalogMetadata {
  loadState: VideoCatalogAvailability;
}

export enum VideoCatalogAvailability {
  UNAVAILABLE = "Unavailable",
  SUBSCRIBING = "Subscribing",
  AVAILABLE = "Available",
  RELEASING = "Releasing",
  ERROR = "Error"
};
