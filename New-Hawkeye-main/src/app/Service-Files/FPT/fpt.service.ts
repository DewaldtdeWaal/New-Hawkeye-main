import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from 'rxjs/operators';


import { User } from "../../models/user.model";
import { Router } from "@angular/router";
import { ServerURLService } from "../server-url.service";
// import { ServerURLService } from "./server-url.service";


@Injectable({ providedIn: "root" })
export class jeffreysBay {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/jeffreysBay/values")
  }

}


@Injectable({ providedIn: "root" })
export class fptCurrentVals {
  constructor(
    private http: HttpClient,
    private su: ServerURLService
  ) {}

  GetSiteValues(): Promise<any> {
    return this.http.get<any[]>(this.su.serverURL + "/fptCurrentvals/values")
      .toPromise();
  }
}




@Injectable({ providedIn: "root" })
export class gamtoosBreakWaterFPT {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/fptsites/gamtoos-break-water")
  }

}

