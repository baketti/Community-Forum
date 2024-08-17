import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';
import { DialogHandlerService } from '@/app/core/services/dialog-handler/dialog-handler.service';
import { LoadingService } from '@/app/core/services/loading/loading.service';
import { PostsService } from '@/app/core/services/posts/posts.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { SharedModule } from '@/app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, Store } from '@ngrx/store';
import { mockReducer } from '@/app/app.component.spec';
import { EffectsModule } from '@ngrx/effects';
import { AppState } from '@/app/core/store/app/app.state';
import { getPostsRequest, getPostsByTitleRequest } from '@/app/features/post/store/posts/posts.actions';
import { updatePagination } from '@/app/shared/store/pagination/pagination.actions';
import { PageEvent } from '@angular/material/paginator';
import { of } from 'rxjs';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let store: Store<AppState>;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostListComponent],
      imports: [
        StoreModule.forRoot({ mock: mockReducer }),
        EffectsModule.forRoot([]),
        MatDialogModule,
        ReactiveFormsModule,
        SharedModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        PostsService,
        LoadingService,
        DialogHandlerService,
        provideHttpClient(),
        provideHttpClientTesting()
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    dialog = TestBed.inject(MatDialog);
    component.posts$ = of([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly on ngOnInit', () => {
    spyOn(component, 'fetchPosts'); 
    component.ngOnInit();
    expect(component.fetchPosts).toHaveBeenCalled();
  });

  it('should dispatch getPostsRequest action on fetchPosts', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.fetchPosts();
    expect(dispatchSpy).toHaveBeenCalledWith(getPostsRequest({ page: 1, per_page: 10 }));
  });

  it('should dispatch getPostsByTitleRequest action on fetchPostsByTitle', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const searchStr = 'test';
    component.fetchPostsByTitle(searchStr);
    expect(dispatchSpy).toHaveBeenCalledWith(getPostsByTitleRequest({ searchStr, page: 1, per_page: 10 }));
  });

  it('should dispatch updatePagination action and call refresh on onPageChange', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const refreshSpy = spyOn(component, 'refresh');
    const event: PageEvent = { pageIndex: 1, pageSize: 10, length: 100 };
    component.onPageChange(event);
    expect(dispatchSpy).toHaveBeenCalledWith(updatePagination({ page: 1, per_page: 10 }));
    expect(refreshSpy).toHaveBeenCalled();
  });

  it('should open create post dialog and set dialog state correctly on openCreatePostDialog', () => {
    const dialogSpy = spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(null)
    } as any);
    const dialogHandlerSpy = spyOn(component.dialogHandlerSrv, 'setIsDialogOpened');
    component.openCreatePostDialog();
    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogHandlerSpy).toHaveBeenCalled();
  });

  it('should unsubscribe from subscriptions on ngOnDestroy', () => {
    const unsubscribeSpy = spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should subscribe to store and update component state on addSubscriptions', () => {
    const pagination = { totalItems: 100, per_page: 10, page: 1 };
    spyOn(store, 'pipe').and.returnValue(of(pagination));
    component.addSubscriptions();
    expect(component.totalPosts).toBe(100);
    expect(component.per_page).toBe(10);
    expect(component.page).toBe(1);
  });

  it('should return correct boolean value on hasActiveFilterByTitle', () => {
    component.searchPostForm.setValue({ searchStr: 'test' });
    expect(component.hasActiveFilterByTitle()).toBeTrue();

    component.searchPostForm.setValue({ searchStr: '' });
    expect(component.hasActiveFilterByTitle()).toBeFalse();
  });

  it('should update page size options correctly on updatePageSizeOptions', () => {
    component.totalPosts = 50;
    component.updatePageSizeOptions();
    expect(component.page_size_options).toEqual([5, 10, 25]);
  });
});