import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MembershipRequestDTO } from "../models/api.request";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class MembershipService{
    constructor(private httpClient:HttpClient){}

    getMembershipInfo(){

    }

    getMembershipTypes():Observable<any>{
        return this.httpClient.get(`${environment.membership_service}/membership-type`);
    }

    applyMembership(membershipRequestDto: MembershipRequestDTO):Observable<any>{
        return this.httpClient.post(`${environment.membership_service}/apply`, membershipRequestDto);
    }
}