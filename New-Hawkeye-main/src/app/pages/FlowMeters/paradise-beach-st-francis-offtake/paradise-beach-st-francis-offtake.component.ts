import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
import { pageBuilderMethod } from 'src/app/Service-Files/pageBuilder/pageBuilder.service';
import { Common } from 'src/app/class/common';
import { pageBuilder } from 'src/app/class/pageBulder';

@Component({
  selector: 'app-paradise-beach-st-francis-offtake',
  templateUrl: './paradise-beach-st-francis-offtake.component.html',
  styleUrls: ['./paradise-beach-st-francis-offtake.component.css']
})
export class ParadiseBeachStFrancisOfftakeComponent implements OnInit {

  constructor(public pbm:pageBuilderMethod,public pb:pageBuilder,private pt: PostTrend, public recieve:Common, ) {  }
  variablesMatric:any=[{}]
  variables:any = {}
  commsTitle:any = "Communication";
  statusTitle:any = "General"

  siteTitle:any ="Paradise/St Francis"

  ngOnInit() {
  this.intervalLoop =  this.pbm.findPageData("WBLK_KOUG_FMU_BTU01").subscribe((result) => {
      this.variables =  result.variables;

      console.log(result.variables)

      this.variablesMatric=[
        {
          label:"St Francis Offtake Flow Rate",
          value:this.variables.flowrate1 + "  Ml/d"
        },{
        label:"St Francis Offtake Total Flow",
        value:this.variables.flowtotal1+ " m³"
      },
      {
        label:"Paradise Beach Flow Rate",
        value:this.variables.flowrate2 + "  Ml/d"
      },
      {
        label:"Paradise Beach Total Flow",
        value:this.variables.flowtotal2 + " m³"
      },]

    })

    

}

intervalLoop:any

flowTags:any = ["flowrate1","flowrate2"];
totalFlowTags:any=["flowtotal1","flowtotal2"];
totalFlowCollectionName:any ="WBLK_KOUG_FMU_BTU01";


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
 var trend2:any;
 this.range = $event;

 const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end)

 this.pt.getTotalFlowAndFlowRate(this.totalFlowCollectionName, this.totalFlowTags,this.flowTags,start,end).then((data) => {
  trend=data

  
  this.flowtotal1 = trend.TotalFlowArr[0]
  this.flowtotal2 = trend.TotalFlowArr[1]

  this.flowRate1 = trend.flowRateArr[0]
  this.flowRate2 = trend.flowRateArr[1]

  this.options = this.recieve.getOptionsBarAndLine2("St Francis Flow Rate",this.flowRate1,"Paradise Beach Flow Rate",this.flowRate2,"St Francis Total Flow",this.flowtotal1,"Paradise Beach Total Flow",this.flowtotal2,"Ml/d","m³" )

  this.isLoading = false



 })

}
ngOnDestroy():void{
  if(this.intervalLoop){
    this.intervalLoop.unsubscribe();

  }
}
}
