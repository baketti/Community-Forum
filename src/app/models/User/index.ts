export interface IUser {
    id: number,
    name: string,
    email: string,
    gender: UserGender,
    status: UserStatus
}

export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

export enum UserGender {
    MALE = 'male',
    FEMALE = 'female'
}