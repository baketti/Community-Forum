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
    this.addIcon('gender_female', 'assets/icons/gender-female.svg');
    this.addIcon('gender_male', 'assets/icons/gender-male.svg');
    this.addIcon('login', 'assets/icons/enter.svg');
    this.addIcon('logout', 'assets/icons/exit.svg');
    this.addIcon('send', 'assets/icons/send-2.svg');
    this.addIcon('active', 'assets/icons/user-check.svg');
    this.addIcon('inactive', 'assets/icons/user-blocked.svg');
    this.addIcon('home', 'assets/icons/home-3.svg');
    this.addIcon('users', 'assets/icons/users.svg');
    this.addIcon('github', 'assets/icons/github.svg');
  }

  private addIcon(alias: string, url: string): void {
    this.matIconRegistry.addSvgIcon(
      alias,
      this.domSanitizer.bypassSecurityTrustResourceUrl(url)
    );
  }
}
