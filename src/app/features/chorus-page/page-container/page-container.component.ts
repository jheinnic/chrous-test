import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation
} from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromStore from '../store/reducers/video-item.reducer';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {filter, switchMap} from 'rxjs/operators';
import {of, Subscription} from 'rxjs';
import {Transcript} from '../store/models/transcript.model';
import {VideoWorkbenchService} from '../services/video-workbench.service';
import {videoWorkbenchService} from '../chorus-page-di.tokens';
import {fromWorkbench, OpenTranscriptByVideoId} from '../store';

@Component({
  selector: 'cai-chorus-page',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageContainerComponent implements OnInit
{
  public transcript: Transcript;

  public videoId: string;

  public videoChanges: Subscription;

  public transcriptChanges: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly store: Store<fromWorkbench.State>,
    @Inject(videoWorkbenchService) private readonly videoWorkbenchService: VideoWorkbenchService
  )
  {
    // this.videoId = this.route.snapshot.queryParamMap.get('id');
    // console.log(`I see ${this.videoId} in the query params`);

    // this.transcript = this.route.snapshot.data.transcript;
    // if (!! this.transcript) {
    //   console.log(`I see ${JSON.stringify(this.transcript)} in the data.`)
    // } else {
    //   console.log(`I found no transcript in the loader data...`);
    // }
  }

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
            this.changeDetector.markForCheck();

            if (!! this.videoId) {
              // return this.videoWorkbenchService.selectTranscript$(this.videoId)
              this.store.dispatch(
                new OpenTranscriptByVideoId({id: this.videoId})
              );
            }
          }
        }
      );
    // ).subscribe(
    //   (transcript: Transcript) => {
    //     this.transcript = transcript;
    //     this.changeDetector.markForCheck();
    //   }
    // );
  }

  ngOnDestroy() {
    this.transcriptChanges.unsubscribe();
  }
}
