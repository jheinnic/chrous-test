import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {SharedModule} from '../../shared/shared.module';

import {PageContainerComponent} from './page-container/page-container.component';
import {ChorusPageRoutingModule} from './chorus-page-routing.module';
import { ViewTranscriptWidgetEffects } from './store';
import { VideoCatalogEffects } from './store';
import * as fromViewTranscriptWidget from './store/reducers/view-transcript-widget.reducer';
import * as fromVideoCatalog from './store/reducers/video-catalog.reducer';
import * as fromTranscript from './store/reducers/transcript.reducer';
import * as fromVideos from './store/reducers/video.reducer';
import {VideoCatalogService} from './services/video-catalog.service';
import {videoCatalogApiClient} from '../../shared/di/services-di.tokens';
import {VideoCatalogApiClient} from './services/video-catalog-api-client.service';

@NgModule({
  declarations: [PageContainerComponent],
  imports: [
    SharedModule,
    ChorusPageRoutingModule,
    StoreModule.forFeature(fromVideos.featureKey, fromVideos.reducer),
    StoreModule.forFeature(fromViewTranscriptWidget.featureKey, fromViewTranscriptWidget.reducer),
    StoreModule.forFeature(fromVideoCatalog.featureKey, fromVideoCatalog.reducer),
    StoreModule.forFeature(fromTranscript.featureKey, fromTranscript.reducer),
    EffectsModule.forFeature([ViewTranscriptWidgetEffects, VideoCatalogEffects]),
  ],
  providers: [
    VideoCatalogService,
    {
      provide: videoCatalogApiClient,
      useClass: VideoCatalogApiClient
    }
  ]
})
export class ChorusPageModule {}
