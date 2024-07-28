import { TestBed } from '@angular/core/testing';

import { ApisHelperService } from './apis-helper.service';

describe('ApisHelperService', () => {
  let service: ApisHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApisHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
