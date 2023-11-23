import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import {Common} from 'src/app/class/common';
@Component({
  selector: 'app-damcamp',
  templateUrl: './damcamp.component.html',
  styleUrls: ['./damcamp.component.css']
})
export class DamcampComponent implements OnInit {

  variable :any= {
  damp_r_ut:null,
  damp_r_level:null,
  comms: null,
  }
  intervalLoop: any
  data:any=[]

     tagArr:any=[
    "damp_r_ut",//0,
      "damp_r_level",

  ]


  siteTitle:any = "Damcamp";
  trendTag:any = ["level"]
  collectionName:any ="DAMP_GRAAF_RES_LVL"
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

  constructor(public recieve:Common ,private pm:pagePostMethod, private pt: PostTrend) {

    this.intervalLoop = this.pm.findPageData("graaf", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

       
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


    this.variable.comms = Common.getLastUpdate(this.variable.damp_r_ut)
    });



   }


   ngOnInit() {




  }
  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }
}
