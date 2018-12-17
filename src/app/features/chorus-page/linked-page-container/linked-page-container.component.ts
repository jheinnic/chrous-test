import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import * as Chance from 'chance';
import * as Color from 'color';

import {fromWorkbench, SetViewTranscriptTargetVideoId, TranscriptRecord} from '../store';
import {VideoWorkbenchService} from '../services/video-workbench.service';
import {videoWorkbenchService} from '../chorus-page-di.tokens';

@Component({
  selector: 'cai-linked-chorus-page',
  templateUrl: './linked-page-container.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkedPageContainerComponent implements OnInit, OnDestroy
{
  private transcriptChanges: Subscription;
  private videoId: string;
  
  constructor(
    private readonly route: ActivatedRoute,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly store: Store<fromWorkbench.State> )
  { }

  ngOnInit()
  {
    // SwitchMap will automatically close any previous subscription to the video catalog
    // service when it retrieves a new one on change-of-video Id.
    this.transcriptChanges = this.route.queryParamMap.subscribe(
      (params: ParamMap) => {
        const newVideoId = params.get('id');
        if (newVideoId !== this.videoId) {
          this.videoId = newVideoId;
          console.log(`I see ${this.videoId} after initializing.`);

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

  ngOnDestroy()
  {
    this.transcriptChanges.unsubscribe();
  }
}
