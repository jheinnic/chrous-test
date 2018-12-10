import {VideoCatalogActions, VideoCatalogActionTypes} from '../actions/video-catalog.actions';
import {VideoCatalogAvailability, VideoCatalogMetadata} from '../models/video-catalog.model';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const initialState: VideoCatalogMetadata = {
  loadState: VideoCatalogAvailability.UNAVAILABLE
};

export const featureKey = 'video-catalog';

export function reducer(state = initialState, action: VideoCatalogActions): VideoCatalogMetadata {
  switch (action.type) {

    case VideoCatalogActionTypes.RequestVideoCatalogCommand:
      return {
        loadState: VideoCatalogAvailability.SUBSCRIBING
      };

    case VideoCatalogActionTypes.ReleaseVideoCatalogCommand:
      return {
        loadState: VideoCatalogAvailability.RELEASING
      };

    case VideoCatalogActionTypes.VideoCatalogLoadCompleted:
      return {
        loadState: VideoCatalogAvailability.AVAILABLE
      };

    case VideoCatalogActionTypes.VideoCatalogCacheReleased:
      return {
        loadState: VideoCatalogAvailability.UNAVAILABLE
      };

    case VideoCatalogActionTypes.VideoCatalogFailedToLoad:
      return {
        loadState: VideoCatalogAvailability.ERROR
      };

    default:
      return state;
  }
}

export const selectVideoCatalogFeatureState =
  createFeatureSelector<VideoCatalogMetadata>(featureKey);

export const selectCatalogAvailability =
  createSelector(selectVideoCatalogFeatureState, (state) => state.loadState);

