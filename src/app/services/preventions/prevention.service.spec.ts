import { TestBed } from '@angular/core/testing';

import { PreventionService } from './prevention.service';

describe('PreventionService', () => {
  let service: PreventionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreventionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
