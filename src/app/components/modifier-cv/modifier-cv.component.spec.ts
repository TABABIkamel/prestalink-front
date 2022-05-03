import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCvComponent } from './modifier-cv.component';

describe('ModifierCvComponent', () => {
  let component: ModifierCvComponent;
  let fixture: ComponentFixture<ModifierCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierCvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
