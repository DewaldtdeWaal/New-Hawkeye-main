import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {graafService} from 'src/app/Service-Files/Reservoir/reservoir.service';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { EChartsOption } from 'echarts';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
@Component({
  selector: 'app-kroonvale',
  templateUrl: './kroonvale.component.html',
  styleUrls: ['./kroonvale.component.css']
})
export class KroonvaleComponent implements OnInit {

  variable :any= {
   kroon_r_ut:null,
   kroon_r_level:null,
   kroon_r_battery_level:null,
   kroon_r_poll_ut:null,
  comms: null,
  }
  intervalLoop: any
  data:any=[]

  tagArr:any=[
    "kroon_r_ut",//0,
"kroon_r_level",
"kroon_r_battery_level",//
"kroon_r_poll_ut",
  ]


  siteTitle:any = "Kroonvale";
  trendTag:any = ["kroon_r_level"]
  collectionName:any ="GRAAF_KROON_RES"
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

 
  constructor(public recieve:Common,private pm:pagePostMethod, private pt: PostTrend ) {


    this.intervalLoop = this.pm.findPageData("graaf", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

       
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
     this.variable.comms = Common.getLastUpdate(this.variable.kroon_r_ut)
    });


  }
  ngOnInit() {




    // this.intervalLoop = setInterval(() => {

    //   this.pm.findPageData("graaf", "R_CurrentVals").subscribe((result) => {
    //     this.data =  result;

    //      
    //    this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
    //    this.variable.comms = Common.getLastUpdate(this.variable.kroon_r_ut)
    //   });

    //   }, 60000);

  }
  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }
}
