import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
import { pageBuilderMethod } from 'src/app/Service-Files/pageBuilder/pageBuilder.service';
import { Common } from 'src/app/class/common';
import { pageBuilder } from 'src/app/class/pageBulder';
import { concat } from 'rxjs';

@Component({
  selector: 'app-kouga-main-line',
  templateUrl: './kouga-main-line.component.html',
  styleUrls: ['./kouga-main-line.component.css']
})
export class KougaMainLineComponent implements OnInit {

  constructor(public pbm:pageBuilderMethod,public pb:pageBuilder,private pt: PostTrend, public recieve:Common, ) {  }
  variablesMatric:any=[{}]
  variablesMatric2:any=[{}]
  variables:any = {}
  variables2:any = {}
  commsTitle:any = "Flow Communication";
  commsTitle2:any = "Pressure Communication";
  statusTitle:any = "General";
  statusTitle2:any = "Pressure Information";

  siteTitle:any ="Kouga Main Line"
  intervalLoop:any 
  intervalLoop2:any
  ngOnInit() {
    this.intervalLoop =  this.pbm.findPageData("WBLK_KOUG_FMU_BTU02").subscribe((result) => {
      this.variables =  result.variables;

      this.variablesMatric=[
        {
          label:"Flow Rate",
          value:this.variables.flowrate1 + "  Ml/d"
        },{
        label:"Total Flow",
        value:this.variables.flowtotal1+ " m³"
      },
      ]
    })


    this.intervalLoop2 =  this.pbm.findPageData("WBLK_KOUG_FMU_BTU03").subscribe((result) => {
      this.variables2 =  result.variables;

    

      this.variablesMatric2=[{
        label:"Pressure",
        value:this.variables2.pressure1 + " bar"
      }]

      this.variablesMatric = this.variablesMatric.concat(this.variablesMatric2)

   
    })

}



flowTags:any = ["flowrate1"];
totalFlowTags:any=["flowtotal1"];
totalFlowCollectionName:any ="WBLK_KOUG_FMU_BTU02";


flowRate1:any = []
flowRate2:any = []

flowtotal1:any = []
flowtotal2:any = []

range:any
options: EChartsOption;
isLoading:boolean = false;

recieveDate($event: any){
 this.isLoading = true;
 var trend :any;
 this.range = $event;

 const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end)

 this.pt.getTotalFlowAndFlowRate(this.totalFlowCollectionName, this.totalFlowTags,this.flowTags,start,end).then((data) => {
  trend=data


  this.options = Common.getOptionsBarAndLine(this.options, "Flow Rate l/s",  trend.flowRateArr[0], "Total Flow m³", trend.TotalFlowArr[0] )
  this.isLoading = false

 })

}
ngOnDestroy():void{
  if(this.intervalLoop){
    this.intervalLoop.unsubscribe();

  }
}
}
