import * as Immutable from 'immutable';
import {Merge, ObjectType, Required} from 'simplytyped';
import {VideoMetadata} from './video-meta.model';
import {Observable} from 'rxjs';
import {TranscriptRecord} from './transcript.model';

export interface VideoWorkbench
{
  // Catalog state only stores its availability in the store because the collection
  // selectors are global singletons and do not need to distinguish document-specific
  // instances as the VideoMetadata and TranscriptRecords do.
  readonly catalogLoadState: StateAvailability;
  readonly selectedVideoId: string;
  readonly openVideoDocs: Immutable.Map<string, OpenDocumentContext>;
  readonly openTranscripts: Immutable.Map<string, OpenDocumentContext>;
  readonly viewTranscriptDialogState: DialogActivity;
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
  LOADING = 'Loading',
  AVAILABLE = 'Available',
  RELEASING = 'Releasing',
  ERROR = 'Error'
}

export enum DialogActivity
{
  INACTIVE = 'Inactive',
  OPENING = 'Opening',
  ACTIVE = 'Active',
  CLOSING = 'Closing',
  ERROR = 'Error'
}

export type CombinedVideo =
  Required<ObjectType<Partial<Merge<VideoMetadata, TranscriptRecord>>>,
    'id'>

export interface RenderReadySpeaker {
  readonly displayName: string;
  readonly transcriptKey: string;
  readonly inlineStyle: {
    color: string
  };
}
// Get the speaker properties from Speaker, drop the time since we've already sorted, and
// transform the remaining 'snippet' property into an aggregate list for capturing runs by
// the same speaker.
export interface SpeakerTurn
{
  readonly displayName: string;
  readonly transcriptKey: string;
  readonly inlineStyle: {
    color: string
  };
  readonly snippetCount: number;
  readonly snippets: string[];
}

export interface DecoratedTranscript
{
  readonly id: string;
  readonly title: string;
  readonly width: number;
  readonly height: number;
  readonly entries: SpeakerTurn[]
}


// // Flattening utility.  Let P be a set of object-typed properties on T.
// // Let T' be T with every property in P removed.
// // PullUp<T, P> is then the intersection type of T' with type in T[P].
// type PullUp<T extends object, P extends keyof T> =
//   CombineObjects<Omit<T, P>,
//     {
//       [K in Keys<T[P]>]: T[P][K]
//     }>
//
// // Pull 'resolution' properties up to the root type
// type WithFlatResolution = PullUp<CombinedVideo, 'resolution'>;
// // Replace 'speakers' and 'transcript' with a collection of Speaker-to-TranscriptEntry
// // correlations.
// type WithSpeakerEntryCorrelation = Merge<Omit<WithFlatResolution, 'speakers' | 'transcript'>,
//   { entries: ReadonlyArray<CombineObjects<Speaker, MultiSnippetEntry>> }>
//
// // Call the end result a DecoratedTranscript, and perform the required computation in
// // a selector for same.
//
// // export type DecoratedTranscript = WithSpeakerEntryCorrelation;
//
//

