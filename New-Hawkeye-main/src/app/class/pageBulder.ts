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

  miliSeconds:any

  constructor(){}

  // public static getRouteData(tagArr:any = [],variable:any,data:any){

  // //  console.log(data)



  //   for(var i = 0; i < tagArr.length; i++) {
  //      variable[tagArr[i]] = data[tagArr[i]]
  //    }

  //   return variable;

  // }

  // public static convertDate(date:any){


  //   var dt = new Date(date).toString();
  //   var dt2 = dt.substr(4, dt.length-45);



  //   return dt2;

  // }

  // public static getLastUpdate(updateTime:any,wakeupperiod:any ){

  //   var miliSeconds



  //   miliSeconds = pageBuilder.workOutMiliseconds(wakeupperiod)


  //   var comms:any

  //   var updateTime = updateTime
  //   var updateTimeMS =Date.parse(updateTime.toString())
  //   var cuurentDateCorrectFormat = Date().slice(4,Date().length-41);
  //   var  cuurentDateMS =Date.parse(cuurentDateCorrectFormat)
  //   var dateMinusWorkout = cuurentDateMS - miliSeconds

  // if(updateTime.toString().length !=0)
  // {
  //   if (updateTimeMS>dateMinusWorkout)
  //   { comms = "OK" }
  //   else{ comms = "NOT OK"}
  // }

  //   return comms;



  // }

  // public static workOutMiliseconds(wakeupperiod:any ){


  //   var workOutMiliseconds

  //   workOutMiliseconds = 5 * 60000 * wakeupperiod;


  //   return workOutMiliseconds;
  // }


  // public static addUnitToTag(tags:any, variables:any){

  //   for (var i = 0; i < tags.length; i++){



  //     variables[tags[i].TagName ] =  variables[tags[i].TagName ] + " " + tags[i].TagUnits

  //     variables[tags[i].RateName ] =  variables[tags[i].RateName ] + " " + tags[i].RateUnits
  //   }

  //   console.log(variables)

  // }
}
