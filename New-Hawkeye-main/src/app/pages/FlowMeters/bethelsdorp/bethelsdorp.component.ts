import { Component, Injectable, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { UsersService } from 'src/app/Service-Files/users.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportService } from 'src/app/Service-Files/report.service';

import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { PostTrend } from 'src/app/Service-Files/PageTrend/pagePost.service';
import { pageBuilderMethod } from 'src/app/Service-Files/pageBuilder/pageBuilder.service';

@Component({
  selector: 'app-bethelsdorp',
  templateUrl: './bethelsdorp.component.html',
  styleUrls: ['./bethelsdorp.component.css']
})

@Injectable({ providedIn: "root"})
export class BethelsdorpComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  isLoading: boolean = false;
  variable:any = {
  beth_ut:null,
  beth_totalflow:null,
  beth_flowrate:null,
  beth_pressure:null,
  beth_battery_status:null,
  comms: null,
  }

   tagArr:any=[
    "beth_totalflow", //0
    "beth_flowrate", //1
    "beth_pressure", //2
    "beth_battery_status", //3
    "beth_ut", //4

  ]

  options: EChartsOption;
  TotalFlow_BETH_Arr:any[];
  DateArr: any;
  theme: any = localStorage.getItem("theme");
  data:any=[]
  intervalLoop: any;
  constructor(public rs: ReportService, public us: UsersService, public recieve:Common,public pbm:pageBuilderMethod,private pt: PostTrend, ) {}
   commsTitle:any = "Communication"
   collectionName: any = "WDNR_BETH_FMU_BTU01"
   trendTag: any = ["totalFlow"]
  ngOnInit() {


    this.intervalLoop =   this.pbm.findPageData(this.collectionName).subscribe((result) => {
      this.variable =  result.variables;

   
 
    })

    }


    ngOnDestroy():void{
      if(this.intervalLoop){
        this.intervalLoop.unsubscribe();

      }
    }

    siteTitle:any = "Bethelsdorp"
    options1: EChartsOption;
    options2: EChartsOption
    totalFlowTag:any = ["flowtotal1"]
    flowRateTag:any = ["flowrate1","pressure1"]
    recieveDate($event: any){
      this.isLoading = true
      var trend :any;
      this.range = $event;
     
      const {start, end} = Common.getStartEnd(this.range.value.start,this.range.value.end)

      var trend :any;
      this.pt.getTotalFlowAndFlowRate(this.collectionName, this.totalFlowTag,this.flowRateTag,start,end).then((data) => {
      
      trend = data;
      
      console.log(trend.TotalFlowArr[0])
       this.options1 = Common.getOptionsBarAndLine(this.options, "Flow Rate l/s",  trend.flowRateArr[0], "Total Flow m³", trend.TotalFlowArr[0] )

       this.options2 = Common.getOptionsForLine(this.options2,"Pressure Bar",trend.flowRateArr[1])
       this.isLoading = false
      })

    }
  }
