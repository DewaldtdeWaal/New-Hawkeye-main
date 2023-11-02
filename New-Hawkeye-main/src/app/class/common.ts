import { Injectable } from "@angular/core";
import { WebSocketService } from "../Service-Files/web-socket.service";
import { FormControl, FormGroup } from "@angular/forms";
import { EChartsOption } from "echarts";

export interface PeriodicElement{

  alarm: string;
  description: string;
}
@Injectable({  providedIn: 'root'})
export class Common  {



  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });



  constructor(private webSocketService: WebSocketService){}
  static tableData: PeriodicElement[] = [];

  static dataSource:any

  public static getAlarmValue(alarmArray:any[]=[]){




    var tableData: PeriodicElement[]=[]
    var count = 0;




   for(var i = 0; i < alarmArray.length; i++){




      if(alarmArray[i].value==alarmArray[i].alarmTrip){


        tableData[count]={  alarm: alarmArray[i].alarm, description:alarmArray[i].description}
        count++;
      }




    }

    return tableData;
  }


  public options(){
   var options: EChartsOption;


  }



//This is a get Method.  Will allow us to see the comms status of the last send
public static getLastUpdate(updateTime:any){

  if(updateTime != null || updateTime != undefined){
  var comms:any

  var updateTime = updateTime
  var updateTimeMS =Date.parse(updateTime.toString())
  var cuurentDateCorrectFormat = Date().slice(4,Date().length-41);
  var  cuurentDateMS =Date.parse(cuurentDateCorrectFormat)
  var dateminus5minMS = cuurentDateMS - 300000

if(updateTime.toString().length !=0)
{
  if (updateTimeMS>dateminus5minMS)
  { comms = "OK" }
  else{ comms = "NOT OK"}
}

  return comms;

}

}

public static get2updatesand1battery(updateTime:any,updateTime2:any, updatelast5hours:any){

  if(updateTime != null || updateTime != undefined ||updateTime2 != null || updateTime2 != undefined || updatelast5hours != null || updatelast5hours != undefined ){

  var comms1:any
var comms2:any
var comms:any

   comms1 = Common.getLastUpdate(updateTime)
   comms2 = Common.getLastUpdateBattery(updateTime2,updatelast5hours)



   if(comms1 == "OK" && comms2 == "OK" )
   {
   comms = "OK"
   }
   else
   {
   comms = "NOT OK"
   }
   return comms;

  }
}

public static getOptions(options:any,DateArr:any,flowTrendName:any,lineName:any, dataArr:any){

  var theme:any
  var tooltipBackground:any;


if (localStorage.getItem("theme") == "dark-theme"||localStorage.getItem("theme") == "dark-theme")
{
theme = '#FFFFFF'
tooltipBackground = 'rgba(50,50,50,0.7)'
}else  if (localStorage.getItem("theme") == "light-theme"||localStorage.getItem("theme") == "light-theme")
{
theme = '#797979'
tooltipBackground = 'rgba(255, 255, 255, 1)'
}

  options = {
    tooltip: {
      backgroundColor: tooltipBackground,
      textStyle:{ color: theme,},
       trigger: 'axis',
       position: ['10%', '10%']
     },
    grid: {
      bottom:"18%"
    },

    xAxis: {
        type: 'category',
        data: DateArr,
        axisLabel: { interval: 0, rotate: 90, color: theme },
    },
    yAxis:   {
      type: 'value',
      scale: true,
      name: flowTrendName,
      nameTextStyle: { color: theme},
      boundaryGap: [0.2, 0.2],
      min: 0,
      axisLabel: {rotate: 0, color: theme},
    },
    series: [{
      name: lineName,
        data: dataArr,
        type: 'bar',

    }]
  };




  return options;
}

public static getOptions2(options:any,DateArr:any,flowTrendName:any,lineName1:any, dataArr1:any,lineName2:any, dataArr2:any){

  var theme:any
  var tooltipBackground:any;


if (localStorage.getItem("theme") == "dark-theme"||localStorage.getItem("theme") == "dark-theme")
{
theme = '#FFFFFF'
tooltipBackground = 'rgba(50,50,50,0.7)'
}else  if (localStorage.getItem("theme") == "light-theme"||localStorage.getItem("theme") == "light-theme")
{
theme = '#797979'
tooltipBackground = 'rgba(255, 255, 255, 1)'
}

  options = {
    tooltip: {
      backgroundColor: tooltipBackground,
      textStyle:{ color: theme,},
       trigger: 'axis',
       position: ['10%', '10%']
     },
    grid: {
      bottom:"18%"
    },

    xAxis: {
        type: 'category',
        data: DateArr,
        axisLabel: { interval: 0, rotate: 90, color: theme },
    },
    yAxis:   {
      type: 'value',
      scale: true,
      name: flowTrendName,
      nameTextStyle: { color: theme},
      boundaryGap: [0.2, 0.2],
      min: 0,
      axisLabel: {rotate: 90, color: theme},
    },
    series: [{
      name: lineName1,
        data: dataArr1,
        type: 'bar',
    },{
      name: lineName2,
      data: dataArr2,
      type: 'bar',
    }]
  };




  return options;
}

//making it a static method becaus that's easier
public static getLastUpdateBattery(update:any, updatelast5hours:any){

  if(updateTime != null || updateTime != undefined || updatelast5hours != null || updatelast5hours != undefined ){

var comms:any

var updateTime = update
var updateTimeMS =Date.parse(updateTime)
var cuurentDateCorrectFormat = Date().slice(4,Date().length-41);
var  cuurentDateMS =Date.parse(cuurentDateCorrectFormat)
var dateminus5minMS = cuurentDateMS - 300000

var updateTimeBat =  updatelast5hours
var updateTimeMSBat =Date.parse(updateTimeBat)
var cuurentDateCorrectFormatBat = Date().slice(4,Date().length-41);
var  cuurentDateMSBat =Date.parse(cuurentDateCorrectFormatBat)
var dateminus5hourMS = cuurentDateMSBat - 18000000


if(updateTime.length !=0)
{
if (updateTimeMS>dateminus5minMS &&updateTimeMSBat > dateminus5hourMS)
{ comms = "OK" }
else
{ comms = "NOT OK"}
}

return comms;

  }
}


public static getTwoLastUpdates(update:any, secondUpdate:any){

  if(update != null || update != undefined || secondUpdate != null || secondUpdate != undefined ){

var comms1:any
var comms2:any
var comms:any

comms1 = Common.getLastUpdate(update)

comms2 = Common.getLastUpdate(secondUpdate)


if(comms1 == "OK" && comms2 == "OK" )
{
comms = "OK"
}
else
{
comms = "NOT OK"
}
return comms;

  }
}



public async recieveRouteData(tagArr:any = [],variable:any,data:any){

  for(var i = 0; i < tagArr.length; i++) {
    variable[tagArr[i]] = data[0][tagArr[i]]
  }

  return variable;

}

public async recieveRouteDatas(tagArr:any = [],variable:any,data:any){

  for(var i = 0; i < tagArr.length; i++) {
    variable[tagArr[i]] = data[tagArr[i]]
  }

  return variable;

}

public recieveNMBMVals(tagArr: any[]){
  var tagVals:any = []
  for(let i = 0; i<tagArr.length ;i++){
    this.webSocketService.nmbm_listen(tagArr[i]).subscribe((data:any)=>{
      tagVals[i] = data[tagArr[i]];

    })
  }
  return tagVals
}

public recieveNonMVals(tagArr: any[]){
  var tagVals:any = []
  for(let i = 0; i<tagArr.length ;i++){
    this.webSocketService.listen(tagArr[i]).subscribe((data:any)=>{
      tagVals[i] = data[tagArr[i]];

    })
  }
  return tagVals
}


public getFaultValue(faultArr:any = [],  errorVals:any=[],faultVariable:any)
{
  for(let index = 0; index < faultArr.length; index++){
    faultVariable[errorVals].value = errorVals[index];
  }

  return faultVariable

}


public  getTagValsValues(tagVals:any = [],tagArr:any = [], variable:any){

  if (tagVals[0] !== undefined) {

    for (let i = 0; i < tagVals.length; i++) {

     variable[tagArr[i]] =tagVals[i];

    }
  }

  return variable;


}



public static getRouteWithFault(tagArr:any = [],variable:any,data:any,faultArr:any,faultVariable:any){
  Common.getRouteData(tagArr,variable,data)
  Common.getFaultRouteData(faultArr,faultVariable,data)
}

public static getRouteWithFaults(tagArr:any = [],variable:any,data:any,faultArr:any,faultVariable:any){
  Common.getRouteDatas(tagArr,variable,data)
  Common.getFaultRouteDatas(faultArr,faultVariable,data)
}

static getRouteDatas(tagArr:any = [],variable:any,data:any){

  for(var i = 0; i < tagArr.length; i++) {
    variable[tagArr[i]] = data[tagArr[i]]
  }

  return variable;

}


static getRouteData(tagArr:any = [],variable:any,data:any){



  for(var i = 0; i < tagArr.length; i++) {
    variable[tagArr[i]] = data[0][tagArr[i]]
  }

  return variable;

}

public static getFaultRouteData(tagArr:any = [],variable:any,data:any){

  for(var i = 0; i < tagArr.length; i++) {
    variable[tagArr[i]].value = data[0][tagArr[i]]
  }

  return variable;

}

public static getFaultRouteDatas(tagArr:any = [],variable:any,data:any){



  for(var i = 0; i < tagArr.length; i++) {
    variable[tagArr[i]].value = data[tagArr[i]]
  }

  return variable;

}

public static setFaultValues(errorVals: any[],faultVariable:any,faultArr:any[]) {
  for (let i = 0; i < faultArr.length; i++) {


    faultVariable[faultArr[i]].value = errorVals[i];


  }
}

public NMBMAPI(tagVals:any = [],tagArr:any = [], variable:any, commsArr:any = []){

  this.getTagValsValues(tagVals, tagArr, variable)



  return variable


}








}
