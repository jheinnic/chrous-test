import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, Directive, OnDestroy, OnInit,
  ViewEncapsulation
} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';

import {
  DialogComponentWithStyling, DialogContainerDynamicStyling, fromCoreLayout, ModalDialog
} from '../../store';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'cai-modal-dialog-outlet',
  templateUrl: './modal-dialog-outlet.component.html',
  styleUrls: ['./modal-dialog-outlet.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalDialogOutletComponent implements OnInit, OnDestroy
{
  public useMaskOverlay: boolean;

  public activeDialog?: ComponentPortal<ComponentRef<any>>;

  public containerStyling: DialogContainerDynamicStyling;

  private storeSubscription: Subscription;

  private pastBootstrap: boolean;

  constructor(
    private readonly changeDetector: ChangeDetectorRef,
    private readonly store: Store<fromCoreLayout.State>
  )
  {
    this.useMaskOverlay = false;
    this.pastBootstrap = false;
  }

  ngOnInit()
  {
    this.storeSubscription =
      this.store.select(fromCoreLayout.selectActiveDialogWithStyles)
        .subscribe(
          (incomingActivation: DialogComponentWithStyling<any>) => {
            if (!!incomingActivation && !!incomingActivation.entryComponent) {
              this.activeDialog =
                new ComponentPortal<any>(
                  incomingActivation.entryComponent);
              this.containerStyling =
                incomingActivation.containerStyling;
              this.useMaskOverlay =
                incomingActivation.useMaskOverlay;

              this.changeDetector.markForCheck();
            } else if (!!this.activeDialog) {
              this.activeDialog.detach();
              this.activeDialog = undefined;
              this.containerStyling = undefined;
              this.useMaskOverlay = false;

              this.changeDetector.markForCheck();
            } else if (this.pastBootstrap) {
              // We may get sent an initial undefined value before any dialog has been activated
              // at application bootstrap.  This should only happen one time.
              throw new Error('Undefined activation after skipping initial bootstrap!?');
            } else {
              this.pastBootstrap = true;
            }

            console.log('Live dialog is', incomingActivation);
            console.log('Live portal is', this.activeDialog);
          }
        );
  }

  ngOnDestroy()
  {
    this.storeSubscription.unsubscribe();
  }
}

// this.liveDialog = {
//   portal: this.dialogRef,
//   fixedWidth: 822,
//   fixedHeight: 522,
//   orientation: 'column'
// }
// );
// this.dialogService.open(
//   TranscriptDialogComponent,
//   {width: "500", height: "300"}
// )

