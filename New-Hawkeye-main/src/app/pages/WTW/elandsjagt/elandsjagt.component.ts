import { Component, OnInit } from '@angular/core';
import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { EChartsOption } from 'echarts';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
@Component({
  selector: 'app-elandsjagt',
  templateUrl: './elandsjagt.component.html',
  styleUrls: ['./elandsjagt.component.css']
})
export class ElandsjagtComponent implements OnInit {
  variable:any = {
  wtw_elands_ut:null,
  comms: null,
  wtw_elands_FR:null,
  wtw_elands_P:null
  }
  intervalLoop: any
  data: any=[];
       tagArr:any =[
      'wtw_elands_ut',
      'wtw_elands_FR',
      'wtw_elands_P'
     ]
  constructor(public recieve:Common ,private pm:pagePostMethod,private pt: PostTrend) {


  }

  ngOnInit() {

    this.intervalLoop = this.pm.findPageData("nmbm_elands_wtw", "WTW_CurrentVals").subscribe((result) => {
      this.data =  result;
       
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
     this.variable.comms = Common.getLastUpdate(this.variable.wtw_elands_ut)

    });

  }
  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }

  isLoading:any
  collectionName:any ="NMBM_NPP_GW_TREND"
  range:any;
  options1: EChartsOption;
  options2: EChartsOption;
  tfCollection:any = "NPP_TF_Trend";
  totalFlowTags :any = ["totalflow"]
  flowTags :any = ["flowRate","delivery_pressure"]
  siteTitle:unknown = "Elandsjagt"
  options2Name:unknown = "Pressure Data"
  recieveDate($event: any){
    var trend :any;
    this.range = $event;
    this.isLoading = true;
    const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end);

    this.pt.getFlowAndTotalFlowCollection(this.tfCollection,this.collectionName,this.totalFlowTags,this.flowTags,start,end).then((data) => {

      trend = data;

       
      this.options1 = Common.getOptionsBarAndLine(this.options1,"Flow Rate l/s",trend.FlowRateArr[0],"Total Flow kl",trend.TotalFlowArr[0]);
      this.options2 = Common.getOptionsForLine(this.options2, "Pressure",trend.FlowRateArr[1])
      this.isLoading = false;
    })

  }

}
