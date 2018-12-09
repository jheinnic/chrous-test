import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {SharedModule} from '../../shared/shared.module';

import * as fromVideos from './store/videos.reducer';
import {VideosEffects} from './store/videos.effects';
import {PageContainerComponent} from './page-container/page-container.component';
import {ChorusPageRoutingModule} from './chorus-page-routing.module';

@NgModule({
  declarations: [PageContainerComponent],
  imports: [
    SharedModule,
    ChorusPageRoutingModule,
    StoreModule.forFeature('videos', fromVideos.reducer),
    EffectsModule.forFeature([VideosEffects])
  ]
})
export class ChorusPageModule {}
