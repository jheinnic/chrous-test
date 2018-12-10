import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptDialogComponent } from './transcript-dialog.component';
import { Store, StoreModule } from '@ngrx/store';

describe('PageContainerComponent', () => {
  let component: TranscriptDialogComponent;
  let fixture: ComponentFixture<TranscriptDialogComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ TranscriptDialogComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscriptDialogComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
