import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/Service-Files/report.service';
import { EChartsOption } from 'echarts';
import {Common} from 'src/app/class/common';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
import { pageBuilderMethod } from 'src/app/Service-Files/pageBuilder/pageBuilder.service';
@Component({
  selector: 'app-humansdorp-offtake',
  templateUrl: './humansdorp-offtake.component.html',
  styleUrls: ['./humansdorp-offtake.component.css']
})
export class HumansdorpOfftakeComponent implements OnInit {
  siteTitle:any = "Humansdorp Off-Take"

  commsTitle:string = "Communication";
  statusTitle:string = "General";
  variablesMatric:any =[{}]
data:any=[]
  intervalLoop:any;
  options: EChartsOption;

 TotalFlowArr: any[]=[];
 DateArr: any[]=[];

  tagArr:any=[
  "humansdorp_off_take_battery_level",
  "humansdorp_off_take_ut",
  "humansdorp_off_take_pressure",
  "humansdorp_off_TF",
  "humansdorp_off_take_last_seen"

]
variables:any
  constructor(public rs: ReportService, public recieve:Common,public pbm:pageBuilderMethod,private pt: PostTrend ) {}


  collectionName: any = "WBLK_KOUG_FMU_BTU04"  
  trendTag: any = ["humansdorp_off_TF"]
  isLoading: boolean = false;
  ngOnInit() {
    this.intervalLoop =  this.pbm.findPageData(this.collectionName).subscribe((result) => {
      this.variables =  result.variables;

      console.log(this.variables)

      this.variablesMatric =[{
        label:"Pressure",
        value:this.variables.pressure1 + " bar"
      },
      {
        label:"Flow Rate",
        value:this.variables.flowrate1 + " Ml/d"
      },
      {
        label:"Total Flow",
        value:this.variables.flowtotal1 + " m³"
      },]


    })



    
  }

  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }


  flowTags:any = ["flowrate1"];
totalFlowTags:any=["flowtotal1"];
totalFlowCollectionName:any ="WBLK_KOUG_FMU_BTU04";


flowRate1:any = []
flowRate2:any = []

flowtotal1:any = []
flowtotal2:any = []

range:any


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


}
