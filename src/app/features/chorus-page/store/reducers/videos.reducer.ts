import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Videos } from '../models/videos.model';
import { VideosActions, VideosActionTypes } from '../actions/videos.actions';

export interface State extends EntityState<Videos> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Videos> = createEntityAdapter<Videos>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: VideosActions
): State {
  switch (action.type) {
    case VideosActionTypes.AddVideos: {
      return adapter.addOne(action.payload.videos, state);
    }

    case VideosActionTypes.UpsertVideos: {
      return adapter.upsertOne(action.payload.videos, state);
    }

    case VideosActionTypes.AddVideoss: {
      return adapter.addMany(action.payload.videoss, state);
    }

    case VideosActionTypes.UpsertVideoss: {
      return adapter.upsertMany(action.payload.videoss, state);
    }

    case VideosActionTypes.UpdateVideos: {
      return adapter.updateOne(action.payload.videos, state);
    }

    case VideosActionTypes.UpdateVideoss: {
      return adapter.updateMany(action.payload.videoss, state);
    }

    case VideosActionTypes.DeleteVideos: {
      return adapter.removeOne(action.payload.id, state);
    }

    case VideosActionTypes.DeleteVideoss: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case VideosActionTypes.LoadVideoss: {
      return adapter.addAll(action.payload.videoss, state);
    }

    case VideosActionTypes.ClearVideoss: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
