import { Component, OnInit } from '@angular/core';
import { ListeningService } from 'src/app/listening.service';
import {MatTableDataSource} from '@angular/material/table';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { UsersService } from 'src/app/Service-Files/users.service';
import { Common } from 'src/app/class/common';
export interface PeriodicElement {
  alarm: string;
  description: string;
}

@Component({
  selector: 'app-vervoerd-ps',
  templateUrl: './verwoerd-ps.component.html',
  styleUrls: ['./verwoerd-ps.component.css']
})
export class VerwoerdPsComponent implements OnInit {

vw_ut:any

intervalLoop: any
vw_g_sa_fault:any;
vw_g_charger_fault:any;
vw_g_sps_fault:any;
vw_g_dps_fault:any;
vw_g_fm_fault:any;
vw_g_pm_fault:any;
vw_p1_vsd_comms_fault:any;
vw_p1_vsd_fault:any;
vw_p1_estop_fault:any;
vw_p1_no_flow_fault:any;
vw_g_vm_fault:any;
vw_p1_startup_fault:any;
vw_p1_stat:any;
vw_p1_mode:any;
vw_p1_low_suc_press_fault:any;
vw_p1_high_del_press_fault:any;
vw_p1_sp:any;
vw_p1_dp:any;
vw_p1_current:any;
vw_p1_speed:any;
vw_p1_power:any;
vw_p1_rh:any;
vw_p1_fr:any;
vw_p1_tf:any;

ELEMENT_DATA_P1: PeriodicElement[] = [];
ELEMENT_DATA_G: PeriodicElement[] = [];

displayedColumns :string[]= ['alarm', 'description'];

dataSourceP1:any  = new MatTableDataSource(this.ELEMENT_DATA_P1);
dataSourceG:any = new MatTableDataSource(this.ELEMENT_DATA_G);
theme: any;
  comms: string;



constructor(private ls:ListeningService, private ws: WebSocketService, private us:UsersService) {
  setInterval(()=>{
    this.theme = localStorage.getItem("theme");
},1000)


}


recieveVals(tagArr: any[]){
  var tagVals:any = []
  for(let i = 0; i<tagArr.length ;i++){
    this.ws.nmbm_listen(tagArr[i]).subscribe((data:any)=>{
      tagVals[i] = data[tagArr[i]];
    })
  }
  return tagVals
}

  ngOnInit(){


    var p1Count=0;

    var gCount=0;


    var tagVals:any =[]
    var tagArr=[
      "vw_ut",
      "vw_g_sa_fault",
      "vw_g_charger_fault",
      "vw_g_sps_fault",
      "vw_g_dps_fault",
      "vw_g_fm_fault",
      "vw_g_pm_fault",
      "vw_p1_vsd_comms_fault",
      "vw_p1_vsd_fault",
      "vw_p1_estop_fault",
      "vw_p1_no_flow_fault",
      "vw_g_vm_fault",
      "vw_p1_startup_fault",
      "vw_p1_stat",
      "vw_p1_mode",
      "vw_p1_low_suc_press_fault",
      "vw_p1_high_del_press_fault",
      "vw_p1_sp",
      "vw_p1_dp",
      "vw_p1_current",
      "vw_p1_speed",
      "vw_p1_power",
      "vw_p1_rh",
      "vw_p1_fr",
      "vw_p1_tf",

    ]
    tagVals = this.recieveVals(tagArr);
    console.log(tagArr)
      var updateTemp:any;
      this.intervalLoop = setInterval(() =>{
        updateTemp = tagVals[0];
        if(updateTemp !==undefined){
          this.vw_ut = tagVals[0]
          this.comms = Common.getLastUpdate(this.vw_ut)
          this.vw_g_sa_fault = tagVals[1]
          this.vw_g_charger_fault = tagVals[2]
          this.vw_g_sps_fault = tagVals[3]
          this.vw_g_dps_fault = tagVals[4]
          this.vw_g_fm_fault = tagVals[5]
          this.vw_g_pm_fault = tagVals[6]
          this.vw_p1_vsd_comms_fault = tagVals[7]
          this.vw_p1_vsd_fault = tagVals[8]
          this.vw_p1_estop_fault = tagVals[9]
          this.vw_p1_no_flow_fault = tagVals[10]
          this.vw_g_vm_fault = tagVals[11]
          this.vw_p1_startup_fault = tagVals[12]
          this.vw_p1_stat = tagVals[13]
          this.vw_p1_mode = tagVals[14]
          this.vw_p1_low_suc_press_fault = tagVals[15]
          this.vw_p1_high_del_press_fault = tagVals[16]
          this.vw_p1_sp = tagVals[17]
          this.vw_p1_dp = tagVals[18]
          this.vw_p1_current = tagVals[19]
          this.vw_p1_speed = tagVals[20]
          this.vw_p1_power = tagVals[21]
          this.vw_p1_rh = tagVals[22]
          this.vw_p1_fr = tagVals[23]
          this.vw_p1_tf = tagVals[24]

        }




        p1Count=0;
         gCount=0;



         if(this.vw_g_sa_fault=='0'){
          this.ELEMENT_DATA_G[gCount]={  alarm: "Fault", description:"Surge Arrester"}
          gCount++;
        }


        if(this.vw_g_charger_fault=='0'){
          this.ELEMENT_DATA_G[gCount]={  alarm: "Fault", description:"Charger Fault"}
          gCount++;
        }

        if(this.vw_g_sps_fault=='0'){
          this.ELEMENT_DATA_G[gCount]={  alarm: "Fault", description:"Suction Pressure Sensor"}
          gCount++;
        }


        if(this.vw_g_dps_fault=='0'){
          this.ELEMENT_DATA_G[gCount]={  alarm: "Fault", description:"Delivery Pressure Sensor"}
          gCount++;
        }

        if(this.vw_g_fm_fault=='0'){
          this.ELEMENT_DATA_G[gCount]={  alarm: "Fault", description:"Flow Meter"}
          gCount++;
        }

        if(this.vw_g_pm_fault=='0'){
          this.ELEMENT_DATA_G[gCount]={  alarm: "Fault", description:"Power Meter"}
          gCount++;
        }

        if(this.vw_g_vm_fault=='0'){
          this.ELEMENT_DATA_G[gCount]={  alarm: "Fault", description:"Voltage Monitor"}
          gCount++;
        }

        this.dataSourceG  = new MatTableDataSource(this.ELEMENT_DATA_G);

        if(this.vw_p1_vsd_comms_fault=='0'){
          this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"VSD comms"}
          p1Count++;
        }

        if(this.vw_p1_vsd_fault=='0'){
          this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"VSD"}
          p1Count++;
        }

        if(this.vw_p1_estop_fault=='0'){
          this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Emergency Stop"}
          p1Count++;
        }

        if(this.vw_p1_no_flow_fault=='0'){
          this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"No Flow"}
          p1Count++;
        }

        if(this.vw_p1_startup_fault=='0'){
          this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Startup Fault"}
          p1Count++;
        }


        if(this.vw_p1_low_suc_press_fault=='0'){
          this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"Low Suction Pressure"}
          p1Count++;
        }

        if(this.vw_p1_high_del_press_fault=='0'){
          this.ELEMENT_DATA_P1[p1Count]={  alarm: "Fault", description:"High Delivery Pressure"}
          p1Count++;
        }
        this.dataSourceP1  = new MatTableDataSource(this.ELEMENT_DATA_P1);

       }, 60000 )



  }
  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }


}
