import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap } from "rxjs";
import { environment } from "../../../../environments/environment";
import { ErrorService } from "./error.service";
import { PageRequestDTO } from "../models/paged.response";

@Injectable({
    providedIn:'root'
})

export class EventService{
    private eventService:string = `${environment.server_root}/event`;
    private eventTypeService:string = `${environment.server_root}/event-type`;

    constructor(private httpClient:HttpClient, private error:ErrorService){}

    getEventTypes():Observable<any>{
        return this.httpClient.get(`${this.eventTypeService}`).pipe(
            catchError(this.error.handleError)
        );
    }

    getAllEvents(pageRequestDTO:PageRequestDTO):Observable<any>{
        return this.httpClient.post(`${this.eventService}/all`, pageRequestDTO).pipe(
            catchError(this.error.handleError)
        );
    }

    createEvent<EventRequestDTO>(eventRequest:EventRequestDTO):Observable<any>{
        return this.httpClient.post(`${this.eventService}/create`, eventRequest).pipe(
            catchError(this.error.handleError)
        );
    }

    updateEvent<EventRequestDTO>(eventRequest:EventRequestDTO):Observable<any>{
        return this.httpClient.post(`${this.eventService}/update`, eventRequest).pipe(
            catchError(this.error.handleError)
        );
    }

    getEvent(eventId:number):Observable<any>{
        return this.httpClient.get(`${this.eventService}/${eventId}`).pipe(
            catchError(this.error.handleError)
        )
    }

    uploadEventBannar(eventId:number, formData:FormData):Observable<any>{
        return this.httpClient.post(`${this.eventService}/upload-photo/${eventId}`, formData).pipe(
            catchError(this.error.handleError)
        )
    }
}