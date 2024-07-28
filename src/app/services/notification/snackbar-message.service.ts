import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'

export interface SnackData {
  message: string;
  duration?: number;
  action?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarMessageService {

  constructor(private snackbar:MatSnackBar) { }

  public show(snackData: SnackData) {
    this.snackbar.open(
      snackData?.message, 
      snackData?.action || 'OK', {
      duration: snackData?.duration || 20000,
      panelClass: [snackData?.type || 'info']
    });
  }
}
