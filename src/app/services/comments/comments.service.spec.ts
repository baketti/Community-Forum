import { TestBed } from '@angular/core/testing';

import { CommentsService } from './comments.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ApisHelperService } from '../apis-helper/apis-helper.service';
import { provideHttpClient } from '@angular/common/http';

describe('CommentsService', () => {
  let service: CommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApisHelperService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(CommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
