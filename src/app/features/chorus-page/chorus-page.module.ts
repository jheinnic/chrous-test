import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {SharedModule} from '../../shared/shared.module';

import * as fromVideos from './store/reducers/videos.reducer';
import {VideosEffects} from './store/effects/videos.effects';
import {PageContainerComponent} from './page-container/page-container.component';
import {ChorusPageRoutingModule} from './chorus-page-routing.module';
import * as fromViewTranscriptWidget from './store/reducers/view-transcript-widget.reducer';
import { ViewTranscriptWidgetEffects } from './store/effects/view-transcript-widget.effects';

@NgModule({
  declarations: [PageContainerComponent],
  imports: [
    SharedModule,
    ChorusPageRoutingModule,
    StoreModule.forFeature('videos', fromVideos.reducer),
    EffectsModule.forFeature([VideosEffects, ViewTranscriptWidgetEffects]),
    StoreModule.forFeature('viewTranscriptWidget', fromViewTranscriptWidget.reducer)
  ]
})
export class ChorusPageModule {}
