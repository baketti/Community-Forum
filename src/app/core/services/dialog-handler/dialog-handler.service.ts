import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
/* Useful for tracking dialog(user/post creation) status to enable or disable the openDialogButton, 
preventing dialog from being opened multiple times simultaneously.*/
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
