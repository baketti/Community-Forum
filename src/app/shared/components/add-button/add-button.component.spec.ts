import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AddButtonComponent } from './add-button.component';
import { MatIconModule } from '@angular/material/icon';
import { DialogHandlerService } from '@/app/core/services/dialog-handler/dialog-handler.service';
import { of } from 'rxjs';

describe('AddButtonComponent', () => {
  let component: AddButtonComponent;
  let fixture: ComponentFixture<AddButtonComponent>;
  let dialogHandlerService: DialogHandlerService;

  beforeEach(async () => {
    dialogHandlerService = {
      isDialogOpen$: of(false)
    } as DialogHandlerService;

    await TestBed.configureTestingModule({
      declarations: [AddButtonComponent],
      imports: [
        MatIconModule
      ],
      providers: [
        { 
          provide: DialogHandlerService, 
          useValue: dialogHandlerService 
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddButtonComponent);
    component = fixture.componentInstance;
    component.icon = 'add';
    component.openCreationDialog = jasmine.createSpy('openCreationDialog');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the button when isDialogOpened is true', () => {
    component.isDialogOpened = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.disabled).toBeTrue();
  });

  it('should call openCreationDialog when button is clicked', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(component.openCreationDialog).toHaveBeenCalled();
  });

  it('should display the correct icon', () => {
    const icon = fixture.debugElement.query(By.css('mat-icon')).nativeElement;
    expect(icon.textContent).toBe('add');
  });
});