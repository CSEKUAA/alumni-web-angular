import { Injectable } from "@angular/core";
import { SessionKeys } from "../../../utilities/utilities";
import { LoginResponseDTO } from "../models/api.response";

@Injectable({
    providedIn:'root'
})

export class StoreService{
    // This service is used for storing local srorage variables
    isLoggedIn():boolean{
        if(this.getAccessToken() && this.getAccessToken()!=='')
            return true;

        return false;
    }

    setAccessToken(token:string){
        this.setItem(SessionKeys.ACCESS_TOKEN, token);
    }
    getAccessToken():string{
        return this.getItem(SessionKeys.ACCESS_TOKEN);
    }

    setRefreshToken(token:string){
        this.setItem(SessionKeys.REFRESH_TOKEN, token);
    }
    getRefreshToken():string{
        return this.getItem(SessionKeys.REFRESH_TOKEN);
    }

    setTokenExpiary(expiredTime:string){
        this.setItem(SessionKeys.ACCESS_TOKEN_EXPIARY, expiredTime);
    }
    getTokenExpiary():string{
        return this.getItem(SessionKeys.ACCESS_TOKEN_EXPIARY);
    }

    setLoggedUserRole(role:string){
        this.setItem(SessionKeys.LOGGED_USER_ROLE, role);
    }

    getLoggedUserRole():string{
        return this.getItem(SessionKeys.LOGGED_USER_ROLE)!;
    }

    setTokenExpiaryMinutes(minutes:number){
        this.setItem(SessionKeys.TOKEN_EXPIRY_MINUTES, minutes.toString());
    }
    getTokenExpiaryMinutes():number{
        return parseInt(this.getItem(SessionKeys.TOKEN_EXPIRY_MINUTES)!);
    }

    clearLoginInfo(){
        localStorage.clear();
    }

    private setItem(fieldName:string, fieldValue:string){
        localStorage.setItem(fieldName, fieldValue);
    }

    private getItem(fieldName:string):string{
        return localStorage.getItem(fieldName)!;
    }
}