import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServerURLService } from "./server-url.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
@Injectable({ providedIn: "root" })

export class DemoControlService{



  constructor(private http: HttpClient, private su: ServerURLService) {}


  saveDemoPumpControl(onOffSwitch:any){
    this.http.post("http://172.105.70.85:3000/demo/demoOnOFF",
     {onOffSwitch:onOffSwitch,})
    .subscribe((resp)=>{
      console.log(resp)
    })
  }

}
@Injectable({ providedIn: "root" })
export class demoRootComponent {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>("http://172.105.70.85:3000/demoControl/GetRoute")
  }


  GetMainSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>("http://172.105.70.85:3000/DemoSiteValues")
  }


}




