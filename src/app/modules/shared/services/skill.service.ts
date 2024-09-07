import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SkillRequestDTO } from "../models/api.request";
import { environment } from "../../../../environments/environment";
import { catchError, Observable } from "rxjs";
import { ErrorService } from "./error.service";

@Injectable({
    providedIn:'root'
})

export class SkillService{
    private skillService:string = `${environment.server_root}/skill`;

    constructor(private httpClient:HttpClient, private error:ErrorService){}

    getAllSkills():Observable<any>{
        return this.httpClient.get(`${this.skillService}/all`).pipe(
            catchError(this.error.handleError)
        );
    }

    addNewSkill(skill:SkillRequestDTO){

    }

    addAlumniSkill(skills:SkillRequestDTO[]):Observable<any>{
        return this.httpClient.post(`${this.skillService}/alumni-skill`, skills).pipe(
            catchError(this.error.handleError)
        );
    }

    getAlumniSkills():Observable<any>{
        return this.httpClient.get(`${this.skillService}/alumni-skill`).pipe(
            catchError(this.error.handleError)
        );
    }

    deleteSkill(skillId:number){

    }
}