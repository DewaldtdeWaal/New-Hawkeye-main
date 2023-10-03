import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from 'rxjs/operators';


import { ServerURLService } from "../server-url.service";
import { Router } from "express";


export interface DriverClass {
  driverName: string;
}


export interface Driver{

  ipAddress:String;
  driverName:String;
  description:String;
  siteType:String;
  updatedStatus:boolean;
  //So I want this dataArray to be an array
  dataArray:any[] ;

}



export interface driverTable{
  tagName:String;
  driverName:String;
}


@Injectable({ providedIn: "root" })
export class createDriverService{

  manageDrive:any

  ipAddress:any
driverName:any
description:any
siteType:any
dataArray:any

  constructor(private http: HttpClient,private su: ServerURLService){}

 async createDriver(  ipAddress:String,driverName:String,description:String,siteType:String,dataArray:any, updatedStatus:boolean){

    var response
    const driver: Driver = {
      ipAddress:ipAddress,
driverName:driverName,
description:description,
siteType:siteType,
dataArray:dataArray,
updatedStatus:updatedStatus};


this.http.post(this.su.serverURL+"/addDriver", driver)
.subscribe((response) => {

  response = response
  })


  return  response;
}



updateDriver(  ipAddress:String,driverName:String,description:String,siteType:String,dataArray:any, updatedStatus:boolean){
  const driver: Driver = {
    ipAddress:ipAddress,
driverName:driverName,
description:description,
siteType:siteType,
dataArray:dataArray,
updatedStatus:updatedStatus
  }

this.http.post(this.su.serverURL+"/update/driver", driver)
.subscribe((responseData: any) => {
  })
}




deleteRowDriver(tagName:any, driverName:any){

  const driver: driverTable ={
    tagName:tagName,
    driverName:driverName
  }


  this.http.post(this.su.serverURL+"/delete/row", driver)
  .subscribe((responseData:any) => {})

}


GetDriverValue():Observable<any[]>{//automated Number

  return this.http.get<any[]>(this.su.serverURL+"/drivers/values")
}

getSiteDataArray(driverName:any){
  const driver: DriverClass = {
    driverName: driverName,

  }

  this.http.post<{
    driverName:any,

  }>(this.su.serverURL+"/drivers/getDataValues", driver).subscribe(responseData => {

    this.driverName = responseData.driverName;

  }, error =>{

  });

  return this.driverName
}

// The function getDriverData is an async function that takes in a string argument called driverName and returns a Promise that resolves to any type of data
async getDriverData(driverName: string): Promise<any> {
// Create a DriverClass object with the passed in driverName
const driver: DriverClass = { driverName };

try {
  // Send a POST request with the driver object to the server's /drivers/getDataArray endpoint and wait for its response using await keyword
  const responseData = await this.http.post<{ dataArray: any }>(this.su.serverURL + "/drivers/getDataArray", driver).toPromise();

  // Log the response data to the console
  //console.log(responseData);

  // Return the dataArray from the response object
  return responseData.dataArray;
} catch (error) {
  // If there was an error while making the HTTP request, log it and throw an error
  console.error(error);
  throw new Error('Failed to get driver data');
}
}

async WorkingFunction(){
  const promise = fetch("getBackendRoute")

  promise.then(res => res.json())
  .then(user => console.log(user))
  .catch(err => console.error(err))
}

sendDriverInfo(driverName:string){

  console.log(driverName)

  const driver: DriverClass = {
    driverName: driverName,
  }
  this.http.post<{
    ipAddress:any,
    driverName:any,
    description:any,
    siteType:any,
    dataArray:any,
        }>(this.su.serverURL+"/drivers/post-drivers", driver)
    .subscribe(responseData => {

      console.log(driverName)
this.ipAddress = responseData.ipAddress;
this.driverName = responseData.driverName;
this.description = responseData.description;
this.siteType = responseData.siteType;
this.dataArray = responseData.dataArray;

    }, error =>{
    });
}

getIPAddress(){
  return this.ipAddress;
}
getDriverName(){
  return this.driverName;
}
getSiteDescription(){
  return this.description;
}
getSiteType(){
  return this.siteType;
}
getDataArray(){
  return this.dataArray;
}



}
