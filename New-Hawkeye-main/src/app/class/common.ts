import { Injectable } from "@angular/core";
import { WebSocketService } from "../Service-Files/web-socket.service";
import { FormControl, FormGroup } from "@angular/forms";
import { EChartsOption } from "echarts";
import { totalFlowTrend } from './pageTrending';

export interface PeriodicElement{

  alarm: string;
  description: string;
}



@Injectable({  providedIn: 'root'})
export class Common  {

 options:EChartsOption;

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

//For 2 bars and one line graph
  public getOneLineTwoBarOptions(leftAxisName:any, rightAxisName:any, flowTrendName1:any,flowTrendData1:any, totalFlowTrendName1:any, totalFlowTrendData1:any, totalFlowTrendName2:any, totalFlowTrendData2:any){

    
  const {theme, tooltipBackground} = Common.getTheme();


  this.options = {
    grid: {
      left: '6%',
      right: '7%',
      top:'10%',
      bottom: '10%',
      containLabel: true
  },
  toolbox:{
    feature: {
    feature: {
      saveAsImage: {}
    }

    }},
    dataZoom:[{

      type: 'slider',
      start: 0,
      end: 100,
      handleSize: 8
  
      },
      { start: 0,
       end:100}
      ],
      tooltip: {
        backgroundColor: tooltipBackground,
        textStyle:{ color: theme,},
        axisPointer: {
          type: 'cross'
        },
         trigger: 'axis',
  
         position: ['10%', '10%']
  
       },  
       legend:{
        top:'auto',
        type:'scroll',
        textStyle: {color:theme },
           },
           axisPointer:{
          },        xAxis: {
            type: 'time'  ,
            axisLabel: {color: theme},
            splitLine: {
              show: true
            },
          }, 
          yAxis: [
            {
              nameTextStyle: { color: theme},
            type:'value',
            name:leftAxisName,//leftAxisName
          
            min:0,
            axisLabel:{
              formatter:'{value} ',
              color:theme,
            }
            },
            {
              type:'value',
              name:rightAxisName,
              nameTextStyle: { color: theme},
              min:0,
              axisLabel:{
                formatter:'{value} ',
                color:theme,
              }
              },
            {
              axisLabel: {color: theme},
            type: 'value',
            boundaryGap: [0, 0.05],
            }
    
        ],
        series: [
          {
            name: totalFlowTrendName1,
              data: totalFlowTrendData1,
              type: 'bar',
              yAxisIndex:0,
              barWidth: '50%',
              barMaxWidth: 30,
              barMinWidth: 5,
        },
        {
          name: totalFlowTrendName2,
          data: totalFlowTrendData2,
          type: 'bar',
          yAxisIndex:0,
          barWidth: '50%',
          barMaxWidth: 30,
          barMinWidth: 5,
        },     {
          name: flowTrendName1,
          data: flowTrendData1,
          smooth:true,
          showSymbol: false,
          type: 'line',
          yAxisIndex: 1,
     
        },
      ]
  }

        return this.options;


  }

  //This options function is there for 3 bar graphs and 3 line graphs
public getOptionsDataFor6DataPoints(leftAxisName:any,rightAxisName:any, options1Name:any,options1Data:any,options2Name:any,options2Data:any,options3Name:any,options3Data:any,options4Name:any,options4Data:any,options5Name:any,options5Data:any,options6Name:any,options6Data:any )
{

  const {theme, tooltipBackground} = Common.getTheme();

  this.options = {
   
    grid: {
      left: '6%',
      right: '7%',
      top:'10%',
      bottom: '10%',
      containLabel: true
  },
  toolbox:{
    feature: {
    feature: {
      saveAsImage: {}
    }

    }},
    dataZoom:[{

      type: 'slider',
      start: 0,
      end: 100,
      handleSize: 8
  
      },
      { start: 0,
       end:100}
      ],
      tooltip: {
        backgroundColor: tooltipBackground,
        textStyle:{ color: theme,},
        axisPointer: {
          type: 'cross'
        },
         trigger: 'axis',
  
         position: ['10%', '10%']
  
       },      
       legend:{
          top:'auto',
          type:'scroll',
          textStyle: {color:theme },
             },
       axisPointer:{
         },
             xAxis: {
              type: 'time'  ,
              axisLabel: {color: theme},
              splitLine: {
                show: true
              },
            },
            yAxis: [
              {
                nameTextStyle: { color: theme},
              type:'value',
              name:leftAxisName,//leftAxisName
            
              min:0,
              axisLabel:{
                formatter:'{value} ',
                color:theme,
              }
              },
              {
                type:'value',
                name:rightAxisName,
                nameTextStyle: { color: theme},
                min:0,
                axisLabel:{
                  formatter:'{value} ',
                  color:theme,
                }
                },
              {
                axisLabel: {color: theme},
              type: 'value',
              boundaryGap: [0, 0.05],
              }
      
          ],
          series: [
            {
              name: options1Name,
                data: options1Data,
                type: 'bar',
                yAxisIndex:0,
                barWidth: '50%',
                barMaxWidth: 30,
                barMinWidth: 5,
          },
          {
            name: options2Name,
            data: options2Data,
            type: 'bar',
            yAxisIndex:0,
            barWidth: '50%',
            barMaxWidth: 30,
            barMinWidth: 5,
          },
          {
            name: options3Name,
            data: options3Data,
            type: 'bar',
            yAxisIndex:0,
            barWidth: '50%',
            barMaxWidth: 30,
            barMinWidth: 5,
          },
          {
            name: options4Name,
            data: options4Data,
            smooth:true,
            showSymbol: false,
            type: 'line',
            yAxisIndex: 1,
       
          },
          {
            name: options5Name,
            data: options5Data,
            smooth:true,
            showSymbol: false,
            type: 'line',
            yAxisIndex: 1,
       
          },
          {
            name: options6Name,
            data: options6Data,
            smooth:true,
            showSymbol: false,
            type: 'line',
            yAxisIndex: 1,
       
          },
        ]
        }

        return this.options;

  
}


  //This options function is there for 2 line graphs
public  getOptionsFor2Line(symbol:any,flowTrendName1:any, dataArr1:any,flowTrendName2:any, dataArr2:any){

  
  const {theme, tooltipBackground} = Common.getTheme();

  this.options = {
    grid: {
      left: '6%',
      right: '7%',
      top:'10%',
      bottom: '10%',
      containLabel: true
  },
  toolbox:{
    feature: {
    feature: {
      saveAsImage: {}
    }

    }},
    dataZoom:[{

      type: 'slider',
      start: 0,
      end: 100,
      handleSize: 8
  
      },
      { start: 0,
       end:100}
      ],
      tooltip: {
        backgroundColor: tooltipBackground,
        textStyle:{ color: theme,},
        axisPointer: {
          type: 'cross'
        },
         trigger: 'axis',
         position: ['10%', '10%']
  
       },     legend:{
        top:'auto',
        type:'scroll',
        textStyle: {color:theme },
           },
     axisPointer:{
        //  color: {color: theme},
       },
           xAxis: {
            type: 'time'  ,
            axisLabel: {color: theme},
            splitLine: {
              show: true
            },
          },
          yAxis: [
            {
              nameTextStyle: { color: theme},
            type:'value',
            name:symbol,
          
            min:0,
            axisLabel:{
              formatter:'{value} ',
              color:theme,
            }
            },
            {
              type:'value',
              name:symbol,
              nameTextStyle: { color: theme},
              min:0,
              axisLabel:{
                formatter:'{value} ',
                color:theme,
              }
              },
            {
              axisLabel: {color: theme},
            type: 'value',
            boundaryGap: [0, 0.05],
            }
    
        ],

  series: [
  {
    name: flowTrendName1,
    data: dataArr1,
    smooth:true,
    showSymbol: false,
    type: 'line',
    yAxisIndex: 0,
  },
  {
    name: flowTrendName2,
    data: dataArr2,
    smooth:true,
    showSymbol: false,
    type: 'line',
    yAxisIndex: 0,
  },

]
    
         }
  




  return this.options;
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


//This function is there for 1 bar chart
public static getOptions(options:any,DateArr:any,flowTrendName:any,lineName:any, dataArr:any){

  console.log(DateArr)
  const {theme, tooltipBackground} = this.getTheme();

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

//Function for 2 bar grapshs
public static getOptions2(options:any,DateArr:any,flowTrendName:any,lineName1:any, dataArr1:any,lineName2:any, dataArr2:any){
  const {theme, tooltipBackground} = this.getTheme();

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

//Function for 1 line chart
public static getOptionsForLine(options:any,flowTrendName:any, dataArr:any){

  
  const {theme, tooltipBackground} = this.getTheme();

  options = {
    grid: {
      left: '6%',
      right: '7%',
      top:'10%',
      bottom: '10%',
      containLabel: true
  },
  toolbox:{
    feature: {
    feature: {
      saveAsImage: {}
    }

    }},
    dataZoom:[{

      type: 'slider',
      start: 0,
      end: 100,
      paddingTop:'10px',
      handleSize: 8
  
      },
      { start: 0,
       end:100}
      ],
      tooltip: {
        backgroundColor: tooltipBackground,
        textStyle:{ color: theme,},
        axisPointer: {
          type: 'cross'
        },
         trigger: 'axis',
         position: ['10%', '10%']
  
       },     legend:{
        top:'auto',
        type:'scroll',
        textStyle: {color:theme },
           },
     axisPointer:{
         color: {color: theme}
       },
           xAxis: {
            type: 'time'  ,
            axisLabel: {color: theme},
            splitLine: {
              show: true
            },
          },
          yAxis: [
            {
              nameTextStyle: { color: theme},
            type:'value',
            name:flowTrendName,
          
            min:0,
            axisLabel:{
              formatter:'{value} ',
              color:theme,
            }
            },
            {
              type:'value',
              name:flowTrendName,
              nameTextStyle: { color: theme},
              min:0,
              axisLabel:{
                formatter:'{value} ',
                color:theme,
              }
              },
            {
              axisLabel: {color: theme},
            type: 'value',
            boundaryGap: [0, 0.05],
            }
    
        ],

  series: [
  {
    name: flowTrendName,
    data: dataArr,
    smooth:true,
    showSymbol: false,
    type: 'line',
    yAxisIndex: 0,
  }]
    
         }
  




  return options;
}

//Function for bar and line graph
public static getOptionsBarAndLine(options:any,flowTrendName:any, flowTrendData:any,totalFlowName:any ,totalFlowData:any){

  
  const {theme, tooltipBackground} = this.getTheme();

  options = {
   
    grid: {
      left: '6%',
      right: '7%',
      top:'10%',
      bottom: '10%',
      containLabel: true
  },
  toolbox:{
    feature: {
    feature: {
      saveAsImage: {}
    }

    }},
    dataZoom:[{

      type: 'slider',
      start: 0,
      end: 100,
      paddingTop:'10px',
      handleSize: 8
  
      },
      { start: 0,
       end:100}
      ],
      tooltip: {
        backgroundColor: tooltipBackground,
        textStyle:{ color: theme,},
        axisPointer: {
          type: 'cross'
        },
         trigger: 'axis',
  
         position: ['10%', '10%']
  
       },      
       legend:{
          top:'auto',
          type:'scroll',
          textStyle: {color:theme },
             },
       axisPointer:{
           color: {color: theme}
         },
             xAxis: {
              type: 'time'  ,
              axisLabel: {color: theme},
              splitLine: {
                show: true
              },
            },
            yAxis: [
              {
                nameTextStyle: { color: theme},
              type:'value',
              name:totalFlowName,
            
              min:0,
              axisLabel:{
                formatter:'{value} ',
                color:theme,
              }
              },
              {
                type:'value',
                name:flowTrendName,
                nameTextStyle: { color: theme},
                min:0,
                axisLabel:{
                  formatter:'{value} ',
                  color:theme,
                }
                },
              {
                axisLabel: {color: theme},
              type: 'value',
              boundaryGap: [0, 0.05],
              }
      
          ],

    series: [
      {
      name: totalFlowName,
        data: totalFlowData,
        type: 'bar',
        yAxisValue:0,
        barWidth: '50%',
        barMaxWidth: 30,
        barMinWidth: 5,
    },
    {
      name: flowTrendName,
      data: flowTrendData,
      smooth:true,
      showSymbol: false,
      type: 'line',
      yAxisIndex: 1,
    }]

  }

  return options;
}







//Function which return 2 bar and 2 lines Charts
public  getOptionsBarAndLine2(lineName:any, lineData:any,lineName2:any, lineData2:any,barName:any ,barData:any,barName2:any ,barData2:any, leftAxisName:any,rightAxisName:any ){

  
  const {theme, tooltipBackground} = Common.getTheme();

  this.options = {
   
    grid: {
      left: '6%',
      right: '7%',
      top:'10%',
      bottom: '10%',
      containLabel: true
  },
  toolbox:{
    feature: {
    feature: {
      saveAsImage: {}
    }

    }},
    dataZoom:[{

      type: 'slider',
      start: 0,
      end: 100,
      handleSize: 8
  
      },
      { start: 0,
       end:100}
      ],
      tooltip: {
        backgroundColor: tooltipBackground,
        textStyle:{ color: theme,},
        axisPointer: {
          type: 'cross'
        },
         trigger: 'axis',
  
         position: ['10%', '10%']
  
       },      
       legend:{
          top:'auto',
          type:'scroll',
          textStyle: {color:theme },
             },
       axisPointer:{
         },
             xAxis: {
              type: 'time'  ,
              axisLabel: {color: theme},
              splitLine: {
                show: true
              },
            },
            yAxis: [
              {
                nameTextStyle: { color: theme},
              type:'value',
              name:leftAxisName, 
            
              min:0,
              axisLabel:{
                formatter:'{value} ',
                color:theme,
              }
              },
              {
                type:'value',
                name:rightAxisName,
                nameTextStyle: { color: theme},
                min:0,
                axisLabel:{
                  formatter:'{value} ',
                  color:theme,
                }
                },
              {
                axisLabel: {color: theme},
              type: 'value',
              boundaryGap: [0, 0.05],
              }
      
          ],

    series: [
      {
      name: barName,
        data: barData,
        type: 'bar',
        barWidth: '50%',
        barMaxWidth: 30,
        barMinWidth: 10,
    },
    {
      name: barName2,
        data: barData2,
        type: 'bar',
        barWidth: '50%',
        barMaxWidth: 30,
        barMinWidth: 10,
    },
    {
      name: lineName,
      data: lineData,
      smooth:true,
      showSymbol: false,
      type: 'line',
      yAxisIndex: 1,
    },
    {
      name: lineName2,
      data: lineData2,
      smooth:true,
      showSymbol: false,
      type: 'line',
      yAxisIndex: 1,
    }]

  }

  return this.options;
}
//function for 3 bar and 3 line graphs
public  getOptionsBarAndLine3(lineName:any, lineData:any,lineName2:any, lineData2:any,lineName3:any, lineData3:any,barName:any ,barData:any,barName2:any ,barData2:any,barName3:any ,barData3:any, leftAxisName?:any,rightAxisName?:any ){
  // var theme:any
  // var tooltipBackground:any;
  
  const {theme, tooltipBackground} = Common.getTheme();

  this.options = {
   
    grid: {
      left: '6%',
      right: '7%',
      top:'10%',
      bottom: '10%',
      containLabel: true
  },
  toolbox:{
    feature: {
    feature: {
      saveAsImage: {}
    }

    }},
    dataZoom:[{

      type: 'slider',
      start: 0,
      end: 100,
      handleSize: 8
  
      },
      { start: 0,
       end:100}
      ],
      tooltip: {
        backgroundColor: tooltipBackground,
        textStyle:{ color: theme,},
        axisPointer: {
          type: 'cross'
        },
         trigger: 'axis',
  
         position: ['10%', '10%']
  
       },      
       legend:{
          top:'auto',
          type:'scroll',
          textStyle: {color:theme },
             },
       axisPointer:{
         },
             xAxis: {
              type: 'time'  ,
              axisLabel: {color: theme},
              splitLine: {
                show: true
              },
            },
            yAxis: [
              {
                nameTextStyle: { color: theme},
              type:'value',
              name:rightAxisName,
            
              min:0,
              axisLabel:{
                formatter:'{value} ',
                color:theme,
              }
              },
              {
                type:'value',
                name:leftAxisName,
                nameTextStyle: { color: theme},
                min:0,
                axisLabel:{
                  formatter:'{value} ',
                  color:theme,
                }
                },
              {
                axisLabel: {color: theme},
              type: 'value',
              boundaryGap: [0, 0.05],
              }
      
          ],

    series: [
      {
      name: barName,
        data: barData,
        type: 'bar',
        barWidth: '50%',
        barMaxWidth: 30,
        barMinWidth: 10,
    },
    {
      name: barName2,
        data: barData2,
        type: 'bar',
        barWidth: '50%',
        barMaxWidth: 30,
        barMinWidth: 10,
    },
    {
      name: barName3,
        data: barData3,
        type: 'bar',
        barWidth: '50%',
        barMaxWidth: 30,
        barMinWidth: 10,
    },
    {
      name: lineName,
      data: lineData,
      smooth:true,
      showSymbol: false,
      type: 'line',
      yAxisIndex: 1,
    },
    {
      name: lineName2,
      data: lineData2,
      smooth:true,
      showSymbol: false,
      type: 'line',
      yAxisIndex: 1,
    },
    {
      name: lineName3,
      data: lineData3,
      smooth:true,
      showSymbol: false,
      type: 'line',
      yAxisIndex: 1,
    },]

  }

  return this.options;
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





public static getTheme(){
var theme
var tooltipBackground
  if (localStorage.getItem("theme") == "dark-theme"||localStorage.getItem("theme") == "dark-theme")
{
theme = '#FFFFFF'
tooltipBackground = 'rgba(50,50,50,0.7)'
}else  if (localStorage.getItem("theme") == "light-theme"||localStorage.getItem("theme") == "light-theme")
{
theme = '#797979'
tooltipBackground = 'rgba(255, 255, 255, 1)'
}

return {theme, tooltipBackground}

}


public static getStartEnd(Start:any, End:any){

  var start;
  var end;

    if(Start != null){
      start = new Date(Start).toISOString().slice(0, 10);
    }
    else{
    start = null;
    }

    if (End != null){
      end =  new Date(End).toISOString().slice(0, 10);
    }
    else{
      end = null
    }


    return {start, end}
}






}
