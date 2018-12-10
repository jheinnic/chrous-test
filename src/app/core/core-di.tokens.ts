import {InjectionToken} from '@angular/core';
import {ILruCacheFactoryService} from './lru-cache-factory.interface';

export const lruCacheFactoryService: InjectionToken<ILruCacheFactoryService> =
  new InjectionToken<ILruCacheFactoryService>("LruCacheFactoryService");
