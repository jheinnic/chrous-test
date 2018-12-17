import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {SharedModule} from '../../shared/shared.module';

import {chorusVideoApiClient, videoWorkbenchService} from './chorus-page-di.tokens';
import {fromVideoItem, fromVideoMeta, fromTranscript, fromWorkbench} from './store';
import {VideoWorkbenchService} from './services/video-workbench.service';
import {ChorusVideoApiClient} from './services/chorus-video-api-client.service';
import {TranscriptDialogComponent} from './transcript-dialog/transcript-dialog.component';
import {PageContainerComponent} from './page-container/page-container.component';
import {ChorusPageRoutingModule} from './chorus-page-routing.module';
import {WorkbenchEffects} from './store/effects/workbench.effects';
import {TiledPageContainerComponent} from './tiled-page-container/tiled-page-container.component';

@NgModule({
  declarations: [PageContainerComponent, TranscriptDialogComponent, TiledPageContainerComponent],
  imports: [
    SharedModule,
    CommonModule,
    ChorusPageRoutingModule,
    StoreModule.forFeature(fromVideoItem.featureKey, fromVideoItem.reducer),
    StoreModule.forFeature(fromVideoMeta.featureKey, fromVideoMeta.reducer),
    StoreModule.forFeature(fromTranscript.featureKey, fromTranscript.reducer),
    StoreModule.forFeature(fromWorkbench.featureKey, fromWorkbench.reducer),
    EffectsModule.forFeature([WorkbenchEffects]),
  ],
  providers: [
    {
      provide: videoWorkbenchService,
      useClass: VideoWorkbenchService
    },
    {
      provide: chorusVideoApiClient,
      useClass: ChorusVideoApiClient
    },
  ],
  entryComponents: [TranscriptDialogComponent]
})
export class ChorusPageModule {}
