import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";
import { ServerURLService } from "../server-url.service";
// import { ServerURLService } from "./server-url.service";

@Injectable({ providedIn: "root" })
export class LovemoreHeightsService {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/lovemoreheights/values")
  }


}
