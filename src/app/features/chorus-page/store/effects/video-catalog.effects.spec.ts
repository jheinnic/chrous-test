import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { VideoCatalogEffects } from './video-catalog.effects';

describe('VideoCatalogEffects', () => {
  let actions$: Observable<any>;
  let effects: VideoCatalogEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VideoCatalogEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(VideoCatalogEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
