import { createReducer, on } from '@ngrx/store';
import * as actions from './posts.actions';
import { IPostFe } from '@/app/models/Post';

export type PostsState = {
    posts: IPostFe[]
}

export const initialState: PostsState = {
    posts: []
}

export const postsReducer = createReducer(
    initialState,
    on(actions.getPostsResponseSuccess, (state, { posts }) => ({ 
            ...state, posts
        })
    ),
    on(actions.postPostResponseSuccess, (state, { post }) => ({ 
            ...state, posts: [ post, ...state.posts ] 
        })
    ),
    on(actions.postCommentResponseSuccess, (state, { comment }) => ({
          ...state,
          posts: state.posts.map(post =>
            post.id === comment.post_id
              ? { ...post, comments: [...post.comments, comment] }
              : post
        )}
    ))
)

