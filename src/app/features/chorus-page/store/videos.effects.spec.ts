import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { VideosEffects } from './videos.effects';

describe('VideosEffects', () => {
  let actions$: Observable<any>;
  let effects: VideosEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VideosEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(VideosEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
