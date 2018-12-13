import { Injectable } from '@angular/core';
import {Actions} from '@ngrx/effects';
// import { Actions, Effect, ofType } from '@ngrx/effects';
// import { LayoutActionTypes } from '../actions/layout.actions';

@Injectable()
export class LayoutEffects {

  // @Effect()
  // loadLayouts$ = this.actions$.pipe(ofType(LayoutActionTypes.LoadLayouts));

  constructor(private actions$: Actions) {}
}
