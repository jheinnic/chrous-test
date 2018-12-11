import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { VideoMetadata } from '../models/video-meta.model';

export enum VideoMetaActionTypes {
  LoadVideoMetas = '[VideoMeta] Load VideoMetas',
  AddVideoMeta = '[VideoMeta] Add VideoMeta',
  UpsertVideoMeta = '[VideoMeta] Upsert VideoMeta',
  AddVideoMetas = '[VideoMeta] Add VideoMetas',
  UpsertVideoMetas = '[VideoMeta] Upsert VideoMetas',
  UpdateVideoMeta = '[VideoMeta] Update VideoMeta',
  UpdateVideoMetas = '[VideoMeta] Update VideoMetas',
  DeleteVideoMeta = '[VideoMeta] Delete VideoMeta',
  DeleteVideoMetas = '[VideoMeta] Delete VideoMetas',
  ClearVideoMetas = '[VideoMeta] Clear VideoMetas'
}

export class LoadVideoMetas implements Action {
  readonly type = VideoMetaActionTypes.LoadVideoMetas;

  constructor(public payload: { videoMetas: VideoMetadata[] }) {}
}

export class AddVideoMeta implements Action {
  readonly type = VideoMetaActionTypes.AddVideoMeta;

  constructor(public payload: { videoMeta: VideoMetadata }) {}
}

export class UpsertVideoMeta implements Action {
  readonly type = VideoMetaActionTypes.UpsertVideoMeta;

  constructor(public payload: { videoMeta: VideoMetadata }) {}
}

export class AddVideoMetas implements Action {
  readonly type = VideoMetaActionTypes.AddVideoMetas;

  constructor(public payload: { videoMetas: VideoMetadata[] }) {}
}

export class UpsertVideoMetas implements Action {
  readonly type = VideoMetaActionTypes.UpsertVideoMetas;

  constructor(public payload: { videoMetas: VideoMetadata[] }) {}
}

export class UpdateVideoMeta implements Action {
  readonly type = VideoMetaActionTypes.UpdateVideoMeta;

  constructor(public payload: { videoMeta: Update<VideoMetadata> }) {}
}

export class UpdateVideoMetas implements Action {
  readonly type = VideoMetaActionTypes.UpdateVideoMetas;

  constructor(public payload: { videoMetas: Update<VideoMetadata>[] }) {}
}

export class DeleteVideoMeta implements Action {
  readonly type = VideoMetaActionTypes.DeleteVideoMeta;

  constructor(public payload: { id: string }) {}
}

export class DeleteVideoMetas implements Action {
  readonly type = VideoMetaActionTypes.DeleteVideoMetas;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearVideoMetas implements Action {
  readonly type = VideoMetaActionTypes.ClearVideoMetas;
}

export type VideoMetaActions =
 LoadVideoMetas
 | AddVideoMeta
 | AddVideoMetas
 | UpsertVideoMeta
 | UpsertVideoMetas
 | UpdateVideoMeta
 | UpdateVideoMetas
 | DeleteVideoMeta
 | DeleteVideoMetas
 | ClearVideoMetas;
