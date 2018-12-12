import {ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {Actions, ofType} from '@ngrx/effects';

import {VideoWorkbenchActionTypes} from '../store/actions/workbench.actions';
import {TranscriptDialogComponent} from './transcript-dialog.component';
import {ComponentPortal, Portal} from '@angular/cdk/portal';
import {Subscription} from 'rxjs';

@Component({
  selector: 'cai-transcript-dialog-outlet',
  templateUrl: './transcript-dialog-outlet.component.html',
  styleUrls: ['./transcript-dialog-outlet.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranscriptDialogOutletComponent
{

  // @ViewChild(TranscriptDialogComponent) private dialogRef: TranscriptDialogComponent;

  private dialogRefTwo: ComponentPortal<TranscriptDialogComponent>;

  private effectSubscription: Subscription;

  public liveDialog: ComponentPortal<TranscriptDialogComponent>;

  constructor(
    private readonly actions$: Actions
  )
  {
    this.dialogRefTwo =
      new ComponentPortal(TranscriptDialogComponent);
    this.effectSubscription = this.actions$.pipe(
      ofType(
        VideoWorkbenchActionTypes.OpenTranscriptByVideoId,
        VideoWorkbenchActionTypes.OpenTranscriptBySelection
      )
    )
      .subscribe(
        () => {
          this.liveDialog = this.dialogRefTwo;
        }
        // this.dialogService.open(
        //   TranscriptDialogComponent,
        //   {width: "500", height: "300"}
        // )
      );
  }
}
