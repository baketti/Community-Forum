import { IUser } from "@/app/models/User";
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