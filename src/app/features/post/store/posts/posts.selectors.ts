import { createSelector, createFeatureSelector } from "@ngrx/store";
import { PostsState } from "./posts.reducers";

export const selectPostsFeature = createFeatureSelector<PostsState>('posts');

export const getPostsList = createSelector(
    selectPostsFeature,
    (state: PostsState) => state.posts
);