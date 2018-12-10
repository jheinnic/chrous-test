import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { VideosActionTypes } from '../actions/videos.actions';

@Injectable()
export class VideosEffects {

  @Effect()
  loadVideoss$ = this.actions$.pipe(ofType(VideosActionTypes.LoadVideoss));

  constructor(private actions$: Actions) {}
}
