import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit,
  ViewEncapsulation
} from '@angular/core';
import {Store} from '@ngrx/store';
import {filter, flatMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

import * as fromWorkbench from '../store/reducers/workbench.reducer';
import {DecoratedTranscript} from '../store/models/workbench.model';
import {VideoWorkbenchService} from '../services/video-workbench.service';
import {videoWorkbenchService} from '../chorus-page-di.tokens';

@Component({
  selector: 'cai-transcript-dialog',
  templateUrl: './transcript-dialog.component.html',
  styleUrls: ['./transcript-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranscriptDialogComponent implements OnInit, OnDestroy
{
  private transcriptChanges: Subscription;

  private tempSub: Subscription;

  public videoData?: DecoratedTranscript;

  constructor(
    private readonly changeDetector: ChangeDetectorRef,
    @Inject(videoWorkbenchService) private readonly videoWorkbenchService: VideoWorkbenchService,
    private readonly tempStore: Store<fromWorkbench.State>
  ) { }

  ngOnInit()
  {
    // I cannot figure out why the service subscription won't work...  It does cause the
    // final collapsing selector to get called, but the Observable doesn't seem to ever
    // emit any of the values.  There's no good reason the broken subscription below
    // should not work when the one immediately following this comment works fine...
    this.tempSub = this.tempStore.select(
      fromWorkbench.selectDecoratedViewTranscriptVideo
    )
      .pipe(
        filter((value) => !!value),
        flatMap((value) => value)
      )
      .subscribe(
        (videoData: DecoratedTranscript) => {
          if (this.videoData !== videoData) {
            this.videoData = videoData;
            this.changeDetector.markForCheck();
          }

          console.log(
            'videoDataBackup', videoData,
            ', with ', videoData !== this.videoData);
        }
      );

    this.transcriptChanges =
      this.videoWorkbenchService.selectForViewTranscriptTarget$()
        .subscribe(
          (videoData: DecoratedTranscript) => {
            if (this.videoData !== videoData) {
              this.videoData = videoData;
              this.changeDetector.markForCheck();
            }

            console.log(
              'in guarded tx: ', videoData,
              ', with ', videoData !== this.videoData);
          }
        );
  }

  ngOnDestroy()
  {
    this.tempSub.unsubscribe();
    this.transcriptChanges.unsubscribe();
  }
}
