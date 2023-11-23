import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {GreenBushesService} from 'src/app/Service-Files/Reservoir/reservoir.service';
import { ReportService } from 'src/app/Service-Files/report.service';
import { EChartsOption } from 'echarts';
import { FormControl, FormGroup } from '@angular/forms';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
@Component({
  selector: 'app-greenbushes',
  templateUrl: './greenbushes.component.html',
  styleUrls: ['./greenbushes.component.css']
})
export class GreenbushesComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
 

  DateArr: unknown;

    intervalLoop: any

  comms: string;
  data:any=[]
  TotalFlow_GB_FRR_Arr: any[];
  TotalFlow_GB_FRF_Arr: any[];

  variable :any= {

    gb_R_FR:null,
    gb_R_FRF:null,
    gb_R_FRR:null,
    gb_R_SURGE_ARRESTOR:null,
    gb_R_CHARGER_STATUS:null,
    gb_R_DOOR:null,
    gb_R_UT:null,
    gb_R_LVL:null,


  }

  tagArr:any=[
    "gb_R_FR",
    "gb_R_FRF",
    "gb_R_FRR",
    "gb_R_SURGE_ARRESTOR",
    "gb_R_CHARGER_STATUS",
    "gb_R_DOOR",
    "gb_R_UT",
    "gb_R_LVL",

  ]
  constructor( public rs: ReportService,public recieve:Common,private pm:pagePostMethod,private pt: PostTrend, ) {

    this.isLoading = true;

    this.intervalLoop = this.pm.findPageData("nmbm_gb_r", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

       
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


    this.comms = Common.getLastUpdate(this.variable.gb_R_UT)
    });

   }
   
   totalFlowTags:any =["gb_R_FRR","gb_R_FRF"]
   flowTags:unknown = ["gb_R_FR","level"] 
   tfCollection:any = "BR_GB_RES_LVL_TF"
   collection:any = "BR_GB_RES_LVL"
   siteTitle:any="Greenbushes"
   isLoading: boolean = true;
   options1: EChartsOption;
   options2: EChartsOption;
   
  recieveDate($event: any){
    var trend :any;
    this.range = $event;
 
    const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end)
 
    this.pt.getFlowAndTotalFlowCollection(this.tfCollection,this.collection,this.totalFlowTags,this.flowTags,start,end).then((data) => {
      trend=data

   this.options1 = this.recieve.getOneLineTwoBarOptions("Ml","Ml/d","Flow Rate Ml/d", trend.FlowRateArr[0],"Total Flow Forward Ml", trend.TotalFlowArr[0],"Total Flow Reverse Ml", trend.TotalFlowArr[1])
 
   this.options2 = Common.getOptionsForLine(this.options2,"Level %", trend.FlowRateArr[1])


    this.isLoading = false;
 
  })


}
 

  ngOnInit() {
      }

      ngOnDestroy():void{
        if(this.intervalLoop){
          this.intervalLoop.unsubscribe();

        }
      }

  }






