import {Injectable} from '@angular/core';
import * as LRU from 'lru-cache';

export interface ILruCacheFactoryService {
  createCache<K, V>(options: LRU.Options): LRU.Cache<K, V>;
}
