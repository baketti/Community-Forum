import { createReducer, on } from '@ngrx/store';
import * as actions from './users.actions';
import { IUser } from '@/app/models/User';

export type UsersState = {
    users: IUser[]
}

export const initialState: UsersState = {
    users: []
}

export const usersReducer = createReducer(
    initialState,
    on(actions.getUsersResponseSuccess, (state, action) => ({ 
        ...state, users: action.users 
    })),
    on(actions.postUserResponseSuccess, (state, action) => ({ 
            ...state, users: [ action.user, ...state.users ] 
        })
    ),
    on(actions.deleteUserResponseSuccess, (state, action) => ({ 
            ...state, users: [...state.users.filter(user => user.id !== action.user_id)]
        })
    )
)

