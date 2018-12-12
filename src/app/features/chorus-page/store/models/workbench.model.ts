import * as Immutable from 'immutable';
import {Merge, ObjectType, Required} from 'simplytyped';
import {VideoMetadata} from './video-meta.model';
import {Observable} from 'rxjs';
import {Transcript} from './transcript.model';
import {VideoItem} from './video-item.model';

export interface VideoWorkbench
{
  // Catalog state only stores its availability in the store because the collection
  // selectors are global singletons and do not need to distinguish document-specific
  // instances as the VideoMetadata and Transcripts do.
  readonly catalogLoadState: StateAvailability;
  readonly selectedVideoId: string;
  readonly openVideoDocs: Immutable.Map<string, OpenDocumentContext>
  readonly openTranscripts: Immutable.Map<string, OpenDocumentContext>
  readonly viewTranscriptDialogState: DialogAvailability;
  readonly viewTranscriptTarget?: string;
}

export interface OpenDocumentContext
{
  id: string;
  storeReservation: Observable<never>;
  availability: StateAvailability;
}

export enum StateAvailability
{
  UNAVAILABLE = 'Unavailable',
  SUBSCRIBING = 'Subscribing',
  AVAILABLE = 'Available',
  RELEASING = 'Releasing',
  ERROR = 'Error'
};

export enum DialogAvailability
{
  UNAVAILABLE = 'Unavailable',
  OPENING = 'Opening',
  ACTIVATED = 'Activated',
  CLOSING = 'Closing',
  ERROR = 'Error'
};

export type CombinedVideo =
  Required<
    ObjectType<
      Partial<
        Merge<
          Merge<VideoItem, VideoMetadata>,
          Transcript>>>,
    'id'>
