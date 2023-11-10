import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
import { ReportService } from 'src/app/Service-Files/report.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { UsersService } from 'src/app/Service-Files/users.service';
import { Common } from 'src/app/class/common';
import { ListeningService } from 'src/app/listening.service';

@Component({
  selector: 'app-st-georges-res',
  templateUrl: './st-georges-res.component.html',
  styleUrls: ['./st-georges-res.component.css']
})
export class StGeorgesResComponent implements OnInit {

  variable:any = {
    st_georges_wtw_ut:null,
    st_georges_wtw_gw_FR:null,
    st_georges_wtw_gw_TF:null,
    st_georges_wtw_emer_hill_FR:null,
    st_georges_wtw_emer_hill_TF:null,

  }
  data:any = []
  tagArr:any =[
    "st_georges_wtw_ut",
    "st_georges_wtw_gw_FR",
    "st_georges_wtw_gw_TF",
    "st_georges_wtw_emer_hill_FR",
    "st_georges_wtw_emer_hill_TF",

  ]

  intervalLoop: any
  constructor(public rs: ReportService,public us: UsersService, public ls:ListeningService,public recieve:Common,private pm:pagePostMethod, private pt: PostTrend ) {



   }

  ngOnInit() {

    this.intervalLoop = this.pm.findPageData("nmbm_st_georges_wtw", "WTW_CurrentVals").subscribe((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


    this.variable.comms = Common.getLastUpdate(this.variable.st_georges_wtw_ut)
    });

  }


  siteTitle:any = "St Georges";


  flowTags:any = ["st_georges_wtw_gw_FR","st_georges_wtw_emer_hill_FR"];
  totalFlowTags:any=["st_georges_wtw_gw_TF","st_georges_wtw_emer_hill_TF"];
  totalFlowCollectionName:any ="WTW_ST_GEORGE_TREND_TF";
  flowCollectionName:any = "WTW_ST_GEORGE_TREND";

  st_georges_wtw_gw_TF_arr:any = []
  st_georges_wtw_emer_hill_TF_arr:any = []

  st_georges_wtw_gw_FR:any = []
  st_georges_wtw_emer_hill_FR:any = []

  range:any
  options: EChartsOption;
  isLoading:boolean = false;

  recieveDate($event: any){
   this.isLoading = true;
   var trend :any;
   var trend2:any;
   this.range = $event;

   const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end)

   this.pt.getLevel(this.totalFlowCollectionName, this.totalFlowTags,start,end).then((data) => {
    trend=data


    this.st_georges_wtw_gw_TF_arr= trend.LevelArr[0]
    this.st_georges_wtw_emer_hill_TF_arr= trend.LevelArr[1]

    this.pt.getLevel(this.flowCollectionName, this.flowTags,start,end).then((data) => {
      trend2 = data;

      this.st_georges_wtw_gw_FR = trend2.LevelArr[0]
      this.st_georges_wtw_emer_hill_FR= trend2.LevelArr[1]


     this.options = this.recieve.getOptionsBarAndLine2("Borehole Flow Rate",this.st_georges_wtw_gw_FR,"Emerald Flow Rate",this.st_georges_wtw_emer_hill_FR,"Borehole Total Flow",this.st_georges_wtw_gw_TF_arr,"Emerald Total Flow",this.st_georges_wtw_emer_hill_TF_arr,"Ml/d","m³" )
     this.isLoading = false;

    })



   })

 }
  ngOnDestroy(){
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();
    }
  }
}
