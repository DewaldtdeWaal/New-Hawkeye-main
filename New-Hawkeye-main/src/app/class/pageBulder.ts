import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { EChartsOption } from "echarts";

export interface PeriodicElement{

  alarm: string;
  description: string;
}
@Injectable({  providedIn: 'root'})
export class pageBuilder  {



  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });


  constructor(){}

  public static getRouteData(tagArr:any = [],variable:any,data:any){

  //  console.log(data)



    for(var i = 0; i < tagArr.length; i++) {
       variable[tagArr[i]] = data[tagArr[i]]
     }

    return variable;

  }

  public static populateVariable(tagArr:any = [], variable:any){



    for(var i = 0; i< tagArr.length;i++){
        variable[tagArr[i]] = null;
  }

  return variable

  }

  public static convertDate(date:any){


    var dt = new Date(date).toString();
    var dt2 = dt.substr(4, dt.length-45);



    return dt2;

  }

  public static getLastUpdate(updateTime:any,wakeupperiod:any ){

    var miliSeconds
    miliSeconds = pageBuilder.workOutMiliseconds(wakeupperiod)
    if(updateTime != null || updateTime != undefined){
    var comms:any

    var updateTime = updateTime
    var updateTimeMS =Date.parse(updateTime.toString())
    var cuurentDateCorrectFormat = Date().slice(4,Date().length-41);
    var  cuurentDateMS =Date.parse(cuurentDateCorrectFormat)
    var dateMinusWorkout = cuurentDateMS - miliSeconds

  if(updateTime.toString().length !=0)
  {
    if (updateTimeMS>dateMinusWorkout)
    { comms = "OK" }
    else{ comms = "NOT OK"}
  }

    return comms;

  }

  }

  public static workOutMiliseconds(wakeupperiod:any ){


    var workOutMiliseconds

    workOutMiliseconds = 3 * 60000 * wakeupperiod;


    return workOutMiliseconds;
  }


  public async buildArray(){


  }
}
