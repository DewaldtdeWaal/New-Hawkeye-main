import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EChartsOption } from 'echarts';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
import { pageBuilderMethod } from 'src/app/Service-Files/pageBuilder/pageBuilder.service';
import { Common } from 'src/app/class/common';
import { pageBuilder } from 'src/app/class/pageBulder';

@Component({
  selector: 'app-mc-noughtontownshipsouth',
  templateUrl: './mc-noughtontownshipsouth.component.html',
  styleUrls: ['./mc-noughtontownshipsouth.component.css']
})
export class McNoughtontownshipsouthComponent implements OnInit {

  variables:any = {}
  siteTitle:any ="McNoughton Township South"
  commsTitle:any = "Communication"
  statusTitle:any = "Status";
  isLoading:any = false;
  variablesMatric:any=[{}]
  options: EChartsOption;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  collectionName:any ="WDNR_MCNA_DMA_FLM01";
  totalFlowTag:any = ["totaliser1"]
  flowRateTag:any = ["flowrate1"]
  intervalLoop:any
  constructor(public pbm:pageBuilderMethod,public pb:pageBuilder,public recieve:Common,private pt: PostTrend,) {
    this.pbm.getSiteData("WDNR_MCNA_DMA_FLM01").then((result) => {
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

    var trend :any;
    this.pt.getTotalFlowAndFlowRate(this.collectionName, this.totalFlowTag,this.flowRateTag,null,null).then((data) => {

  
      trend = data;

      console.log(trend)


      
  
       this.options = Common.getOptionsBarAndLine(this.options, "Flow Rate l/s",  trend.flowRateArr[0], "Total Flow m³", trend.TotalFlowArr[0] )
      this.isLoading = false;
  
    })
  }

  ngOnInit() {

    this.intervalLoop = setInterval(() =>{
      this.pbm.getSiteData("WDNR_MCNA_DMA_FLM01").then((result) => {
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
