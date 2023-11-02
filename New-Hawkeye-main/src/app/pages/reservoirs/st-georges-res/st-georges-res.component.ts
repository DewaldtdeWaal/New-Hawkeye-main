import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/Service-Files/report.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { UsersService } from 'src/app/Service-Files/users.service';
import { Common } from 'src/app/class/common';
import { ListeningService } from 'src/app/listening.service';

@Component({
  selector: 'app-st-georges-res',
  templateUrl: './st-georges-res.component.html',
  styleUrls: ['./st-georges-res.component.css']
})
export class StGeorgesResComponent implements OnInit {

  variable:any = {
    st_georges_wtw_ut:null,
    st_georges_wtw_gw_FR:null,
    st_georges_wtw_gw_TF:null,
    st_georges_wtw_emer_hill_FR:null,
    st_georges_wtw_emer_hill_TF:null,

  }
  data:any = []
  tagArr:any =[
    "st_georges_wtw_ut",
    "st_georges_wtw_gw_FR",
    "st_georges_wtw_gw_TF",
    "st_georges_wtw_emer_hill_FR",
    "st_georges_wtw_emer_hill_TF",

  ]

  intervalLoop: any
  constructor(public rs: ReportService,public us: UsersService, public ls:ListeningService,public recieve:Common,private pm:pagePostMethod) {



   }

  ngOnInit() {

    this.intervalLoop = this.pm.findPageData("nmbm_st_georges_wtw", "WTW_CurrentVals").subscribe((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


    this.variable.comms = Common.getLastUpdate(this.variable.st_georges_wtw_ut)
    });

  }
  ngOnDestroy(){
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();
    }
  }
}
