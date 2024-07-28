import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorsComponent } from './errors.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { NetworkErrorComponent } from './pages/network-error/network-error.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ErrorsComponent', () => {
  let component: ErrorsComponent;
  let fixture: ComponentFixture<ErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [
          ErrorsComponent,
          NetworkErrorComponent,
          ForbiddenComponent,
          NotFoundComponent
        ],
        imports: [
          CommonModule,
          MatCardModule
        ],
        providers: [

        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
