import {ComponentType} from '@angular/cdk/portal';
import {ModalRegistrationComponent} from '../../../shared/modal/modal-registration.component';
import {InjectionToken} from '@angular/core';
import {ModalTypeConfiguration} from '../../../shared/modal/modal-type-configuration.interface';

export interface ModalDialog<T>
{
  entryComponent: ComponentType<T>;
  fixedHeight: number;
  fixedWidth: number;
  flexDirection?: 'column' | 'row' | 'unset'
  useMaskOverlay?: boolean;
}

export interface AvailableModalDialog {
  identifier: InjectionToken<ModalRegistrationComponent>;
  config: ModalTypeConfiguration
  provider: ModalRegistrationComponent;
}

/**
 * A selector-derived interface describing the CSS Style attributes the container injecting a
 * dialog component needs to set on its view host in order to satisfy its size and position
 * contract as specified in ModalDialog.
 */
export interface DialogContainerDynamicStyling
{
  display: 'block' | 'flex',
  'flex-direction': 'column' | 'row' | 'unset',

  'margin-top': string,
  'margin-left': string,

  width: string,
  'min-width': string,
  'max-width': string,

  height: string,
  'min-height': string,
  'max-height': string,
}

export interface DialogComponentWithStyling<T>
{
  entryComponent: ComponentType<T>;
  containerStyling: DialogContainerDynamicStyling;
  useMaskOverlay: boolean;
}
