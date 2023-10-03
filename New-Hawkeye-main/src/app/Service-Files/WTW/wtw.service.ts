import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";
import { ServerURLService } from "../server-url.service";


@Injectable({ providedIn: "root" })
export class NooitgedachtRootComponent {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/Nooitgedacht-wtw/values")
  }


}
@Injectable({ providedIn: "root" })
export class ElandsJagtRootComponent {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/hawkeye/wtw/elands")
  }


}

@Injectable({providedIn:"root"})
export class stGeorgesParkComponent{

  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){}

  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/hawkeye/wtw/st-georges")
  }

}




@Injectable({providedIn:"root"})
export class HumansdorpComponent{

  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){}

  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/hawkeye/wtw/humansdorpwtw")
  }

}
