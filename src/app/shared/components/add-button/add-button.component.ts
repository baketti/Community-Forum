import { DialogHandlerService } from '@/app/services/dialog-handler/dialog-handler.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.scss'
})
export class AddButtonComponent implements OnInit, OnDestroy{
  @Input() openCreationDialog!: () => void;
  @Input() icon!: string;
  private subscription: Subscription = new Subscription();
  isDialogOpened: boolean = false;

  constructor(
    private dialogHandlerSrv: DialogHandlerService
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.dialogHandlerSrv.isDialogOpen$.subscribe(status => {
        this.isDialogOpened = status;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
