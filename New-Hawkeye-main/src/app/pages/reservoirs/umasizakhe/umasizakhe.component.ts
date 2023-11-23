import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import {Common} from 'src/app/class/common';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
@Component({
  selector: 'app-umasizakhe',
  templateUrl: './umasizakhe.component.html',
  styleUrls: ['./umasizakhe.component.css']
})
export class UmasizakheComponent implements OnInit {
  variable :any= {
   uma_r_ut:null,
   uma_r_level:null,
   uma_r_battery_level:null,
   uma_r_poll_ut:null,
  comms: null,
  }
  intervalLoop: any
  data:any=[]
   tagArr:any=[
    "uma_r_ut",//0,
"uma_r_level",
"uma_r_battery_level",//
"uma_r_poll_ut",
  ]
  constructor(public recieve:Common ,private pm:pagePostMethod, private pt: PostTrend ) {








   }



  ngOnInit() {

    this.intervalLoop = this.pm.findPageData("graaf", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

       
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


    this.variable.comms = Common.getLastUpdateBattery(this.variable.uma_r_ut, this.variable.uma_r_poll_ut)
    });


  }
  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }

  siteTitle:any = "Umasizakhe";
  trendTag:any = ["uma_r_level"]
  collectionName:any ="GRAAF_UMA_RES"
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
