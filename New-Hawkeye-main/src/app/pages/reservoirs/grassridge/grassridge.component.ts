import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import {Common} from 'src/app/class/common';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
@Component({
  selector: 'app-grassridge',
  templateUrl: './grassridge.component.html',
  styleUrls: ['./grassridge.component.css']
})
export class GrassridgeComponent implements OnInit {

  gr_R_EAST_LVL:any
  res1:any
  gr_R_WEST_LVL:any
  res2:any

  gr_R_INTLET:any
  intervalLoop: any
  gr_R_OUTLET:any

  gr_R_UT:any
  comms: string;
  data:any=[]
  variable :any= {
    gr_R_EAST_LVL:null,
gr_R_WEST_LVL:null,
gr_R_INTLET:null,
gr_R_OUTLET:null,
gr_R_UT:null,
  }
    tagArr:any=[
      "gr_R_EAST_LVL",
"gr_R_WEST_LVL",
"gr_R_INTLET",
"gr_R_OUTLET",
"gr_R_UT",
    ]

  constructor(public recieve:Common,private pm:pagePostMethod, private pt: PostTrend  ) {}

  


  ngOnInit(){


    this.intervalLoop = this.pm.findPageData("nmbm_gr_wtw_r", "R_CurrentVals").subscribe((result) => {
      this.data =  result;
      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)

     this.comms = Common.getLastUpdate(this.variable.gr_R_UT)

    });

  }

  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }

  
  siteTitle:any = "Grassridge";
  trendTag1:any = ["level"]
  collectionName1:any ="BR_GR_EC_RES_LVL"
  levelArr1: any[]=[];

  collectionName2:any ="BR_GR_WC_RES_LVL"
  levelArr2: any[]=[];

  flowCollections:any = "GRASS_RIDGE_RES_FLOW_RATES";
  flowTags = ["gr_R_INLET_FLOWS","gr_R_OUTLET_FLOW"]


  range:any
  options: EChartsOption;
  options2: EChartsOption
  isLoading:boolean = false;

  recieveDate($event: any){
   this.isLoading = true;
   var trend :any;
   this.range = $event;

   const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end)

   this.pt.getLevel(this.collectionName1, this.trendTag1,start,end).then((data) => {
     trend=data
     this.levelArr1 = trend.LevelArr[0];

     this.pt.getLevel(this.collectionName2, this.trendTag1,start,end).then((data) => {
      trend=data

      this.levelArr2 = trend.LevelArr[0];


      this.options = this.recieve.getOptionsFor2Line("%","East Chamber %",this.levelArr1,"West Chamber %",this.levelArr2)

      this.isLoading = false;
     })


    
   })


   this.pt.getLevel(this.flowCollections, this.flowTags,start,end).then((data) => {
    trend = data;

    console.log(trend)

    this.options2 = this.recieve.getOptionsFor2Line("Ml/d","Inlet Flow",trend.LevelArr[0],"Outlet Flow",trend.LevelArr[1])
   })
 }

}
