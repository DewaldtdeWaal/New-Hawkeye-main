import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from 'rxjs/operators';


import { User } from "../../models/user.model";
import { Router } from "@angular/router";
import { ServerURLService } from "../server-url.service";
// import { ServerURLService } from "./server-url.service";


@Injectable({ providedIn: "root" })
export class GroundwaterService {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/groundwater/kareedouwk1")
  }

}

@Injectable({ providedIn: "root" })
export class humerail6Service {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/hawkeye/groundwater/humerail/values")
  }

}


@Injectable({ providedIn: "root" })
export class kruisfonteinRouting {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){



  }
  GetSiteValues():Observable<any[]>{//automated Number

  return this.http.get<any[]>(this.su.serverURL+"/hawkeye/groundwater/kruisfontein/values")
  }

}
