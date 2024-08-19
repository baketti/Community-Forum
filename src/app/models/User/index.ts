import { IPostFe } from "../Post";

export interface IUser {
    id: number,
    name: string,
    email: string,
    gender: UserGender,
    status: UserStatus
}

export interface IUserFe extends IUser {
    posts: IPostFe[]
}

export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

export enum UserGender {
    MALE = 'male',
    FEMALE = 'female'
}