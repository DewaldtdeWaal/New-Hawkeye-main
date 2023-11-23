import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { Common } from 'src/app/class/common';
@Component({
  selector: 'app-malibar',
  templateUrl: './malibar.component.html',
  styleUrls: ['./malibar.component.css']
})
export class MalibarComponent implements OnInit {

  variable :any= {
    mali_ut:null,
    mali_lvl:null,
    comms:null
    }

    intervalLoop: any
    tagArr:any =[

      "mali_ut",
      "mali_lvl"

    ]
    data: any=[];

  constructor(public recieve:Common,private pm:pagePostMethod, private pt: PostTrend) {



  }

  ngOnInit() {

    this.intervalLoop = this.pm.findPageData("nmbm_mali_r", "R_CurrentVals").subscribe((result) => {
      this.data =  result;

       
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


    this.variable.comms = Common.getLastUpdate(this.variable.mali_ut)
    });


  }

  siteTitle:any = "Malabar";
  trendTag:any = ["mali_lvl"]
  collectionName:any ="NMBM_MALI_R_DB"
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

  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }

}
