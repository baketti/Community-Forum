import { createFeature, createReducer, on } from '@ngrx/store';
import * as actions from './posts.actions';
import { IPost } from '@/app/models/Post';

export type PostsState = {
    posts: IPost[]
}

export const initialState: PostsState = {
    posts: []
}

export const postsReducer = createReducer(
    initialState,
    on(actions.getPostsResponseSuccess, (state, action) => ({ 
        ...state, posts: action.posts 
    })),
    on(actions.postPostResponseSuccess, (state, action) => ({ 
            ...state, posts: [ action.post, ...state.posts ] 
        })
    )
)

