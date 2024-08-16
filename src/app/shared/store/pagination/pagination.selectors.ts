import { createSelector, createFeatureSelector } from "@ngrx/store";
import { PaginationState } from "./pagination.reducers";

export const selectPaginationFeature = createFeatureSelector<PaginationState>('pagination');

export const getPagination = createSelector(
    selectPaginationFeature,
    (state: PaginationState) => state
);

export const getPaginationTotalItems = createSelector(
    selectPaginationFeature,
    (state: PaginationState) => state.totalItems
);

export const getPaginationPage = createSelector(
    selectPaginationFeature,
    (state: PaginationState) => state.page
);

export const getPaginationPerPage = createSelector(
    selectPaginationFeature,
    (state: PaginationState) => state.per_page
);