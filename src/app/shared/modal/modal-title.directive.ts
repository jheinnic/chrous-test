import {
  Directive, Host, Input, OnDestroy, OnInit, Self, SimpleChanges, TemplateRef, ViewContainerRef
} from '@angular/core';
import {CdkPortal} from '@angular/cdk/portal';

import {ModalRegistrationComponent} from './modal-registration.component';


@Directive({
  selector: 'span[cai-modal-title], span[caiModalTitle]'
})
export class ModalTitleDirective implements OnInit, OnDestroy {
  constructor(@Self() private cdkPortal: CdkPortal,
    @Host() private hostComponent: ModalRegistrationComponent)
  {
  }

  ngOnInit(): void {
    this.hostComponent.injectTitle(this.cdkPortal);
  }

  ngOnDestroy(): void {
  }
}
