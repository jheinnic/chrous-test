import { Action } from '@ngrx/store';
import {ModalDialog} from '../models/layout.models';
import {ModalRegistrationComponent} from '../../../shared/modal/modal-registration.component';
import {InjectionToken} from '@angular/core';

// Command-style actions here
export enum LayoutActionTypes {
  ActivateDialog = '[Layout] Activate Dialog',
  DeactivateDialog = '[Layout] Deactivate Dialog',
  NewActivateDialog = '[Layout] Activate Registered Dialog',
  RegisterDialog = '[Layout] Register Dialog',
  UnregisterDialog = '[Layout] Unregister Dialog',
  DismissActiveDialog = '[Layout] Dismiss Active Dialog',
}

export class NewActivateDialog<T> implements Action {
  readonly type = LayoutActionTypes.ActivateDialog;

  constructor(public readonly payload: InjectionToken<ModalRegistrationComponent>) {}
}

export class ActivateDialog<T> implements Action {
  readonly type = LayoutActionTypes.ActivateDialog;

  constructor(public readonly payload: ModalDialog<T>) {}
}

export class DeactivateDialog implements Action {
  readonly type = LayoutActionTypes.DeactivateDialog;
}

export type LayoutActions = ActivateDialog<any> | DeactivateDialog;
