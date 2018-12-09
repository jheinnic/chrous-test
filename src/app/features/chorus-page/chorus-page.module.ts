import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ChorusPageRoutingModule } from './chorus-page-routing.module';
import { VideosEffects } from './store/videos.effects';
import * as fromVideos from './store/videos.reducer';

@NgModule({
  declarations:
  imports: [
    CommonModule,
    ChorusPageRoutingModule,
    StoreModule.forFeature('videos', fromVideos.reducer),
    EffectsModule.forFeature([VideosEffects])
  ]
})
export class ChorusPageModule { }
