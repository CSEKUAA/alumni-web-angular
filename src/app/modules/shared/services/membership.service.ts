import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MembershipRequestDTO } from "../models/api.request";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class MembershipService{
    private membershipService:string=`${environment.server_root}/alumni/membership`;

    constructor(private httpClient:HttpClient){}

    getMembershipInfo(){

    }

    getMembershipTypes():Observable<any>{
        return this.httpClient.get(`${this.membershipService}/membership-type`);
    }

    applyMembership(membershipRequestDto: MembershipRequestDTO):Observable<any>{
        return this.httpClient.post(`${this.membershipService}/apply`, membershipRequestDto);
    }
}