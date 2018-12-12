import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector} from '@ngrx/store';

import {VideoAction, VideoActionTypes} from '../actions/video-item.actions';
import {VideoItem} from '../models/video-item.model';

export interface State extends EntityState<VideoItem> {
  // additional entities state properties
}

export const adapter: EntityAdapter<VideoItem> = createEntityAdapter<VideoItem>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: VideoAction
): State {
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

export const featureKey = 'video-item';

export const selectVideoItemsFeatureState = createFeatureSelector<State>(featureKey);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(selectVideoItemsFeatureState);

// export const selectVideoIds = selectIds as (state: State) => string[];
// export const selectVideoEntities = selectEntities;
// export const selectAllVideos = selectAll;
// export const selectTotalVideos = selectTotal;

