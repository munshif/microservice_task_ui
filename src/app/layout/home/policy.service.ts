import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseHttpClient } from "src/app/core/http/base-http-client";
import { BaseHttpService } from "src/app/core/http/base-http.service";
import { environment } from "src/environments/environment";
import { Policy } from "./lead.model";

@Injectable()
export class PolicyService {
    private _httpService: BaseHttpClient;
    constructor(private client: BaseHttpService) {
        this._httpService = this.client.createHttpInstance(null, environment.apiBasePolicyUrl);
    }

    getPolicyByLead(leadId) : Observable<Policy[]>{
        return this._httpService.get<Policy[]>("policies/bylead/" + leadId);
    }

}