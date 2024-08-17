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

  it('should add X-Spinner-ID header', () => {
    const spinnerId = '12345';
    const result = service.addXSpinnerIdHeader(spinnerId);
    expect(result.headers['X-Spinner-ID']).toBe(spinnerId);
  });

  it('should return an object with headers property', () => {
    const spinnerId = '67890';
    const result = service.addXSpinnerIdHeader(spinnerId);
    expect(result).toEqual({
      headers: {
        'X-Spinner-ID': spinnerId
      }
    });
  });
});
