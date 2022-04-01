import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawerCreateComponent } from './drawer-create.component';

describe('DrawerCreateComponent', () => {
  let component: DrawerCreateComponent;
  let fixture: ComponentFixture<DrawerCreateComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawerCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
