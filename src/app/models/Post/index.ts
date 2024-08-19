import { IComment } from "../Comment"

export interface IPost {
    id: number
    user_id: number
    title: string
    body: string
}

export interface IPostFe extends IPost {
    comments: IComment[]    
}

export type Post = {
    title: string;
    body: string;
}