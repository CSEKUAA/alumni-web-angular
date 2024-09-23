import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UpdatePasswordRequestDTO } from "../models/api.request";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { StoreService } from "./store.service";
import { IdentityService } from "./identity.service";
import { UserRole } from "../../../utilities/utilities";
import { Router } from "@angular/router";
import { ForgetPasswordDTO, ResetPasswordRequestDTO } from "../../auth/models/auth.models";

@Injectable({
    providedIn:'root'
})

export class AuthenticationService{    
    private auththenticationService:string=`${environment.server_root}/auth`;

    constructor(private httpClient:HttpClient, private store:StoreService, private identityService:IdentityService, private router:Router){}

    updatePassword(updatePasswordRequest:UpdatePasswordRequestDTO):Observable<any>{
        return this.httpClient.post(`${this.auththenticationService}/update-password`, updatePasswordRequest);
    }

    isLoggedIn():boolean|any{
        if(this.identityService.hasValidAccessToken()){
            return true;
        }
        else{
            this.router.navigate(['auth/login']);
        }
    }

    isLoggedInAndAdmin():boolean|any{
        let role=this.store.getLoggedUserRole();
        if(this.identityService.hasValidAccessToken()){
            if(role===UserRole.ADMIN){
                return true;
            }
            return false;
        }
        else{
            this.identityService.logout().subscribe({
                next:(()=>{
                    this.router.navigate(['auth/login']);
                })
            });
        }
    }

    isLoggedInAndUser():boolean|any{
        let role=this.store.getLoggedUserRole();
        if(this.identityService.hasValidAccessToken()){
            if(role===UserRole.USER){
                return true;
            }
            return false;
        }
        else{
            this.identityService.logout().subscribe({
                next:(()=>{
                    this.router.navigate(['auth/login']);
                })
            });
        }
    }

    forgetPassword(model:ForgetPasswordDTO):Observable<any>{
        return this.httpClient.post(`${this.auththenticationService}/forget-password`, model);
    }

    resetPassword(model:ResetPasswordRequestDTO):Observable<any>{
        return this.httpClient.post(`${this.auththenticationService}/reset-password`, model);
    }
}