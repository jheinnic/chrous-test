import {Action} from '@ngrx/store';


export enum VideoCatalogActionTypes
{
  // These are Command actions
  RequestVideoCatalogCommand = '[VideoCatalog] Request Video Catalog Refresh',
  ReleaseVideoCatalogCommand = '[VideoCatalog] Cancel Video Catalog Refresh',
  RequestTranscriptCommand = '[VideoCatalog] Request Transcript Access',
  ReleaseTranscriptCommand = '[VideoCatalog] Release Transcript Access',

  // These are Event actions
  VideoCatalogLoadCompleted = '[VideoCatalog] Video Catalog Refresh Completed',
  VideoCatalogFailedToLoad = '[VideoCatalog] Video Catalog Refresh Failed',
  VideoCatalogCacheReleased = '[VideoCatalog] Video Catalog Refresh Released',
  TranscriptLoadCompleted = '[VideoCatalog] Open Video Transcript Completed',
  TranscriptFailedToLoad = '[VideoCatalog] Open Video Transcript Failed',
  TranscriptCacheReleased = '[VideoCatalog] Open Video Transcript Released',

}

export class RequestVideoCatalogCommand implements Action
{
  readonly type = VideoCatalogActionTypes.RequestVideoCatalogCommand;
}

export class ReleaseVideoCatalogCommand implements Action
{
  readonly type = VideoCatalogActionTypes.ReleaseVideoCatalogCommand;
}

export class VideoCatalogRefreshCompleted implements Action
{
  readonly type = VideoCatalogActionTypes.VideoCatalogLoadCompleted;
}

export class VideoCatalogRefreshFailed implements Action
{
  readonly type = VideoCatalogActionTypes.VideoCatalogFailedToLoad;
}

export class VideoCatalogRefreshReleased implements Action
{
  readonly type = VideoCatalogActionTypes.VideoCatalogCacheReleased;
}

export class RequestTranscriptCommand implements Action
{
  readonly type = VideoCatalogActionTypes.RequestTranscriptCommand;

  constructor(public readonly payload: string) { }
}

export class ReleaseTranscriptCommand implements Action
{
  readonly type = VideoCatalogActionTypes.ReleaseTranscriptCommand;

  constructor(public readonly payload: string) { }
}

export class TranscriptRefreshCompleted implements Action
{
  readonly type = VideoCatalogActionTypes.TranscriptLoadCompleted;

  constructor(public readonly payload: string) { }
}

export class TranscriptRefreshFailed implements Action
{
  readonly type = VideoCatalogActionTypes.TranscriptFailedToLoad;

  constructor(public readonly payload: string) { }
}

export class TranscriptRefreshReleased implements Action
{
  readonly type = VideoCatalogActionTypes.TranscriptCacheReleased;

  constructor(public readonly payload: string) { }
}

export type VideoCatalogActions =
  RequestVideoCatalogCommand
  | ReleaseVideoCatalogCommand
  | VideoCatalogRefreshCompleted
  | VideoCatalogRefreshFailed
  | VideoCatalogRefreshReleased
  | RequestTranscriptCommand
  | ReleaseTranscriptCommand
  | TranscriptRefreshCompleted
  | TranscriptRefreshFailed
  | TranscriptRefreshReleased;
