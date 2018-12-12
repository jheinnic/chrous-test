import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { VideoMetadata } from '../models/video-meta.model';
import { VideoMetaActions, VideoMetaActionTypes } from '../actions/video-meta.actions';
import {createFeatureSelector} from '@ngrx/store';

export interface State extends EntityState<VideoMetadata> {
  // additional entities state properties
}

export const adapter: EntityAdapter<VideoMetadata> = createEntityAdapter<VideoMetadata>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: VideoMetaActions
): State {
  switch (action.type) {
    case VideoMetaActionTypes.AddVideoMeta: {
      return adapter.addOne(action.payload.videoMeta, state);
    }

    case VideoMetaActionTypes.UpsertVideoMeta: {
      return adapter.upsertOne(action.payload.videoMeta, state);
    }

    case VideoMetaActionTypes.AddVideoMetas: {
      return adapter.addMany(action.payload.videoMetas, state);
    }

    case VideoMetaActionTypes.UpsertVideoMetas: {
      return adapter.upsertMany(action.payload.videoMetas, state);
    }

    case VideoMetaActionTypes.UpdateVideoMeta: {
      return adapter.updateOne(action.payload.videoMeta, state);
    }

    case VideoMetaActionTypes.UpdateVideoMetas: {
      return adapter.updateMany(action.payload.videoMetas, state);
    }

    case VideoMetaActionTypes.DeleteVideoMeta: {
      return adapter.removeOne(action.payload.id, state);
    }

    case VideoMetaActionTypes.DeleteVideoMetas: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case VideoMetaActionTypes.LoadVideoMetas: {
      return adapter.addAll(action.payload.videoMetas, state);
    }

    case VideoMetaActionTypes.ClearVideoMetas : {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const featureKey = 'video-meta';

export const selectVideoMetaFeatureState = createFeatureSelector<State>(featureKey);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(selectVideoMetaFeatureState);
