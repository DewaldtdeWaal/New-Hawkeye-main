import { Component, OnInit } from '@angular/core';
import { ListeningService } from 'src/app/listening.service';
import { ReportService } from 'src/app/Service-Files/report.service';
import { UsersService } from 'src/app/Service-Files/users.service';
import { EChartsOption } from 'echarts';
import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';


@Component({
  selector: 'app-nooitgedacht',
  templateUrl: './nooitgedacht.component.html',
  styleUrls: ['./nooitgedacht.component.css']
})
export class NooitgedachtComponent implements OnInit {




  variable:any = {
  wtw_ngt_ut:null,
  wtw_ngt_low_lift_fr:null,
  wtw_ngt_high_lift_fr:null,
  comms:null,
  }
  intervalLoop: any

  data:any = []

   tagArr:any =[
    "wtw_ngt_ut",//0
      "wtw_ngt_low_lift_fr",//1
      "wtw_ngt_high_lift_fr",//2
   ]
  constructor(public rs: ReportService,public us: UsersService, public ls:ListeningService,public recieve:Common,private pm:pagePostMethod,private pt: PostTrend  ) {





  }



  ngOnInit(){
    this.intervalLoop = this.pm.findPageData("nmbm_ngt_wtw", "WTW_CurrentVals").subscribe((result) => {
      this.data =  result;
       
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
     this.variable.comms = Common.getLastUpdate(this.variable.wtw_ngt_ut)

    });


  }

  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();
    }
  }

  range:any;
  siteTitle:any = "Nooitgedacht";
  options: EChartsOption;
  isLoading:boolean;
  collectionName:any ="WTW_NGT_FM_TREND"
  levelArr1: any[]=[];
  levelArr2: any[]=[];
trendTag:any =["low_level_flow_rate","high_level_flow_rate"]
  recieveDate($event: any){
    this.isLoading = true;
    var trend :any;
    this.range = $event;
 
    const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end)

    this.pt.getLevel(this.collectionName, this.trendTag,start,end).then((data) => {
      trend=data

      this.options = this.recieve.getOptionsForLine2("Ml/d","Low Lift Flow Meter",trend.LevelArr[0],"High Lift Flow Meter",trend.LevelArr[1]);

      this.isLoading = false;
    })

  }


}
