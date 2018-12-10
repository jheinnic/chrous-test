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
  ],
  declarations: [],
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
  ]
})
export class CoreModule
{
  constructor(@Optional() @SkipSelf() parentModule: CoreModule)
  {
    moduleImportGuard(parentModule, 'CoreModule');
  }
}
