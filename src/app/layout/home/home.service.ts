import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/core/auth/auth.service";
import { BaseHttpClient } from "src/app/core/http/base-http-client";
import { BaseHttpService } from "src/app/core/http/base-http.service";
import { environment } from "src/environments/environment";
import { Lead, LeadRequest } from "./lead.model";

@Injectable()
export class HomeService {
    private _httpService: BaseHttpClient;
    constructor(private client: BaseHttpService) {
        this._httpService = this.client.createHttpInstance(null, environment.apiBaseLeadUrl);
    }

    getLeads(url): Observable<Lead[]> {
        return this._httpService.get<Lead[]>(url);
    }

    createLead(name, mobile, userId): Observable<any> {
        let lead: LeadRequest = {
            name: name,
            mobile : mobile,
            assigned_user_id: userId
        }
        return this._httpService.post<LeadRequest>("leads", lead);
    }
}