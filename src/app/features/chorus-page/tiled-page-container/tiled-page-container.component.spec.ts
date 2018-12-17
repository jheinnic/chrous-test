import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiledPageContainerComponent } from './tiled-page-container.component';
import { Store, StoreModule } from '@ngrx/store';

describe('PageContainerComponent', () => {
  let component: TiledPageContainerComponent;
  let fixture: ComponentFixture<TiledPageContainerComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
     imports: [ StoreModule.forRoot({}) ],
      declarations: [ TiledPageContainerComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiledPageContainerComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
