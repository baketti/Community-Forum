import { createFeature, createReducer, on } from '@ngrx/store';
import * as actions from './pagination.actions';
import { Pagination } from '@/utils/types';

export type PaginationState = Pagination;

export const initialState: PaginationState = {
    totalItems: 0,
    per_page: 10,
    page: 0
}

export const paginationReducer = createReducer(
    initialState,
    on(actions.setPagination, (state, { pagination }) => ({ 
        ...state, 
        ...pagination 
    })),
    on(actions.setPaginationAfterCreate, (state, action) => ({ 
        ...state,
        totalItems: state.totalItems + 1
    })),
    on(actions.setPaginationAfterDelete, (state, action) => ({ 
        ...state,
        totalItems: state.totalItems - 1
    })),
    on(actions.updatePagination, (state, { page, per_page }) => ({ 
        ...state, 
        page, 
        per_page
    })),
    on(actions.restartPagination, (state, action) => ({ 
        ...state, 
        page: 0, 
        totalItems: 0
    })),
)
