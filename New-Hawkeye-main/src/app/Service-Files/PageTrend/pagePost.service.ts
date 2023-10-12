import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { AuthService } from "../auth.service";
import { ServerURLService } from "../server-url.service";
import { pageBuilder} from "src/app/class/pageBulder";

export interface SiteName{
  CollectionName:any,
  CollectionVariable:any [],
  StartDate:string,
  EndDate:string,

}
@Injectable({ providedIn: "root" })




export class PostTrend {
  arrayData:any = []
  constructor(private http: HttpClient,private su: ServerURLService,private pb:pageBuilder) {}

async getPostTrend(collectionName: any, collectionVariable:any = [],startDate: any, endDate:any){

  var returnVariable


  const site:SiteName = {
    CollectionName:collectionName,
    CollectionVariable:collectionVariable,
    StartDate:startDate,
    EndDate:endDate,
  };

  return  this.http.post(this.su.serverURL+"/post/fourTrend", site).toPromise().then(data =>{




    return data
  });




}


}
