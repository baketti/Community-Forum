import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { DialogHandlerService } from '@/app/services/dialog-handler/dialog-handler.service';
import { LoadingService } from '@/app/services/loading/loading.service';
import { PaginationService } from '@/app/services/pagination/pagination.service';
import { UsersService } from '@/app/services/users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SharedModule } from '@/app/shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UsersComponent
      ],
      imports: [
        SharedModule,
        MatIconModule,
        ReactiveFormsModule,
        MatCardModule,
        MatRadioModule
      ],
      providers: [
        MatDialog,
        UsersService,
        PaginationService,
        DialogHandlerService,
        LoadingService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
});