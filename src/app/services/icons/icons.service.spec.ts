import { TestBed } from '@angular/core/testing';

import { IconsService } from './icons.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

describe('IconsService', () => {
  let service: IconsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MatIconRegistry,
        DomSanitizer
      ]
    });
    service = TestBed.inject(IconsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
