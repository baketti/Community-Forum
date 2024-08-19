import { PostsService } from "@/app/core/services/posts/posts.service";
import { Inject, Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { 
    getPostsByTitleRequest, 
    getPostsRequest, 
    getPostsResponseSuccess, 
    postCommentRequest, 
    postCommentResponseSuccess, 
    postPostRequest,
    postPostResponseFailure,
    postPostResponseSuccess
} from "./posts.actions";
import { catchError, forkJoin, map, of, switchMap, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { SnackbarMessageService } from "@/app/core/services/notification/snackbar-message.service";
import { setPaginationAfterCreate } from "@/app/shared/store/pagination/pagination.actions";
import { AppState } from "@/app/core/store/app/app.state";
import { CommentsService } from "@/app/core/services/comments/comments.service";
import { LoadingService } from "@/app/core/services/loading/loading.service";

@Injectable()
export class PostsEffects {
    constructor(
        @Inject(Actions) private actions$: Actions,
        private store: Store<AppState>,
        private postsService: PostsService,
        private commentsService: CommentsService,
        private snackMessage: SnackbarMessageService,
        private loadingService: LoadingService
    ) {}

    getPostsRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getPostsRequest),
        tap(() => {
            this.loadingService.loading.next({
              show: true
            });
        }),
        switchMap((action) => this.postsService.getPosts(
            action.page, action.per_page).pipe(
            switchMap(posts => {
                const postsWithComments$ = posts.map(post =>
                    this.commentsService.getComments(post.id).pipe(
                    map(comments => ({ ...post, comments }))
                    )
                );
                    return forkJoin(postsWithComments$);
                }),
                map(posts => {
                        this.loadingService.currentSpinnerId = null;
                        this.loadingService.loading.next({
                            show: false
                        })
                    return getPostsResponseSuccess({ posts })
                }),
            catchError((err) => {
                return of(err)
            })
        ))
    ));
    getPostsByTitleRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getPostsByTitleRequest),
        switchMap((action) => this.postsService.getPostsByTitle(
            action.searchStr, action.page, action.per_page).pipe(
                switchMap(posts => {
                    if (!posts.length) {
                        return of([]);
                    }                    
                    const postsWithComments$ = posts.map(post =>
                        this.commentsService.getComments(post.id).pipe(
                            map(comments => ({ ...post, comments }))
                        )
                    );
                    return forkJoin(postsWithComments$);
                    }),
                    map(posts => {
                        this.loadingService.removeSpinner();
                        return getPostsResponseSuccess({ posts })
                    }),
            catchError((err) => of(err))
        ))
    ));
    postPostRequest$ = createEffect(() => this.actions$.pipe(
        ofType(postPostRequest),
        switchMap((action) => this.postsService.postPost(action.post).pipe(
            map(post => {
                this.store.dispatch(setPaginationAfterCreate())
                this.snackMessage.show({
                    message:"Post created successfully!",
                    duration: 3000
                });
                return postPostResponseSuccess({ post: { ...post, comments:[] } })
            }),
            catchError((err) =>  of(postPostResponseFailure({ err })))
        ))
    ))
    postCommentRequest$ = createEffect(() => this.actions$.pipe(
        ofType(postCommentRequest),
        switchMap((action) => this.commentsService.postComment(action.comment).pipe(
            map(comment => {
                this.snackMessage.show({
                    message: "Comment created successfully",
                    duration: 3000
                });
                return postCommentResponseSuccess({ comment })
            }),
            catchError((err) =>  {
                this.snackMessage.show({
                    message: "Error while creating comment",
                    duration: 3000
                });
                return of(postPostResponseFailure({ err }))
            })
        ))
    ))
}