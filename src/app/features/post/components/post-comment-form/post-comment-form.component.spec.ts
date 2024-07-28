import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentFormComponent } from './post-comment-form.component';
import { AuthenticationService } from '@/app/services/authentication/authentication.service';
import { CommentsService } from '@/app/services/comments/comments.service';
import { SnackbarMessageService } from '@/app/services/notification/snackbar-message.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

describe('PostCommentFormComponent', () => {
  let component: PostCommentFormComponent;
  let fixture: ComponentFixture<PostCommentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostCommentFormComponent],
      imports: [
        MatFormFieldModule,
        MatIconModule,
        ReactiveFormsModule
      ],
      providers: [
        CommentsService,
        AuthenticationService,
        SnackbarMessageService,
        provideHttpClientTesting(),
        provideHttpClient(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
