import { TestBed } from '@angular/core/testing';
import { DialogHandlerService } from './dialog-handler.service';

describe('DialogHandlerService', () => {
  let service: DialogHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set dialog to open', (done: DoneFn) => {
    service.setIsDialogOpened();
    service.isDialogOpen$.subscribe(isOpen => {
      expect(isOpen).toBeTrue();
      done();
    });
  });

  it('should set dialog to closed', (done: DoneFn) => {
    service.setIsDialogClosed();
    service.isDialogOpen$.subscribe(isOpen => {
      expect(isOpen).toBeFalse();
      done();
    });
  });
});