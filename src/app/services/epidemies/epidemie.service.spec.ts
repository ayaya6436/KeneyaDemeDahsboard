import { TestBed } from '@angular/core/testing';

import { EpidemieService } from './epidemie.service';

describe('EpidemieService', () => {
  let service: EpidemieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpidemieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
