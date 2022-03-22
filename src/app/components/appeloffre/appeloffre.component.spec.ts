import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppeloffreComponent } from './appeloffre.component';

describe('AppeloffreComponent', () => {
  let component: AppeloffreComponent;
  let fixture: ComponentFixture<AppeloffreComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppeloffreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppeloffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
