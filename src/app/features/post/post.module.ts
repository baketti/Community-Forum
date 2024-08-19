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
import { PostListComponent } from './pages/posts/post-list.component';
import { StoreModule } from '@ngrx/store';
import { postsReducer } from './store/posts/posts.reducers';
import { PostsEffects } from './store/posts/posts.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    PostComponent,
    CreatePostDialogComponent,
    PostListComponent
  ],
  imports: [
    StoreModule.forFeature('posts', postsReducer),
    EffectsModule.forFeature([
      PostsEffects
    ]),
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
    StoreModule,
    EffectsModule,
  ]
})

export default class PostsModule { }
