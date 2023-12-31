import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ReportService } from 'src/app/Service-Files/report.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import * as echarts from 'echarts';
import { UsersService } from 'src/app/Service-Files/users.service';
import { ListeningService } from 'src/app/listening.service';
import {CoegaIDZT} from 'src/app/Service-Files/FPT/coegaidzt.service';
import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';



type EChartsOption = echarts.EChartsOption;
export interface PeriodicElement {
  alarm: string;
  description: string;
}
@Component({
  selector: 'app-coega-idz-t',
  templateUrl: './coega-idz-t.component.html',
  styleUrls: ['./coega-idz-t.component.css']
})
export class CoegaIDZTComponent implements OnInit {
  generalfaulttable: PeriodicElement[] = [];
  generalfaultdatasource :any = new MatTableDataSource(this.generalfaulttable);

  fpt_cidzt_ut:any


  intervalLoop: any

  fpt_cidzt_panel_door:any
  fpt_cidzt_battery:any

  fpt_cidzt_idz_fm_s:any
  fpt_cidzt_mw_fm_s:any

  fpt_cidzt_idz_fr:any
  fpt_cidzt_idz_tf:any

  fpt_cidzt_mw_fr:any
  fpt_cidzt_mw_tf:any

  panel_door_stat:any
  battery_stat:any;

  siteTitle="Coega IDZT"

  ELEMENT_DATA_G: PeriodicElement[] = [];

  options1: EChartsOption;
  displayedColumns :string[]= ['alarm', 'description'];

  dataSourceG:any  = new MatTableDataSource(this.ELEMENT_DATA_G);
  comms: string;

  TotalFlowIDZArr: any[]=[];
  TotalFlowMWArr: any[]=[];
  DateArr: any[]=[];
  data: any=[];

  variable:any = {
        fpt_cidzt_ut:null,
        fpt_cidzt_surge_arrester_fault:null,
        fpt_cidzt_charger_fault:null,
        fpt_cidzt_panel_door:null,
        fpt_cidzt_battery:null,
        fpt_cidzt_idz_fm_s:null,
        fpt_cidzt_mw_fm_s:null,
        fpt_cidzt_idz_fr:null,
        fpt_cidzt_idz_tf:null,
        fpt_cidzt_mw_fr:null,
        fpt_cidzt_mw_tf:null,
  }

  faultVariable:any={
  fpt_cidzt_surge_arrester_fault: {
    value: null,
  alarm:"Fault",
  description:"Surge Arrester",
    alarmTrip: 1
  },
  fpt_cidzt_charger_fault: {
    value: null,
  alarm:"Fault",
  description:"Charger Fault",
    alarmTrip: 0
  }
}

  tagArr:any = [
    'fpt_cidzt_ut',//0


    'fpt_cidzt_panel_door',//3
    'fpt_cidzt_battery',//4
    'fpt_cidzt_idz_fm_s',//5
    'fpt_cidzt_mw_fm_s',//6
    'fpt_cidzt_idz_fr',//7
    'fpt_cidzt_idz_tf',//8
    'fpt_cidzt_mw_fr',//9
    'fpt_cidzt_mw_tf',//10
    "panel_door_stat",
    "battery_stat",
  ]

  faultArr:any=[

    "fpt_cidzt_charger_fault",
    'fpt_cidzt_surge_arrester_fault',//1

  ]
  constructor(public rs: ReportService, public recieve:Common,private pm:pagePostMethod,private pt: PostTrend ) {

    var trend :any;
    }




  ngOnInit(){

    this.intervalLoop = this.pm.findPageData("nmbm_cidzt_fpt", "FPT_CurrentVals").subscribe((result) => {
      this.data =  result;
      
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)
      this.comms = Common.getLastUpdate(this.variable.fpt_cidzt_ut)

       var alarm1: any [] = [this.faultVariable.fpt_cidzt_surge_arrester_fault,this.faultVariable.fpt_cidzt_charger_fault]

       this.generalfaultdatasource= new MatTableDataSource(Common.getAlarmValue(alarm1))



   })


  }


  tfCollection:any = "FPT_IDZT_TFs";
  collection:any = "FPT_IDZT_FRs";
  totalFlowTags :any = ["motherwell_TF","idz_TF"]
  flowTags :any = ["motherwell_FR","idz_FR"]
  range:any
  isLoading: boolean;
  recieveDate($event: any){

    this.isLoading = false;
    var trend :any;
    this.range = $event;
    const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end)

    this.pt.getFlowAndTotalFlowCollection(this.tfCollection,this.collection,this.totalFlowTags,this.flowTags,start,end).then((data) => {

      trend = data;
 
      this.options1 = this.recieve.getOptionsBarAndLine2("Soccomon Pipe Flow Rate Ml/d",trend.FlowRateArr[0],"Steel Pipe Flow Rate Ml/d",trend.FlowRateArr[1],"Soccomon Pipe Total Flow Ml",trend.TotalFlowArr[0],"Steel Pipe Total Flow Ml",trend.TotalFlowArr[1],"Ml","Ml/d")


      this.isLoading = false;
    })

  }


ngOnDestroy():void{
  if(this.intervalLoop){
    this.intervalLoop.unsubscribe();

  }
}

}
