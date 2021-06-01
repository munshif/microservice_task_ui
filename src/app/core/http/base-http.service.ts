import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseHttpClient } from "./base-http-client";

@Injectable({
    providedIn: "root"
})
export class BaseHttpService {
    private _baseHttpServiceInstance;
    constructor(private httpClient: HttpClient) {
        this.buildServiceInstance();
    }

    getServiceInstance = (): BaseHttpClient => {
        return this._baseHttpServiceInstance;
    };

    createHttpInstance(header = extendHttpHeaders, baseUrl = undefined): BaseHttpClient {
        return new BaseHttpClient(this.httpClient, header, baseUrl);
    }

    private buildServiceInstance = () => {
        this._baseHttpServiceInstance = this.createHttpInstance(extendHttpHeaders);
    };
}

const extendHttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    Accept: "application/json;",
    "Access-Control-Allow-Origin": "*"
});