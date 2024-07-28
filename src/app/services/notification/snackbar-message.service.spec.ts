import { TestBed } from '@angular/core/testing';

import { SnackbarMessageService } from './snackbar-message.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('SnackbarMessageService', () => {
  let service: SnackbarMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MatSnackBar
      ]
    });
    service = TestBed.inject(SnackbarMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
