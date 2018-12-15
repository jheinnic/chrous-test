import {Directive, Host, Input, Self, SimpleChanges, TemplateRef, ViewContainerRef} from '@angular/core';
import {CdkPortal} from '@angular/cdk/portal';

import {Store} from '@ngrx/store';
import {NGXLogger} from 'ngx-logger';

import {LayoutActions, fromCoreLayout} from '../../core/store';
import {ModalRegistrationComponent} from './modal-registration.component';

@Directive({
  selector: '[cai-modal-template], [caiModalTemplate]'
})
export class StaticModalContentDirective {
  constructor(@Self() private cdkPortal: CdkPortal,
    @Host() private hostComponent: ModalRegistrationComponent)
  {
  }

  ngOnInit(): void {
    this.hostComponent.injectStaticContent(this.cdkPortal);
  }

  ngOnDestroy(): void {
  }
}
