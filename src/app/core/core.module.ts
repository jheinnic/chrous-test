import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LayoutModule} from '@angular/cdk/layout';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {moduleImportGuard} from '../shared/utils/module-import-guard.helper';
import {lruCacheFactoryService} from './core-di.tokens';
import {LruCacheFactoryService} from './lru-cache-factory.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LayoutEffects } from './store/effects/layout.effects';
import * as fromLayout from './store/reducers/layout.reducer';
import {PageLayoutComponent} from './layout/page-layout/page-layout.component';
import {ModalDialogOutletComponent} from './layout/modal-outlet/modal-dialog-outlet.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    BrowserAnimationsModule,
    HttpClientModule,
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.OFF
    }),
    StoreModule.forFeature(fromLayout.featureKey, fromLayout.reducer),
    EffectsModule.forFeature([LayoutEffects]),
    SharedModule
  ],
  declarations: [PageLayoutComponent, ModalDialogOutletComponent],
  providers: [
    {
      provide: lruCacheFactoryService,
      useClass: LruCacheFactoryService
    }
  ],
  exports: [
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PageLayoutComponent,
  ],
  entryComponents: [],
})
export class CoreModule
{
  constructor(@Optional() @SkipSelf() parentModule: CoreModule)
  {
    moduleImportGuard(parentModule, 'CoreModule');
  }
}
