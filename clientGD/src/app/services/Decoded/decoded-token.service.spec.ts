import { TestBed } from '@angular/core/testing';

import { DecodedTokenService } from './decoded-token.service';

describe('DecodedTokenService', () => {
  let service: DecodedTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecodedTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
