import {Transcript, Video} from '../store';

export interface IVideoCatalogApiClient
{
  loadCatalog(): Promise<void>;

  loadMetadata(videoItem: Video): Promise<void>;

  loadTranscript(videoId: string): Promise<void>;

  purgeTranscript(videoId: string): void;
}
