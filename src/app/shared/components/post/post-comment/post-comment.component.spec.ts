import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostCommentComponent } from './post-comment.component';
import { IComment } from '@/app/models/Comment';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

describe('PostCommentComponent', () => {
  let component: PostCommentComponent;
  let fixture: ComponentFixture<PostCommentComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostCommentComponent],
      imports: [
        MatCardModule,
        MatIconModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCommentComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the comment', () => {
    const mockComment: IComment = {
      id: 1,
      post_id: 1,
      name: 'Test User',
      email: 'test@example.com',
      body: 'This is a test comment'
    };

    component.comment = mockComment;
    fixture.detectChanges();
    const commentUserName = el.query(By.css('.user-name')).nativeElement;
    const commentBody = el.query(By.css('p')).nativeElement; 
    expect(commentUserName.textContent).toContain('Test User');
    expect(commentBody.textContent).toContain('This is a test comment');
  });
});