import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogHandlerService {
  private isDialogOpened = new BehaviorSubject<boolean>(false);
  public readonly isDialogOpen$ = this.isDialogOpened.asObservable();

  constructor() { }

  setIsDialogOpened(): void {
    this.isDialogOpened.next(true);
  }

  setIsDialogClosed(): void {
    this.isDialogOpened.next(false);
  }
}
