import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {NavigationActionTiming, StoreRouterConnectingModule} from '@ngrx/router-store';

import {CustomRouterStateSerializerService, reducerOptions, reducers} from './store';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {ContactsModule} from './features/contacts/contacts.module';
import {environment} from '../environments/environment';
import {ChorusPageModule} from './features/chorus-page/chorus-page.module';
import {PageLayoutComponent} from './core/layout/page-layout/page-layout.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    RouterModule.forRoot([]),
    StoreModule.forRoot(reducers, reducerOptions),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'routerReducer',
      serializer: CustomRouterStateSerializerService,
      navigationActionTiming: NavigationActionTiming.PostActivation
    }),
    EffectsModule.forRoot([]),
    environment.production ? [] : environment.developerSupportModules(),
    SharedModule,
    ContactsModule,
    ChorusPageModule,
    // AppRoutingModule,
  ],
  providers: [],
  bootstrap: [PageLayoutComponent],
  entryComponents: []
})
export class AppModule {}
