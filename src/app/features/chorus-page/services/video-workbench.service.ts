import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {BehaviorSubject, defer, NEVER, Observable} from 'rxjs';
import {finalize, share, startWith, tap} from 'rxjs/operators';
import {Transcript} from '../store/models/transcript.model';
import {
  ReleaseTranscriptCommand, ReleaseVideoCatalogCommand, RequestTranscriptCommand, RequestVideoCatalogCommand
} from '../store/actions/workbench.actions';
import {muteFirst} from '../../../shared/utils/rxjs/mute-first';
import {fromVideoItem} from '../store';

;

const Immutable = require('immutable');

@Injectable()
export class VideoWorkbenchService
{
  constructor(private readonly store: Store<fromVideoItem.State>)
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
  )
    .pipe(
      share()
    );

  public selectVideoDictionary$ = muteFirst(
    this.requireCatalog$,
    this.store.select(fromVideoItem.selectVideoEntities)
  );

  public selectAllVideos$ = muteFirst(
    this.requireCatalog$,
    this.store.select(fromVideoItem.selectAllVideos)
  );

  public selectVideoIds$ = muteFirst(
    this.requireCatalog$,
    this.store.select(fromVideoItem.selectVideoIds)
  );

  public selectTotalVideos$ = muteFirst(
    this.requireCatalog$,
    this.store.select(fromVideoItem.selectTotalVideos)
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
