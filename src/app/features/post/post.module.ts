import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { SharedModule } from '@/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CreatePostDialogComponent } from './components/create-post-dialog/create-post-dialog.component';
import { PostCommentFormComponent } from './components/post-comment-form/post-comment-form.component';
import { PostCommentComponent } from './components/post-comment/post-comment.component';
import { PostListComponent } from './pages/posts/posts.component';
import { SinglePostComponent } from './components/post/post.component';


@NgModule({
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
  exports: [
    SinglePostComponent,
  ]
})

export class PostsModule { }
