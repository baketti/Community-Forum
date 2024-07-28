export interface IUser {
    id: number,
    name: string,
    email: string,
    gender: UserGender,
    status: UserStatus
}

enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

enum UserGender {
    MALE = 'male',
    FEMALE = 'female'
}