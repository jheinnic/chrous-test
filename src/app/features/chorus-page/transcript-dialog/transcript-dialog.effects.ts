import {Inject, Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {MatDialog, MatDialogRef} from '@angular/material';
import {tap} from 'rxjs/operators';

import {VideoWorkbenchActionTypes} from '../store/actions/workbench.actions';
import {TranscriptDialogComponent} from './transcript-dialog.component';

@Injectable()
export class TranscriptDialogEffects
{
  @Effect({dispatch: false})
  openTranscriptModal$ = this.actions$.pipe(
    ofType(
      VideoWorkbenchActionTypes.OpenTranscriptByVideoId,
      VideoWorkbenchActionTypes.OpenTranscriptBySelection
    ),
    tap(
      () => {
        this.dialogRef =
          this.dialogService.open(
            TranscriptDialogComponent,
            {width: "500", height: "300"}
          )
      }
    )
  );

  private dialogRef: MatDialogRef<TranscriptDialogComponent, any>;

  constructor(
    private readonly actions$: Actions,
    private readonly dialogService: MatDialog,
  ) { }
}
