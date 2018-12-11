import {Transcript, VideoItem} from '../store';

export interface IChorusVideoApiClient
{
  loadCatalog(): Promise<void>;

  loadMetadata(videoId: string): Promise<void>;

  loadTranscript(videoId: string): Promise<void>;

  purgeTranscript(videoId: string): void;
}
