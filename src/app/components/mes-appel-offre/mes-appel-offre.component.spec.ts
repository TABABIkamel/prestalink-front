import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesAppelOffreComponent } from './mes-appel-offre.component';

describe('MesAppelOffreComponent', () => {
  let component: MesAppelOffreComponent;
  let fixture: ComponentFixture<MesAppelOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesAppelOffreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesAppelOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
