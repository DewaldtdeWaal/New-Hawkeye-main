import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { User } from "../models/user.model";
import { ServerURLService } from "./server-url.service";




@Injectable({ providedIn: "root" })

export class ControlLogService {
  name_arr:any[]
  date_arr:any[]
  site_arr:any[]
  pump_arr:any[]
  description_arr:any[]

  constructor(private http: HttpClient, private su: ServerURLService) {}
GetSiteLog(site:string){
 return this.http.post<{name:any[],date:any[],site:any[],pump:any[],description:any[]}>(this.su.serverURL+"/pumpstations/view-control-log",{site:site}).subscribe(fetchedSite=>{

    this.name_arr=fetchedSite.name
    this.date_arr=fetchedSite.date
    this.site_arr=fetchedSite.site
    this.pump_arr=fetchedSite.pump
    this.description_arr=fetchedSite.description

    console.log(this.name_arr)
  })
}

saveControlLog(controlLog:any){
console.log('hi')
  this.http.post(this.su.serverURL+"/pumpstations/stanford-road/ps/control-log",controlLog).subscribe((resp=>{
    console.log(resp)
            }), error=>{
              console.log(error.error.message);
              console.log(error);
            }
            )
}

getName(){
  return this.name_arr;
}
getDate(){
  return this.date_arr;
}
getSite(){
  return this.site_arr;
}
getPump(){
  return this.pump_arr;
}
getDescription(){
  return this.description_arr;
}


}
