import { PostsState } from '@/app/features/post/store/posts/posts.reducers';
import { PaginationState } from '@/app/shared/store/pagination/pagination.reducers';
import { UsersState } from '@/app/features/user/store/users/users.reducers';

export interface AppState {
    posts: PostsState
    users: UsersState
    pagination: PaginationState
}