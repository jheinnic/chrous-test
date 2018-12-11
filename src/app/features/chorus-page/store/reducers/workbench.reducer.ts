import {createFeatureSelector, createSelector} from '@ngrx/store';

import {WorkbenchActions, VideoWorkbenchActionTypes} from '../actions/workbench.actions';
import {VideoCatalogAvailability, VideoWorkbench} from '../models/workbench.model';

export const initialState: VideoWorkbench = {
  catalogLoadState: VideoCatalogAvailability.UNAVAILABLE,
  focusVideoIdRef: ''
};

export type State = {
  workbench: {
    initialState: VideoWorkbench;
  }
}

export const featureKey = 'video-workbench';

export function reducer(state = initialState, action: WorkbenchActions): VideoWorkbench {
  switch (action.type) {

    case VideoWorkbenchActionTypes.RequestVideoCatalogCommand:
      return {
        ...state,
        catalogLoadState: VideoCatalogAvailability.SUBSCRIBING
      };

    case VideoWorkbenchActionTypes.ReleaseVideoCatalogCommand:
      return {
        ...state,
        catalogLoadState: VideoCatalogAvailability.RELEASING
      };

    case VideoWorkbenchActionTypes.VideoCatalogLoadCompleted:
      return {
        ...state,
        catalogLoadState: VideoCatalogAvailability.AVAILABLE
      };

    case VideoWorkbenchActionTypes.VideoCatalogReleased:
      return {
        ...state,
        catalogLoadState: VideoCatalogAvailability.UNAVAILABLE
      };

    case VideoWorkbenchActionTypes.VideoCatalogFailedToLoad:
      return {
        ...state,
        catalogLoadState: VideoCatalogAvailability.ERROR
      };

    default:
      return state;
  }
}

export const selectVideoCatalogFeatureState =
  createFeatureSelector<VideoWorkbench>(featureKey);

export const selectCatalogAvailability =
  createSelector(selectVideoCatalogFeatureState, (state) => state.catalogLoadState);

