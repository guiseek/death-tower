import { TestBed } from '@angular/core/testing';

import { PointService } from './point.service';

describe('PointService', () => {
  let service: PointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
