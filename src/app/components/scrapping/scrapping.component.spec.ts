import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrappingComponent } from './scrapping.component';

describe('ScrappingComponent', () => {
  let component: ScrappingComponent;
  let fixture: ComponentFixture<ScrappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
