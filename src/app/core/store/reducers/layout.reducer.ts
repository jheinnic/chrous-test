import {LayoutActions, LayoutActionTypes} from '../actions/layout.actions';
import {ModalDialog} from '../models/layout.models';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface State {
  readonly liveDialog?: ModalDialog<any>
}

export const initialState: State = {
  liveDialog: undefined
};

export function reducer(state = initialState, action: LayoutActions): State {
  switch (action.type) {

    case LayoutActionTypes.ActivateDialog:
      return {
        liveDialog: action.payload
      };

    case LayoutActionTypes.DeactivateDialog:
      return {
        liveDialog: undefined
      };

    default:
    {
      const foo: never = action;
      return state;
    }
  }
}

export const featureKey = 'core-layout';

export const selectCoreLayoutFeatureState = createFeatureSelector<State>(featureKey);

export const selectLiveDialog =
  createSelector(selectCoreLayoutFeatureState,
    (state) => {
      console.log('Select from', state);
      if (!! state) {
        return state.liveDialog;
      }
    });
