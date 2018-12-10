import {Inject} from '@angular/core';
import {Merge} from 'simplytyped';

type OtherEnvironmentKeys =
  'production';

export type InjectableEnvironmentKeys =
  'chorusApiUrl'

type OtherEnvironment = {
  [K in OtherEnvironmentKeys]: any;
}

type InjectableEnvironment = {
  [K in InjectableEnvironmentKeys]: string;
}

export type Environment = Merge<OtherEnvironment, InjectableEnvironment>;
