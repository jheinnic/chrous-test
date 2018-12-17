// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Keys} from 'simplytyped';

export const environment = {
  production: false,
  developerSupportModules: () => [
    StoreDevtoolsModule.instrument()
  ],
  chorusApiUrl: '/api',
  keycloakConfigPath: '/assets/keycloak.json',
  keycloakServerUrl: 'http://portfolio.dev.jchein.name:28080/auth',
  onLoginRedirectUrl: '/route-one',
  onRegisterRedirectUrl: '/route-one',
  onLogoutRedirectUrl: '/route-two',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
