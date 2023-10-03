import { Component, OnInit, ViewChild } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { Subscription } from 'rxjs';


export interface PeriodicElement {
  name: string;
  level: number;
  graph: number;
}


@Component({
  selector: 'app-demo-res-trend',
  templateUrl: './demo-res-trend.component.html',
  styleUrls: ['./demo-res-trend.component.css']
})


export class DemoResTrendComponent implements OnInit{
  nmb_cgk_r_reservoir_level:any =localStorage.getItem("nmb_cgk_r_reservoir_level")
  gb_RL :any =localStorage.getItem("gb_rl");
  vs_RL: any =localStorage.getItem("vs_rl");
  bh_RL:any =localStorage.getItem("bh_rl");
  hb_RL:any =localStorage.getItem("hb_rl");
  lh_R_OVER_LVL:any=localStorage.getItem("lh_R_OVER_LVL");
  tc_RL:any=localStorage.getItem("tc_rl");
  che_RL: any =localStorage.getItem("che_r_lvl");
  che_REL: any=localStorage.getItem("che_r_lvl_East");
  cht_nc_RL:any =localStorage.getItem("cht_nc_rl");
  cht_sc_RL:any =localStorage.getItem("cht_sc_rl");
  cht_oh_RL:any =localStorage.getItem("cht_oh_rl");
  vrh_sc_RL:any =localStorage.getItem("vrh_sc_rl");
  vrh_del_RL:any =localStorage.getItem("vrh_del_rl");
  gr_east_RL:any=localStorage.getItem("gr_east_rl");
  gr_west_RL:any=localStorage.getItem("gr_west_rl");
  sm_r_lvl:any=localStorage.getItem("sm_r_lvl");
  filterValue: any="";

  ELEMENT_DATA: PeriodicElement[] = [];

    displayedColumns :string[]= ['name', 'level', 'graph'];
    dataSource:any;

    public authListenerSubs!: Subscription;
    userSites:any[]

 @ViewChild(MatSort) sort: MatSort;

  constructor(private webSocketService: WebSocketService, private authService: AuthService) {


    this.userSites = this.authService.getUserSites();

    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    var count= 0
    for (var i = 0; i < this.userSites.length; i++){

      switch (this.userSites[i]) {

        case "NMB_CGK_R":
        this.ELEMENT_DATA[count]= { name: 'Coegakop', level:this.nmb_cgk_r_reservoir_level, graph:this.nmb_cgk_r_reservoir_level}
        count++
        break;
        case "NMB_VS_R":
          this.ELEMENT_DATA[count]={ name: 'Van Stadens', level: this.vs_RL, graph:this.vs_RL };
    count++
          break;
        case "NMB_BHB_R":
          this.ELEMENT_DATA[count]={ name: 'Blue Horizon Bay', level: this.bh_RL, graph:this.bh_RL };
     count++
          break;
        case "NMB_HB_R":
          this.ELEMENT_DATA[count]={ name: 'Heatherbank', level: this.hb_RL, graph:this.hb_RL };
     count++
           break;
         case "NMB_LH_R":
          this.ELEMENT_DATA[count]={ name: 'Lovemore Heights', level: this.lh_R_OVER_LVL, graph:this.lh_R_OVER_LVL };
     count++
           break;
         case "NMB_TC_R":
          this.ELEMENT_DATA[count]={ name: 'Theescombe', level: this.tc_RL, graph:this.tc_RL };
     count++
           break;
         case "NMB_CHE_R":
          this.ELEMENT_DATA[count]={ name: 'Chelsea Reservoir West Chamber Level', level: this.che_RL, graph:this.che_RL };
     count++
     this.ELEMENT_DATA[count]={ name: 'Chelsea Reservoir East Chamber Level', level: this.che_REL, graph:this.che_REL };
     count++
           break;
         case "NMB_CHT_R":
          this.ELEMENT_DATA[count]={ name: 'Chatty North Chamber', level: this.cht_nc_RL, graph:this.cht_nc_RL };
     count++
     this.ELEMENT_DATA[count]={ name: 'Chatty South Chamber', level: this.cht_sc_RL, graph:this.cht_sc_RL };
     count++
     this.ELEMENT_DATA[count]={ name: 'Chatty Overhead Res', level: this.cht_oh_RL, graph:this.cht_oh_RL };
     count++
           break;
         case "NMB_VRH_R":
          this.ELEMENT_DATA[count]={ name: 'Van Riebeeck Hoogte Suction Level', level: this.vrh_sc_RL, graph:this.vrh_sc_RL };
     count++
     this.ELEMENT_DATA[count]={ name: 'Van Riebeeck Hoogte Delivery Level', level: this.vrh_del_RL, graph:this.vrh_del_RL};
     count++
           break;
         case "NMB_GR_R":
          this.ELEMENT_DATA[count]={ name: 'Grassridge East Chamber', level: this.gr_east_RL, graph:this.gr_east_RL };
     count++
    this.ELEMENT_DATA[count]={ name: 'Grassridge West Chamber', level: this.gr_west_RL, graph:this.gr_west_RL };
     count++
           break;
         case "NMB_GB_R":
          this.ELEMENT_DATA[count]={ name: 'Greenbushes', level: this.gb_RL, graph:this.gb_RL }
     count++
          break;
         case "NMB_SM_R":
          this.ELEMENT_DATA[count]={ name: 'Summit', level: this.sm_r_lvl, graph:this.sm_r_lvl }
     count++
          break;
       }
     }



  }

  ngOnInit(){

    var number:any;

    var count=0;
      for (var i = 0; i < this.userSites.length; i++){
        switch (this.userSites[i]) {
          case "NMB_CGK_R":
            this.listening("nmb_cgk_r_reservoir_level", this.nmb_cgk_r_reservoir_level, count, "Coega Kop")
            count++
            break;
          case "NMB_VS_R":
            this.listening("vs_rl" ,this.vs_RL, count, "Van Stadens")
      count++
            break;
          case "NMB_BHB_R":
            this.listening("bh_rl" ,this.bh_RL, count, "Blue Horizon Bay")
       count++
            break;
          case "NMB_HB_R":
            this.listening("hb_rl" ,this.hb_RL, count, "Heatherbank")
       count++
             break;
           case "NMB_LH_R":
            this.listening("lh_R_OVER_LVL" ,this.lh_R_OVER_LVL, count, "Lovemore Heights")
       count++
             break;
           case "NMB_TC_R":
            this.listening("tc_rl" ,this.tc_RL, count, "Theescombe")
       count++
             break;
           case "NMB_CHE_R":
            this.listening("che_r_lvl" ,this.che_RL, count, "Chelsea Reservoir West Chamber Level")
       count++
       this.listening("che_r_lvl_East" ,this.che_REL, count, "Chelsea Reservoir East Chamber Level")
       count++
             break;
           case "NMB_CHT_R":
            this.listening("cht_nc_rl" ,this.cht_nc_RL, count, "Chatty North Chamber")
       count++
            this.listening("cht_sc_rl" ,this.cht_sc_RL, count, "Chatty South Chamber")
       count++
            this.listening("cht_oh_rl" ,this.cht_oh_RL, count, "Chatty Overhead")
       count++
             break;
           case "NMB_VRH_R":
            this.listening("vrh_sc_rl" ,this.vrh_sc_RL, count, "Van Riebeeck Hoogte Suction Level")
       count++
            this.listening("vrh_del_rl" ,this.vrh_del_RL, count, "Van Riebeeck Hoogte Delivery Level")
       count++
             break;
           case "NMB_GR_R":
            this.listening("gr_east_rl" ,this.gr_east_RL, count, "Grassridge East Chamber")
       count++
            this.listening("gr_west_rl" ,this.gr_west_RL, count, "Grassridge West Chamber")
       count++
             break;
           case "NMB_GB_R":
            this.listening("gb_rl" ,this.gb_RL, count, "Greenbushes")
       count++
            break;
            case "NMB_SM_R":
              this.listening("sm_r_lvl" ,this.sm_r_lvl, count, "Summit")
         count++
              break;
         }

       }
 this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }


  applyFilter(event: Event) {
     this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }



  listening(tagVar:any, gVar: any, count:number, name:string ){
  var number
   this.webSocketService.listen(tagVar).subscribe((data:any)=>{
     number=data
     gVar=(number[tagVar])
      if(gVar == undefined || gVar == null) {gVar = 0;}
      localStorage.setItem(tagVar,gVar);
      //console.log(count)
      this.ELEMENT_DATA[count]={ name: name, level: gVar, graph: gVar };
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
      this.dataSource.filter = this.filterValue.trim().toLowerCase();
  });}





}

