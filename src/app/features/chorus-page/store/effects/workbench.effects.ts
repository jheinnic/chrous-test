import {Inject, Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import {
  TranscriptRefreshCompleted,
  TranscriptRefreshReleased,
  WorkbenchActions, VideoWorkbenchActionTypes, VideoCatalogRefreshCompleted, VideoCatalogRefreshReleased
} from '../actions/workbench.actions';
import {IChorusVideoApiClient} from '../../services/chorus-video-api-client.interface';
import {videoCatalogApiClient} from '../../chorus-page-di.tokens';
import {State} from '../reducers/transcript.reducer';

@Injectable()
export class WorkbenchEffects
{

  @Effect({dispatch: true})
  loadVideoCatalogs$ = this.actions$.pipe(
    ofType(
      VideoWorkbenchActionTypes.RequestVideoCatalogCommand,
      VideoWorkbenchActionTypes.ReleaseVideoCatalogCommand),
    switchMap((action: WorkbenchActions) => {
      if (action.type === VideoWorkbenchActionTypes.ReleaseVideoCatalogCommand) {
        return of(
          new VideoCatalogRefreshReleased()
        );
      } else {
        this.catalogClient.loadCatalog()
          .then(() => {
            return new VideoCatalogRefreshCompleted()
          });
      }
    })
  );

  @Effect({dispatch: true})
  loadTranscriptItem = this.actions$.pipe(
    ofType(
      VideoWorkbenchActionTypes.RequestTranscriptCommand,
      VideoWorkbenchActionTypes.ReleaseTranscriptCommand),
    switchMap((action: WorkbenchActions) => {
      if (action.type === VideoWorkbenchActionTypes.ReleaseTranscriptCommand) {
        this.catalogClient.purgeTranscript(action.payload);

        return of(
          new TranscriptRefreshReleased(action.payload)
        );
      } else if (action.type === VideoWorkbenchActionTypes.RequestTranscriptCommand) {
        this.catalogClient.loadTranscript(action.payload)
          .then(() => {
            return new TranscriptRefreshCompleted(action.payload)
          });
      }
    })
  );

  constructor(
    private readonly actions$: Actions,
    private readonly transcriptStore: Store<State>,
    @Inject(videoCatalogApiClient) private readonly catalogClient: IChorusVideoApiClient
  ) { }
}
