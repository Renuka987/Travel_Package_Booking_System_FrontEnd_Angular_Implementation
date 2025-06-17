import { TestBed } from '@angular/core/testing';

import { AvailablePackagesService } from './available-packages.service';

describe('AvailablePackagesService', () => {
  let service: AvailablePackagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailablePackagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
