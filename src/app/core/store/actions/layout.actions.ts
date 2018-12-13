import { Action } from '@ngrx/store';
import {ModalDialog} from '../models/layout.models';

// Command-style actions here
export enum LayoutActionTypes {
  ActivateDialog = '[Layout] Activate Dialog',
  DeactivateDialog = '[Layout] Deactivate Dialog'
}

export class ActivateDialog<T> implements Action {
  readonly type = LayoutActionTypes.ActivateDialog;

  constructor(public readonly payload: ModalDialog<T>) {}
}

export class DeactivateDialog implements Action {
  readonly type = LayoutActionTypes.DeactivateDialog;
}

export type LayoutActions = ActivateDialog<any> | DeactivateDialog;
