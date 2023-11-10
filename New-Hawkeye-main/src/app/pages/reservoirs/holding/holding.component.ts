import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
import { graafService } from 'src/app/Service-Files/Reservoir/reservoir.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {Common} from 'src/app/class/common';
@Component({
  selector: 'app-holding',
  templateUrl: './holding.component.html',
  styleUrls: ['./holding.component.css']
})
export class HoldingComponent implements OnInit {

  variable :any= {
  hol_r_ut:null,
  hol_r_level:null,
  comms: null,
  hol_r_battery_level: null,
  hol_r_poll_ut: null,
  }


  intervalLoop: any
  data:any=[]

   tagArr:any=[
    "hol_r_ut",//0,
"hol_r_level",
"hol_r_battery_level",
"hol_r_poll_ut"
  ]
  constructor(public recieve:Common ,private pm:pagePostMethod, private pt: PostTrend) {



   }

   
  siteTitle:any = "Holding";
  trendTag:any = ["level"]
  collectionName:any ="HOL_GRAAF_RES_LVL"
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


   ngOnInit() {

    this.intervalLoop = this.pm.findPageData("graaf", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


     this.variable.comms = Common.getLastUpdateBattery(this.variable.hol_r_ut, this.variable.hol_r_poll_ut)
    });


  }
  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }

}
