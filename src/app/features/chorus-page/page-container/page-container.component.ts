import {
  Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Inject, ChangeDetectorRef
} from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../store/reducers/videos.reducer';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {filter, switchMap} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {chorusApiUrl} from '../../../shared/di/config-di.tokens';
import {Transcript} from '../store/models/videos.model';

@Component({
  selector: 'cai-chorus-page',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageContainerComponent implements OnInit {
  public readonly transcript: Transcript;
  public videoId: string;
  public videoChanges: Subscription;
  public transcriptChanges: Subscription;

  constructor(
    private store: Store<fromStore.State>,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) {
    this.videoId = this.route.snapshot.queryParamMap.get('id');
    this.transcript = this.route.snapshot.data.transcript;

    console.log(`I see ${this.videoId} and ${JSON.stringify(this.transcript)} up front.`)

    this.videoChanges = this.route.queryParams
  }

  ngOnInit()
  {
    this.transcript = this.route.queryParamMap.pipe(
      filter((params: ParamMap) => params.has('id')),
      switchMap((params: ParamMap) => {
          this.videoId = params.get('id');
          console.log(`I see ${this.videoId} after initializing.`)
          return this.httpClient.get(
            `${this.chorusApiUrl}/${this.videoId}.json`,
            {
              observe: 'body',
              responseType: 'json'
            }
          );
        }
      )
    );
  }
}
