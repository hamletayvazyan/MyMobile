import { TestBed } from '@angular/core/testing';

import { UserStorageService } from './user-storage.service';

describe('StoreInStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserStorageService = TestBed.get(UserStorageService);
    expect(service).toBeTruthy();
  });
});
