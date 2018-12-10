import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Video } from '../models/video.model';
import { VideoAction, VideoActionTypes } from '../actions/video.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from '../../../contacts/store';

export interface VideoStoreContent extends EntityState<Video> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Video> = createEntityAdapter<Video>();

export const initialState: VideoStoreContent = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: VideoAction
): VideoStoreContent {
  switch (action.type) {
    case VideoActionTypes.AddVideo: {
      return adapter.addOne(action.payload.video, state);
    }

    case VideoActionTypes.UpsertVideo: {
      return adapter.upsertOne(action.payload.video, state);
    }

    case VideoActionTypes.AddVideos: {
      return adapter.addMany(action.payload.videos, state);
    }

    case VideoActionTypes.UpsertVideos: {
      return adapter.upsertMany(action.payload.videos, state);
    }

    case VideoActionTypes.UpdateVideo: {
      return adapter.updateOne(action.payload.video, state);
    }

    case VideoActionTypes.UpdateVideos: {
      return adapter.updateMany(action.payload.videos, state);
    }

    case VideoActionTypes.DeleteVideo: {
      return adapter.removeOne(action.payload.id, state);
    }

    case VideoActionTypes.DeleteVideos: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case VideoActionTypes.LoadVideos: {
      return adapter.addAll(action.payload.videos, state);
    }

    case VideoActionTypes.ClearVideos: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const featureKey = 'video-cache';

export const selectVideoEntitiesFeatureState = createFeatureSelector<VideoStoreContent>(featureKey);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(selectVideoEntitiesFeatureState);

export const selectVideoIds = selectIds;
export const selectVideoEntities = selectEntities;
export const selectAllVideos = selectAll;
export const selectTotalVideos = selectTotal;

