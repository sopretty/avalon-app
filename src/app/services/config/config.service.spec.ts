import { TestBed } from '@angular/core/testing';

import { ConfigService } from './rules.service';

describe('RulesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigService = TestBed.get(ConfigService);
    expect(service).toBeTruthy();
  });
});
