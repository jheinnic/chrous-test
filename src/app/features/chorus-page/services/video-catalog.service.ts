import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {fromVideo} from '../store';
import {Transcript} from '../store/models/transcript.model';
import {finalize, share, startWith, tap} from 'rxjs/operators';
import {
  ReleaseTranscriptCommand, ReleaseVideoCatalogCommand, RequestTranscriptCommand, RequestVideoCatalogCommand
} from '../store/actions/video-catalog.actions';
import {muteFirst} from '../../../shared/utils/rxjs/mute-first';
import {BehaviorSubject, defer, NEVER, Observable} from 'rxjs';

const Immutable = require('immutable');

@Injectable()
export class VideoCatalogService
{
  constructor(private readonly store: Store<fromVideo.VideoStoreContent>)
  {
  }

  private requireCatalog$ = defer(
    () => {
      this.store.dispatch(
        new RequestVideoCatalogCommand()
      );

      return NEVER.pipe(
        finalize(
          () => this.store.dispatch(
            new ReleaseVideoCatalogCommand()
          )
        )
      );
    }
  ).pipe(
    share()
  );

  public selectVideoDictionary$ = muteFirst(
    this.requireCatalog$,
    this.store.select(fromVideo.selectAllVideos)
  );

  public selectVideoEntities$ = muteFirst(
    this.requireCatalog$,
    this.store.select(fromVideo.selectVideoEntities)
  );

  public selectVideoIds$ = muteFirst(
    this.requireCatalog$,
    this.store.select(fromVideo.selectVideoIds)
  );

  public selectTotalVideos$ = muteFirst(
    this.requireCatalog$,
    this.store.select(fromVideo.selectTotalVideos)
  );

  private openTranscripts$ =
    new BehaviorSubject<Map<string, Observable<Transcript>>>(
      new Immutable.Map()
    );

  // private selectOpenVideos =
  //   this.selectVideoDictionary

  public openVideoDetail(videoId: string): Observable<Transcript>
  {
    return defer(() => {
      this.openTranscripts$.pipe(
        tap((openMap: Map<string, Observable<Transcript>>) => {
          if (!openMap.has(videoId)) {
            this.openTranscripts$.next(
              openMap.set(
                videoId,
                NEVER.pipe(
                  startWith(null),
                  tap(() => this.store.dispatch(
                    new RequestTranscriptCommand(videoId)
                  )),
                  finalize(() => this.store.dispatch(
                    new ReleaseTranscriptCommand(videoId)
                  )),
                  share()
                )
              )
            )
          }
        })
      )
    })
  }
}
