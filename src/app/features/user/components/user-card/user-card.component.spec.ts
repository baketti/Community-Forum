import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCardComponent } from './user-card.component';
import { IUser, UserGender, UserStatus } from '@/app/models/User';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MatCardImage, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCardComponent],
      imports: [
        MatCardModule,
        MatIconModule,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display male image when user is male', () => {
    const user: IUser = { 
      id: 1, 
      name: 'John Doe', 
      email:'jon@gmail',
      status: UserStatus.ACTIVE,
      gender: UserGender.MALE
    };
    component.user$ = of(user);
    fixture.detectChanges();

    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    imgElement.src = component.maleImg;
    expect(imgElement.src).toContain('assets/images/male.svg');
  });

  it('should display female image when user is female', () => {
    const user: IUser = { 
      id: 2, 
      name: 'Jane Doe',
      email:'jan@gmail',
      status: UserStatus.ACTIVE, 
      gender: UserGender.FEMALE 
    };
    component.user$ = of(user);
    fixture.detectChanges();

    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    imgElement.src = component.femaleImg;
    expect(imgElement.src).toContain('assets/images/female.svg');
  });
});