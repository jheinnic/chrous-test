import {ComponentType, Portal} from '@angular/cdk/portal';

export interface ModalDialog<T>
{
  entryComponent: ComponentType<T>;
  fixedHeight: number;
  fixedWidth: number;
  flexDirection: 'column' | 'row'
}
