import { CreatePostDialogComponent } from "@/app/features/post/components/create-post-dialog/create-post-dialog.component";
import { IPost, Post } from "@/app/models/Post";
import { MatDialogRef } from "@angular/material/dialog";
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
    props<{ posts: IPost[] }>()
);

export const postPostRequest = createAction(
  '[Posts] Post Post Request',
  props<{ post:Post }>()
);

export const postPostResponseSuccess = createAction(
  '[Posts] Post Post Response Success',
    props<{ post: IPost }>()
);

export const postPostResponseFailure = createAction(
  '[Posts] Post Post Response Failure',
    props<{ err: any }>()
);