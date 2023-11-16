import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';


export interface PeriodicElement {
  Name: string;
  level: any;
  communication_status: any;
  url:any;
}


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit{

  data: any=[];
  responseData: any= []


  routingCompleted:boolean = false;
  userSites:string[];
  ELEMENT_DATA: PeriodicElement[] = [];
  userIsAuthenticated =false;
  public authListenerSubs!: Subscription;
  countR: number;
  displayedColumns :string[]= ['Name', 'level', 'communication_status'];
  dataSource:any;
  filterValue: any="";
  @ViewChild(MatSort) sort: MatSort;

  resOverviewInterval: any;


  variable = {  }


  emer_comms:any;
  rd_comms: any;
  demo_comms: any;
  drift_comms: any;
  kwano_comms: any;
  schoe_comms: any;
  damp_comms: any;
  hol_comms: any;
  tin_comms: any;
  moth_comms: any;
  mali_comms:any
  bh_comms: string;
  cht_comms: string;
  oli_comms: string;
  berg_comms:any
  kroon_comms:any
  uma_comms:any
  wol_comms:any
  che_comms: string;
  cgk_comms: string;
  gr_comms: string;
  hb_comms: string;
  gb_comms: string;
  lh_comms: string;
  sum_comms: string;
  tc_comms: string;
  vrh_comms: string;
  vs_comms: string;

  air_prt_comms:string;

  kark_comms:any
  karee_comms:any

  intervalLoop: any
  constructor(private authService: AuthService, private router: Router ,public recieve:Common,private pm:pagePostMethod )
  {

    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })

  // this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }


  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = this.filterValue.trim().toLowerCase();
 }




  ngOnInit() {
    this.intervalLoop = this.pm.findPageData("res_overview", "Res_CurrentVals").subscribe((result) => {

      this.variable = result

      console.log(this.variable)


      this.renderPage(this.variable)
    });



    }


    ngOnDestroy():void{
      if(this.intervalLoop){
        this.intervalLoop.unsubscribe();
      }
    }
    navigateToSite(element:any){
      let route = element;
      this.router.navigate([route]);

    }



  listening(name:any, Level:any, Communication_status:any,  Count:any,URL:any  ){

      this.ELEMENT_DATA[Count]={ Name:name, level:Level, communication_status:Communication_status,  url:  URL };
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
       this.dataSource.sort = this.sort;
      this.dataSource.filter = this.filterValue.trim().toLowerCase();

  }

  getCommunicationStatus(lastUpdate:any, communication_status:any) {

    var updateTime = lastUpdate
    var updateTimeMS =Date.parse(updateTime)
    var cuurentDateCorrectFormat = Date().slice(4,Date().length-41);
    var  cuurentDateMS =Date.parse(cuurentDateCorrectFormat)
    var dateminus5minMS = cuurentDateMS - 300000

    if(updateTime == undefined){
      communication_status = "assets/img/General/Red Circle Cross.png"

    }

while (lastUpdate != undefined) {
    if(updateTime.length ==0){}
    else{
      if (updateTimeMS>dateminus5minMS)
      {
        communication_status = "assets/img/General/Green Circle Tick.png"
      }
      else{
        communication_status = "assets/img/General/Red Circle Cross.png"
      }




      return communication_status;
    }
    }


  }


  getCommunicationStatusBattery(lastUpdate:any, communication_status:any, batteryUpdate:any) {

    var updateTime = lastUpdate
    var updateTimeMS =Date.parse(updateTime)
    var cuurentDateCorrectFormat = Date().slice(4,Date().length-41);
    var  cuurentDateMS =Date.parse(cuurentDateCorrectFormat)
    var dateminus5minMS = cuurentDateMS - 300000


    var updateTimeBat = batteryUpdate
    var updateTimeMSBat =Date.parse(updateTimeBat)
    var cuurentDateCorrectFormatBat = Date().slice(4,Date().length-41);
    var  cuurentDateMSBat =Date.parse(cuurentDateCorrectFormatBat)
    var dateminus5hourMS = cuurentDateMSBat - 18000000


  while (updateTime != undefined) {
    if(updateTime.length ==0){}
    else{
      if (updateTimeMS>dateminus5minMS && updateTimeMSBat>dateminus5hourMS )
      {
        communication_status = "assets/img/General/Green Circle Tick.png"
      }
      else{
        communication_status = "assets/img/General/Red Circle Cross.png"
      }


      return communication_status;
    }
    }


  }




  async renderPage(variable:any){

    console.log(variable)

      var count=0;
      for (var i = 0; i < this.userSites.length; i++){
        switch (this.userSites[i]) {


          case"KOU_KARK_R":
          if(variable.kark_R_lvl){
            this.kark_comms = this.getCommunicationStatusBattery(variable.kark_R_comms_UT, this.kark_comms,variable.kark_R_battery_unit_UT )
            this.listening("Kareedouw", variable.kark_R_lvl, this.kark_comms,count,"/hawkeye/reservoirs/kareedouwkres" )
            count++;
          }
          break;
    
          case"KLM_KUI_R":
          if(variable.klm_kruisR_lvl){
            this.karee_comms = this.getCommunicationStatus(variable.klm_kruisR_ut, this.karee_comms)
            this.listening("Kruisfontein", variable.klm_kruisR_lvl, this.karee_comms,count,"/hawkeye/reservoirs/kruisfontein-r");
            count++;
          }
          break;

  

          case "GRF_DAMP_R":
            if(variable.damp_r_level  != null || variable.damp_r_level  != undefined){
            this.damp_comms=  this.getCommunicationStatus(variable.damp_r_ut,this.damp_comms )
            this.listening("Damcamp",variable.damp_r_level, this.damp_comms,count,"/hawkeye/reservoirs/damcamp")
            count++
          }
            break;

        

            case "GRF_HOLD_R":
            if(variable.hol_r_level  != null || variable.hol_r_level  != undefined){
            this.hol_comms=  this.getCommunicationStatusBattery(variable.hol_r_ut,this.hol_comms, variable.hol_r_poll_ut)
            this.listening("Holding",variable.hol_r_level, this.hol_comms,count,"/hawkeye/reservoirs/holding")
            count++
          }
            break;

 

          case "GRF_BERGEN_R":
            if(variable.bergen_r_level  != null || variable.bergen_r_level  != undefined){
            this.berg_comms=  this.getCommunicationStatusBattery(variable.bergen_r_ut,this.berg_comms,variable.bergen_r_poll_ut )
            this.listening("Bergendal",variable.bergen_r_level, this.berg_comms,count,"/hawkeye/reservoirs/bergendal")
            count++
          }
            break;

            case "GRF_UMA_R":
              if(variable.uma_r_level  != null || variable.uma_r_level  != undefined){
              this.uma_comms=  this.getCommunicationStatusBattery(variable.uma_r_ut,this.uma_comms,variable.uma_r_poll_ut )
              this.listening("Umasizakhe",variable.uma_r_level, this.uma_comms,count,"/hawkeye/reservoirs/umasizakhe")
              count++
            }
              break;

              case "GRF_KROON_R":
                if(variable.kroon_r_level  != null || variable.kroon_r_level  != undefined){
                this.kroon_comms=  this.getCommunicationStatusBattery(variable.kroon_r_ut,this.kroon_comms,variable.kroon_r_poll_ut)
                this.listening("Kroonvale",variable.kroon_r_level, this.kroon_comms,count,"/hawkeye/reservoirs/kroonvale")
                count++
              }
                break;

              case "GRF_WOL_R":
              if(variable.wolwas_r_level  != null || variable.wolwas_r_level  != undefined){
              this.wol_comms=  this.getCommunicationStatusBattery(variable.wolwas_r_ut,this.wol_comms,variable.wolwas_r_poll_ut)
              this.listening("Wolwas",variable.wolwas_r_level, this.wol_comms,count,"/hawkeye/reservoirs/wolwas")
              count++
            }
              break;

          ////////////////////////////////////////////////////////////////////////////////////////////////////////


   
        }
        }
  };
}
