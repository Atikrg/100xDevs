export type UserSignupCredentials = {
    email: string,
    password: string,
    username: string,
    role:string
}


export type UserLoginCredentials = {
    email: string,
    password: string
}


export interface JwtPayload {
    role: string,
    id: string
}