import { createSelector, createFeatureSelector } from "@ngrx/store";
import { UsersState } from "./users.reducers";

export const selectUsersFeature = createFeatureSelector<UsersState>('users');

export const getUsersList = createSelector(
    selectUsersFeature,
    (state: UsersState) => state.users
);