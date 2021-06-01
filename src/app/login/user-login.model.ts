import { User } from "./user.model";

export interface LoginUser {
    email: string;
    password: string;
}

export interface LoginUserResponse {
    user: User;
    token: string;
}