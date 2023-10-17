import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ServerURLService {

public NUM:Number;
num:number;
data: any=[];
  public serverURL:any
  public wsURL:any
  public wsNMBMURL:any
  public guardURL:any;
  public trendURL:any


constructor(){

  this.NUM = 2

  if (this.NUM==0){
    this.serverURL = "http://localhost:3000";
    this.wsURL = "ws://localhost"
    this.wsNMBMURL = "ws://localhost"
    this.guardURL  = "hawkeye"  //localhost
    this.trendURL = "http://localhost:3000";
 }
 else if (this.NUM==2){
   this.serverURL = "http://mac-creations.co.za:3000";
   this.wsNMBMURL ="172.105.70.85";
   this.wsURL= "ws://mac-creations.co.za";
   this.guardURL = "hawkeye";  //Cloud Server - hawkeye
  this.trendURL = "http://mac-creations.co.za:3000";
//   this.trendURL = "http://155.93.192.206:3000";
 }

}
}
