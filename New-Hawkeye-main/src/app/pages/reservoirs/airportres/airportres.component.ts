import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

import { Common } from 'src/app/class/common';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';

@Component({
  selector: 'app-airportres',
  templateUrl: './airportres.component.html',
  styleUrls: ['./airportres.component.css']
})
export class AirportresComponent implements OnInit {

  variable :any= {
    air_prt_R_comms_UT: null,
    air_prt_R_lvl: null,
    air_prt_R_battery_unit_UT: null,
    air_prt_R_battery_lvl: null,
     comms: null,
     }


   tagArr:any=[
   "air_prt_R_comms_UT",//0,
   "air_prt_R_lvl",
   "air_prt_R_battery_unit_UT",//
   "air_prt_R_battery_lvl",
       ]

       siteTitle:any = "Airport"


       intervalLoop: any
       data:any=[]
       pageVariable:any
     constructor(public recieve:Common, private pm:pagePostMethod,private pt: PostTrend ) { }
     range:any

     DateArr: any[]=[];
     levelArr: any[]=[];
     options: EChartsOption;

     isLoading:boolean = false;
     recieveDate($event: any){
      this.isLoading = true;
      var trend :any;
      this.range = $event;
      var start;
      var end

      console.log()


      if(this.range.value.start != null){
         start = new Date(this.range.value.start).toISOString().slice(0, 10);
      }
      else{
         start = null;
      }

      if (this.range.value.end != null){
         end =  new Date(this.range.value.end).toISOString().slice(0, 10);
      }
      else{
        end = null
      }



   

      this.pt.getLevel(this.collectionName, this.trendTag,start,end).then((data) => {
        trend=data

        this.levelArr = trend.LevelArr[0];
        console.log(this.levelArr)


        this.options = Common.getOptionsForLine(this.options,"Level %",this.levelArr)
        this.isLoading = false;
      })

      
    }

    trendTag:any = ["air_prt_R_lvl"]
collectionName:any ="AIR_PRT_LVL"


   ngOnInit() {

  
    this.intervalLoop = this.pm.findPageData("air_prt", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
    this.variable.comms = Common.getLastUpdateBattery(this.variable.air_prt_R_comms_UT, this.variable.air_prt_R_battery_unit_UT);





    });

  }


  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();
    }
  }
}
