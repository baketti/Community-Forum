import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SinglePostComponent } from './single-post.component';
import { CommentsService } from '@/app/core/services/comments/comments.service';
import { LoadingService } from '@/app/core/services/loading/loading.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { IComment } from '@/app/models/Comment';
import { IPost } from '@/app/models/Post';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PostCommentFormComponent } from '../post-comment-form/post-comment-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SinglePostComponent', () => {
  let component: SinglePostComponent;
  let fixture: ComponentFixture<SinglePostComponent>;
  let commentsService: CommentsService;

  const mockPost: IPost = { 
    id: 1, 
    title: 'Test Post', 
    body: 'This is a test post',
    user_id:1 
  };
  const mockComments: IComment[] = [
    { 
      id: 1, 
      post_id: 1,
      name: "test",
      email:"test1@gmail",
      body: 'Test Comment 1' 
    },
    { 
      id: 2, 
      post_id: 1,
      name: "test",
      email:"test2@gmail",
      body: 'Test Comment 2' 
    }
  ];

  beforeEach(async () => {
    commentsService = jasmine.createSpyObj('CommentsService', ['getComments']);
    (commentsService.getComments as jasmine.Spy).and.returnValue(of(mockComments));

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
        { 
          provide: CommentsService, 
          useValue: commentsService 
        },
        LoadingService,
        provideHttpClientTesting(),
        provideHttpClient(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePostComponent);
    component = fixture.componentInstance;
    component.post = mockPost;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch comments on initialization', () => {
    expect(commentsService.getComments).toHaveBeenCalledWith(mockPost.id);
    expect(component.comments).toEqual(mockComments);
  });

  it('should toggle showComments property', () => {
    expect(component.showComments).toBeFalse();
    component.toggleComments();
    expect(component.showComments).toBeTrue();
    component.toggleComments();
    expect(component.showComments).toBeFalse();
  });

  it('should add a new comment to the comments array', () => {
    const newComment: IComment = { 
      id: 3, 
      post_id: 1,
      name: "test",
      email:"test@gmail",
      body: 'New Comment' 
    };
    component.updateComments(newComment);
    expect(component.comments[0]).toEqual(newComment);
  });
});