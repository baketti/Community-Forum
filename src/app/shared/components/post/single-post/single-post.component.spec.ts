import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SinglePostComponent } from './single-post.component';
import { LoadingService } from '@/app/core/services/loading/loading.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { IComment } from '@/app/models/Comment';
import { IPost } from '@/app/models/Post';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PostCommentFormComponent } from '../post-comment-form/post-comment-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { ScannedActionsSubject } from '@ngrx/store';

describe('SinglePostComponent', () => {
  let component: SinglePostComponent;
  let fixture: ComponentFixture<SinglePostComponent>;
  let actions$: Observable<any>;

  const mockPost: IPost = { 
    id: 1, 
    title: 'Test Post', 
    body: 'This is a test post',
    user_id: 1 
  };
  const mockComments: IComment[] = [
    { 
      id: 1, 
      post_id: 1,
      name: "test",
      email: "test1@gmail",
      body: 'Test Comment 1' 
    },
    { 
      id: 2, 
      post_id: 1,
      name: "test",
      email: "test2@gmail",
      body: 'Test Comment 2' 
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SinglePostComponent,
        PostCommentFormComponent
      ],
      imports: [
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        LoadingService,
        provideHttpClientTesting(),
        provideHttpClient(),
        provideMockStore(),
        provideMockActions(() => actions$),
        Actions,
        ScannedActionsSubject
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePostComponent);
    component = fixture.componentInstance;
    component.post = mockPost;
    component.comments = mockComments;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle showComments property', () => {
    expect(component.showComments).toBeFalse();
    component.toggleComments();
    expect(component.showComments).toBeTrue();
    component.toggleComments();
    expect(component.showComments).toBeFalse();
  });
});