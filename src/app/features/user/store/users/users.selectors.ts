import { createSelector, createFeatureSelector } from "@ngrx/store";
import { UsersState } from "./users.reducers";

export const selectUsersFeature = createFeatureSelector<UsersState>('users');

export const getUsersList = createSelector(
    selectUsersFeature,
    (state: UsersState) => state.users
);

export const getCurrentUser = createSelector(
    selectUsersFeature,
    (state: UsersState) => state.currentUser || null
);

export const getCurrentUserPosts = createSelector(
    selectUsersFeature,
    (state: UsersState) => state.currentUser?.posts || []
);