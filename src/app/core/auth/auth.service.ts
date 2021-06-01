import { Injectable } from "@angular/core";
import { LoginUserResponse } from "src/app/login/user-login.model";
import { User } from "src/app/login/user.model";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    constructor() {

    }

    setToken(value) {
        localStorage.setItem('token', value)
    }

    getToken() {
        return localStorage.getItem("token");
    }

    setUserInfo(value) {
        localStorage.setItem('loggedUser', JSON.stringify(value))
    }

    getUserInfo(): User {
        let user = localStorage.getItem("loggedUser")
        return user ? JSON.parse(user) : user;
    }
}