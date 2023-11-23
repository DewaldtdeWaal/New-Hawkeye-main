import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
export interface PeriodicElement {
  alarm: string;
  description: string;
}

@Component({
  selector: 'app-nmu-effluent-ps',
  templateUrl: './nmu-effluent-ps.component.html',
  styleUrls: ['./nmu-effluent-ps.component.css']
})


export class NmuEffluentPsComponent implements OnInit {
  variable:any = {
    nmu_eff_ps_ut:null,
    nmu_eff_ps_flood_alarm:null,
    nmu_eff_ps_fr:null,
    nmu_eff_ps_tnf:null,
    nmu_eff_ps_del_press:null,
    nmu_eff_ps_dam_lvl:null,
    nmu_eff_p1_status:null,
    nmu_eff_p1_mode:null,
    nmu_eff_p1_rh:null,
    nmu_eff_p1_speed:null,
    nmu_eff_p2_status:null,
    nmu_eff_p2_mode:null,
    nmu_eff_p2_rh:null,
    nmu_eff_p2_speed:null,
    nmu_eff_p3_status:null,
    nmu_eff_p3_mode:null,
    nmu_eff_p3_rh:null,
    nmu_eff_p3_speed:null,
    nmu_eff_p4_status:null,
    nmu_eff_p4_mode:null,
    nmu_eff_p4_rh:null,
    nmu_eff_p4_speed:null,
    comms:null
  }
    intervalLoop: any

    ELEMENT_DATA_P1: PeriodicElement[] = [];
    ELEMENT_DATA_P2: PeriodicElement[] = [];
    ELEMENT_DATA_P3: PeriodicElement[] = [];
    ELEMENT_DATA_P4: PeriodicElement[] = [];

    displayedColumns :string[]= ['alarm', 'description'];

    dataSourceP1:any  = new MatTableDataSource(this.ELEMENT_DATA_P1);
    dataSourceP2:any = new MatTableDataSource(this.ELEMENT_DATA_P2);
    dataSourceP3:any = new MatTableDataSource(this.ELEMENT_DATA_P3);
    dataSourceP4:any = new MatTableDataSource(this.ELEMENT_DATA_P4);

    theme:any= localStorage.getItem("theme");
  data: any=[];
  faultVariable:any={
  nmu_eff_p1_fault: {
    value: null,
  alarm:"Fault",
  description:"General Fault",
    alarmTrip: 1
  },
  nmu_eff_p2_fault: {
    value: null,
  alarm:"Fault",
  description:"General Fault",
    alarmTrip: 1
  },
  nmu_eff_p3_fault: {
    value: null,
  alarm:"Fault",
  description:"General Fault",
    alarmTrip: 1
  },
  nmu_eff_p4_fault:{
    value: null,
  alarm:"Fault",
  description:"General Fault",
    alarmTrip: 1
  }
}

   tagArr:any=[
    "nmu_eff_ps_ut",//0
    "nmu_eff_ps_flood_alarm",//1
    "nmu_eff_ps_fr",//2
    "nmu_eff_ps_tnf",//3
    "nmu_eff_ps_del_press",//4
    "nmu_eff_ps_dam_lvl",//5
    "nmu_eff_p1_status",//7
    "nmu_eff_p1_mode",//8
    "nmu_eff_p1_rh",//9
    "nmu_eff_p1_speed",//10
    "nmu_eff_p2_status",//12
    "nmu_eff_p2_mode",//13
    "nmu_eff_p2_rh",//14
    "nmu_eff_p2_speed",//15
    "nmu_eff_p3_status",//17
    "nmu_eff_p3_mode",//18
    "nmu_eff_p3_rh",//19
    "nmu_eff_p3_speed",//20
    "nmu_eff_p4_status",//22
    "nmu_eff_p4_mode",//23
    "nmu_eff_p4_rh",//24
    "nmu_eff_p4_speed",//25
  ]

  faultArr:any=[
    "nmu_eff_p1_fault",//6
    "nmu_eff_p2_fault",//11
    "nmu_eff_p3_fault",//16
    "nmu_eff_p4_fault",//21
  ]

    constructor(public recieve:Common, private pm:pagePostMethod ) {



    }

  ngOnInit() {
    this.intervalLoop = this.pm.findPageData("nmbm_nmu_eff_ps", "PS_CurrentVals").subscribe((result) => {
      this.data =  result;

       
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)

     this.variable.comms = Common.getLastUpdate(this.variable.nmu_eff_ps_ut)
     var alarm1: any [] = [this.faultVariable.nmu_eff_p1_fault]
     var alarm2: any [] = [this.faultVariable.nmu_eff_p2_fault]
     var alarm3: any [] = [this.faultVariable.nmu_eff_p3_fault]
     var alarm4: any [] = [this.faultVariable.nmu_eff_p4_fault]

   this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
   this.dataSourceP2 = new MatTableDataSource(Common.getAlarmValue(alarm2))
   this.dataSourceP3 = new MatTableDataSource(Common.getAlarmValue(alarm3))
   this.dataSourceP4 = new MatTableDataSource(Common.getAlarmValue(alarm4))
    });
  }

  ngOnDestroy():void{
    if(this.intervalLoop){
      this.intervalLoop.unsubscribe();
    }
  }

}
