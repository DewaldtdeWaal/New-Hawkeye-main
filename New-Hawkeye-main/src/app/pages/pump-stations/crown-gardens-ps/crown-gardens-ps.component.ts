import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
export interface PeriodicElement {
  alarm: string;
  description: string;
}
@Component({
  selector: 'app-crown-gardens-ps',
  templateUrl: './crown-gardens-ps.component.html',
  styleUrls: ['./crown-gardens-ps.component.css']
})
export class CrownGardensPsComponent implements OnInit {
  intervalLoop: any

ELEMENT_DATA_P1: PeriodicElement[] = [];
ELEMENT_DATA_P2: PeriodicElement[] = [];
ELEMENT_DATA_P3: PeriodicElement[] = [];
ELEMENT_DATA_G: PeriodicElement[] = [];

displayedColumns :string[]= ['alarm', 'description'];

dataSourceP1:any;
dataSourceP2:any;
dataSourceP3:any;
dataSourceG:any;

 visualS :any
 visualT1 :any
 visualT2 :any
 theme:any= localStorage.getItem("theme");
  comms: string;
  data: any=[];

  faultVariable:any={
    cg_G_M_CB_STAT:{
  value: null,
  alarm:"Fault",
  description:"Main Circuit Breaker Fault",
    alarmTrip: 0
    },
    cg_G_SP_FAIL:{
          value: null,
  alarm:"Fault",
  description:"Station Phase Failed",
    alarmTrip: 1
    },
    cg_G_EARTH_FAULT:{
          value: null,
  alarm:"Fault",
  description:"Earth Fault",
    alarmTrip: 1
    },
    cg_G_PS_FLOOD_ALM:{
          value: null,
  alarm:"Fault",
  description:"Pump Station Flood Alarm",
    alarmTrip: 1
    },
    cg_P1_TRIP_STAT:{
          value: null,
  alarm:"Fault",
  description:"Trip Fault",
    alarmTrip: 1
    },
    cg_p1_EX_FAULT_STAT:{
          value: null,
  alarm:"Fault",
  description:"Exterior Fault",
    alarmTrip: 1
    },
    cg_P1_E_STOP_STAT:{
          value: null,
  alarm:"Fault",
  description:"Emergency Stop",
    alarmTrip: 1
    },
    cg_P1_CB_ON_STAT:{
          value: null,
  alarm:"Fault",
  description:"Circuit Breaker On",
    alarmTrip: 0
    },
    cg_P1_LOCKOUT:{
          value: null,
  alarm:"Fault",
  description:"Lockout",
    alarmTrip: 1
    },
    cg_P1_S_U_P:{
          value: null,
  alarm:"Fault",
  description:"Suction Under Pressure",
    alarmTrip: 1
    },
    cg_P1_D_O_P:{
          value: null,
  alarm:"Fault",
  description:"Delivery Under Pressure",
    alarmTrip: 1
    },
    cg_P1_S_P_S:{
          value: null,
  alarm:"Fault",
  description:"Suction Pressure Switch",
    alarmTrip: 1
    },
    cg_P1_D_P_S:{
          value: null,
  alarm:"Fault",
  description:"Delivery Pressure Switch",
    alarmTrip: 1
    },
    cg_P1_B_T:{
          value: null,
  alarm:"Fault",
  description:"Pump 1 Bearing Temperature",
    alarmTrip: 1
    },
    cg_P1_V_C_T:{
          value: null,
  alarm:"Fault",
  description:"Volute Casing Temperature",
    alarmTrip: 1
    },
    cg_P1_M_W_T:{
          value: null,
  alarm:"Fault",
  description:"Motor Winding Temperature",
    alarmTrip: 1
    },
    cg_P2_TRIP_STAT:{
      value: null,
alarm:"Fault",
description:"Trip Fault",
alarmTrip: 1
},
cg_p2_EX_FAULT_STAT:{
      value: null,
alarm:"Fault",
description:"Exterior Fault",
alarmTrip: 1
},
cg_P2_E_STOP_STAT:{
      value: null,
alarm:"Fault",
description:"Emergency Stop",
alarmTrip: 1
},
cg_P2_CB_ON_STAT:{
      value: null,
alarm:"Fault",
description:"Circuit Breaker On",
alarmTrip: 0
},
cg_P2_LOCKOUT:{
      value: null,
alarm:"Fault",
description:"Lockout",
alarmTrip: 1
},
cg_P2_S_U_P:{
      value: null,
alarm:"Fault",
description:"Suction Under Pressure",
alarmTrip: 1
},
cg_P2_D_O_P:{
      value: null,
alarm:"Fault",
description:"Delivery Under Pressure",
alarmTrip: 1
},
cg_P2_S_P_S:{
      value: null,
alarm:"Fault",
description:"Suction Pressure Switch",
alarmTrip: 1
},
cg_P2_D_P_S:{
      value: null,
alarm:"Fault",
description:"Delivery Pressure Switch",
alarmTrip: 1
},
cg_P2_B_T:{
      value: null,
alarm:"Fault",
description:"Pump 1 Bearing Temperature",
alarmTrip: 1
},
cg_P2_V_C_T:{
      value: null,
alarm:"Fault",
description:"Volute Casing Temperature",
alarmTrip: 1
},
cg_P2_M_W_T:{
      value: null,
alarm:"Fault",
description:"Motor Winding Temperature",
alarmTrip: 1
},
cg_P3_TRIP_STAT:{
  value: null,
alarm:"Fault",
description:"Trip Fault",
alarmTrip: 1
},
cg_p3_EX_FAULT_STAT:{
  value: null,
alarm:"Fault",
description:"Exterior Fault",
alarmTrip: 1
},
cg_P3_E_STOP_STAT:{
  value: null,
alarm:"Fault",
description:"Emergency Stop",
alarmTrip: 1
},
cg_P3_CB_ON_STAT:{
  value: null,
alarm:"Fault",
description:"Circuit Breaker On",
alarmTrip: 0
},
cg_P3_LOCKOUT:{
  value: null,
alarm:"Fault",
description:"Lockout",
alarmTrip: 1
},
cg_P3_S_U_P:{
  value: null,
alarm:"Fault",
description:"Suction Under Pressure",
alarmTrip: 1
},
cg_P3_D_O_P:{
  value: null,
alarm:"Fault",
description:"Delivery Under Pressure",
alarmTrip: 1
},
cg_P3_S_P_S:{
  value: null,
alarm:"Fault",
description:"Suction Pressure Switch",
alarmTrip: 1
},
cg_P3_D_P_S:{
  value: null,
alarm:"Fault",
description:"Delivery Pressure Switch",
alarmTrip: 1
},
cg_P3_B_T:{
  value: null,
alarm:"Fault",
description:"Pump 1 Bearing Temperature",
alarmTrip: 1
},
cg_P3_V_C_T:{
  value: null,
alarm:"Fault",
description:"Volute Casing Temperature",
alarmTrip: 1
},
cg_P3_M_W_T:{
  value: null,
alarm:"Fault",
description:"Motor Winding Temperature",
alarmTrip: 1
},
  }

  faultArr:any=[
    "cg_G_M_CB_STAT",
    "cg_G_SP_FAIL",
    "cg_G_EARTH_FAULT",
    "cg_G_PS_FLOOD_ALM",
    "cg_P1_TRIP_STAT",
    "cg_p1_EX_FAULT_STAT",
    "cg_P1_E_STOP_STAT",
    "cg_P1_CB_ON_STAT",
    "cg_P1_LOCKOUT",
    "cg_P1_S_U_P",
    "cg_P1_D_O_P",
    "cg_P1_S_P_S",
    "cg_P1_D_P_S",
    "cg_P1_B_T",
    "cg_P1_V_C_T",
    "cg_P1_M_W_T",
    "cg_P2_TRIP_STAT",
    "cg_p2_EX_FAULT_STAT",
    "cg_P2_E_STOP_STAT",
    "cg_P2_CB_ON_STAT",
    "cg_P2_LOCKOUT",
    "cg_P2_S_U_P",
    "cg_P2_D_O_P",
    "cg_P2_S_P_S",
    "cg_P2_D_P_S",
    "cg_P2_B_T",
    "cg_P2_V_C_T",
    "cg_P2_M_W_T",
    "cg_P3_TRIP_STAT",
    "cg_p3_EX_FAULT_STAT",
    "cg_P3_E_STOP_STAT",
    "cg_P3_CB_ON_STAT",
    "cg_P3_LOCKOUT",
    "cg_P3_S_U_P",
    "cg_P3_D_O_P",
    "cg_P3_S_P_S",
    "cg_P3_D_P_S",
    "cg_P3_B_T",
    "cg_P3_V_C_T",
    "cg_P3_M_W_T",
  ]
  tagArr:any=[
"cg_G_UT",
"cg_G_DEL_PRESS",
"cg_G_SUC_PRESS",
"cg_G_SUMP_BYPASS",
"cg_G_T_BYPASS",
"cg_G_T1_SELECTED",
"cg_G_T2_SELECTED",
"cg_G_SUMP_LVL",
"cg_T1_LVL",
"cg_T1_INLET_F",
"cg_T1_OUTLET_F",
"cg_T2_LVL",
"cg_T2_INLET_F",
"cg_T2_OUTLET_F",
"cg_P1_STAT",
"cg_P1_MODE",
"cg_P1_RH",
"cg_P1_DEL_PRESS",
"cg_P1_SUC_PRESS",
"cg_P1_VIB",
"cg_P1_POWER",
"cg_P2_MODE",
"cg_P2_STAT",
"cg_P2_RH",
"cg_P2_DEL_PRESS",
"cg_P2_SUC_PRESS",
"cg_P2_VIB",
"cg_P2_POWER",
"cg_P3_MODE",
"cg_P3_STAT",
"cg_P3_RH",
"cg_P3_DEL_PRESS",
"cg_P3_SUC_PRESS",
"cg_P3_VIB",
"cg_P3_POWER",
]
    variable:any ={
cg_G_UT:null,
cg_G_DEL_PRESS:null,
cg_G_SUC_PRESS:null,
cg_G_SUMP_BYPASS:null,
cg_G_T_BYPASS:null,
cg_G_T1_SELECTED:null,
cg_G_T2_SELECTED:null,
cg_G_SUMP_LVL:null,
cg_T1_LVL:null,
cg_T1_INLET_F:null,
cg_T1_OUTLET_F:null,
cg_T2_LVL:null,
cg_T2_INLET_F:null,
cg_T2_OUTLET_F:null,
cg_P1_STAT:null,
cg_P1_MODE:null,
cg_P1_RH:null,
cg_P1_DEL_PRESS:null,
cg_P1_SUC_PRESS:null,
cg_P1_VIB:null,
cg_P1_POWER:null,
cg_P2_MODE:null,
cg_P2_STAT:null,
cg_P2_RH:null,
cg_P2_DEL_PRESS:null,
cg_P2_SUC_PRESS:null,
cg_P2_VIB:null,
cg_P2_POWER:null,
cg_P3_MODE:null,
cg_P3_STAT:null,
cg_P3_RH:null,
cg_P3_DEL_PRESS:null,
cg_P3_SUC_PRESS:null,
cg_P3_VIB:null,
cg_P3_POWER:null,
   }
  constructor( private pm:pagePostMethod ) {


    this.pm.findPageData("rw_cg_ps", "PS_CurrentVals").then((result) => {
      this.data =  result;
      console.log(this.data)
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)
      this.comms = Common.getLastUpdate(this.variable.cg_G_UT)

      this.visualS =  100-((this.variable.cg_G_SUMP_LVL/4)*100)
      this.visualT1=100-((this.variable.cg_T1_LVL/6)*100)
      this.visualT2= 100-((this.variable.cg_T2_LVL/6)*100)
      var alarmG: any [] = [this.faultVariable.cg_G_M_CB_STAT,this.faultVariable.cg_G_SP_FAIL,this.faultVariable.cg_G_EARTH_FAULT,this.faultVariable.cg_G_PS_FLOOD_ALM]
      var alarm1: any [] = [this.faultVariable.cg_P1_TRIP_STAT,this.faultVariable.cg_p1_EX_FAULT_STAT,this.faultVariable.cg_P1_E_STOP_STAT,this.faultVariable.cg_P1_CB_ON_STAT,this.faultVariable.cg_P1_LOCKOUT,this.faultVariable.cg_P1_S_U_P,this.faultVariable.cg_P1_D_O_P,this.faultVariable.cg_P1_S_P_S,this.faultVariable.cg_P1_D_P_S,this.faultVariable.cg_P1_B_T,this.faultVariable.cg_P1_V_C_T,this.faultVariable.cg_P1_M_W_T,]
      var alarm2: any [] = [this.faultVariable.cg_P2_TRIP_STAT,this.faultVariable.cg_p2_EX_FAULT_STAT,this.faultVariable.cg_P2_E_STOP_STAT,this.faultVariable.cg_P2_CB_ON_STAT,this.faultVariable.cg_P2_LOCKOUT,this.faultVariable.cg_P2_S_U_P,this.faultVariable.cg_P2_D_O_P,this.faultVariable.cg_P2_S_P_S,this.faultVariable.cg_P2_D_P_S,this.faultVariable.cg_P2_B_T,this.faultVariable.cg_P2_V_C_T,this.faultVariable.cg_P2_M_W_T]
      var alarm3: any [] = [this.faultVariable.cg_P3_TRIP_STAT,this.faultVariable.cg_p3_EX_FAULT_STAT,this.faultVariable.cg_P3_E_STOP_STAT,this.faultVariable.cg_P3_CB_ON_STAT,this.faultVariable.cg_P3_LOCKOUT,this.faultVariable.cg_P3_S_U_P,this.faultVariable.cg_P3_D_O_P,this.faultVariable.cg_P3_S_P_S,this.faultVariable.cg_P3_D_P_S,this.faultVariable.cg_P3_B_T,this.faultVariable.cg_P3_V_C_T,this.faultVariable.cg_P3_M_W_T]


      this.dataSourceG =  new MatTableDataSource(Common.getAlarmValue(alarmG))
      this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
      this.dataSourceP2 = new MatTableDataSource(Common.getAlarmValue(alarm2))
      this.dataSourceP3 = new MatTableDataSource(Common.getAlarmValue(alarm3))
    });

   }

  ngOnInit() {
      this.intervalLoop = setInterval(() =>{
        this.pm.findPageData("rw_cg_ps", "PS_CurrentVals").then((result) => {
          this.data =  result;
          console.log(this.data)
          Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)
          this.comms = Common.getLastUpdate(this.variable.cg_G_UT)

          this.visualS =  100-((this.variable.cg_G_SUMP_LVL/4)*100)
          this.visualT1=100-((this.variable.cg_T1_LVL/6)*100)
          this.visualT2= 100-((this.variable.cg_T2_LVL/6)*100)
          var alarmG: any [] = [this.faultVariable.cg_G_M_CB_STAT,this.faultVariable.cg_G_SP_FAIL,this.faultVariable.cg_G_EARTH_FAULT,this.faultVariable.cg_G_PS_FLOOD_ALM]
          var alarm1: any [] = [this.faultVariable.cg_P1_TRIP_STAT,this.faultVariable.cg_p1_EX_FAULT_STAT,this.faultVariable.cg_P1_E_STOP_STAT,this.faultVariable.cg_P1_CB_ON_STAT,this.faultVariable.cg_P1_LOCKOUT,this.faultVariable.cg_P1_S_U_P,this.faultVariable.cg_P1_D_O_P,this.faultVariable.cg_P1_S_P_S,this.faultVariable.cg_P1_D_P_S,this.faultVariable.cg_P1_B_T,this.faultVariable.cg_P1_V_C_T,this.faultVariable.cg_P1_M_W_T,]
          var alarm2: any [] = [this.faultVariable.cg_P2_TRIP_STAT,this.faultVariable.cg_p2_EX_FAULT_STAT,this.faultVariable.cg_P2_E_STOP_STAT,this.faultVariable.cg_P2_CB_ON_STAT,this.faultVariable.cg_P2_LOCKOUT,this.faultVariable.cg_P2_S_U_P,this.faultVariable.cg_P2_D_O_P,this.faultVariable.cg_P2_S_P_S,this.faultVariable.cg_P2_D_P_S,this.faultVariable.cg_P2_B_T,this.faultVariable.cg_P2_V_C_T,this.faultVariable.cg_P2_M_W_T]
          var alarm3: any [] = [this.faultVariable.cg_P3_TRIP_STAT,this.faultVariable.cg_p3_EX_FAULT_STAT,this.faultVariable.cg_P3_E_STOP_STAT,this.faultVariable.cg_P3_CB_ON_STAT,this.faultVariable.cg_P3_LOCKOUT,this.faultVariable.cg_P3_S_U_P,this.faultVariable.cg_P3_D_O_P,this.faultVariable.cg_P3_S_P_S,this.faultVariable.cg_P3_D_P_S,this.faultVariable.cg_P3_B_T,this.faultVariable.cg_P3_V_C_T,this.faultVariable.cg_P3_M_W_T]


          this.dataSourceG =  new MatTableDataSource(Common.getAlarmValue(alarmG))
          this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
          this.dataSourceP2 = new MatTableDataSource(Common.getAlarmValue(alarm2))
          this.dataSourceP3 = new MatTableDataSource(Common.getAlarmValue(alarm3))

        });
   },60000 )

  }
  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }
}
