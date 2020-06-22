import { TestBed } from '@angular/core/testing';

import { CheckOverviewGuard } from './check-overview.guard';

describe('CheckOverviewGuard', () => {
  let guard: CheckOverviewGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckOverviewGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
