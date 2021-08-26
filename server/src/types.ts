import { Post, User } from ".prisma/client"

export type ErrorField = {
    field:string
    message:string
}

export type AuthUserDetails = {
    id:number,
    email:string,
    username:string,
    iat:number,
    exp:number
}

export type AuthResponse = {
    user?:any,
    errors?:ErrorField[] | []
}

export type PostResponse = {
    errors?:ErrorField[] | [] | null
    data?:Post | null
    posts?:Post[] | null
}

export type UserInput = {
    email:string;
    username?:string;
    password:string;
}

export type UserResponse = {
    errors?:ErrorField[] | [] | null;
    data?:User | null;
    users?: User[] | null;
}

export type VerificationResponse = {
    valid:boolean;
    valErrors:ErrorField[] | null
}