import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UpdatePasswordRequestDTO } from "../models/api.request";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
    providedIn:'root'
})

export class AuthenticationService{
    constructor(private httpClient:HttpClient){}

    updatePassword(updatePasswordRequest:UpdatePasswordRequestDTO):Observable<any>{
        return this.httpClient.post(`${environment.authentication_service}/update-password`, updatePasswordRequest);
    }
}