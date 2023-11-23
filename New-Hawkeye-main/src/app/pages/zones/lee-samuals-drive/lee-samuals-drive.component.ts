import { Component, OnInit } from '@angular/core';
import {pageBuilderMethod} from "src/app/Service-Files/pageBuilder/pageBuilder.service";
import { pageBuilder } from 'src/app/class/pageBulder';
import { FormControl, FormGroup } from '@angular/forms';
import { EChartsOption } from 'echarts';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
import { Common } from 'src/app/class/common';
@Component({
  selector: 'app-lee-samuals-drive',
  templateUrl: './lee-samuals-drive.component.html',
  styleUrls: ['./lee-samuals-drive.component.css']
})
export class LeeSamualsDriveComponent implements OnInit {
  options: EChartsOption;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  isLoading: boolean = false;
  variables:any = {}
  siteTitle:any ="Lee Samuals Drive"
  commsTitle:any = "Communication"
  statusTitle:any = "Status";
  TotalFlowArr: any[]=[];
  FlowRateArr: any[] = []
  DateArr: any[]=[];
  variablesMatric:any=[{}]
  testArr:any = [
    "wakeupperiod",
    "lastupdate",
    "battery_status",
    "pressure1",
    "totaliser1",
    "flowrate1",


  ]
  intervalLoop:any
  collectionName:any ="WDNR_LSAM_DMA_FLM01";
  totalFlowTag:any = ["totaliser1"]
  flowRateTag:any = ["flowrate1"]
  constructor(public pbm:pageBuilderMethod,public pb:pageBuilder,private pt: PostTrend, public recieve:Common,) {
    this.pbm.getSiteData("WDNR_LSAM_DMA_FLM01").then((result) => {
      this.variables =  result;



  this.variablesMatric=[{
    label:"Pressure",
    value:this.variables.pressure1
  },
  {
    label:"Flow Rate",
    value:this.variables.flowrate1
  },
  {
    label:"Total Flow",
    value:this.variables.totaliser1
  },]





     console.log(this.variables)
    })

    var trend :any;
    this.pt.getTotalFlowAndFlowRate(this.collectionName, this.totalFlowTag,this.flowRateTag,null,null).then((data) => {

  
      trend = data;

       
       this.TotalFlowArr = trend.TotalFlowArr[0];


      
  
       this.options = Common.getOptionsBarAndLine(this.options, "Flow Rate l/s",  trend.flowRateArr[0], "Total Flow m³", trend.TotalFlowArr[0] )
      this.isLoading = false;
  
    })


  }
  pumpStatus:any = "Running"

  ngOnInit() {

    this.intervalLoop = setInterval(() =>{
      this.pbm.getSiteData("WDNR_LSAM_DMA_FLM01").then((result) => {
        this.variables =  result;


        this.variablesMatric=[{
          label:"Pressure",
          value:this.variables.pressure1
        },
        {
          label:"Flow Rate",
          value:this.variables.flowrate1
        },
        {
          label:"Total Flow",
          value:this.variables.totaliser1
        },]


      })

    },600000)
  }

  onDateFilter(){
    this.isLoading = true;



    const newStart = new Date(this.range.value.start).toISOString().slice(0, 10);
    const newEnd = new Date(this.range.value.end).toISOString().slice(0, 10);

var trend :any;
this.pt.getTotalFlowAndFlowRate(this.collectionName, this.totalFlowTag,this.flowRateTag,newStart,newEnd).then((data) => {

trend = data;






 this.options = Common.getOptionsBarAndLine(this.options, "Flow Rate l/s",  trend.flowRateArr[0], "Total Flow m³", trend.TotalFlowArr[0] )
this.isLoading = false;
})
  }
  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }
}
