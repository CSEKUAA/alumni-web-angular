import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ExternalLinkCreateRequestDTO, ExternalLinkUpdateRequestDTO } from "../models/api.request";
import { ErrorService } from "./error.service";
import { catchError } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class ExternalLinkService{
    private externalLinkService:string = `${environment.server_root}/alumni/external-link`;

    constructor(private httpClient:HttpClient, private error:ErrorService){}    

    saveAllExternalLinks(externalLinkDTO:ExternalLinkCreateRequestDTO[]){
        return this.httpClient.post(`${this.externalLinkService}`, externalLinkDTO)
        .pipe(
            catchError(this.error.handleError)
        );
    }

    updateAllExternalLinks(externalLinkDTO:ExternalLinkUpdateRequestDTO[]){
        return this.httpClient.post(`${this.externalLinkService}/batch-update`, externalLinkDTO)
        .pipe(
            catchError(this.error.handleError)
        );
    }

    deleteExternalLink(id:number){
        return this.httpClient.post(`${this.externalLinkService}/${id}`, {})
        .pipe(
            catchError(this.error.handleError)
        )
    }
}