import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ViewTranscriptWidgetEffects } from './view-transcript-widget.effects';

describe('ViewTranscriptWidgetEffects', () => {
  let actions$: Observable<any>;
  let effects: ViewTranscriptWidgetEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ViewTranscriptWidgetEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ViewTranscriptWidgetEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
