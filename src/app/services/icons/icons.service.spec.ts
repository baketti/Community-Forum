import { TestBed } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconsService } from './icons.service';

describe('IconsService', () => {
  let service: IconsService;
  let matIconRegistrySpy: jasmine.SpyObj<MatIconRegistry>;
  let domSanitizerSpy: jasmine.SpyObj<DomSanitizer>;

  beforeEach(() => {
    const matIconRegistry = jasmine.createSpyObj('MatIconRegistry', ['addSvgIcon']);
    const domSanitizer = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustResourceUrl']);

    TestBed.configureTestingModule({
      providers: [
        { provide: MatIconRegistry, useValue: matIconRegistry },
        { provide: DomSanitizer, useValue: domSanitizer }
      ]
    });
    service = TestBed.inject(IconsService);
    matIconRegistrySpy = TestBed.inject(MatIconRegistry) as jasmine.SpyObj<MatIconRegistry>;
    domSanitizerSpy = TestBed.inject(DomSanitizer) as jasmine.SpyObj<DomSanitizer>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register icons', () => {
    const icons = [
      { alias: 'gender_female', url: 'assets/icons/gender-female.svg' },
      { alias: 'gender_male', url: 'assets/icons/gender-male.svg' },
      { alias: 'login', url: 'assets/icons/enter.svg' },
      { alias: 'logout', url: 'assets/icons/exit.svg' },
      { alias: 'send', url: 'assets/icons/send-2.svg' },
      { alias: 'active', url: 'assets/icons/user-check.svg' },
      { alias: 'inactive', url: 'assets/icons/user-blocked.svg' },
      { alias: 'home', url: 'assets/icons/home-3.svg' },
      { alias: 'users', url: 'assets/icons/users.svg' }
    ];

    domSanitizerSpy.bypassSecurityTrustResourceUrl.and.callFake((url: string) => url);

    service.registerIcons();

    icons.forEach(icon => {
      expect(domSanitizerSpy.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(icon.url);
      expect(matIconRegistrySpy.addSvgIcon).toHaveBeenCalledWith(icon.alias, icon.url);
    });
  });
});