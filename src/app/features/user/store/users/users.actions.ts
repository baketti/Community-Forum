import { IUser, IUserFe } from "@/app/models/User";
import { createAction, props } from "@ngrx/store";

export const getUsersRequest = createAction(
  '[Users] Get Users Request',
  props<{page: number, per_page: number}>()
);

export const getUsersByFiltersRequest = createAction(
  '[Users] Get Users By Title Request',
  props<{filters:Record<string,string>, page: number, per_page: number}>()
);

export const getUsersResponseSuccess = createAction(
  '[Users] Get Users Response',
    props<{ users: IUser[] }>()
);

export const getCurrentUserRequest = createAction(
  '[Users] Get Current User Request',
  props<{ user_id: number }>()
);

export const resetCurrentUser = createAction(
  '[Users] Reset Current User'
);

export const getCurrentUserResponseSuccess = createAction(
  '[Users] Get Current User Response Success',
  props<{ currentUser: IUserFe }>()
);

export const getCurrentUserResponseFailure = createAction(
  '[Users] Get Current User Response Failure',
  props<{ err: any }>()
);

export const postUserRequest = createAction(
  '[Users] Post User Request',
  props<{ user: IUser }>()
);

export const postUserResponseSuccess = createAction(
  '[Users] Post User Response Success',
    props<{ user: IUser }>()
);

export const postUserResponseFailure = createAction(
  '[Users] Post User Response Failure',
    props<{ err: any }>()
);

export const deleteUserRequest = createAction(
    '[Users] Delete User Request',
    props<{ user_id: number }>()
);

export const deleteUserResponseSuccess = createAction(
  '[Users] Delete User Response Success',
  props<{ user_id: number }>()
);

export const deleteUserResponseFailure = createAction(
  '[Users] Delete User Response Failure',
    props<{ err: any }>()
);