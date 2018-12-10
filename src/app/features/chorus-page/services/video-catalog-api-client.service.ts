import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as LRU from 'lru-cache';

import {
  AddVideos, DeleteTranscript, fromTranscript, fromVideo, Transcript, TranscriptEntry, UpsertTranscript,
  UpsertVideo, Video
} from '../store';
import {IVideoCatalogApiClient} from './video-catalog-api-client.interface';
import {ILruCacheFactoryService} from '../../../core/lru-cache-factory.interface';
import {lruCacheFactoryService} from '../../../core/core-di.tokens';
import {chorusApiUrl} from '../../../shared/di/config-di.tokens';
import {take, withLatestFrom} from 'rxjs/operators';
import {Dictionary} from '@ngrx/entity';

@Injectable()
export class VideoCatalogApiClient implements IVideoCatalogApiClient
{
  private unusedTranscriptCache: LRU.Cache<string, Transcript>;

  constructor(
    private readonly httpClient: HttpClient,
    @Inject(chorusApiUrl) private readonly chorusApiUrl: String,
    @Inject(lruCacheFactoryService) lruCacheFactory: ILruCacheFactoryService,
    private readonly videoStore$: Store<fromVideo.VideoStoreContent>,
    private readonly transcriptStore$: Store<fromTranscript.TranscriptStoreContent>)
  {
    this.unusedTranscriptCache = lruCacheFactory.createCache({
      noDisposeOnSet: true,
      max: 256,
      length: (transcript: Transcript) => transcript.entries.length
      // dispose: (id: string, _transcript: Transcript) => {
      //   this.transcriptStore$.dispatch(
      //     new DeleteTranscript({id})
      //   );
      // }
    });
  }

  public async loadCatalog(): Promise<void>
  {
    this.videoStore$.dispatch(
      new AddVideos({
          videos: [
            {
              id: '4d79041e-f25f-421d-9e5f-3462459b9934',
              title: 'Video Title',
              needsMetadata: true
            }
          ]
        }
      )
    );
  }

  public async loadMetadata(videoItem: Video)
  {
    this.videoStore$.dispatch(
      new UpsertVideo({
        video: {
          ...videoItem,
          speakers: [],
          resolution: {
            width: 300,
            height: 200
          }
        }
      })
    )
  }

  public async loadTranscript(videoId: string): Promise<void>
  {
    let transcript: Transcript =
      this.unusedTranscriptCache.get(videoId);

    if (! transcript) {
      const transcriptEntries: Array<TranscriptEntry> =
        await this.httpClient.get<Array<TranscriptEntry>>(
          `${this.chorusApiUrl}/${videoId}.json`,
          {
            observe: 'body',
            responseType: 'json'
          }
        ).toPromise();
      transcript = {
        id: videoId,
        entries: transcriptEntries.sort(
          (a: TranscriptEntry, b: TranscriptEntry) => a.time - b.time
        )
      };
    } else {
      // The transcript is about to be used again, so rescue it from the cache for
      // delayed purges.
      this.unusedTranscriptCache.del(videoId);
    }

    this.videoStore$.dispatch(
      new UpsertTranscript({ transcript })
    );
  }

  public purgeTranscript(videoId: string): void
  {
    this.transcriptStore$.select(
      fromTranscript.selectTranscriptEntities
    ).pipe(
      withLatestFrom(),
      take(1)
    ).subscribe((entities: Dictionary<Transcript>) => {
      this.unusedTranscriptCache.set(videoId, entities[videoId])
    });

    this.transcriptStore$.dispatch(
      new DeleteTranscript({ id: videoId })
    );
  }
}
