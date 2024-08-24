import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { UserProfileRequestDTO } from "../models/api.request";
import { RegistrationDTO } from "../../auth/models/auth.models";
import { ErrorService } from "./error.service";

@Injectable({
    providedIn:'root'
})

export class UserService{
    private userService:string = `${environment.server_root}`;

    constructor(private httpClient:HttpClient, private error:ErrorService){}

    registerAlumni(userData: RegistrationDTO): Observable<any> {
        return this.httpClient.post<any>(`${this.userService}/register`, userData)
          .pipe(
            catchError(this.error.handleError)
          );
    }

    getUserProfile():Observable<any>{
        return this.httpClient.get(`${this.userService}/user-info`)
        .pipe(
            catchError(this.error.handleError)
        );
    }

    uploadProfilePicture(formData:FormData):Observable<any>{
        return this.httpClient.post(`http://5.189.128.185:8080/api/profile-picture`, formData);
    }

    updateUserProfileInfo(userProfileInfo:UserProfileRequestDTO):Observable<any>{
        return this.httpClient.post(`${this.userService}/user-info`, userProfileInfo)
        .pipe(
            catchError(this.error.handleError)
        );
    }
}