import { TestBed } from '@angular/core/testing';

import { DomServiceService } from './dom-service.service';

describe('DomServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DomServiceService = TestBed.get(DomServiceService);
    expect(service).toBeTruthy();
  });
});
