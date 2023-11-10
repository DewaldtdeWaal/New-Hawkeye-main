import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EChartsOption } from 'echarts';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
import { pageBuilderMethod } from 'src/app/Service-Files/pageBuilder/pageBuilder.service';
import { Common } from 'src/app/class/common';
import { pageBuilder } from 'src/app/class/pageBulder';

@Component({
  selector: 'app-rosedale',
  templateUrl: './rosedale.component.html',
  styleUrls: ['./rosedale.component.css']
})
export class RosedaleComponent implements OnInit {
  isLoading:any = false;
  options: EChartsOption;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  variablesMatric:any=[{}]

  constructor(public pbm:pageBuilderMethod,public pb:pageBuilder,public recieve:Common,private pt: PostTrend,) {
    this.pbm.getSiteData("WDNR_ROSE_RES_OUT01").then((result) => {
      this.variables =  result;


      this.variablesMatric=[
      {
        label:"Flow Rate",
        value:this.variables.flowrate1
      },
      {
        label:"Total Flow",
        value:this.variables.totaliser1
      },]
    })

    var trend :any;
this.pt.getTotalFlowAndFlowRate(this.collectionName, this.totalFlowTag,this.flowRateTag,null,null).then((data) => {

trend = data;






 this.options = Common.getOptionsBarAndLine(this.options, "Flow Rate l/s",  trend.flowRateArr[0], "Total Flow m³", trend.TotalFlowArr[0] )
this.isLoading = false;
})

   }
  variables:any = {}
  siteTitle:any ="Rosedale Reservoir"
  commsTitle:any = "Communication"
  statusTitle:any = "Status";
  intervalLoop:any
  collectionName:any ="WDNR_ROSE_RES_OUT01";
  totalFlowTag:any = ["totaliser1"]
  flowRateTag:any = ["flowrate1"]

  ngOnInit() {


    this.intervalLoop = setInterval(() =>{
    this.pbm.getSiteData("WDNR_ROSE_RES_OUT01").then((result) => {
      this.variables =  result;


      this.variablesMatric=[
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
  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
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
}
