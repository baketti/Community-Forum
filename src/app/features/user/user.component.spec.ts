import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { SharedModule } from '@/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { CreateUserDialogComponent } from './components/create-user-dialog/create-user-dialog.component';
import { CreateUserFormComponent } from './components/create-user-form/create-user-form.component';
import { DeleteUserDialogComponent } from './components/delete-user-dialog/delete-user-dialog.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UsersComponent } from './pages/users/users.component';
import { UserRoutingModule } from './user-routing.module';
import { UsersEffects } from '@/app/features/user/store/users/users.effects';
import { usersReducer } from '@/app/features/user/store/users/users.reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { mockReducer } from '@/app/app.component.spec';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserComponent,
        UserCardComponent,
        UsersTableComponent,
        DeleteUserDialogComponent,
        CreateUserFormComponent,
        CreateUserDialogComponent,
        UsersComponent,
        UserDetailsComponent
      ],
      imports: [
        StoreModule.forRoot({ mock: mockReducer }),
        StoreModule.forFeature('users', usersReducer), 
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([UsersEffects]), 
        CommonModule,
        UserRoutingModule,
        RouterModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule, 
        MatButtonModule,
        MatSelectModule,
        MatPaginatorModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatTableModule,
        MatRadioModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
