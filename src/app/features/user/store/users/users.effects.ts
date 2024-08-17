import { SnackbarMessageService } from "@/app/core/services/notification/snackbar-message.service";
import { UsersService } from "@/app/core/services/users/users.service";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, map, catchError, of } from "rxjs";
import { 
    setPaginationAfterCreate, 
    setPaginationAfterDelete 
} from "@/app/shared/store/pagination/pagination.actions";
import { 
    getUsersRequest, 
    getUsersResponseSuccess, 
    getUsersByFiltersRequest, 
    postUserRequest, 
    postUserResponseSuccess, 
    postUserResponseFailure,
    deleteUserRequest,
    deleteUserResponseSuccess,
    deleteUserResponseFailure
} from "./users.actions";
import { AppState } from "@/app/core/store/app/app.state";

@Injectable()
export class UsersEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private usersService: UsersService,
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