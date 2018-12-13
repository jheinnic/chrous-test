import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewEncapsulation
} from '@angular/core';
import {Store} from '@ngrx/store';

import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';
import {TranscriptRecord} from '../store/models/transcript.model';
import {VideoWorkbenchService} from '../services/video-workbench.service';
import {videoWorkbenchService} from '../chorus-page-di.tokens';
import {fromWorkbench, SetViewTranscriptTargetVideoId} from '../store';

@Component({
  selector: 'cai-chorus-page',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageContainerComponent implements OnInit, OnDestroy
{
  public transcript: TranscriptRecord;

  public videoId: string;

  public transcriptChanges: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly store: Store<fromWorkbench.State>,
    @Inject(videoWorkbenchService) private readonly videoWorkbenchService: VideoWorkbenchService
  ) { }

  ngOnInit()
  {
    // SwitchMap will automatically close any previous subscription to the video catalog
    // service when it retrieves a new one on change-of-video Id.
    this.transcriptChanges = this.route.queryParamMap.subscribe(
      (params: ParamMap) => {
          const newVideoId = params.get('id');
          if (newVideoId !== this.videoId) {
            this.videoId = newVideoId;
            console.log(`I see ${this.videoId} after initializing.`)

            if (!! this.videoId) {
              this.store.dispatch(
                new SetViewTranscriptTargetVideoId({id: this.videoId})
              );
            }

            this.changeDetector.markForCheck();
          }
        }
      );
  }

  ngOnDestroy() {
    this.transcriptChanges.unsubscribe();
  }
}
