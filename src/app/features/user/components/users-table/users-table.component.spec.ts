import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTableComponent } from './users-table.component';
import { MatCardModule } from '@angular/material/card';
import { LoadingService } from '@/app/services/loading/loading.service';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { UserGender, UserStatus } from '@/app/models/User';
import { of } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { mockReducer } from '@/app/app.component.spec';
import { EffectsModule } from '@ngrx/effects';

describe('UsersTableComponent', () => {
  let component: UsersTableComponent;
  let fixture: ComponentFixture<UsersTableComponent>;
  let router: Router;
  let dialog: MatDialog;
  const user = { 
    id: 1, 
    name: 'Test User', 
    email: 'test@example.com', 
    gender: UserGender.MALE, 
    status: UserStatus.ACTIVE
  }
  const users = [
    { 
      id: 1, 
      name: 'Test User1', 
      email: 'test1@example.com', 
      gender: UserGender.MALE, 
      status: UserStatus.ACTIVE
    },
    { 
      id: 2, 
      name: 'Test User2', 
      email: 'test2@example.com', 
      gender: UserGender.FEMALE, 
      status: UserStatus.INACTIVE
    },
  ]
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersTableComponent],
      imports: [
        StoreModule.forRoot({ mock: mockReducer }),
        EffectsModule.forRoot([]),
        MatCardModule,
        MatIconModule,
        MatTableModule
      ],
      providers: [
        Router, 
        LoadingService,
        MatDialog,
        ChangeDetectorRef,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(UsersTableComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call handleRowClick and navigate to user details', () => {
    spyOn(router, 'navigate');
    component.handleRowClick(user);
    expect(router.navigate).toHaveBeenCalledWith(['app/users', user.id]);
  });

  it('should open delete user dialog and handle dialog close', () => {
    const userId = 1;
    const dialogRefSpyObj = jasmine.createSpyObj({ 
      afterClosed: of(userId), 
      close: null 
    });
    spyOn(dialog, 'open').and.returnValue(dialogRefSpyObj);

    component.openDeleteUserDialog(userId);
    expect(dialog.open).toHaveBeenCalled();
  });
});

