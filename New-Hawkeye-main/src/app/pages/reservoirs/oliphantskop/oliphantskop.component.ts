import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {OliphantskopService}from 'src/app/Service-Files/Reservoir/reservoir.service';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { EChartsOption } from 'echarts';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
@Component({
  selector: 'app-oliphantskop',
  templateUrl: './oliphantskop.component.html',
  styleUrls: ['./oliphantskop.component.css']
})
export class OliphantskopComponent implements OnInit {



  variable :any= {
    oli_ut:null,
    oli_lvl:null,
    batteryUnitUpdate:null,
    comms:null
  }

  tagArr:any =[
    "oli_ut",
    "oli_lvl",
    "batteryUnitUpdate",

  ]


   intervalLoop: any


  data: any=[];

  constructor(public recieve:Common,private pm:pagePostMethod, private pt: PostTrend ) {







   }


   reservoirTitle:any ="Reservoir"


  ngOnInit() {




    this.intervalLoop = this.pm.findPageData("nmbm_olip_r", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


    this.variable.comms = Common.getLastUpdate(this.variable.oli_ut)
    });






  }
  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }

  siteTitle:any = "Olifantskop";
  trendTag:any = ["level"]
  collectionName:any ="OLI_LVL_TREND"
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
