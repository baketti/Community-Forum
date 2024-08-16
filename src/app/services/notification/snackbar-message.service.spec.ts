import { TestBed } from '@angular/core/testing';
import { SnackbarMessageService } from './snackbar-message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackData } from '@/utils/types';

describe('SnackbarMessageService', () => {
  let service: SnackbarMessageService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        SnackbarMessageService,
        { provide: MatSnackBar, useValue: spy }
      ]
    });

    service = TestBed.inject(SnackbarMessageService);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call MatSnackBar open method with correct parameters', () => {
    const snackData: SnackData = {
      message: 'Test message',
      action: 'Test action',
      duration: 3000,
      type: 'success'
    };

    service.show(snackData);

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Test message',
      'Test action',
      {
        duration: 3000,
        panelClass: ['success']
      }
    );
  });

  it('should call MatSnackBar open method with default parameters', () => {
    const snackData: SnackData = {
      message: 'Test message'
    };

    service.show(snackData);

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Test message',
      'OK',
      {
        duration: 3000,
        panelClass: ['info']
      }
    );
  });
});