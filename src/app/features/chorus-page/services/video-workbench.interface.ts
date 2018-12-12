import {muteFirst} from '../../../shared/utils/rxjs/mute-first';
import * as fromVideo from '../store/reducers/video-item.reducer';
import {BehaviorSubject, defer, Observable} from 'rxjs';
import {CombinedVideo, Transcript, VideoItem, VideoMetadata} from '../store';
import {Dictionary} from '@ngrx/entity';

/**
 * Workbench API that provides an Observable data interface to UI components.  It acts as a
 * facade layer over many aspects of @ngrx Store's videos and transcripts sub feature.
 *
 * Any state this service requires should also be managed within NgRX.  Most awkwardly, this
 * includes the bookkeeping required to multicast the Observables for artifacts that are
 * selectively loaded--e.g. Video Metadata and Transcript Content.
 */
export interface IVideoWorkbenchService {
  selectVideoDictionary$: Observable<Dictionary<VideoItem>>;

  selectAllVideos$: Observable<VideoItem[]>;

  selectVideoIds$: Observable<string[]>;

  selectTotalVideos$: Observable<number>;

  selectTranscript$(videoId: string): Observable<Transcript>

  selectVideoDetail$(videoId: string): Observable<VideoMetadata>;

  selectForViewTranscriptTarget$(): Observable<CombinedVideo>;
}
