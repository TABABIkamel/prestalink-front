import { TestBed } from '@angular/core/testing';

import { TrouverProfileService } from './trouver-profile.service';

describe('TrouverProfileService', () => {
  let service: TrouverProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrouverProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
