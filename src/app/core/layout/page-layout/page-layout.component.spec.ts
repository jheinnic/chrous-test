import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PageLayoutComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        PageLayoutComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PageLayoutComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'chorus-test'`, () => {
    const fixture = TestBed.createComponent(PageLayoutComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('chorus-test');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(PageLayoutComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to chorus-test!');
  });
});
