import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ReportService } from 'src/app/Service-Files/report.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import * as echarts from 'echarts';
import { UsersService } from 'src/app/Service-Files/users.service';
import { ListeningService } from 'src/app/listening.service';
import { EChartsOption } from 'echarts';
import {Gamtoos} from 'src/app/Service-Files/FPT/gamtoos.service'
import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
@Component({
  selector: 'app-gamtoos-bridge',
  templateUrl: './gamtoos-bridge.component.html',
  styleUrls: ['./gamtoos-bridge.component.css']
})
export class GamtoosBridgeComponent implements OnInit {
  

  variable:any = {
  fpt_gt_brg_ut:null,
  fpt_gt_brg_stl_p_press:null,
  fpt_gt_brg_soco_p_press:null,
  fpt_gt_brg_stl_p_fr:null,
  fpt_gt_brg_stl_p_tf:null,
  fpt_gt_brg_soco_p_fr:null,
  fpt_gt_brg_soco_p_tf:null,
  fpt_gt_brg_panel_door:null,
  fpt_gt_brg_battery:null,
  fpt_gt_brg_steal_p_press_analog_s:null,
  fpt_gt_brg_soco_p_press_analog_s:null,
  fpt_gt_brg_fm_stl_p_comms_s:null,
  fpt_gt_brg_fm_soco_p_comms_s:null,
  comms:null,
  }

  options: EChartsOption;
  intervalLoop: any


  TotalFlow_STL_Arr: any[];
  TotalFlow_SOCO_Arr: any[];
  DateArr: any;
  data:any=[]

   tagArr:any=[
    "fpt_gt_brg_ut",//0
    "fpt_gt_brg_stl_p_press",//1
    "fpt_gt_brg_soco_p_press",//2
    "fpt_gt_brg_stl_p_fr",//3
    "fpt_gt_brg_stl_p_tf",//4
    "fpt_gt_brg_soco_p_fr",//5
    "fpt_gt_brg_soco_p_tf",//6
    "fpt_gt_brg_panel_door",//7
    "fpt_gt_brg_battery",//8
    "fpt_gt_brg_steal_p_press_analog_s",//9
    "fpt_gt_brg_soco_p_press_analog_s",//10
    "fpt_gt_brg_fm_stl_p_comms_s",//11
    "fpt_gt_brg_fm_soco_p_comms_s",//12

  ]
  constructor(public rs: ReportService,public us: UsersService, public ls:ListeningService, public recieve:Common ,private pm:pagePostMethod,private pt: PostTrend) {






  }



  trendNameTwo:any = "Pressure data"
  siteTitle:any = "Gamtoos Bridge"
  range:any;
  options1: EChartsOption;
  options2: EChartsOption;
  tfCollection:any = "FPT_GT_BRG_TFs";
  collection:any = "FPT_GT_BRG_TREND";
  flowTags :any = ["steel_pipe_FR","socoman_pipe_FR","steel_pipe_PRESS","socoman_pipe_PRESS"];
  totalFlowTags: any = ["steel_pipe_TF", "socoman_pipe_TF"]
  isLoading: boolean = true;
  recieveDate($event: any){
    var trend :any;
    this.isLoading = true

    this.range = $event;

    console.log(this.range.value)

    const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end);

    this.pt.getFlowAndTotalFlowCollection(this.tfCollection,this.collection,this.totalFlowTags,this.flowTags,start,end).then((data) => {

      trend = data;

   

      this.options1 = this.recieve.getOptionsBarAndLine2("Reservoir Inlet Flow Rate Ml/d",trend.FlowRateArr[0],"Boreholes Combined Flow Rate Ml/d",trend.FlowRateArr[1],"Reservoir Inlet Total Flow Ml",trend.TotalFlowArr[0],"Boreholes Combined Total Flow m³",trend.TotalFlowArr[1],"Ml","Ml/d")
      this.options2 = this.recieve.getOptionsFor2Line("Bar", "Steel Pipe Pressure",trend.FlowRateArr[2],"Socoman  Pipe Pressure",trend.FlowRateArr[3],)
     
      this.isLoading = false
    })

  }


  ngOnInit(){
    this.intervalLoop = this.pm.findPageData("nmbm_gt_brg_fpt", "FPT_CurrentVals").subscribe((result) => {
      this.data =  result;
      console.log(this.data)
      this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
      this.variable.comms = Common.getLastUpdate(this.variable.fpt_gt_brg_ut)

   })

  }

ngOnDestroy():void{
  if(this.intervalLoop){
    this.intervalLoop.unsubscribe();

  }
}

}
