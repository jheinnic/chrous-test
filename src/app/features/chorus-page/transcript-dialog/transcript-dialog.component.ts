import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation
} from '@angular/core';
import {Subscription} from 'rxjs';

import {CombinedVideo, fromWorkbench} from '../store';
import {VideoWorkbenchService} from '../services/video-workbench.service';
import {videoWorkbenchService} from '../chorus-page-di.tokens';
import {Store} from '@ngrx/store';

@Component({
  selector: 'cai-transcript-dialog',
  templateUrl: './transcript-dialog.component.html',
  styleUrls: ['./transcript-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranscriptDialogComponent implements OnInit
{
  private transcriptChanges: Subscription;
  private tempSub: Subscription;

  public videoData: CombinedVideo;

  constructor(
    // private readonly route: ActivatedRoute,
    private readonly changeDetector: ChangeDetectorRef,
    @Inject(videoWorkbenchService) private readonly videoWorkbenchService: VideoWorkbenchService,
    private readonly tempStore: Store<fromWorkbench.State>
  )
  {

    // this.videoData = {
    //   id: '0',
    //   title: 'Title',
    //   speakers: [{
    //     displayName: 'Bob',
    //     transcriptKey: 'Cust',
    //     highlightColor: '#A0331F'
    //   }],
    //   resolution: {
    //     height: 300,
    //     width: 200
    //   },
    //   entries: [
    //     {
    //       speaker: 'Cust',
    //       snippet: 'Oh wow',
    //       time: 100
    //     }
    //   ]
    // }
  }

  ngOnInit()
  {
    // I cannot figure out why the service subscription won't work...  It does cause the
    // final collapsing selector to get called, but the Observable doesn't seem to ever
    // emit any of the values.  There's no good reason the broken subscription below
    // should not work when the one immediately following this comment works fine...
    this.tempSub = this.tempStore.select(fromWorkbench.selectViewTranscriptVideo).subscribe(
      (videoData) => {
        console.log('videoDataBackup', videoData);
        this.videoData = videoData;
        this.changeDetector.markForCheck();
      }
    );

    this.transcriptChanges = this.videoWorkbenchService.selectForViewTranscriptTarget$()
      .subscribe((videoData: CombinedVideo) => {
        console.log(videoData);
        this.videoData = videoData;
        this.changeDetector.markForCheck();
      })
    // SwitchMap will automatically close any previous subscription to the video catalog
    // service when it retrieves a new one on change-of-video Id.
    // this.transcriptChanges = this.route.queryParamMap.pipe(
    //   switchMap((params: ParamMap) => {
    //       const newVideoId = params.get('id');
    //       if (newVideoId !== this.videoId) {
    //         this.videoId = newVideoId;
    //         console.log(`I see ${this.videoId} after initializing.`)
    //         this.changeDetector.markForCheck();
    //
    //         if (!! this.videoId) {
    //           console.log('Got it!');
    //           return this.videoWorkbenchService.selectTranscript$(this.videoId)
    //         }
    //       }
    //
    //       return of();
    //     }
    //   )
    // ).subscribe(
    //   (transcript: Transcript) => {
    //     this.transcript = transcript;
    //     this.changeDetector.markForCheck();
    //   }
    // );
  }

  ngOnDestroy()
  {
    this.tempSub.unsubscribe();
    this.transcriptChanges.unsubscribe();
  }
}
