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
  selector: 'cai-tiled-chorus-page',
  templateUrl: './tiled-page-container.component.html',
  styleUrls: ['./tiled-page-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiledPageContainerComponent implements OnInit, OnDestroy
{
  public transcript: TranscriptRecord;

  public videoId: string;

  public transcriptChanges: Subscription;

  public readonly rowRange: ReadonlyArray<number>;

  public readonly colRange: ReadonlyArray<number>;

  public readonly cellStyles: CellStyle[];

  public readonly gridHeight: number;

  public readonly gridWidth: number;

  public readonly cellHeight: number;

  public readonly cellWidth: number;

  public readonly rowCount: number;

  public readonly colCount: number;

  public readonly chance: Chance.Chance;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly store: Store<fromWorkbench.State>,
    @Inject(videoWorkbenchService) private readonly videoWorkbenchService: VideoWorkbenchService
  )
  {
    this.gridHeight = 1080;
    this.gridWidth = 1410;
    this.cellHeight = 35;
    this.cellWidth = 35;

    this.rowCount = Math.floor(this.gridHeight / this.cellHeight);
    this.colCount = Math.floor(this.gridWidth / this.cellWidth);

    let minCount: number;
    let maxCount: number;
    let minArray: number[];
    let maxArray: number[];

    if (this.rowCount > this.colCount) {
      maxCount = this.rowCount;
      maxArray = new Array<number>(maxCount);
      this.rowRange = maxArray;

      minCount = this.colCount;
      minArray = new Array<number>(minCount);
      this.colRange = minArray;
    } else {
      maxCount = this.colCount;
      maxArray = new Array<number>(maxCount);
      this.colRange = maxArray;

      minCount = this.rowCount;
      minArray = new Array<number>(minCount);
      this.rowRange = minArray;
    }

    for (let ii = 0; ii < minCount; ii++) {
      minArray[ii] = ii;
      maxArray[ii] = ii;
    }
    for (let ii = minCount; ii < maxCount; ii++) {
      maxArray[ii] = ii;
    }

    const chance: Chance.Chance = Chance();
    const cellCount = maxCount * minCount;
    this.cellStyles = new Array(cellCount);

    for (let ii = 0; ii < cellCount; ii++) {
      let colorOne, colorTwo;
      do {
        colorOne = new Color(
          chance.color({format: 'rgb'}));
        colorTwo = colorOne.negate();
      } while(colorOne.isDark() === colorTwo.isDark());

      const oneIsDark = ! colorOne.isDark();

      this.cellStyles[ii] = {
        'background-color': oneIsDark ? colorOne.toString() : colorTwo.toString(),
        color: oneIsDark ? colorTwo.toString() : colorOne.toString()
      };
    }
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

  styleCell(rowNum, colNum): CellStyle
  {
    const cellIndex = (rowNum * this.colCount) + colNum;
    return this.cellStyles[cellIndex];
  }
}

interface CellStyle {
  color: string;
  'background-color': string;
}
