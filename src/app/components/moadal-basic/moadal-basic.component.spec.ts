import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MoadalBasicComponent } from './moadal-basic.component';

describe('MoadalBasicComponent', () => {
  let component: MoadalBasicComponent;
  let fixture: ComponentFixture<MoadalBasicComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoadalBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoadalBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
