import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Videos } from './videos.model';

export enum VideosActionTypes {
  LoadVideoss = '[Videos] Load Videoss',
  AddVideos = '[Videos] Add Videos',
  UpsertVideos = '[Videos] Upsert Videos',
  AddVideoss = '[Videos] Add Videoss',
  UpsertVideoss = '[Videos] Upsert Videoss',
  UpdateVideos = '[Videos] Update Videos',
  UpdateVideoss = '[Videos] Update Videoss',
  DeleteVideos = '[Videos] Delete Videos',
  DeleteVideoss = '[Videos] Delete Videoss',
  ClearVideoss = '[Videos] Clear Videoss'
}

export class LoadVideoss implements Action {
  readonly type = VideosActionTypes.LoadVideoss;

  constructor(public payload: { videoss: Videos[] }) {}
}

export class AddVideos implements Action {
  readonly type = VideosActionTypes.AddVideos;

  constructor(public payload: { videos: Videos }) {}
}

export class UpsertVideos implements Action {
  readonly type = VideosActionTypes.UpsertVideos;

  constructor(public payload: { videos: Videos }) {}
}

export class AddVideoss implements Action {
  readonly type = VideosActionTypes.AddVideoss;

  constructor(public payload: { videoss: Videos[] }) {}
}

export class UpsertVideoss implements Action {
  readonly type = VideosActionTypes.UpsertVideoss;

  constructor(public payload: { videoss: Videos[] }) {}
}

export class UpdateVideos implements Action {
  readonly type = VideosActionTypes.UpdateVideos;

  constructor(public payload: { videos: Update<Videos> }) {}
}

export class UpdateVideoss implements Action {
  readonly type = VideosActionTypes.UpdateVideoss;

  constructor(public payload: { videoss: Update<Videos>[] }) {}
}

export class DeleteVideos implements Action {
  readonly type = VideosActionTypes.DeleteVideos;

  constructor(public payload: { id: string }) {}
}

export class DeleteVideoss implements Action {
  readonly type = VideosActionTypes.DeleteVideoss;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearVideoss implements Action {
  readonly type = VideosActionTypes.ClearVideoss;
}

export type VideosActions =
 LoadVideoss
 | AddVideos
 | UpsertVideos
 | AddVideoss
 | UpsertVideoss
 | UpdateVideos
 | UpdateVideoss
 | DeleteVideos
 | DeleteVideoss
 | ClearVideoss;
