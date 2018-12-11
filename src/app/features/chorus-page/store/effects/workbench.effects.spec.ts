import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { WorkbenchEffects } from './workbench.effects';

describe('VideoCatalogEffects', () => {
  let actions$: Observable<any>;
  let effects: WorkbenchEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WorkbenchEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(WorkbenchEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
