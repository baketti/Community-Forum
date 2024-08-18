import { IconsService } from '@/app/core/services/icons/icons.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'urban-harmony';
  constructor(
    private iconsSrv: IconsService) {
    this.iconsSrv.registerIcons();
  }
}
