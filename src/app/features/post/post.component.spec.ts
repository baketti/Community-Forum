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
import { PostListComponent } from './pages/posts/post-list.component';
import { PostRoutingModule } from './post-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommentsService } from '@/app/core/services/comments/comments.service';
import { PostsEffects } from '@/app/features/post/store/posts/posts.effects';
import { postsReducer } from '@/app/features/post/store/posts/posts.reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { mockReducer } from '@/app/app.component.spec';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PostComponent,
        CreatePostDialogComponent,
        PostListComponent
      ],
      imports: [
        StoreModule.forRoot({ mock: mockReducer }),
        EffectsModule.forRoot([]),
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
        MatButtonModule
      ],
      providers: [
        CommentsService,
        provideHttpClientTesting(),
        provideHttpClient(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
