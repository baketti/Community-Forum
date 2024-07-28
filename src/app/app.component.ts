import { IconsService } from '@/app/services/icons/icons.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'users-bmt';
  constructor(private iconsSrv: IconsService) {
    this.iconsSrv.registerIcons();
  }
}
