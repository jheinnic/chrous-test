import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {defer, merge, NEVER, Observable} from 'rxjs';
import {
  concatMap, filter, finalize, flatMap, map, share, startWith, switchMap, take, tap
} from 'rxjs/operators';

import {muteFirst} from '../../../shared/utils/rxjs/mute-first';
import {
  DecoratedTranscript, fromTranscript, fromVideoItem, fromVideoMeta, fromWorkbench,
  ReleaseTranscriptCommand, ReleaseVideoCatalogCommand, ReleaseVideoMetadataCommand,
  RequestTranscriptCommand, RequestVideoCatalogCommand, RequestVideoMetadataCommand, StateAvailability,
  TranscriptRecord, VideoMetadata,
} from '../store';
import {IVideoWorkbenchService} from './video-workbench.interface';
import * as fromRoot from '../../../store';

@Injectable()
export class VideoWorkbenchService implements IVideoWorkbenchService
{
  constructor(
    private readonly workbenchStore: Store<fromWorkbench.State>,
    private readonly videoItemStore: Store<fromVideoItem.State>,
    private readonly videoMetaStore: Store<fromVideoMeta.State>,
    private readonly transcriptStore: Store<fromTranscript.State>,
    private readonly rootStore: Store<fromRoot.State>
  )
  { }

  private requireCatalog$ = defer(
    () => {
      this.workbenchStore.dispatch(
        new RequestVideoCatalogCommand()
      );

      return NEVER.pipe(
        startWith(null),
        finalize(
          () => this.workbenchStore.dispatch(
            new ReleaseVideoCatalogCommand()
          )
        )
      );
    }
  )
    .pipe(share());

  public selectVideoDictionary$ = muteFirst(
    this.requireCatalog$,
    this.videoItemStore.select(fromVideoItem.selectEntities)
  );

  public selectAllVideos$ = muteFirst(
    this.requireCatalog$,
    this.videoItemStore.select(fromVideoItem.selectAll)
  );

  public selectVideoIds$ = muteFirst(
    this.requireCatalog$,
    this.videoItemStore.select(fromVideoItem.selectIds as (state: fromVideoItem.State) => string[])
  );

  public selectTotalVideos$ = muteFirst(
    this.requireCatalog$,
    this.videoItemStore.select(fromVideoItem.selectTotal)
  );

  public selectVideoDetail$(videoId: string): Observable<VideoMetadata>
  {
    return muteFirst(
      this.reserveVideoDetail$(videoId),
      this.videoMetaStore.select(fromVideoMeta.selectEntities)
        .pipe(
          map((dictionary) => dictionary[videoId])
        )
    );
  }

  public selectTranscript$(videoId: string): Observable<TranscriptRecord>
  {
    return muteFirst(
      this.reserveTranscript$(videoId),
      this.transcriptStore.select(fromTranscript.selectEntities)
        .pipe(map((dictionary) => dictionary[videoId]))
    );
  }

  public selectForViewTranscriptTarget$(): Observable<DecoratedTranscript>
  {
    return muteFirst(
      this.reserveAsTargeted(),
      this.rootStore.select(fromWorkbench.selectDecoratedViewTranscriptVideo)
    )
      .pipe(
        filter((value) => !!value),
        flatMap((value: Observable<DecoratedTranscript>) => {
          console.log('Got ', value);
          return value;
        }))
  }

  private reserveVideoDetail$(videoId: string): Observable<never>
  {
    const myRetval = defer(
      () => {
        this.workbenchStore.dispatch(
          new RequestVideoMetadataCommand({
            id: videoId,
            storeReservation: myRetval,
            availability: StateAvailability.LOADING
          })
        );

        return NEVER.pipe(
          finalize(
            () => this.workbenchStore.dispatch(
              new ReleaseVideoMetadataCommand({id: videoId})
            )
          )
        );
      }
    )
      .pipe(share());

    return this.workbenchStore.select(
      fromWorkbench.selectOpenVideoMetadata
    )
      .pipe(
        flatMap(
          (storeMap) => {
            const storeContext = storeMap.get(videoId);
            if (!!storeContext) {
              return storeContext.storeReservation;
            }

            return myRetval;
          }
        )
      );
  }

  private reserveTranscript$(videoId: string): Observable<never>
  {
    const myGuard = defer(
      () => {
        this.workbenchStore.dispatch(
          new RequestTranscriptCommand({
            id: videoId,
            storeReservation: myGuard,
            availability: StateAvailability.LOADING
          })
        );

        return NEVER;
      }
    )
      .pipe(
        finalize(
          () => this.workbenchStore.dispatch(
            new ReleaseTranscriptCommand({id: videoId})
          )
        ),
        share()
      );

    return this.workbenchStore.select(fromWorkbench.selectOpenTranscripts)
      .pipe(
        take(1),
        concatMap(
          (storeMap) => {
            const storeContext = storeMap.get(videoId);
            if (!!storeContext) {
              return storeContext.storeReservation;
            }

            return myGuard;
          }
        )
      );
  }

  private reserveAsTargeted(): Observable<never>
  {
    return this.workbenchStore.select(
      fromWorkbench.selectViewTranscriptVideoId
    )
      .pipe(
        switchMap((videoId: string) => {
            console.log(`Reacting to view transcript target becoming ${videoId}`);
            if (!!videoId) {
              return merge(
                this.reserveTranscript$(videoId)
                  .pipe(
                    tap(() => {console.log('Next from reserve transcript');}),
                    finalize(() => {console.log('Complete from reserve transcript');})
                  ),
                this.reserveVideoDetail$(videoId)
                  .pipe(
                    tap(() => {console.log('Next from reserve video');}),
                    finalize(() => {console.log('Complete from reserve video');})
                  )
              );
            } else {
              return NEVER;
            }
          }
        )
      );
  }
}
