import {InjectionToken} from '@angular/core';
import {environment} from '../../../environments/environment';
import {InjectableEnvironmentKeys} from './environment.type';

function injectFromEnvironment(keyName: InjectableEnvironmentKeys): InjectionToken<string> {
  return new InjectionToken<string>(keyName, {
    providedIn: 'root',
    factory: () => environment[keyName]
  });
}

export const chorusApiUrl: InjectionToken<string> = injectFromEnvironment('chorusApiUrl');
