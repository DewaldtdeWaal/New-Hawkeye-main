import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import {Common} from 'src/app/class/common';
@Component({
  selector: 'app-tinroof',
  templateUrl: './tinroof.component.html',
  styleUrls: ['./tinroof.component.css']
})
export class TinroofComponent implements OnInit {


  variable :any= {
  tin_r_ut:null,
  tin_r_level:null,
  comms: null,
  tin_r_battery_level:null,
  tin_r_poll_ut: null,

  }

   tagArr:any=[
    "tin_r_ut",//0,
"tin_r_level",
"tin_r_battery_level",
"tin_r_poll_ut"

  ]

  intervalLoop: any
  data:any=[]
  constructor(public recieve:Common,private pm:pagePostMethod, private pt: PostTrend ) {




   }

   ngOnInit() {
    this.intervalLoop = this.pm.findPageData("graaf", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


    this.variable.comms = Common.getLastUpdateBattery(this.variable.tin_r_ut, this.variable.tin_r_poll_ut)
    });

  }

  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }

  siteTitle:any = "Tin Roof";
  trendTag:any = ["level"]
  collectionName:any ="TIN_GRAAF_RES_LVL"
  levelArr: any[]=[];
  range:any
  options: EChartsOption;
  isLoading:boolean = false;

  recieveDate($event: any){
   this.isLoading = true;
   var trend :any;
   this.range = $event;

   const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end)

   this.pt.getLevel(this.collectionName, this.trendTag,start,end).then((data) => {
     trend=data

     this.levelArr = trend.LevelArr[0];

     this.options = Common.getOptionsForLine(this.options,"Level %",this.levelArr)
     this.isLoading = false;
   })
 }


}
