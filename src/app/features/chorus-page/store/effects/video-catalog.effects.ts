import {Inject, Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {
  TranscriptRefreshCompleted,
  TranscriptRefreshReleased,
  VideoCatalogActions, VideoCatalogActionTypes, VideoCatalogRefreshCompleted, VideoCatalogRefreshReleased
} from '../actions/video-catalog.actions';
import {switchMap, take, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {IVideoCatalogApiClient} from '../../services/video-catalog-api-client.interface';
import {videoCatalogApiClient} from '../../../../shared/di/services-di.tokens';
import {Transcript} from '../models/transcript.model';
import {selectTranscriptEntities, TranscriptStoreContent} from '../reducers/transcript.reducer';
import {Dictionary} from '@ngrx/entity';

@Injectable()
export class VideoCatalogEffects
{

  @Effect({dispatch: true})
  loadVideoCatalogs$ = this.actions$.pipe(
    ofType(
      VideoCatalogActionTypes.RequestVideoCatalogCommand,
      VideoCatalogActionTypes.ReleaseVideoCatalogCommand),
    switchMap((action: VideoCatalogActions) => {
      if (action.type === VideoCatalogActionTypes.ReleaseVideoCatalogCommand) {
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
      VideoCatalogActionTypes.RequestTranscriptCommand,
      VideoCatalogActionTypes.ReleaseTranscriptCommand),
    switchMap((action: VideoCatalogActions) => {
      if (action.type === VideoCatalogActionTypes.ReleaseTranscriptCommand) {
        this.catalogClient.purgeTranscript(action.payload);

        return of(
          new TranscriptRefreshReleased(action.payload)
        );
      } else if (action.type === VideoCatalogActionTypes.RequestTranscriptCommand) {
        this.catalogClient.loadTranscript(action.payload)
          .then(() => {
            return new TranscriptRefreshCompleted(action.payload)
          });
      }
    })
  );

  constructor(
    private readonly actions$: Actions,
    private readonly transcriptStore: Store<TranscriptStoreContent>,
    @Inject(videoCatalogApiClient) private readonly catalogClient: IVideoCatalogApiClient
  ) { }
}
