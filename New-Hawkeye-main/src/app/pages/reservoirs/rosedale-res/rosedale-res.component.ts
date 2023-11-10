import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import {Common} from 'src/app/class/common';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
@Component({
  selector: 'app-rosedale-res',
  templateUrl: './rosedale-res.component.html',
  styleUrls: ['./rosedale-res.component.css']
})
export class RosedaleResComponent implements OnInit {
  comms: string;
  data: any=[];
   intervalLoop: any

   tagArr:any=[
    "rd_r_lvl",
"rd_r_ut"
   ]
   variable:any ={
    rd_r_lvl:null,
rd_r_ut:null,
   }

  constructor(public recieve:Common,private pm:pagePostMethod, private pt: PostTrend ) {




   }







  ngOnInit() {


    this.intervalLoop = this.pm.findPageData("nmbm_rd_r", "R_CurrentVals").subscribe((result) => {
      this.data =  result;
      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)

     this.comms = Common.getLastUpdate(this.variable.rd_r_ut)

    });
  }

  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }

  siteTitle:any = "Rosedale";
  trendTag:any = ["level"]
  collectionName:any ="BR_RD_RES_LVL"
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
