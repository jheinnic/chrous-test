import {Injectable} from '@angular/core';
import * as LRU from 'lru-cache';

@Injectable()
export class LruCacheFactoryService {
  constructor() {
  }

  public createCache<K, V>(options: LRU.Options): LRU.Cache<K, V> {
    return new LRU(options);
  }
}
