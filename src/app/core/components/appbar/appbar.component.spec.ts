import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppbarComponent } from './appbar.component';
import { AuthenticationService } from '@/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';

describe('AppbarComponent', () => {
  let component: AppbarComponent;
  let fixture: ComponentFixture<AppbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppbarComponent],
      imports: [
        MatToolbarModule,
        MatIconModule,
        MatMenuModule
      ],
      providers: [
        AuthenticationService,
        Router,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
