import { Component, OnInit } from '@angular/core';
import { Common } from 'src/app/class/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportService } from 'src/app/Service-Files/report.service';
import { EChartsOption } from 'echarts';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';

@Component({
  selector: 'app-humansdorpwtw',
  templateUrl: './humansdorpwtw.component.html',
  styleUrls: ['./humansdorpwtw.component.css']
})
export class HumansdorpwtwComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  total_flow_1_array:any
  DateArr:any
  options: EChartsOption;
  variable:any = {
    klm_hup_wtw_ut:null,

    klm_hup_wtw_FR:null,
    klm_hup_wtw_TF:null,
    comms: null,
    }
    total_flow_HD1_array:any;
    data: any=[];
    tagArr:any =[
      "klm_hup_wtw_ut",
      "klm_hup_wtw_FR",
      "klm_hup_wtw_TF",
  ]
  intervalLoop:any
  constructor( public recieve:Common,   public rs: ReportService,private pm:pagePostMethod,private pt: PostTrend) {

    this.isLoading = true;



  }

  ngOnInit() {

    this.pm.findPageData("klm_hup_wtw", "WTW_CurrentVals").subscribe((result) => {
      this.data =  result;
       
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
     this.variable.comms = Common.getLastUpdate(this.variable.klm_hup_wtw_ut)

    });




  }


    ngOnDestroy():void{
      if(this.intervalLoop){
        this.intervalLoop.unsubscribe();

      }
    }
    options1: EChartsOption;
    
  isLoading: boolean = false;
    tfCollection:any = "Humansdrop_wtw_tf";
    collectionName:any ="WTW_HUMANSDORP_FLOW"
    totalFlowTags :any = ["klm_hup_wtw_TF"]
    flowTags :any = ["klm_hup_wtw_FR"]
    siteTitle:unknown = "Humansdorp Inlet"
    recieveDate($event: any){
      var trend :any;
      this.range = $event;
      this.isLoading = true;
      const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end);
  
      this.pt.getFlowAndTotalFlowCollection(this.tfCollection,this.collectionName,this.totalFlowTags,this.flowTags,start,end).then((data) => {
  
        trend = data;
  
         
        this.options1 = Common.getOptionsBarAndLine(this.options1,"Flow Rate l/s",trend.FlowRateArr[0],"Total Flow m³",trend.TotalFlowArr[0]);
        this.isLoading = false;
      })
  
    }
}
