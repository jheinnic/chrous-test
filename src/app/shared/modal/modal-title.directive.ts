import {
  Directive, Host, Input, OnDestroy, OnInit, Self, SimpleChanges, TemplateRef, ViewContainerRef
} from '@angular/core';
import {CdkPortal} from '@angular/cdk/portal';

import {Store} from '@ngrx/store';
import {NGXLogger} from 'ngx-logger';

import {LayoutActions, fromCoreLayout} from '../../core/store';
import {ModalRegistrationComponent} from './modal-registration.component';
import {logger} from 'codelyzer/util/logger';


@Directive({
  selector: 'span[cai-modal-title], span[caiModalTemplate]'
})
export class ModalTitleDirective implements OnInit, OnDestroy {
  constructor(@Self() private cdkPortal: CdkPortal,
    @Host() private hostComponent: ModalRegistrationComponent)
  {
  }

  ngOnInit(): void {
    this.hostComponent.injectTitle(this);
  }

  ngOnDestroy(): void {
  }
}
