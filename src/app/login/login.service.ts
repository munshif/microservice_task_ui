import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { BaseHttpClient } from "../core/http/base-http-client";
import { BaseHttpService } from "../core/http/base-http.service";
import { LoginUser, LoginUserResponse } from "./user-login.model";
import { User } from "./user.model";

@Injectable()
export class LoginService {
    private _httpService: BaseHttpClient;
    constructor(private client: BaseHttpService) {
        this._httpService = this.client.createHttpInstance(null, environment.apiBaseUserUrl);
    }

    login(user: LoginUser): Observable<LoginUserResponse> {
        return this._httpService.post<LoginUserResponse>("login", user)
    }

    getUsers(): Observable<User[]> {
        return this._httpService.get<User[]>("getusers")
    }

    logOut(): Observable<any> {
        return this._httpService.post<any>("logout", {});
    }
}