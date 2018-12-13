import {Action} from '@ngrx/store';
import {OpenDocumentContext, TranscriptRecord, VideoMetadata} from '..';


/**
 * A mixture of command actions and event actions invoked/emitted by UI controls.
 *
 * Proposal: Let Commands manifest primarily as Reducer behaviors that create new
 * store states.  Let Event actions arise from the Effect handlers that follow a
 * Command.  Observe how Command actions essentially become their own Events once
 * they pass from Reducer to Effects.  Question whether or not this could be missing
 * something.
 *
 * Consider an alternative--use Command actions only to generate Event actions.
 * Use their Effect pipelines to inspect state and emit Events.  Reduce events actions
 * to effect state changes, and build undo/redo functionality over Events, not Commands,
 * although Commands should be authoritative about whether or not their derive events
 * are or are not undo-stackable.
 *
 * Commands that spawn other commands--e.g. "OpenTranscriptForSelected" and
 * "OpenTranscriptForId".  Both re-use the "RequestTranscriptCommand".  Are these
 * more like Intent-driven process managers?  Observe that any reactive behaviors
 * typically flow from their second-tier command invocations, not the more specific
 * scenario workflows themselves.  We react to the "RequestTranscriptCommand", not
 * either of the "Open" variants that reuse it.
 */
export enum VideoWorkbenchActionTypes
{
  // These are Command actions
  RequestVideoCatalogCommand = '[VideoCatalog] Request Video Catalog Refresh',
  ReleaseVideoCatalogCommand = '[VideoCatalog] Cancel Video Catalog Refresh',
  // These are Event actions
  VideoCatalogLoadCompleted = '[VideoCatalog] Video Catalog Refresh Completed',
  VideoCatalogFailedToLoad = '[VideoCatalog] Video Catalog Refresh Failed',
  VideoCatalogReleased = '[VideoCatalog] Video Catalog Refresh Released',

  // These are Command actions
  RequestVideoMetadataCommand = '[VideoDetails] Open Video Metadata',
  ReleaseVideoMetadataCommand = '[VideoDetails] Release Video Metadata',
  // These are Event actions
  VideoMetadataLoadCompleted = '[VideoDetails] Video Metadata Load Completed',
  VideoMetadataFailedToLoad = '[VideoDetails] Video Metadata Failed To Load',
  VideoMetadataReleased = '[VideoDetails] Video Metadata Content Released',

  // These are Command actions
  RequestTranscriptCommand = '[TranscriptRecords] Open TranscriptRecord',
  ReleaseTranscriptCommand = '[TranscriptRecords] Release TranscriptRecord',
  // These are Event actions
  TranscriptLoadCompleted = '[TranscriptRecords] TranscriptRecord Load Completed',
  TranscriptFailedToLoad = '[TranscriptRecords] TranscriptRecord Failed To Load',
  TranscriptReleased = '[TranscriptRecords] TranscriptRecord Content Released',

  // -- Focus Selected is a command action that moves forward a user's intent.
  // -- Dismiss Focus is an event action for reacting to something a user has
  // already done.
  SetCatalogVideoSelection   = '[VideoCatalog] Set Selected Catalog Video',
  ClearCatalogVideoSelection   = '[VideoCatalog] Set Selected Catalog Video',

  // Two Open TranscriptRecord 'commands' are process flows for more primitive commands.
  // Dialog dismissal is an after-the-fact event action.
  SetViewTranscriptTargetVideoId = '[TranscriptWidget] Set the View Transcript target video Id',
  ClearViewTranscriptTargetVideoId = '[TranscriptWidget] Clear the View Transcript target video Id',
}

export class SetCatalogVideoSelection implements Action
{
  readonly type = VideoWorkbenchActionTypes.SetCatalogVideoSelection;

  constructor(public readonly payload: {id: string}) { }
}

export class ClearCatalogVideoSelection implements Action
{
  readonly type = VideoWorkbenchActionTypes.ClearCatalogVideoSelection;
}

export class SetViewTranscriptTargetVideoId implements Action
{
  readonly type = VideoWorkbenchActionTypes.SetViewTranscriptTargetVideoId;

  constructor(public readonly payload: {id: string}) { }
}

export class ClearViewTranscriptTargetVideoId implements Action
{
  readonly type = VideoWorkbenchActionTypes.ClearViewTranscriptTargetVideoId;
}

export class RequestVideoCatalogCommand implements Action
{
  readonly type = VideoWorkbenchActionTypes.RequestVideoCatalogCommand;
}

export class ReleaseVideoCatalogCommand implements Action
{
  readonly type = VideoWorkbenchActionTypes.ReleaseVideoCatalogCommand;
}

export class VideoCatalogLoadCompleted implements Action
{
  readonly type = VideoWorkbenchActionTypes.VideoCatalogLoadCompleted;
}

export class VideoCatalogRefreshFailed implements Action
{
  readonly type = VideoWorkbenchActionTypes.VideoCatalogFailedToLoad;
}

export class VideoCatalogReleased implements Action
{
  readonly type = VideoWorkbenchActionTypes.VideoCatalogReleased;
}

export class RequestTranscriptCommand implements Action
{
  readonly type = VideoWorkbenchActionTypes.RequestTranscriptCommand;

  constructor(public readonly payload: OpenDocumentContext) { }
}

export class ReleaseTranscriptCommand implements Action
{
  readonly type = VideoWorkbenchActionTypes.ReleaseTranscriptCommand;

  constructor(public readonly payload: {id: string}) { }
}

export class TranscriptLoadCompleted implements Action
{
  readonly type = VideoWorkbenchActionTypes.TranscriptLoadCompleted;

  constructor(public readonly payload: {id: string}) { }
}

export class TranscriptFailedToLoad implements Action
{
  readonly type = VideoWorkbenchActionTypes.TranscriptFailedToLoad;

  constructor(public readonly payload: {id: string}) { }
}

export class TranscriptReleased implements Action
{
  readonly type = VideoWorkbenchActionTypes.TranscriptReleased;

  constructor(public readonly payload: {id: string}) { }
}
export class RequestVideoMetadataCommand implements Action
{
  readonly type = VideoWorkbenchActionTypes.RequestVideoMetadataCommand;

  constructor(public readonly payload: OpenDocumentContext) { }
}

export class ReleaseVideoMetadataCommand implements Action
{
  readonly type = VideoWorkbenchActionTypes.ReleaseVideoMetadataCommand;

  constructor(public readonly payload: {id: string}) { }
}

export class VideoMetadataLoadCompleted implements Action
{
  readonly type = VideoWorkbenchActionTypes.VideoMetadataLoadCompleted;

  constructor(public readonly payload: {id: string}) { }
}

export class VideoMetadataFailedToLoad implements Action
{
  readonly type = VideoWorkbenchActionTypes.VideoMetadataFailedToLoad;

  constructor(public readonly payload: {id: string}) { }
}

export class VideoMetadataReleased implements Action
{
  readonly type = VideoWorkbenchActionTypes.VideoMetadataReleased;

  constructor(public readonly payload: {id: string}) { }
}

export type WorkbenchActions =
  RequestVideoCatalogCommand
  | ReleaseVideoCatalogCommand
  | VideoCatalogLoadCompleted
  | VideoCatalogRefreshFailed
  | VideoCatalogReleased
  | RequestTranscriptCommand
  | ReleaseTranscriptCommand
  | TranscriptLoadCompleted
  | TranscriptFailedToLoad
  | TranscriptReleased
  | RequestVideoMetadataCommand
  | ReleaseVideoMetadataCommand
  | VideoMetadataLoadCompleted
  | VideoMetadataFailedToLoad
  | VideoMetadataReleased
  | SetCatalogVideoSelection
  | ClearCatalogVideoSelection
  | SetViewTranscriptTargetVideoId
  | ClearViewTranscriptTargetVideoId
;;
;
