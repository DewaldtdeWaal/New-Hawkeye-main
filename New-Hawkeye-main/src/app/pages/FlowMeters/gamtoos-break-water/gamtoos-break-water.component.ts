import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EChartsOption } from 'echarts';
import { Common } from 'src/app/class/common';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
export interface PeriodicElement {
  alarm: string;
  description: string;
}
@Component({
  selector: 'app-gamtoos-break-water',
  templateUrl: './gamtoos-break-water.component.html',
  styleUrls: ['./gamtoos-break-water.component.css']
})

export class GamtoosBreakWaterComponent implements OnInit {
  dataSource:any;
  variable:any = {
    gbw_ut:null,
    gbw_line_bar_in:null,
    gbw_line_bar_out:null,
    gbw_mode:null,
    gbw_local_remote:null,
    gbw_status:null,
    gbw_tank_level:null,
    gbw_actual_pressure:null,
    gbw_flow_rate:null,
    gbw_tf_for_to_sum:null,
    gbw_tf_res_to_con:null,
    comms:null,
  }
    data:any=[]
    theme: any;
    intervalLoop: any
    displayedColumns :string[]= ['alarm', 'description'];
    ELEMENT_DATA_P1: PeriodicElement[] = [];

      tagArr:any=[
      "gbw_ut",
      "gbw_line_bar_in",
      "gbw_line_bar_out",
      "gbw_mode",
      "gbw_local_remote",
      "gbw_status",
      "gbw_tank_level",
      "gbw_actual_pressure",
      "gbw_flow_rate",
      "gbw_tf_for_to_sum",
      "gbw_tf_res_to_con",
    ]

    faultArr:any=[
      "gbw_fault_door_opened",
      "gbw_fault_high_pressure_fault",
       "gbw_fault_MAC_limit_read",
       "gbw_surge_arrest_fault",
       "gbw_valve_fault",
      "gbw_volt_fault",
      "gbw_gen_fault",
    ]

    faultVariable:any={
      gbw_fault_door_opened: {
        value: null,
      alarm:"Fault",
      description:"Door Opened",
        alarmTrip: 1
      },
      gbw_fault_high_pressure_fault: {
        value: null,
      alarm:"Fault",
      description:"High Pressure Fault",
        alarmTrip: 1
      },
      gbw_fault_MAC_limit_read: {
        value: null,
      alarm:"Fault",
      description:"MAC Limit Reader",
        alarmTrip: 1
      },
      gbw_surge_arrest_fault: {
        value: null,
      alarm:"Fault",
      description:"Surge Arrest Fault",
        alarmTrip: 1
      },
      gbw_valve_fault: {
        value: null,
      alarm:"Fault",
      description:"Valve Fault",
        alarmTrip: 1
      },
      gbw_volt_fault: {
        value: null,
      alarm:"Fault",
      description:"Valt Fault",
        alarmTrip: 1
      },
      gbw_gen_fault: {
        value: null,
      alarm:"Fault",
      description:"General Fault",
        alarmTrip: 1
      },

    }

  constructor( public recieve:Common,private pm:pagePostMethod , private pt: PostTrend ) {



   }

  ngOnInit() {
    this.intervalLoop = this.pm.findPageData("nmbm_gbw_fpt", "FPT_CurrentVals").subscribe((result) => {
      this.data =  result;
      
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)
       this.variable.comms = Common.getLastUpdate(this.variable.gbw_ut)
       var alarm1: any [] = [this.faultVariable.gbw_fault_door_opened,this.faultVariable.gbw_fault_high_pressure_fault,this.faultVariable.gbw_fault_MAC_limit_read,this.faultVariable.gbw_surge_arrest_fault,this.faultVariable.gbw_valve_fault,this.faultVariable.gbw_volt_fault,this.faultVariable.gbw_gen_fault];
       this.dataSource= new MatTableDataSource(Common.getAlarmValue(alarm1))




   })
  }

  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }
  siteTitle:any = "Gamtoos Break Water";
  range:any;
  options1: EChartsOption;
  options2:EChartsOption;
  trendTag:any = ["gbw_actual_pressure","gbw_flow_rate"]
    collectionName:any ="NMNM_GWB_BAR_FLOW";
    options2Name:unknown = "Pressure Data"
    levelArr: any[]=[];
    isLoading:boolean = false;
  
    recieveDate($event: any){
     this.isLoading = true;
     var trend :any;
     this.range = $event;
  
     const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end)
  
     this.pt.getLevel(this.collectionName, this.trendTag,start,end).then((data) => {
      trend=data


      this.isLoading = false;

      this.options1 = Common.getOptionsForLine(this.options1,"Flow Rate Ml/d",trend.LevelArr[0])
      this.options2 = Common.getOptionsForLine(this.options2,"Pressure bar",trend.LevelArr[1])


    })
   }
}
