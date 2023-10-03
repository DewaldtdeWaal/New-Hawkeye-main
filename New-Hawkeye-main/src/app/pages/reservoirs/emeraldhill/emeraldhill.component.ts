import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {emeraldHillService} from 'src/app/Service-Files/Reservoir/reservoir.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { Common } from 'src/app/class/common';
import { FormControl, FormGroup } from '@angular/forms';
import { EChartsOption } from 'echarts';
import { ReportService } from 'src/app/Service-Files/report.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
export interface PeriodicElement{
  alarm: string;
  description: string;
}
@Component({
  selector: 'app-emeraldhill',
  templateUrl: './emeraldhill.component.html',
  styleUrls: ['./emeraldhill.component.css']
})
export class EmeraldhillComponent implements OnInit {


  emer_lvl:any
  comms:any
  emer_ut:any
  data: any=[];
  intervalLoop: any;
  emer_flow_rate: any;
  emer_total_flow: any;
  emer_battery_low: any;
  emer_charger_ok: any;

  generalfaulttable: PeriodicElement[] = [];
  displayedColumns :string[]= ['alarm', 'description'];
  generalfaulttabledatasource: any = new MatTableDataSource(this.generalfaulttable)

  options: EChartsOption;

  bateryLow:any = {
    value: null,
    alarm:"Fault",
    description:"Battery Low",
    alarmTrip: 1
 };

 chargerOk:any = {
  value: null,
  alarm:"Fault",
  description:"Charger Not OK",
  alarmTrip: 1
};


total_flow_1_array: any[]=[];
DateArr: any[]=[];

  constructor(private webSocketService: WebSocketService,private emer:emeraldHillService,public recieve:Common,public rs: ReportService,private pm:pagePostMethod ) {
    this.emer.GetSiteValues()
    .subscribe(rsp => {
      this.data = rsp;
      this.emer_lvl = this.data.routingArray[0].emer_lvl
      this.emer_ut = this.data.routingArray[0].emer_ut
      this.comms = Common.getLastUpdate(this.emer_ut)
      this.emer_flow_rate = this.data.routingArray[0].emer_flow_rate
      this.emer_total_flow = this.data.routingArray[0].emer_total_flow
      this.bateryLow.value = this.data.routingArray[0].emer_battery_low
      this.chargerOk.value = this.data.routingArray[0].emer_charger_ok



    }
    )
    setTimeout(() => {

      var alarm: any [] =[this.bateryLow, this.chargerOk]

      this.generalfaulttabledatasource = new MatTableDataSource(Common.getAlarmValue(alarm))





    },1000)
   }





  ngOnInit() {

    var tagVals:any=[]
    var tagArr =[
      'emer_ut',//0
      'emer_lvl',//1
      'emer_flow_rate',
      'emer_total_flow',
      'emer_battery_low',
'emer_charger_ok'
    ]



    tagVals = this.recieve.recieveNMBMVals(tagArr);

    var updateTemp:any;
    this.intervalLoop = setInterval(() =>{
      updateTemp = tagVals[0];
      if(updateTemp !== undefined){



        this.emer_ut =  tagVals[0];

        this.emer_lvl =  tagVals[1];
        this.emer_flow_rate = tagVals[2];
        this.emer_total_flow = tagVals[3];
        this.bateryLow.value =  tagVals[4];
        this.chargerOk.value = tagVals[5];

        setTimeout(() => {

          var alarm: any [] =[this.bateryLow, this.chargerOk]

          this.generalfaulttabledatasource = new MatTableDataSource(Common.getAlarmValue(alarm))




        },1000)


      }
      this.comms = Common.getLastUpdate(this.emer_ut)
    },60000);
    var trend :any;

    this.rs.GetEmeraldHll().subscribe(data => {
      trend=data

      console.log(trend.total_flow_1_array)

      this.total_flow_1_array = trend.total_flow_1_array;
            this.DateArr = trend.DateArr;

            this.options = Common.getOptions(this.options,this.DateArr,"Total Flow Ml","Total Flow Ml",this.total_flow_1_array)

          })




}


  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  onDateFilter(){

    const newStart = new Date(this.range.value.start).toISOString().slice(0, 10);
    const newEnd = new Date(this.range.value.end).toISOString().slice(0, 10);

    var trend :any;

    this.rs.POST_EmeraldHill_Total_Flow_Dates(newStart, newEnd).subscribe(data => {
      trend=data

      console.log(trend.total_flow_1_array)

            this.total_flow_1_array = trend.total_flow_1_array;
            this.DateArr = trend.DateArr;



            this.options = Common.getOptions(this.options,this.DateArr,"Total Flow Ml","Total Flow Ml",this.total_flow_1_array)



          })


  }

  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }

}
