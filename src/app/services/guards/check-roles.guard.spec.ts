import { TestBed, async, inject } from '@angular/core/testing';

import { CheckRolesGuard } from './check-roles.guard';

describe('CheckRolesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckRolesGuard]
    });
  });

  it('should ...', inject([CheckRolesGuard], (guard: CheckRolesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
