import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, OnDestroy, OnInit, ViewEncapsulation
} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {Store} from '@ngrx/store';
import {ModalDialog} from '../../store/models/layout.models';
import {fromCoreLayout} from '../../store';
import {Subscription} from 'rxjs';

@Component({
  selector: 'cai-modal-dialog-outlet',
  templateUrl: './modal-dialog-outlet.component.html',
  styleUrls: ['./modal-dialog-outlet.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalDialogOutletComponent implements OnInit, OnDestroy
{
  public liveDialog?: ModalDialog<ComponentRef<any>>;

  public livePortal?: ComponentPortal<ComponentRef<any>>

  public dialogStyle?: InlineDialogStyle;

  private storeSubscription: Subscription;

  constructor(
    private readonly changeDetector: ChangeDetectorRef,
    private readonly store: Store<fromCoreLayout.State>
  )
  { }

  ngOnInit()
  {
    this.storeSubscription =
      this.store.select(fromCoreLayout.selectLiveDialog)
        .subscribe(
          (liveDialog: ModalDialog<any>) => {
            this.liveDialog = liveDialog;

            if (!! liveDialog && !! liveDialog.entryComponent) {
              this.livePortal =
                new ComponentPortal<any>(
                  liveDialog.entryComponent);
              this.dialogStyle = {
                'margin-top': `calc(50vh - ${liveDialog.fixedHeight / 2}px)`,
                'margin-left': `calc(50vw - ${liveDialog.fixedWidth / 2}px)`,
                'min-width': `${liveDialog.fixedWidth}px`,
                'max-width': `${liveDialog.fixedWidth}px`,
                'width': `${liveDialog.fixedWidth}px`,
                'min-height': `${liveDialog.fixedHeight}px`,
                'max-height': `${liveDialog.fixedHeight}px`,
                'height': `${liveDialog.fixedHeight}px`,
                'flex-direction': liveDialog.flexDirection
              };

              this.changeDetector.markForCheck();
            } else if (!! this.livePortal) {
              this.livePortal.detach();
              this.livePortal = undefined;
              this.dialogStyle = undefined;

              this.changeDetector.markForCheck();
            }

            console.log("Live dialog is", this.liveDialog);
            console.log("Live portal is", this.livePortal);
            console.log("Dialog styles are", this.dialogStyle);
          }
        );
  }

  ngOnDestroy()
  {
    this.storeSubscription.unsubscribe();
  }
}

interface InlineDialogStyle
{
  'margin-top': string,
  'margin-left': string,
  'flex-direction': string,
  'min-width': string,
  'max-width': string,
  'width': string,
  'min-height': string,
  'max-height': string,
  'height': string
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

