import { Action } from '@ngrx/store';
import { ViewTranscriptWidgetActions, ViewTranscriptWidgetActionTypes } from '../actions/view-transcript-widget.actions';

export interface State {

}

export const initialState: State = {

};

export const featureKey = 'view-transcript-widget';

export function reducer(state = initialState, action: ViewTranscriptWidgetActions): State {
  switch (action.type) {

    case ViewTranscriptWidgetActionTypes.LoadViewTranscriptWidgets:
      return state;


    default:
      return state;
  }
}
