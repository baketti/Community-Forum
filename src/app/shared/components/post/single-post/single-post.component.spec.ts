import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SinglePostComponent } from './single-post.component';
import { CommentsService } from '@/app/services/comments/comments.service';
import { LoadingService } from '@/app/services/loading/loading.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SinglePostComponent', () => {
  let component: SinglePostComponent;
  let fixture: ComponentFixture<SinglePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SinglePostComponent],
      providers: [
        CommentsService,
        LoadingService,
        provideHttpClientTesting(),
        provideHttpClient(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
