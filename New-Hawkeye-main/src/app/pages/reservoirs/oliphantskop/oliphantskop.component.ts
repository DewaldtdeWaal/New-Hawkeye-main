import { Component, OnInit } from '@angular/core';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { EChartsOption } from 'echarts';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
import { pageBuilderMethod } from 'src/app/Service-Files/pageBuilder/pageBuilder.service';

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

  constructor(public recieve:Common,private pm:pagePostMethod, private pt: PostTrend,public pbm:pageBuilderMethod ) {







   }


   reservoirTitle:any ="Reservoir"
   commsTitle:any = "Communication"

  ngOnInit() {




    this.intervalLoop =   this.pbm.findPageData(this.collectionName).subscribe((result) => {
      this.variable =  result.variables;

      
    });






  }
  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }

  siteTitle:any = "Olifantskop";
  trendTag:any = ["level1"]
  collectionName:any ="WBLK_OLIF_RES_BTU01"
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
