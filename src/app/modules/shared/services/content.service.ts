import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ErrorService } from "./error.service";
import { catchError, Observable } from "rxjs";

@Injectable({providedIn:'root'})

export class ContentService{
    private content_base:string = `${environment.server_root}/content`;

    constructor(private httpclient:HttpClient, private error:ErrorService){}

    uploadCV(formData: FormData):Observable<any>{
        return this.httpclient.post(`${this.content_base}/cv`, formData).pipe(
            catchError(this.error.handleError)
        )
    }

    getUserCV():Observable<any>{
        return this.httpclient.get(`${this.content_base}/cv`).pipe(
            catchError(this.error.handleError)
        )
    }

    downloadFile(fileUrl:string):Observable<Blob>{
        return this.httpclient.get(fileUrl, { responseType: 'blob' }).pipe(catchError(this.error.handleError));
    }
}