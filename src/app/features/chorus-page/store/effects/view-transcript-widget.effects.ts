import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ViewTranscriptWidgetActionTypes } from '../actions/view-transcript-widget.actions';

@Injectable()
export class ViewTranscriptWidgetEffects {

  @Effect()
  loadViewTranscriptWidgets$ = this.actions$.pipe(ofType(ViewTranscriptWidgetActionTypes.LoadViewTranscriptWidgets));

  constructor(private actions$: Actions) {}
}
