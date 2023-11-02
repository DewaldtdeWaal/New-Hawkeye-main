import { Component, OnInit } from '@angular/core';
import { ListeningService } from 'src/app/listening.service';
import { ReportService } from 'src/app/Service-Files/report.service';
import { UsersService } from 'src/app/Service-Files/users.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { EChartsOption } from 'echarts';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {NooitgedachtRootComponent} from 'src/app/Service-Files/WTW/wtw.service';
import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';


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
  constructor(public rs: ReportService,public us: UsersService, public ls:ListeningService,private nooit:NooitgedachtRootComponent,public recieve:Common,private pm:pagePostMethod  ) {





  }



  ngOnInit(){
    this.intervalLoop = this.pm.findPageData("nmbm_ngt_wtw", "WTW_CurrentVals").subscribe((result) => {
      this.data =  result;
      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)
     this.variable.comms = Common.getLastUpdate(this.variable.wtw_ngt_ut)

    });


  }

  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();

    }
  }



}
