import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconsService {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer:   DomSanitizer
  ) {}

  public registerIcons(): void {
    this.addIcon('gender_female', 'assets/gender-female.svg');
    this.addIcon('gender_male', 'assets/gender-male.svg');
    this.addIcon('login', 'assets/enter.svg');
    this.addIcon('logout', 'assets/exit.svg');
    this.addIcon('send', 'assets/send-2.svg');
    this.addIcon('active', 'assets/user-check.svg');
    this.addIcon('inactive', 'assets/user-blocked.svg');
    this.addIcon('home', 'assets/home-3.svg');
    this.addIcon('users', 'assets/users.svg');
    this.addIcon('filter', 'assets/filter.svg');
    this.addIcon('filter-reset', 'assets/filter-reset.svg');
    this.addIcon('x', 'assets/x.svg');
  }

  private addIcon(alias: string, url: string): void {
    this.matIconRegistry.addSvgIcon(
      alias,
      this.domSanitizer.bypassSecurityTrustResourceUrl(url)
    );
  }
}
