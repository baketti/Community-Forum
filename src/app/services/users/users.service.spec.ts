import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ApisHelperService } from '../apis-helper/apis-helper.service';
import { provideHttpClient } from '@angular/common/http';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ApisHelperService
      ]
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
