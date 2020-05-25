import { TestBed, async, inject } from '@angular/core/testing';

import { CheckGameGuard } from './check-game.guard';

describe('CheckGameGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckGameGuard]
    });
  });

  it('should ...', inject([CheckGameGuard], (guard: CheckGameGuard) => {
    expect(guard).toBeTruthy();
  }));
});
