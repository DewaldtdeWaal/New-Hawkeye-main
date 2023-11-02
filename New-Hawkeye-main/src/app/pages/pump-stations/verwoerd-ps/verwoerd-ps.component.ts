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





  }




}
