import { PostsService } from "@/app/services/posts/posts.service";
import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { 
    getPostsByTitleRequest, 
    getPostsRequest, 
    getPostsResponseSuccess, 
    postPostRequest,
    postPostResponseFailure,
    postPostResponseSuccess
} from "./posts.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { Store } from "@ngrx/store";
import { SnackbarMessageService } from "@/app/services/notification/snackbar-message.service";
import { setPaginationAfterCreate } from "@/app/shared/store/pagination/pagination.actions";
import { AppState } from "@/app/core/store/app/app.state";

@Injectable()
export class PostsEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private postsService: PostsService,
        private snackMessage: SnackbarMessageService
    ) {}

    getPostsRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getPostsRequest),
        switchMap((action) => this.postsService.getPosts(
            action.page, action.per_page).pipe(
            map(posts => getPostsResponseSuccess({ posts })
            ),
            catchError((err) => {
                return of(err)
            })
        ))
    ));
    getPostsByTitleRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getPostsByTitleRequest),
        switchMap((action) => this.postsService.getPostsByTitle(
            action.searchStr, action.page, action.per_page).pipe(
            map(posts => getPostsResponseSuccess({ posts })),
            catchError((err) => {
                return of(err)
            })
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
                return postPostResponseSuccess({ post })
            }),
            catchError((err) =>  of(postPostResponseFailure({ err })))
        ))
    ))
}