import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { setPagination } from "./pagination.actions";
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { select, Store } from "@ngrx/store";
import { getPagination } from "./pagination.selectors";
import { AppState } from "@/app/core/store/app/app.state";

@Injectable()
export class PaginationEffects {
    constructor(
        private actions$: Actions, 
        private store: Store<AppState>
    ) {}

    /* setPaginationRequest$ = createEffect(() => this.actions$.pipe(
        ofType(setPagination),
        map((action) => setPagination({ pagination: action.pagination })),
    )); */
}