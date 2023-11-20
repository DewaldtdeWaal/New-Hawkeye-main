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
  communication_status: any;
  url:any;
}
@Component({
  selector: 'app-fpt-overview',
  templateUrl: './fpt-overview.component.html',
  styleUrls: ['./fpt-overview.component.css']
})
export class FptOverviewComponent implements OnInit {

  displayedColumns :string[]= ['Name', 'communication_status'];
  ELEMENT_DATA: PeriodicElement[] = [];
  data: any=[];
  dataSource:any;
  @ViewChild(MatSort) sort: MatSort;
  filterValue: any="";
  resOverviewInterval: any;
  userSites:string[];
  public authListenerSubs!: Subscription;
  responseData: any= []

  bhb_PS_comms:any;
  beth_comms:any;
  cidzt_comms:any
  fm_comms:any
  gt_comms:any
  hum_comms:any
  jeff_comms: any;
  kou_comms:any
  ons_comms:any
  kou_main_line_comms:any

  bush_comms:any
  gbw_comms:any
  fpt_uit_fc_comms:any
  intervalLoop: any
  variable = {  }



  constructor(private authService: AuthService ,private router: Router,public recieve:Common ,private pm:pagePostMethod ) {

    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })

    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

}

  ngOnInit() {

   
    this.intervalLoop = this.pm.findPageData("fpt_currentvals", "F_CurrentVals").subscribe((result) => {

      this.variable = result

      console.log(this.variable)


      this.renderPage(this.variable)
    });

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

  listening(name:any, Communication_status:any,  Count:any,URL:any  ){

    this.ELEMENT_DATA[Count]={ Name:name, communication_status:Communication_status,  url:  URL };
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
     this.dataSource.sort = this.sort;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();

}

applyFilter(event: Event) {
  this.filterValue = (event.target as HTMLInputElement).value;
 this.dataSource.filter = this.filterValue.trim().toLowerCase();
}

navigateToSite(element:any){
  let route = element;
  this.router.navigate([route]);

}

ngOnDestroy(){
  if(this.resOverviewInterval){
    clearInterval(this.resOverviewInterval)
  }
}

getCommunicationStatus(lastUpdate:any, communication_status:any) {

  var updateTime = lastUpdate
  var updateTimeMS =Date.parse(updateTime)
  var cuurentDateCorrectFormat = Date().slice(4,Date().length-41);
  var  cuurentDateMS =Date.parse(cuurentDateCorrectFormat)
  var dateminus5minMS = cuurentDateMS - 300000

while (updateTime != undefined) {
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




async renderPage(variable:any){

  var count=0;
  for (var i = 0; i < this.userSites.length; i++){
    switch (this.userSites[i]) {

      case "NMB_UIT_FC_FPT":
        if(variable.fpt_uit_fc_ut){
        this.fpt_uit_fc_comms =  this.getCommunicationStatus(variable.fpt_uit_fc_ut, this.fpt_uit_fc_comms)
        this.listening("Uitenhage Flow Chamber", this.fpt_uit_fc_comms, count, "/hawkeye/fptsites/uitenhage-flow-chamber")
        count++;
        }
        break;


      case "NMB_GBW_FPT":
        if(variable.gbw_ut){
        this.gbw_comms =  this.getCommunicationStatus(variable.gbw_ut, this.gbw_comms)
        this.listening("Gamtoos Break Water", this.gbw_comms, count, "/hawkeye/fptsites//gamtoos-break-water")
        count++;
        }
        break;

      case "NMB_BUSH_FPT":
        if(variable.bush_UT){
        this.bush_comms =  this.getCommunicationStatus(variable.bush_UT, this.bush_comms)
        this.listening("Bushy Park", this.bush_comms, count, "/hawkeye/fptsites/bushypark-fpt")
        count++;
        }
        break;

      case "NMB_BETH_FPT":
        if(variable.beth_ut){
        this.beth_comms =  this.getCommunicationStatus(variable.beth_ut, this.beth_comms)
        this.listening("Bethelsdorp", this.beth_comms, count, "/hawkeye/fptsites/bethelsdorp")
        count++;
        }
        break;


      case "NMB_CIDZT_FPT":
        if(variable.fpt_cidzt_ut){
        this.cidzt_comms =  this.getCommunicationStatus(variable.fpt_cidzt_ut, this.cidzt_comms)
        this.listening("Coega IDZT", this.cidzt_comms, count, "/hawkeye/fptsites/coegaidzt")
        count++;
        }
        break;


      case "NMB_FMT_FPT":
        if(variable.fmt_FM_UT){
        this.fm_comms =  this.getCommunicationStatus(variable.fmt_FM_UT, this.fm_comms)
        this.listening("FM Tower", this.fm_comms, count, "/hawkeye/fptsites/fmtower")
        count++;
        }
        break;

      case "NMB_GT_BRG_FPT":
        if(variable.fpt_gt_brg_ut){
        this.gt_comms =  this.getCommunicationStatus(variable.fpt_gt_brg_ut, this.gt_comms)
        this.listening("Gamtoos Bridge", this.gt_comms, count, "/hawkeye/fptsites/gamtoos-bridge")
        count++;
        }
        break;

      case "NMB_HUP_OFF_TAKE_FPT":
        if(variable.humansdorp_off_take_ut){
        this.hum_comms =  this.getCommunicationStatus(variable.humansdorp_off_take_ut, this.hum_comms)
        this.listening("Humansdorp Off-Take", this.hum_comms, count, "/hawkeye/fptsites/humansdorp-offtake")
        count++;
        }
        break;




         case "NMB_JEFF_BAY_OFF_TAKE_FPT":
         if(variable.jeff_bay_off_take_last_update){
          this.jeff_comms =  this.getCommunicationStatusBattery(variable.jeff_bay_off_take_last_update,this.jeff_comms,variable.jeff_bay_off_take_last_seen )
         this.listening("Jeffreys Bay Off-Take", this.jeff_comms, count, "/hawkeye/fptsites/jeffreys-bay-off-take")
         count++;
         }
         break;


         case "NMB_KOU_MAIN_LINE_FPT":
          if(variable.kou_main_line_ut){
          this.kou_comms =  this.getCommunicationStatus(variable.kou_main_line_ut, this.kou_comms)
          this.listening("Kouga Main Line", this.kou_comms, count, "/hawkeye/fptsites/kouga-main-line")
          count++;
          }
          break;





            case "NMB_PARA_BEA_ST_FRANCIS_FPT":
              if(variable.kou_main_line_ut){
              this.kou_main_line_comms =  this.getCommunicationStatus(variable.kou_main_line_ut, this.kou_main_line_comms)
              this.listening("Paradise/St Francis", this.kou_main_line_comms, count, "/hawkeye/fptsites/paradise-beach-st-francis-offtake")
              count++;
              }
              break;



            
            case "NMB_GLEN_FPT":
              if(variable.glen_ftp_wtw_ut){
                var comms =  this.getCommunicationStatus(variable.glen_ftp_wtw_ut, comms)
                this.listening("Glendinningvale", comms, count, "/hawkeye/fptsites/glendinningvaleftp")
                count++;
                }
                break;
      }


    }


};

}
