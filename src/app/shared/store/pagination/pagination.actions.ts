import { Pagination } from "@/utils/types";
import { createAction, props } from "@ngrx/store";

export const setPagination = createAction(
  '[Pagination] Set Pagination',
    props<{ pagination: Pagination }>()
);

export const setPaginationAfterCreate = createAction(
  '[Pagination] Set Pagination After Create');

export const setPaginationAfterDelete = createAction(
  '[Pagination] Set Pagination After Delete');

export const updatePagination = createAction(
  '[Pagination] Update Pagination',
    props<{page:number, per_page: number }>()
);

export const restartPagination = createAction(
  '[Pagination] Reset Pagination'
);