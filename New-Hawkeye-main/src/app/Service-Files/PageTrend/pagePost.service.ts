import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { AuthService } from "../auth.service";
import { ServerURLService } from "../server-url.service";
import { pageBuilder} from "src/app/class/pageBulder";

interface SiteName{
  CollectionName:any,
  CollectionVariable:any [],
  StartDate:string,
  EndDate:string,

}

 interface totalFlowAndFlowRate{
  CollectionName:any,
  TotalFlowVariable:any [],
  FlowRateVariable:any [],
  StartDate:string,
  EndDate:string,
}

interface flowAndTotalFlowCollection{
  FlowCollection:any,
  TotalFlowCollection:any,
  TotalFlowVariable:any [],
  FlowRateVariable:any [],
  StartDate:string,
  EndDate:string,

}
 
@Injectable({ providedIn: "root" })




export class PostTrend {
  arrayData:any = []
  constructor(private http: HttpClient,private su: ServerURLService,private pb:pageBuilder) {}


async getLevel(collectionName: any, collectionVariable:any = [],startDate: any, endDate:any){

  const site:SiteName = {
    CollectionName:collectionName,
    CollectionVariable:collectionVariable,
    StartDate:startDate,
    EndDate:endDate,
  };

  return  this.http.post(this.su.serverURL+"/post/getLevels", site).toPromise().then(data =>{


   



    return data
  });

}

async getPostTrend(collectionName: any, collectionVariable:any = [],startDate: any, endDate:any){




  const site:SiteName = {
    CollectionName:collectionName,
    CollectionVariable:collectionVariable,
    StartDate:startDate,
    EndDate:endDate,
  };

  return  this.http.post(this.su.serverURL+"/post/fourTrend/data", site).toPromise().then(data =>{


   


    return data
  });




}
async getTotalFlowAndFlowRate(collectionName: any, totalFlowVariable:any = [],flowRateVariable:any = [],startDate: any, endDate:any){



  const site:totalFlowAndFlowRate = {
    CollectionName:collectionName,
    TotalFlowVariable:totalFlowVariable,
    FlowRateVariable:flowRateVariable,
    StartDate:startDate,
    EndDate:endDate,
  };

  return  this.http.post(this.su.serverURL+"/post/fourTrend23", site).toPromise().then(data =>{

    return data
  });




}



async getFlowAndTotalFlowCollection(totalFlowCollection:any,flowCollectionName:any,totalFlowVariable:any = [],flowRateVariable:any = [],startDate: any, endDate:any ){

  const site:flowAndTotalFlowCollection = {
    FlowCollection:flowCollectionName,
    TotalFlowCollection:totalFlowCollection,
    TotalFlowVariable:totalFlowVariable,
    FlowRateVariable:flowRateVariable,
    StartDate:startDate,
    EndDate:endDate
  };


  return  this.http.post(this.su.serverURL+"/post/FlowAndCollectionTrend", site).toPromise().then(data =>{


    return data
  });
}

}
