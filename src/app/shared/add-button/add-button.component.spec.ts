import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddButtonComponent } from './add-button.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { DialogHandlerService } from '@/app/services/dialog-handler/dialog-handler.service';

describe('AddButtonComponent', () => {
  let component: AddButtonComponent;
  let fixture: ComponentFixture<AddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddButtonComponent],
      imports: [
        MatIconModule
      ],
      providers: [
        DialogHandlerService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
