import { TestBed } from '@angular/core/testing';

import { AddpackageService } from './addpackage.service';

describe('AddpackageService', () => {
  let service: AddpackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddpackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
