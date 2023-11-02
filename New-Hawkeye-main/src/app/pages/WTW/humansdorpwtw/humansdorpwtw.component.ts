import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {HumansdorpComponent} from 'src/app/Service-Files/WTW/wtw.service';
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
  collectionName: any = "Humansdrop_wtw_tf"
  trendTag: any = ["klm_hup_wtw_TF"]
  ngOnInit() {

    this.pm.findPageData("klm_hup_wtw", "WTW_CurrentVals").subscribe((result) => {
      this.data =  result;
      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
     this.variable.comms = Common.getLastUpdate(this.variable.klm_hup_wtw_ut)

    });


    var trend: any = {};
    this.pt.getPostTrend(this.collectionName, this.trendTag,null,null).then((data) => {
      trend=data
      this.total_flow_1_array =  trend.TotalFlowArr[0];

      this.DateArr = trend.DateArr;



  this.options = Common.getOptions(this.options,this.DateArr,"Total Flow m³","Total Flow",this.total_flow_1_array)

  this.isLoading = false;
    }
    )

  }

  isLoading: boolean = false;
  onDateFilter(){

    this.isLoading = true;

    const newStart = new Date(this.range.value.start).toISOString().slice(0, 10);
    const newEnd = new Date(this.range.value.end).toISOString().slice(0, 10);

    var trend :any;

    this.pt.getPostTrend(this.collectionName, this.trendTag,newStart,newEnd).then((data) => {
    trend=data

    this.total_flow_1_array =  trend.TotalFlowArr[0];
    this.DateArr = trend.DateArr;


    this.options = Common.getOptions(this.options,this.DateArr,"Total Flow m³","HD1 Total Flow",this.total_flow_1_array);
    this.isLoading = false;
    })


    }
    ngOnDestroy():void{
      if(this.intervalLoop){
        this.intervalLoop.unsubscribe();

      }
    }

}
