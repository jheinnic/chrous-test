import {createFeatureSelector, createSelector} from '@ngrx/store';

import {
  DialogComponentWithStyling, DialogContainerDynamicStyling, ModalDialog
} from '../models/layout.models';
import {LayoutActions, LayoutActionTypes} from '../actions/layout.actions';


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
      return state;
    }
  }
}

export const featureKey = 'core-layout';

export const selectCoreLayoutFeatureState = createFeatureSelector<State>(featureKey);

export const selectLiveDialog =
  createSelector(
    selectCoreLayoutFeatureState,
    function (state: State): ModalDialog<any> | undefined { return state.liveDialog; }
  );

export const selectActiveDialogWithStyles =
  createSelector(
    selectLiveDialog,
    function (liveDialog: ModalDialog<any>): DialogComponentWithStyling<any>|undefined {
      if ((!liveDialog) || (! liveDialog.entryComponent)) {
        return undefined;
      }

      const containerStyling: DialogContainerDynamicStyling = {
        'margin-top': `calc(50vh - ${liveDialog.fixedHeight / 2}px)`,
        'margin-left': `calc(50vw - ${liveDialog.fixedWidth / 2}px)`,
        'min-width': `${liveDialog.fixedWidth}px`,
        'max-width': `${liveDialog.fixedWidth}px`,
        width: `${liveDialog.fixedWidth}px`,
        'min-height': `${liveDialog.fixedHeight}px`,
        'max-height': `${liveDialog.fixedHeight}px`,
        height: `${liveDialog.fixedHeight}px`,
        display: (!!liveDialog.flexDirection ? 'flex' : 'block'),
        'flex-direction': (!!liveDialog.flexDirection ? liveDialog.flexDirection : 'unset'),
      };

      return {
        entryComponent: liveDialog.entryComponent,
        useMaskOverlay: liveDialog.useMaskOverlay,
        containerStyling: containerStyling
      };
    }
  );
