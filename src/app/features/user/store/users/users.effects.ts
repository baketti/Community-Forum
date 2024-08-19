import { SnackbarMessageService } from "@/app/core/services/notification/snackbar-message.service";
import { UsersService } from "@/app/core/services/users/users.service";
import { Inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, map, catchError, of, forkJoin, tap } from "rxjs";
import { 
    setPaginationAfterCreate, 
    setPaginationAfterDelete 
} from "@/app/shared/store/pagination/pagination.actions";
import { 
    getUsersRequest, 
    getUsersResponseSuccess, 
    getUsersByFiltersRequest, 
    getCurrentUserRequest,
    getCurrentUserResponseFailure,
    getCurrentUserResponseSuccess,
    postUserRequest, 
    postUserResponseSuccess, 
    postUserResponseFailure,
    deleteUserRequest,
    deleteUserResponseSuccess,
    deleteUserResponseFailure,
} from "./users.actions";
import { AppState } from "@/app/core/store/app/app.state";
import { CommentsService } from "@/app/core/services/comments/comments.service";
import { LoadingService } from "@/app/core/services/loading/loading.service";

@Injectable()
export class UsersEffects {
    constructor(
        @Inject(Actions) private actions$: Actions,
        private store: Store<AppState>,
        private usersService: UsersService,
        private commentsService: CommentsService,
        private loadingService: LoadingService,
        private snackMessage: SnackbarMessageService
    ) {}

    getUsersRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getUsersRequest),
        switchMap((action) => this.usersService.getUsers(
            action.page, action.per_page).pipe(
            map(users => getUsersResponseSuccess({ users })
            ),
            catchError((err) => {
                return of(err)
            })
        ))
    ));
    getUsersByFiltersRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getUsersByFiltersRequest),
        switchMap((action) => this.usersService.getUsersByFilters(
            action.filters, action.page, action.per_page).pipe(
            map(users => getUsersResponseSuccess({ users })),
            catchError((err) => {
                return of(err)
            })
        ))
    ));
    getCurrentUserRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getCurrentUserRequest),
        switchMap((action) => this.usersService.getUserDetails(action.user_id).pipe(
            switchMap(user => 
                this.usersService.getUserPosts(user.id).pipe(
                    switchMap(posts => {
                        const postsWithComments$ = posts.map(post =>
                            this.commentsService.getComments(post.id).pipe(
                                map(comments => ({ ...post, comments }))
                            )
                        );
                        return forkJoin(postsWithComments$).pipe(
                            map(postsWithComments => ({ ...user, posts: postsWithComments }))
                        );
                    })
                )
            ),
            map(currentUser => {
                this.loadingService.removeSpinner();
                return getCurrentUserResponseSuccess({ currentUser })
            }),
            catchError((err) => of(getCurrentUserResponseFailure({ err })))
        ))
    ));
    postUserRequest$ = createEffect(() => this.actions$.pipe(
        ofType(postUserRequest),
        switchMap((action) => this.usersService.postUser(action.user).pipe(
            map(user => {
                this.store.dispatch(setPaginationAfterCreate())
                this.snackMessage.show({
                    message:"User created successfully!",
                    duration: 3000
                });
                return postUserResponseSuccess({ user })
            }),
            catchError((err) => of(postUserResponseFailure({ err })))
        ))
    ));
    deleteUserRequest$ = createEffect(() => this.actions$.pipe(
        ofType(deleteUserRequest),
        switchMap((action) => this.usersService.deleteUsersByUserId(action.user_id).pipe(
            map(() => {
                const { user_id } = action;
                this.store.dispatch(setPaginationAfterDelete());
                this.snackMessage.show({
                    message: "User deleted successfully!",
                    duration: 3000
                });
                return deleteUserResponseSuccess({ user_id })
            }),
            catchError((err) =>  of(deleteUserResponseFailure({ err })))
        ))
    ));
}