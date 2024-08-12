import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "../../../../environments/environment";
import { RoleWithPermissionDTO } from "../models/api.response";
import { StoreService } from "./store.service";

@Injectable({
    providedIn:'root'
})

export class UserAccessService{
    private userAccessService:string=`${environment.server_root}/rbac`;

    constructor(private httpClient:HttpClient, private store:StoreService){}

    getCurrentUserRole():Observable<any>{
        return this.httpClient.get<RoleWithPermissionDTO[]>(`${this.userAccessService}/user-role/current`)
        .pipe(
            tap((resp:RoleWithPermissionDTO[])=>{
                this.store.setLoggedUserRole(resp[0].role);
            })
        );
    }
}