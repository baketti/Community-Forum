import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
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
import { RouterModule } from '@angular/router';
import { CreatePostDialogComponent } from './components/create-post-dialog/create-post-dialog.component';
import { PostCommentFormComponent } from './components/post-comment-form/post-comment-form.component';
import { PostCommentComponent } from './components/post-comment/post-comment.component';
import { SinglePostComponent } from './components/post/post.component';
import { PostListComponent } from './pages/posts/posts.component';
import { PostRoutingModule } from './post-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CommentsService } from '@/app/services/comments/comments.service';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PostComponent,
        PostCommentComponent,
        PostCommentFormComponent,
        CreatePostDialogComponent,
        SinglePostComponent,
        PostListComponent
      ],
      imports: [
        CommonModule,
        RouterModule,
        PostRoutingModule,
        MatCardModule,
        MatIconModule,
        FormsModule, 
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        SharedModule,
        MatDialogModule,
        MatButtonModule,
      ],
      providers: [
        CommentsService,
        provideHttpClientTesting(),
        provideHttpClient(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
