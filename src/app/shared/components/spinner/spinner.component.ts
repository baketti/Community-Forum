import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from '@/app/services/loading/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent implements OnInit{  
    @Input() id: string = '';
    @Input() size!: number;
    @Input() small: boolean = false;
    private _show: boolean = false;
    
    set show(value: boolean) {
      this._show = value;
    }
    get show(): boolean {
      return this._show;
    }

    constructor(public loadingSrv: LoadingService) { }

    ngOnInit(): void {
      this.loadingSrv.isAjaxLoading$.subscribe((loading) => {
        this.show = loading && this.loadingSrv.currentSpinnerId === this.id;
      });
    }
}
