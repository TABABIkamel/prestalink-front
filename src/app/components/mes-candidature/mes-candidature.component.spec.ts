import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesCandidatureComponent } from './mes-candidature.component';

describe('MesCandidatureComponent', () => {
  let component: MesCandidatureComponent;
  let fixture: ComponentFixture<MesCandidatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesCandidatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
