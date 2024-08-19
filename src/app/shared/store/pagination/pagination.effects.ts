import { Inject, Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "@/app/core/store/app/app.state";

@Injectable()
export class PaginationEffects {
    constructor(
        @Inject(Actions) private actions$: Actions, 
        private store: Store<AppState>
    ) {}
}