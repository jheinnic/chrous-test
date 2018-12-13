import {Inject, Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {map, switchMap} from 'rxjs/operators';
import {ObservableInput, of} from 'rxjs';

import {
  TranscriptLoadCompleted, TranscriptReleased, VideoCatalogLoadCompleted, VideoCatalogReleased,
  VideoMetadataLoadCompleted, VideoMetadataReleased, VideoWorkbenchActionTypes, WorkbenchActions
} from '../actions/workbench.actions';
import {State} from '../reducers/transcript.reducer';
import {IChorusVideoApiClient} from '../../services/chorus-video-api-client.interface';
import {chorusVideoApiClient} from '../../chorus-page-di.tokens';
import {ActivateDialog} from '../../../../core/store';
import {TranscriptDialogComponent} from '../../transcript-dialog/transcript-dialog.component';

@Injectable()
export class WorkbenchEffects
{

  @Effect({dispatch: true})
  loadVideoCatalogs$ = this.actions$.pipe(
    ofType(
      VideoWorkbenchActionTypes.RequestVideoCatalogCommand,
      VideoWorkbenchActionTypes.ReleaseVideoCatalogCommand),
    switchMap((action: WorkbenchActions): ObservableInput<Action> => {
      if (action.type === VideoWorkbenchActionTypes.ReleaseVideoCatalogCommand) {
        return of(
          new VideoCatalogReleased()
        );
      }
      return this.catalogClient.loadCatalog()
        .then(() => {
          return new VideoCatalogLoadCompleted()
        });
    })
  );

  @Effect({dispatch: true})
  loadVideoMetadata = this.actions$.pipe(
    ofType(
      VideoWorkbenchActionTypes.RequestVideoMetadataCommand,
      VideoWorkbenchActionTypes.ReleaseVideoMetadataCommand),
    switchMap((action: WorkbenchActions): ObservableInput<Action> => {
      if (action.type === VideoWorkbenchActionTypes.ReleaseVideoMetadataCommand) {
        this.catalogClient.purgeMetadata(action.payload.id);

        return of(
          new VideoMetadataReleased(action.payload)
        );
      } else if (action.type === VideoWorkbenchActionTypes.RequestVideoMetadataCommand) {
        return this.catalogClient.loadMetadata(action.payload.id)
          .then(() => {
            return new VideoMetadataLoadCompleted(action.payload)
          });
      }
    })
  );

  @Effect({dispatch: true})
  loadTranscriptItem = this.actions$.pipe(
    ofType(
      VideoWorkbenchActionTypes.RequestTranscriptCommand,
      VideoWorkbenchActionTypes.ReleaseTranscriptCommand),
    switchMap((action: WorkbenchActions): ObservableInput<Action> => {
      if (action.type === VideoWorkbenchActionTypes.ReleaseTranscriptCommand) {
        this.catalogClient.purgeTranscript(action.payload.id);

        return of(
          new TranscriptReleased(action.payload)
        );
      } else if (action.type === VideoWorkbenchActionTypes.RequestTranscriptCommand) {
        return this.catalogClient.loadTranscript(action.payload.id)
          .then(() => {
            return new TranscriptLoadCompleted(action.payload)
          });
      }
    })
  );

  @Effect({dispatch: true})
  openViewTranscriptDialogue = this.actions$.pipe(
    ofType(VideoWorkbenchActionTypes.SetViewTranscriptTargetVideoId),
    map(function () {
      return new ActivateDialog(
        {
          entryComponent: TranscriptDialogComponent,
          fixedHeight: 521,
          fixedWidth: 824,
          flexDirection: 'row'
        }
      );
    })
  );

  constructor(
    private readonly actions$: Actions,
    private readonly transcriptStore: Store<State>,
    @Inject(chorusVideoApiClient) private readonly catalogClient: IChorusVideoApiClient
  )
  { }
}
