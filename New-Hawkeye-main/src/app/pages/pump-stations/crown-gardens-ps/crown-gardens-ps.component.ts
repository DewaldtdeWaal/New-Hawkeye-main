import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReportService } from 'src/app/Service-Files/report.service';
import { UsersService } from 'src/app/Service-Files/users.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { crownGardensComponent} from 'src/app/Service-Files/Pumpstation/pumpstation.service';
import {Common} from 'src/app/class/common';
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
  cg_G_UT:any
  cg_G_M_CB_STAT:any
  cg_G_SP_FAIL:any
  cg_G_EARTH_FAULT:any
  cg_G_PS_FLOOD_ALM:any
  cg_G_SUMP_BYPASS:any
  cg_G_T_BYPASS:any
  cg_G_T1_SELECTED:any
  cg_G_T2_SELECTED:any
  intervalLoop: any
  cg_P1_STAT:any
  cg_P1_MODE:any
  cg_p1_EX_FAULT_STAT:any
  cg_P1_TRIP_STAT:any
  cg_P1_E_STOP_STAT:any
  cg_P1_CB_ON_STAT:any
  cg_P1_LOCKOUT:any
  cg_P1_S_U_P:any
  cg_P1_D_O_P:any
  cg_P1_S_P_S:any
  cg_P1_D_P_S:any
  cg_P1_B_T:any
  cg_P1_V_C_T:any
  cg_P1_M_W_T:any

  cg_P2_STAT:any
  cg_P2_MODE:any
  cg_p2_EX_FAULT_STAT:any
  cg_P2_TRIP_STAT:any
  cg_P2_E_STOP_STAT:any
  cg_P2_CB_ON_STAT:any
  cg_P2_LOCKOUT:any
  cg_P2_S_U_P:any
  cg_P2_D_O_P:any
  cg_P2_S_P_S:any
  cg_P2_D_P_S:any
  cg_P2_B_T:any
  cg_P2_V_C_T:any
  cg_P2_M_W_T:any

  cg_P3_STAT:any
  cg_P3_MODE:any
  cg_p3_EX_FAULT_STAT:any
  cg_P3_TRIP_STAT:any
  cg_P3_E_STOP_STAT:any
  cg_P3_CB_ON_STAT:any
  cg_P3_LOCKOUT:any
  cg_P3_S_U_P:any
  cg_P3_D_O_P:any
  cg_P3_S_P_S:any
  cg_P3_D_P_S:any
  cg_P3_B_T:any
  cg_P3_V_C_T:any
  cg_P3_M_W_T:any

  cg_G_SUC_PRESS:any
  cg_G_DEL_PRESS:any
  cg_G_SUMP_LVL:any

  cg_T1_LVL:any
  cg_T1_INLET_F:any
  cg_T1_OUTLET_F:any

  cg_T2_LVL:any
  cg_T2_INLET_F:any
  cg_T2_OUTLET_F:any

  cg_P1_SUC_PRESS:any
  cg_P1_DEL_PRESS:any
  cg_P1_VIB:any
  cg_P1_POWER:any
  cg_P1_RH:any

  cg_P2_SUC_PRESS:any
  cg_P2_DEL_PRESS:any
  cg_P2_VIB:any
  cg_P2_POWER:any
  cg_P2_RH:any

  cg_P3_SUC_PRESS:any
  cg_P3_DEL_PRESS:any
  cg_P3_VIB:any
  cg_P3_POWER:any
  cg_P3_RH:any




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
 theme:any;
  comms: string;
  data: any=[];
  constructor( private ws: WebSocketService, private us:UsersService, private chat:crownGardensComponent) {
    this.chat.GetSiteValues()
    .subscribe(rsp => {
       this.data = rsp;
       console.log(this.data);
       this.cg_G_UT = this.data.routingArray[0].cg_G_UT
       this.comms = Common.getLastUpdate(this.cg_G_UT)

       this.cg_G_M_CB_STAT = this.data.routingArray[0].cg_G_M_CB_STAT
       this.cg_G_SP_FAIL = this.data.routingArray[0].cg_G_SP_FAIL
       this.cg_G_EARTH_FAULT = this.data.routingArray[0].cg_G_EARTH_FAULT
       this.cg_G_PS_FLOOD_ALM = this.data.routingArray[0].cg_G_PS_FLOOD_ALM
       this.cg_G_SUMP_BYPASS = this.data.routingArray[0].cg_G_SUMP_BYPASS
       this.cg_G_T_BYPASS = this.data.routingArray[0].cg_G_T_BYPASS
       this.cg_G_T1_SELECTED = this.data.routingArray[0].cg_G_T1_SELECTED
       this.cg_G_T2_SELECTED = this.data.routingArray[0].cg_G_T2_SELECTED
       this.cg_P1_STAT = this.data.routingArray[0].cg_P1_STAT
       this.cg_P1_MODE = this.data.routingArray[0].cg_P1_MODE
       this.cg_p1_EX_FAULT_STAT = this.data.routingArray[0].cg_p1_EX_FAULT_STAT
       this.cg_P1_TRIP_STAT = this.data.routingArray[0].cg_P1_TRIP_STAT
       this.cg_P1_E_STOP_STAT = this.data.routingArray[0].cg_P1_E_STOP_STAT
       this.cg_P1_CB_ON_STAT = this.data.routingArray[0].cg_P1_CB_ON_STAT
       this.cg_P1_LOCKOUT = this.data.routingArray[0].cg_P1_LOCKOUT
       this.cg_P1_S_U_P = this.data.routingArray[0].cg_P1_S_U_P
       this.cg_P1_D_O_P = this.data.routingArray[0].cg_P1_D_O_P
       this.cg_P1_S_P_S = this.data.routingArray[0].cg_P1_S_P_S
       this.cg_P1_D_P_S = this.data.routingArray[0].cg_P1_D_P_S
       this.cg_P1_B_T = this.data.routingArray[0].cg_P1_B_T
       this.cg_P1_V_C_T = this.data.routingArray[0].cg_P1_V_C_T
       this.cg_P1_M_W_T = this.data.routingArray[0].cg_P1_M_W_T
       this.cg_P2_STAT = this.data.routingArray[0].cg_P2_STAT
       this.cg_P2_MODE = this.data.routingArray[0].cg_P2_MODE
       this.cg_p2_EX_FAULT_STAT = this.data.routingArray[0].cg_p2_EX_FAULT_STAT
       this.cg_P2_TRIP_STAT = this.data.routingArray[0].cg_P2_TRIP_STAT
       this.cg_P2_E_STOP_STAT = this.data.routingArray[0].cg_P2_E_STOP_STAT
       this.cg_P2_CB_ON_STAT = this.data.routingArray[0].cg_P2_CB_ON_STAT
       this.cg_P2_LOCKOUT = this.data.routingArray[0].cg_P2_LOCKOUT
       this.cg_P2_S_U_P = this.data.routingArray[0].cg_P2_S_U_P
       this.cg_P2_D_O_P = this.data.routingArray[0].cg_P2_D_O_P
       this.cg_P2_S_P_S = this.data.routingArray[0].cg_P2_S_P_S
       this.cg_P2_D_P_S = this.data.routingArray[0].cg_P2_D_P_S
       this.cg_P2_B_T = this.data.routingArray[0].cg_P2_B_T
       this.cg_P2_V_C_T = this.data.routingArray[0].cg_P2_V_C_T
       this.cg_P2_M_W_T = this.data.routingArray[0].cg_P2_M_W_T
       this.cg_P3_STAT = this.data.routingArray[0].cg_P3_STAT
       this.cg_P3_MODE = this.data.routingArray[0].cg_P3_MODE
       this.cg_p3_EX_FAULT_STAT = this.data.routingArray[0].cg_p3_EX_FAULT_STAT
       this.cg_P3_TRIP_STAT = this.data.routingArray[0].cg_P3_TRIP_STAT
       this.cg_P3_E_STOP_STAT = this.data.routingArray[0].cg_P3_E_STOP_STAT
       this.cg_P3_CB_ON_STAT = this.data.routingArray[0].cg_P3_CB_ON_STAT
       this.cg_P3_LOCKOUT = this.data.routingArray[0].cg_P3_LOCKOUT
       this.cg_P3_S_U_P = this.data.routingArray[0].cg_P3_S_U_P
       this.cg_P3_D_O_P = this.data.routingArray[0].cg_P3_D_O_P
       this.cg_P3_S_P_S = this.data.routingArray[0].cg_P3_S_P_S
       this.cg_P3_D_P_S = this.data.routingArray[0].cg_P3_D_P_S
       this.cg_P3_B_T = this.data.routingArray[0].cg_P3_B_T
       this.cg_P3_V_C_T = this.data.routingArray[0].cg_P3_V_C_T
       this.cg_P3_M_W_T = this.data.routingArray[0].cg_P3_M_W_T
       this.cg_G_SUC_PRESS = this.data.routingArray[0].cg_G_SUC_PRESS
       this.cg_G_DEL_PRESS = this.data.routingArray[0].cg_G_DEL_PRESS
       this.cg_G_SUMP_LVL = this.data.routingArray[0].cg_G_SUMP_LVL
       this.cg_T1_LVL = this.data.routingArray[0].cg_T1_LVL
       this.cg_T1_INLET_F = this.data.routingArray[0].cg_T1_INLET_F
       this.cg_T1_OUTLET_F = this.data.routingArray[0].cg_T1_OUTLET_F
       this.cg_T2_LVL = this.data.routingArray[0].cg_T2_LVL
       this.cg_T2_INLET_F = this.data.routingArray[0].cg_T2_INLET_F
       this.cg_T2_OUTLET_F = this.data.routingArray[0].cg_T2_OUTLET_F
       this.cg_P1_SUC_PRESS = this.data.routingArray[0].cg_P1_SUC_PRESS
       this.cg_P1_DEL_PRESS = this.data.routingArray[0].cg_P1_DEL_PRESS
       this.cg_P1_VIB = this.data.routingArray[0].cg_P1_VIB
       this.cg_P1_POWER = this.data.routingArray[0].cg_P1_POWER
       this.cg_P1_RH = this.data.routingArray[0].cg_P1_RH
       this.cg_P2_SUC_PRESS = this.data.routingArray[0].cg_P2_SUC_PRESS
       this.cg_P2_DEL_PRESS = this.data.routingArray[0].cg_P2_DEL_PRESS
       this.cg_P2_VIB = this.data.routingArray[0].cg_P2_VIB
       this.cg_P2_POWER = this.data.routingArray[0].cg_P2_POWER
       this.cg_P2_RH = this.data.routingArray[0].cg_P2_RH
       this.cg_P3_SUC_PRESS = this.data.routingArray[0].cg_P3_SUC_PRESS
       this.cg_P3_DEL_PRESS = this.data.routingArray[0].cg_P3_DEL_PRESS
       this.cg_P3_VIB = this.data.routingArray[0].cg_P3_VIB
       this.cg_P3_POWER = this.data.routingArray[0].cg_P3_POWER
       this.cg_P3_RH = this.data.routingArray[0].cg_P3_RH


       this.visualS =  100-((this.cg_G_SUMP_LVL/4)*100)
       this.visualT1=100-((this.cg_T1_LVL/6)*100)
        this.visualT2= 100-((this.cg_T2_LVL/6)*100)
    });


    setTimeout(() => {
      var updateTime = this.cg_G_UT
      var updateTimeMS =Date.parse(updateTime)
      var cuurentDateCorrectFormat = Date().slice(4,Date().length-41);
      var  cuurentDateMS =Date.parse(cuurentDateCorrectFormat)
      var dateminus5minMS = cuurentDateMS - 300000

    if(updateTime.length ==0){}
    else{
      if (updateTimeMS>dateminus5minMS)
      { this.comms = "OK" }
      else{ this.comms = "NOT OK"}}
      this.theme = localStorage.getItem("theme");




    var   p1Count=0;
    var p2Count=0;
    var  p3Count=0;
    var  gCount=0;


      if(this.cg_G_M_CB_STAT==0){
       this.ELEMENT_DATA_G[gCount]={  alarm: "Fault", description:"Main Circuit Breaker Fault"}
       gCount++;
      }
       if(this.cg_G_SP_FAIL==1){
         this.ELEMENT_DATA_G[gCount]={  alarm: "Fault", description:"Station Phase Failed"}
         gCount++;
     }

     if(this.cg_G_EARTH_FAULT==1){
       this.ELEMENT_DATA_G[gCount]={  alarm: "Fault", description:"Earth Fault"}
       gCount++;
   }

   if(this.cg_G_PS_FLOOD_ALM==1){
     this.ELEMENT_DATA_G[gCount]={  alarm: "Fault", description:"Pump Station Flood Alarm"}
     gCount++;
 }
 this.dataSourceG  = new MatTableDataSource(this.ELEMENT_DATA_G);


     if(this.cg_P1_TRIP_STAT==1){
       this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Trip Fault"}
       p1Count++;
      }

      if(this.cg_p1_EX_FAULT_STAT==1){
       this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Exterior Fault"}
       p1Count++;
      }

      if(this.cg_P1_E_STOP_STAT==1){
       this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Emergency Stop"}
       p1Count++;
      }

      if(this.cg_P1_CB_ON_STAT==0){
       this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Circuit Breaker On"}
       p1Count++;
      }

      if(this.cg_P1_LOCKOUT==1){
       this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Lockout"}
       p1Count++;
      }

      if(this.cg_P1_S_U_P==1){
       this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Suction Under Pressure"}
       p1Count++;
      }

      if(this.cg_P1_D_O_P==1){
       this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Delivery Under Pressure"}
       p1Count++;
      }

      if(this.cg_P1_S_P_S==1){
       this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Suction Pressure Switch"}
       p1Count++;
      }

      if(this.cg_P1_D_P_S==1){
       this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Delivery Pressure Switch"}
       p1Count++;
      }

      if(this.cg_P1_B_T==1){
       this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Pump 1 Bearing Temperature"}
       p1Count++;
      }

      if(this.cg_P1_V_C_T==1){
       this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Volute Casing Temperature"}
       p1Count++;
      }

      if(this.cg_P1_M_W_T==1){
       this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Motor Winding Temperature"}
       p1Count++;
      }
      this.dataSourceP1  = new MatTableDataSource(this.ELEMENT_DATA_P1);


      if(this.cg_P2_TRIP_STAT==1){
       this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Trip Fault"}
       p2Count++;
      }

      if(this.cg_p2_EX_FAULT_STAT==1){
       this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Exterior Fault"}
       p2Count++;
      }

      if(this.cg_P2_E_STOP_STAT==1){
       this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Emergency Stop"}
       p2Count++;
      }

      if(this.cg_P2_CB_ON_STAT==0){
       this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Circuit Breaker On"}
       p2Count++;
      }

      if(this.cg_P2_LOCKOUT==1){
       this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Lockout"}
       p2Count++;
      }

      if(this.cg_P2_S_U_P==1){
       this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Suction Under Pressure"}
       p2Count++;
      }

      if(this.cg_P2_D_O_P==1){
       this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Delivery Under Pressure"}
       p2Count++;
      }

      if(this.cg_P2_S_P_S==1){
       this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Suction Pressure Switch"}
       p2Count++;
      }

      if(this.cg_P2_D_P_S==1){
       this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Delivery Pressure Switch"}
       p2Count++;
      }

      if(this.cg_P2_B_T==1){
       this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Pump 2 Bearing Temperature"}
       p2Count++;
      }

      if(this.cg_P2_V_C_T==1){
       this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Volute Casing Temperature"}
       p2Count++;
      }

      if(this.cg_P2_M_W_T==1){
       this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Motor Winding Temperature"}
       p2Count++;
      }
      this.dataSourceP2  = new MatTableDataSource(this.ELEMENT_DATA_P2);


      if(this.cg_P3_TRIP_STAT==1){
       this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Trip Fault"}
       p3Count++;
      }

      if(this.cg_p3_EX_FAULT_STAT==1){
       this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Exterior Fault"}
       p3Count++;
      }

      if(this.cg_P3_E_STOP_STAT==1){
       this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Emergency Stop"}
       p3Count++;
      }

      if(this.cg_P3_CB_ON_STAT==0){
       this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Circuit Breaker On"}
       p3Count++;
      }

      if(this.cg_P3_LOCKOUT==1){
       this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Lockout"}
       p3Count++;
      }

      if(this.cg_P3_S_U_P==1){
       this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Suction Under Pressure"}
       p3Count++;
      }

      if(this.cg_P3_D_O_P==1){
       this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Delivery Under Pressure"}
       p3Count++;
      }

      if(this.cg_P3_S_P_S==1){
       this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Suction Pressure Switch"}
       p3Count++;
      }

      if(this.cg_P3_D_P_S==1){
       this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Delivery Pressure Switch"}
       p3Count++;
      }

      if(this.cg_P3_B_T==1){
       this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Pump 3 Bearing Temperature"}
       p3Count++;
      }

      if(this.cg_P3_V_C_T==1){
       this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Volute Casing Temperature"}
       p3Count++;
      }

      if(this.cg_P3_M_W_T==1){
       this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Motor Winding Temperature"}
       p3Count++;
      }
      this.dataSourceP3  = new MatTableDataSource(this.ELEMENT_DATA_P3);


    },1000)

   }
   recieveVals(tagArr: any[]){
    var tagVals:any = []
    for(let i = 0; i<tagArr.length ;i++){
      this.ws.listen(tagArr[i]).subscribe((data:any)=>{
        tagVals[i] = data[tagArr[i]];
      })
    }
    return tagVals
  }
  ngOnInit() {
    var p1Count=0;
    var p2Count=0;
    var p3Count=0;
    var gCount=0;

    var tagVals:any =[]
    var tagArr=[
      "cg_g_ut",//0
      "cg_g_m_cb_stat",//1
      "cg_g_sp_fail",//2
      "cg_g_earth_fault",//3
      "cg_g_ps_flood_alm",//4
      "cg_g_sump_bypass",//5
      "cg_g_t_bypass",//6
      "cg_g_t1_selected",//7
      "cg_g_t2_selected",//8
      "cg_p1_stat",//9
      "cg_p1_mode",//10
      "cg_p1_ex_fault_stat",//11
      "cg_p1_trip_stat",//12
      "cg_p1_e_stop_stat",//13
      "cg_p1_cb_on_stat",//14
      "cg_p1_lockout",//15
      "cg_p1_s_u_p",//16
      "cg_p1_d_o_p",//17
      "cg_p1_s_p_s",//18
      "cg_p1_d_p_s",//19
      "cg_p1_b_t",//20
      "cg_p1_v_c_t",//21
      "cg_p1_m_w_t",//22
      "cg_p2_stat",//23
      "cg_p2_mode",//24
      "cg_p2_ex_fault_stat",//25
      "cg_p2_trip_stat",//26
      "cg_p2_e_stop_stat",//27
      "cg_p2_cb_on_stat",//28
      "cg_p2_lockout",//29
      "cg_p2_s_u_p",//30
      "cg_p2_d_o_p",//31
      "cg_p2_s_p_s",//32
      "cg_p2_d_p_s",//33
      "cg_p2_b_t",//34
      "cg_p2_v_c_t",//35
      "cg_p2_m_w_t",//36
      "cg_p3_stat",//37
      "cg_p3_mode",//38
      "cg_p3_ex_fault_stat",//39
      "cg_p3_trip_stat",//40
      "cg_p3_e_stop_stat",//41
      "cg_p3_cb_on_stat",//42
      "cg_p3_lockout",//43
      "cg_p3_s_u_p",//44
      "cg_p3_d_o_p",//45
      "cg_p3_s_p_s",//46
      "cg_p3_d_p_s",//47
      "cg_p3_b_t",//48
      "cg_p3_v_c_t",//49
      "cg_p3_m_w_t",//50
      "cg_g_suc_press",//51
      "cg_g_del_press",//52
      "cg_g_sump_lvl",//53
      "cg_t1_lvl",//54
      "cg_t1_inlet_f",//55
      "cg_t1_outlet_f",//56
      "cg_t2_lvl",//57
      "cg_t2_inlet_f",//58
      "cg_t2_outlet_f",//59
      "cg_p1_suc_press",//60
      "cg_p1_del_press",//61
      "cg_p1_vib",//62
      "cg_p1_power",//63
      "cg_p1_rh",//64
      "cg_p2_suc_press",//65
      "cg_p2_del_press",//66
      "cg_p2_vib",//67
      "cg_p2_power",//68
      "cg_p2_rh",//69
      "cg_p3_suc_press",//70
      "cg_p3_del_press",//71
      "cg_p3_vib",//72
      "cg_p3_power",//73
      "cg_p3_rh",//74
    ]
    tagVals = this.recieveVals(tagArr);
    console.log(tagArr)
      var updateTemp:any;
      this.intervalLoop = setInterval(() =>{
        updateTemp = tagVals[0];
        if(updateTemp !==undefined){
          this.cg_G_UT=tagVals[0]
          this.comms = Common.getLastUpdate(this.cg_G_UT)
          this.cg_G_M_CB_STAT=tagVals[1]
          this.cg_G_SP_FAIL=tagVals[2]
          this.cg_G_EARTH_FAULT=tagVals[3]
          this.cg_G_PS_FLOOD_ALM=tagVals[4]
          this.cg_G_SUMP_BYPASS=tagVals[5]
          this.cg_G_T_BYPASS=tagVals[6]
          this.cg_G_T1_SELECTED=tagVals[7]
          this.cg_G_T2_SELECTED=tagVals[8]
          this.cg_P1_STAT=tagVals[9]
          this.cg_P1_MODE=tagVals[10]
          this.cg_p1_EX_FAULT_STAT=tagVals[11]
          this.cg_P1_TRIP_STAT=tagVals[12]
          this.cg_P1_E_STOP_STAT=tagVals[13]
          this.cg_P1_CB_ON_STAT=tagVals[14]
          this.cg_P1_LOCKOUT=tagVals[15]
          this.cg_P1_S_U_P=tagVals[16]
          this.cg_P1_D_O_P=tagVals[17]
          this.cg_P1_S_P_S=tagVals[18]
          this.cg_P1_D_P_S=tagVals[19]
          this.cg_P1_B_T=tagVals[20]
          this.cg_P1_V_C_T=tagVals[21]
          this.cg_P1_M_W_T=tagVals[22]
          this.cg_P2_STAT=tagVals[23]
          this.cg_P2_MODE=tagVals[24]
          this.cg_p2_EX_FAULT_STAT=tagVals[25]
          this.cg_P2_TRIP_STAT=tagVals[26]
          this.cg_P2_E_STOP_STAT=tagVals[27]
          this.cg_P2_CB_ON_STAT=tagVals[28]
          this.cg_P2_LOCKOUT=tagVals[29]
          this.cg_P2_S_U_P=tagVals[30]
          this.cg_P2_D_O_P=tagVals[31]
          this.cg_P2_S_P_S=tagVals[32]
          this.cg_P2_D_P_S=tagVals[33]
          this.cg_P2_B_T=tagVals[34]
          this.cg_P2_V_C_T=tagVals[35]
          this.cg_P2_M_W_T=tagVals[36]
          this.cg_P3_STAT=tagVals[37]
          this.cg_P3_MODE=tagVals[38]
          this.cg_p3_EX_FAULT_STAT=tagVals[39]
          this.cg_P3_TRIP_STAT=tagVals[40]
          this.cg_P3_E_STOP_STAT=tagVals[41]
          this.cg_P3_CB_ON_STAT=tagVals[42]
          this.cg_P3_LOCKOUT=tagVals[43]
          this.cg_P3_S_U_P=tagVals[44]
          this.cg_P3_D_O_P=tagVals[45]
          this.cg_P3_S_P_S=tagVals[46]
          this.cg_P3_D_P_S=tagVals[47]
          this.cg_P3_B_T=tagVals[48]
          this.cg_P3_V_C_T=tagVals[49]
          this.cg_P3_M_W_T=tagVals[50]
          this.cg_G_SUC_PRESS=tagVals[51]
          this.cg_G_DEL_PRESS=tagVals[52]
          this.cg_G_SUMP_LVL=tagVals[53]
          this.cg_T1_LVL=tagVals[54]
          this.cg_T1_INLET_F=tagVals[55]
          this.cg_T1_OUTLET_F=tagVals[56]
          this.cg_T2_LVL=tagVals[57]
          this.cg_T2_INLET_F=tagVals[58]
          this.cg_T2_OUTLET_F=tagVals[59]
          this.cg_P1_SUC_PRESS=tagVals[60]
          this.cg_P1_DEL_PRESS=tagVals[61]
          this.cg_P1_VIB=tagVals[62]
          this.cg_P1_POWER=tagVals[63]
          this.cg_P1_RH=tagVals[64]
          this.cg_P2_SUC_PRESS=tagVals[65]
          this.cg_P2_DEL_PRESS=tagVals[66]
          this.cg_P2_VIB=tagVals[67]
          this.cg_P2_POWER=tagVals[68]
          this.cg_P2_RH=tagVals[69]
          this.cg_P3_SUC_PRESS=tagVals[70]
          this.cg_P3_DEL_PRESS=tagVals[71]
          this.cg_P3_VIB=tagVals[72]
          this.cg_P3_POWER=tagVals[73]
          this.cg_P3_RH=tagVals[74]
        }






     p1Count=0;
     p2Count=0;
     p3Count=0;
     gCount=0;


     if(this.cg_G_M_CB_STAT==0){
      this.ELEMENT_DATA_G[gCount]={  alarm: "Fault", description:"Main Circuit Breaker Fault"}
      gCount++;
     }
      if(this.cg_G_SP_FAIL==1){
        this.ELEMENT_DATA_G[gCount]={  alarm: "Fault", description:"Station Phase Failed"}
        gCount++;
    }

    if(this.cg_G_EARTH_FAULT==1){
      this.ELEMENT_DATA_G[gCount]={  alarm: "Fault", description:"Earth Fault"}
      gCount++;
  }

  if(this.cg_G_PS_FLOOD_ALM==1){
    this.ELEMENT_DATA_G[gCount]={  alarm: "Fault", description:"Pump Station Flood Alarm"}
    gCount++;
}
this.dataSourceG  = new MatTableDataSource(this.ELEMENT_DATA_G);


    if(this.cg_P1_TRIP_STAT==1){
      this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Trip Fault"}
      p1Count++;
     }

     if(this.cg_p1_EX_FAULT_STAT==1){
      this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Exterior Fault"}
      p1Count++;
     }

     if(this.cg_P1_E_STOP_STAT==1){
      this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Emergency Stop"}
      p1Count++;
     }

     if(this.cg_P1_CB_ON_STAT==0){
      this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Circuit Breaker On"}
      p1Count++;
     }

     if(this.cg_P1_LOCKOUT==1){
      this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Lockout"}
      p1Count++;
     }

     if(this.cg_P1_S_U_P==1){
      this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Suction Under Pressure"}
      p1Count++;
     }

     if(this.cg_P1_D_O_P==1){
      this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Delivery Under Pressure"}
      p1Count++;
     }

     if(this.cg_P1_S_P_S==1){
      this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Suction Pressure Switch"}
      p1Count++;
     }

     if(this.cg_P1_D_P_S==1){
      this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Delivery Pressure Switch"}
      p1Count++;
     }

     if(this.cg_P1_B_T==1){
      this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Pump 1 Bearing Temperature"}
      p1Count++;
     }

     if(this.cg_P1_V_C_T==1){
      this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Volute Casing Temperature"}
      p1Count++;
     }

     if(this.cg_P1_M_W_T==1){
      this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Motor Winding Temperature"}
      p1Count++;
     }
     this.dataSourceP1  = new MatTableDataSource(this.ELEMENT_DATA_P1);


     if(this.cg_P2_TRIP_STAT==1){
      this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Trip Fault"}
      p2Count++;
     }

     if(this.cg_p2_EX_FAULT_STAT==1){
      this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Exterior Fault"}
      p2Count++;
     }

     if(this.cg_P2_E_STOP_STAT==1){
      this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Emergency Stop"}
      p2Count++;
     }

     if(this.cg_P2_CB_ON_STAT==0){
      this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Circuit Breaker On"}
      p2Count++;
     }

     if(this.cg_P2_LOCKOUT==1){
      this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Lockout"}
      p2Count++;
     }

     if(this.cg_P2_S_U_P==1){
      this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Suction Under Pressure"}
      p2Count++;
     }

     if(this.cg_P2_D_O_P==1){
      this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Delivery Under Pressure"}
      p2Count++;
     }

     if(this.cg_P2_S_P_S==1){
      this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Suction Pressure Switch"}
      p2Count++;
     }

     if(this.cg_P2_D_P_S==1){
      this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Delivery Pressure Switch"}
      p2Count++;
     }

     if(this.cg_P2_B_T==1){
      this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Pump 2 Bearing Temperature"}
      p2Count++;
     }

     if(this.cg_P2_V_C_T==1){
      this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Volute Casing Temperature"}
      p2Count++;
     }

     if(this.cg_P2_M_W_T==1){
      this.ELEMENT_DATA_P2[p2Count]={  alarm: "Fault", description:"Motor Winding Temperature"}
      p2Count++;
     }
     this.dataSourceP2  = new MatTableDataSource(this.ELEMENT_DATA_P2);


     if(this.cg_P3_TRIP_STAT==1){
      this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Trip Fault"}
      p3Count++;
     }

     if(this.cg_p3_EX_FAULT_STAT==1){
      this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Exterior Fault"}
      p3Count++;
     }

     if(this.cg_P3_E_STOP_STAT==1){
      this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Emergency Stop"}
      p3Count++;
     }

     if(this.cg_P3_CB_ON_STAT==0){
      this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Circuit Breaker On"}
      p3Count++;
     }

     if(this.cg_P3_LOCKOUT==1){
      this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Lockout"}
      p3Count++;
     }

     if(this.cg_P3_S_U_P==1){
      this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Suction Under Pressure"}
      p3Count++;
     }

     if(this.cg_P3_D_O_P==1){
      this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Delivery Under Pressure"}
      p3Count++;
     }

     if(this.cg_P3_S_P_S==1){
      this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Suction Pressure Switch"}
      p3Count++;
     }

     if(this.cg_P3_D_P_S==1){
      this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Delivery Pressure Switch"}
      p3Count++;
     }

     if(this.cg_P3_B_T==1){
      this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Pump 3 Bearing Temperature"}
      p3Count++;
     }

     if(this.cg_P3_V_C_T==1){
      this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Volute Casing Temperature"}
      p3Count++;
     }

     if(this.cg_P3_M_W_T==1){
      this.ELEMENT_DATA_P3[p3Count]={  alarm: "Fault", description:"Motor Winding Temperature"}
      p3Count++;
     }
     this.dataSourceP3  = new MatTableDataSource(this.ELEMENT_DATA_P3);


   },60000 )




  }
  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }
}
