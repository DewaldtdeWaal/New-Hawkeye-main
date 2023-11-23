import { Component, OnInit } from '@angular/core';
import {graafService} from 'src/app/Service-Files/Reservoir/reservoir.service';
import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { EChartsOption } from 'echarts';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
@Component({
  selector: 'app-bergendal',
  templateUrl: './bergendal.component.html',
  styleUrls: ['./bergendal.component.css']
})
export class BergendalComponent implements OnInit {

  variable :any= {
 bergen_r_ut: null,
 bergen_r_level: null,
 bergen_r_battery_level: null,
 bergen_r_poll_ut: null,
  comms: null,
  }
  intervalLoop: any
  data:any=[]

tagArr:any=[
"bergen_r_ut",//0,
"bergen_r_level",
"bergen_r_battery_level",//
"bergen_r_poll_ut",
    ]

    options: EChartsOption;



    isLoading:boolean = false;

    siteTitle:any = "Bergendal";
    trendTag:any = ["bergen_r_level"]
    collectionName:any ="GRAAF_BERGEN_RES"
    levelArr: any[]=[];
    range:any
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
   constructor(public recieve:Common, private pm:pagePostMethod,private pt: PostTrend ) { }




  ngOnInit() {
    this.intervalLoop = this.pm.findPageData("graaf", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

       
           this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
        this.variable.comms = Common.getLastUpdateBattery(this.variable.bergen_r_ut, this.variable.bergen_r_poll_ut)
    });
  }
  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }
}
