import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { VideoItem } from '../models/video-item.model';

export enum VideoActionTypes {
  LoadVideos = '[Video] Load Videos',
  AddVideo = '[Video] Add Video',
  UpsertVideo = '[Video] Upsert Video',
  AddVideos = '[Video] Add Videos',
  UpsertVideos = '[Video] Upsert Videos',
  UpdateVideo = '[Video] Update Video',
  UpdateVideos = '[Video] Update Videos',
  DeleteVideo = '[Video] Delete Video',
  DeleteVideos = '[Video] Delete Videos',
  ClearVideos = '[Video] Clear Videos'
}

export class LoadVideos implements Action {
  readonly type = VideoActionTypes.LoadVideos;

  constructor(public payload: { videos: VideoItem[] }) {}
}

export class AddVideo implements Action {
  readonly type = VideoActionTypes.AddVideo;

  constructor(public payload: { video: VideoItem }) {}
}

export class UpsertVideo implements Action {
  readonly type = VideoActionTypes.UpsertVideo;

  constructor(public payload: { video: VideoItem }) {}
}

export class AddVideos implements Action {
  readonly type = VideoActionTypes.AddVideos;

  constructor(public payload: { videos: VideoItem[] }) {}
}

export class UpsertVideos implements Action {
  readonly type = VideoActionTypes.UpsertVideos;

  constructor(public payload: { videos: VideoItem[] }) {}
}

export class UpdateVideo implements Action {
  readonly type = VideoActionTypes.UpdateVideo;

  constructor(public payload: { video: Update<VideoItem> }) {}
}

export class UpdateVideos implements Action {
  readonly type = VideoActionTypes.UpdateVideos;

  constructor(public payload: { videos: Update<VideoItem>[] }) {}
}

export class DeleteVideo implements Action {
  readonly type = VideoActionTypes.DeleteVideo;

  constructor(public payload: { id: string }) {}
}

export class DeleteVideos implements Action {
  readonly type = VideoActionTypes.DeleteVideos;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearVideos implements Action {
  readonly type = VideoActionTypes.ClearVideos;
}

export type VideoAction =
 LoadVideos
 | AddVideo
 | UpsertVideo
 | AddVideos
 | UpsertVideos
 | UpdateVideo
 | UpdateVideos
 | DeleteVideo
 | DeleteVideos
 | ClearVideos;
