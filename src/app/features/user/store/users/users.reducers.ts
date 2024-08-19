import { createReducer, on } from '@ngrx/store';
import * as actions from './users.actions';
import * as postsActions from '@/app/features/post/store/posts/posts.actions';
import { IUser, IUserFe } from '@/app/models/User';

export type UsersState = {
    users: IUser[]
    currentUser: IUserFe | null
}

export const initialState: UsersState = {
    users: [],
    currentUser: null
}

export const usersReducer = createReducer(
    initialState,
    on(actions.getUsersResponseSuccess, (state, { users }) => ({ 
        ...state, users
    })),
    on(actions.getCurrentUserResponseSuccess, (state, { currentUser }) => ({ 
        ...state, currentUser
    })),
    on(actions.postUserResponseSuccess, (state, { user }) => ({ 
            ...state, users: [ user, ...state.users ] 
        })
    ),
    on(actions.deleteUserResponseSuccess, (state, { user_id }) => ({ 
            ...state, users: [...state.users.filter(user => user.id !== user_id)]
        })
    ),
    on(actions.resetCurrentUser, (state) => ({ 
            ...state, currentUser: null
        })
    ),
    on(postsActions.postCommentResponseSuccess, (state, { comment }) => ({
        ...state,
        currentUser: state.currentUser ? {
            ...state.currentUser,
            posts: state.currentUser.posts.map(post =>
                post.id === comment.post_id
                    ? { ...post, comments: [...post.comments, comment] }
                    : post
            )
        } : null
    })) 
)

