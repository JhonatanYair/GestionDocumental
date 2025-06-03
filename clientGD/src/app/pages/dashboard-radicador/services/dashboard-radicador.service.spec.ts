import { TestBed } from '@angular/core/testing';

import { DashboardRadicadorService } from './dashboard-radicador.service';

describe('DashboardRadicadorService', () => {
  let service: DashboardRadicadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardRadicadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
