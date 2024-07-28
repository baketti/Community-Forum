import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ApisHelperService } from '../apis-helper/apis-helper.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { provideHttpClient } from '@angular/common/http';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ApisHelperService,
        AuthenticationService
      ]
    });
    service = TestBed.inject(PostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
