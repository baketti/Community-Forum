import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { UsersService } from '@/app/services/users/users.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { SharedModule } from '@/app/shared/shared.module';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async () => {
    const activatedRouteStub = {
      snapshot: {
        paramMap: {
          get: (key: string) => '1' 
        }
      },
      params: of({ id: '1' })
    };
    await TestBed.configureTestingModule({
      declarations: [
        UserDetailsComponent,
        UserCardComponent
      ],
      imports: [
        RouterModule.forRoot([]),
        SharedModule
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        UsersService,
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});