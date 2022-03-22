import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NzDemoDropdownPlacementComponent } from './nz-demo-dropdown-placement.component';

describe('NzDemoDropdownPlacementComponent', () => {
  let component: NzDemoDropdownPlacementComponent;
  let fixture: ComponentFixture<NzDemoDropdownPlacementComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NzDemoDropdownPlacementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzDemoDropdownPlacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
