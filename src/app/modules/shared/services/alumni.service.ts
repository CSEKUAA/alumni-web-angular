import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable } from "rxjs";
import { ErrorService } from "./error.service";
import { PageRequestDTO } from "../models/paged.response";

@Injectable({
    providedIn:'root'
})

export class AlumniService{
    userService:string = `${environment.server_root}`;
    
    constructor(private httpClient:HttpClient, private error:ErrorService){}

    getAllDisciplines():Observable<any>{
        return this.httpClient.get(`${this.userService}/discipline`).pipe(
            catchError(this.error.handleError)
        )
    }

    getAllAlumnis(pageRequest:PageRequestDTO):Observable<any>{
        return this.httpClient.post(`${this.userService}/all-user`, pageRequest).pipe(
            catchError(this.error.handleError)
        )
    }
}