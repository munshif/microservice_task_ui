import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

export class BaseHttpClient {
    httpOptions = {};
    private baseUrl: string;
    constructor(private client: HttpClient, private requestHeaders: HttpHeaders, baseUrl = undefined) {
        this.baseUrl = baseUrl ? baseUrl : environment.apiBaseUserUrl;

        this.httpOptions = {
            headers: this.requestHeaders
        };
    }

    get<T>(endPoint: string, options?: any): Observable<T> {
        return this.client
            .get<T>(`${this.baseUrl}${endPoint}`, this.extendHttpOptions(options))
            .pipe(catchError(e => throwError(this.handleError(e))));
    }

    post<T>(endPoint: string, payload: any, options?: any): Observable<T> {
        return this.client
            .post<T>(`${this.baseUrl}${endPoint}`, payload, this.extendHttpOptions(options))
            .pipe(catchError(e => throwError(this.handleError(e))));
    }

    put<T>(endPoint: string, payload?: any, options?: any): Observable<T> {
        return this.client
            .put<T>(`${this.baseUrl}${endPoint}`, payload, this.extendHttpOptions(options))
            .pipe(catchError(e => throwError(this.handleError(e))));
    }

    delete<T>(endPoint: string, options?: any): Observable<T> {
        return this.client
            .delete<T>(`${this.baseUrl}${endPoint}`, this.extendHttpOptions(options))
            .pipe(catchError(e => throwError(this.handleError(e))));
    }

    handleError(error: any): any {
        return error;
    }

    private extendHttpOptions(options?: any) {
        let httpOptions = {}
        httpOptions = { ...this.httpOptions, ...options };
        return httpOptions;
    }
}