import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ErrorService } from "./error.service";
import { catchError, Observable } from "rxjs";
import { PageRequestDTO } from "../models/paged.response";

@Injectable({
    providedIn: 'root'
})

export class PublicService{
    publicService:string = `${environment.server_root}/public`;

    constructor(private httpClient:HttpClient, private error:ErrorService){}

    getAllEvents(pageRequestDto:PageRequestDTO = {page:0, size:3, disciplineName:''}):Observable<any>{
        return this.httpClient.post(`${this.publicService}/all-event`, pageRequestDto).pipe(
            catchError(this.error.handleError)
        );
    }

    getEvent(eventId:number):Observable<any>{
        return this.httpClient.get(`${this.publicService}/event/${eventId}`).pipe(
            catchError(this.error.handleError)
        )
    }
}