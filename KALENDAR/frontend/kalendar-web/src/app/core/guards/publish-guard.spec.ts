import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { publishGuard } from './publish-guard';

describe('publishGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => publishGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
