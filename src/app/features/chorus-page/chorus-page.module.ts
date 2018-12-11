import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {SharedModule} from '../../shared/shared.module';

import {IChorusVideoApiClient} from './services/chorus-video-api-client.interface';
import {videoCatalogApiClient, videoCatalogService} from './chorus-page-di.tokens';
import {PageContainerComponent} from './page-container/page-container.component';
import {VideoWorkbenchService} from './services/video-workbench.service';
import {ChorusPageRoutingModule} from './chorus-page-routing.module';
import * as fromVideoCatalog from './store/reducers/workbench.reducer';
import * as fromTranscript from './store/reducers/transcript.reducer';
import * as fromVideoMeta from './store/reducers/video-meta.reducer';
import * as fromVideos from './store/reducers/video-item.reducer';
import {fromVideoItem, WorkbenchEffects} from './store';
import {ChorusVideoApiClient} from './services/chorus-video-api-client.service';

@NgModule({
  declarations: [PageContainerComponent],
  imports: [
    SharedModule,
    ChorusPageRoutingModule,
    StoreModule.forFeature(fromVideoMeta.featureKey, fromVideoMeta.reducer),
    StoreModule.forFeature(fromVideoItem.featureKey, fromVideoItem.reducer),
    StoreModule.forFeature(fromTranscript.featureKey, fromTranscript.reducer),
    StoreModule.forFeature(fromVideoCatalog.featureKey, fromVideoCatalog.reducer),
    EffectsModule.forFeature([WorkbenchEffects]),
  ],
  providers: [
    {
      provide: videoCatalogService,
      useClass: VideoWorkbenchService
    },
    {
      provide: videoCatalogApiClient,
      useClass: ChorusVideoApiClient
    }
  ]
})
export class ChorusPageModule {}
