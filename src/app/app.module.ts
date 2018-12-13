import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreRouterConnectingModule} from '@ngrx/router-store';

import {AppEffects, reducerOptions, reducers} from './store';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {ContactsModule} from './features/contacts/contacts.module';
import {environment} from '../environments/environment';
import {ChorusPageModule} from './features/chorus-page/chorus-page.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    StoreModule.forRoot(reducers, reducerOptions),
    StoreRouterConnectingModule.forRoot({stateKey: 'routerReducer'}),
    EffectsModule.forRoot([AppEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    SharedModule,
    CoreModule,
    ContactsModule,
    ChorusPageModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {}
