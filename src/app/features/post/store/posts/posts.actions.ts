import { IComment } from "@/app/models/Comment";
import { IPostFe, Post } from "@/app/models/Post";
import { createAction, props } from "@ngrx/store";

export const getPostsRequest = createAction(
  '[Posts] Get Posts Request',
  props<{page: number, per_page: number}>()
);

export const getPostsByTitleRequest = createAction(
  '[Posts] Get Posts By Title Request',
  props<{searchStr:string, page: number, per_page: number}>()
);

export const getPostsResponseSuccess = createAction(
  '[Posts] Get Posts Response',
  props<{ posts: IPostFe[] }>()
);

export const postPostRequest = createAction(
  '[Posts] Post Post Request',
  props<{ post:Post }>()
);

export const postPostResponseSuccess = createAction(
  '[Posts] Post Post Response Success',
  props<{ post: IPostFe }>()
);

export const postPostResponseFailure = createAction(
  '[Posts] Post Post Response Failure',
  props<{ err: any }>()
);

export const postCommentRequest = createAction(
  '[Comments] Post Comment Request',
  props<{ comment: Omit<IComment, 'id'> }>()
);

export const postCommentResponseSuccess = createAction(
  '[Comments] Post Comment Response Success',
  props<{ comment: IComment }>()
);

export const postCommentResponseFailure = createAction(
  '[Comments] Post Comment Response Failure',
  props<{ error: any }>()
);