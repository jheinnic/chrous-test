import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedPageContainerComponent } from './linked-page-container.component';
import { Store, StoreModule } from '@ngrx/store';

describe('PageContainerComponent', () => {
  let component: LinkedPageContainerComponent;
  let fixture: ComponentFixture<LinkedPageContainerComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
     imports: [ StoreModule.forRoot({}) ],
      declarations: [ LinkedPageContainerComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedPageContainerComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
