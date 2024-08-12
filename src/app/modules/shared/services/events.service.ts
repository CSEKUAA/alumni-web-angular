import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
    providedIn:'root'
})

export class EventService{
    private eventService:string = `${environment.server_root}/event`;

    constructor(private httpClient:HttpClient){}

    getAllEvents():Observable<any>{
        return this.httpClient.get(`${this.eventService}`);
    }
}