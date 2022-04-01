import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatureReviewedComponent } from './candidature-reviewed.component';

describe('CandidatureReviewedComponent', () => {
  let component: CandidatureReviewedComponent;
  let fixture: ComponentFixture<CandidatureReviewedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatureReviewedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatureReviewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
