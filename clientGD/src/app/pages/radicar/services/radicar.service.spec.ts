import { TestBed } from '@angular/core/testing';

import { RadicarService } from '../services/radicar.service';

describe('RadicarService', () => {
  let service: RadicarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RadicarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
