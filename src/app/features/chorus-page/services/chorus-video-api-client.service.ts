import {Inject, Injectable} from '@angular/core';
import {take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Dictionary} from '@ngrx/entity';
import {Store} from '@ngrx/store';
import * as LRU from 'lru-cache';

import {
  AddVideos, DeleteTranscript, DeleteVideoMeta, TranscriptRecord, TranscriptEntry, VideoMetadata,
  fromTranscript, fromVideoItem, fromVideoMeta, UpsertTranscript, AddVideoMeta
} from '../store';
import {ILruCacheFactoryService} from '../../../core/lru-cache-factory.interface';
import {lruCacheFactoryService} from '../../../core/core-di.tokens';
import {IChorusVideoApiClient} from './chorus-video-api-client.interface';
import {chorusApiUrl} from '../../../shared/di/config-di.tokens';

@Injectable()
export class ChorusVideoApiClient implements IChorusVideoApiClient
{
  private unusedMetadataCache: LRU.Cache<string, VideoMetadata>;
  private unusedTranscriptCache: LRU.Cache<string, TranscriptRecord>;

  constructor(
    private readonly httpClient: HttpClient,
    @Inject(chorusApiUrl) private readonly chorusApiUrl: String,
    @Inject(lruCacheFactoryService) lruCacheFactory: ILruCacheFactoryService,
    private readonly videoItemStore$: Store<fromVideoItem.State>,
    private readonly videoMetaStore$: Store<fromVideoMeta.State>,
    private readonly transcriptStore$: Store<fromTranscript.State>)
  {
    this.unusedMetadataCache = lruCacheFactory.createCache({
      noDisposeOnSet: true,
      max: 256,
      length: (metadata: VideoMetadata) => metadata.speakers.length
    });

    this.unusedTranscriptCache = lruCacheFactory.createCache({
      noDisposeOnSet: true,
      max: 256,
      length: (record: TranscriptRecord) => record.transcript.entries.length
    });
  }

  public async loadCatalog(): Promise<void>
  {
    this.videoItemStore$.dispatch(
      new AddVideos({
          videos: [
            {
              id: '4d79041e-f25f-421d-9e5f-3462459b9934',
              title: 'Video Title'
            }
          ]
        }
      )
    );
  }

  public async loadMetadata(videoId: string)
  {
    this.videoMetaStore$.dispatch(
      new AddVideoMeta({
        videoMeta: {
          id: videoId,
          title: 'Video Title',
          speakers: [{
            displayName: 'Customer',
            transcriptKey: 'Cust',
            highlightColor: '#EE6EFF'
          }, {
            displayName: 'Representative',
            transcriptKey: 'Rep',
            highlightColor: '#00A7D1'
          }],
          resolution: {
            width: 1280,
            height: 720
          }
        }
      })
    )
  }

  public async loadTranscript(videoId: string): Promise<void>
  {
    let transcript: TranscriptRecord =
      this.unusedTranscriptCache.get(videoId);

    if (!transcript) {
      const transcriptEntries: Array<TranscriptEntry> =
        await this.httpClient.get<Array<TranscriptEntry>>(
          `${this.chorusApiUrl}/${videoId}.json`,
          {
            observe: 'body',
            responseType: 'json'
          }
        )
          .toPromise();
      transcript = {
        id: videoId,
        transcript: {
          entries: transcriptEntries.sort(
            (a: TranscriptEntry, b: TranscriptEntry) => a.time - b.time
          )
        }
      };
    } else {
      // The transcript is about to be used again, so rescue it from the cache for
      // delayed purges.
      this.unusedTranscriptCache.del(videoId);
    }

    this.videoItemStore$.dispatch(
      new UpsertTranscript({transcript})
    );
  }

  public purgeMetadata(videoId: string): void
  {
    this.videoMetaStore$.select(
      fromVideoMeta.selectEntities
    )
      .pipe(
        take(1)
      )
      .subscribe((entities: Dictionary<VideoMetadata>) => {
        this.unusedMetadataCache.set(videoId, entities[videoId])
      });

    this.videoMetaStore$.dispatch(
      new DeleteVideoMeta({id: videoId})
    );
  }

  public purgeTranscript(videoId: string): void
  {
    this.transcriptStore$.select(
      fromTranscript.selectEntities
    )
      .pipe(
        take(1)
      )
      .subscribe((entities: Dictionary<TranscriptRecord>) => {
        this.unusedTranscriptCache.set(videoId, entities[videoId])
      });

    this.transcriptStore$.dispatch(
      new DeleteTranscript({id: videoId})
    );
  }
}
