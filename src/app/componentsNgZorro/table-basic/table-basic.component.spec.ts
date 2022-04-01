import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableBasicComponent } from './table-basic.component';

describe('TableBasicComponent', () => {
  let component: TableBasicComponent;
  let fixture: ComponentFixture<TableBasicComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TableBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
