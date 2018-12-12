import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {SharedModule} from '../../shared/shared.module';

import {IChorusVideoApiClient} from './services/chorus-video-api-client.interface';
import {chorusVideoApiClient, videoWorkbenchService} from './chorus-page-di.tokens';
import {PageContainerComponent} from './page-container/page-container.component';
import {VideoWorkbenchService} from './services/video-workbench.service';
import {ChorusPageRoutingModule} from './chorus-page-routing.module';
import {fromVideoItem, fromVideoMeta, fromTranscript, fromWorkbench, WorkbenchEffects} from './store';
import {ChorusVideoApiClient} from './services/chorus-video-api-client.service';
import {TranscriptDialogComponent} from './transcript-dialog/transcript-dialog.component';
import {TranscriptDialogOutletComponent} from './transcript-dialog/transcript-dialog-outlet.component';

@NgModule({
  declarations: [PageContainerComponent, TranscriptDialogComponent, TranscriptDialogOutletComponent],
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
