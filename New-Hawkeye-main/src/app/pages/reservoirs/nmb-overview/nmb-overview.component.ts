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
  selector: 'app-nmb-overview',
  templateUrl: './nmb-overview.component.html',
  styleUrls: ['./nmb-overview.component.css']
})
export class NmbOverviewComponent implements OnInit {

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
  drift_comms: any;
  kwano_comms: any;
  tin_comms: any;
  moth_comms: any;
  mali_comms:any
  bh_comms: string;
  cht_comms: string;
  oli_comms: string;
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


          case "NMB_MALI_R":
          if(variable.mali_lvl  != null || variable.mali_lvl  != undefined){
            this.mali_comms=  this.getCommunicationStatus(variable.mali_ut,this.mali_comms )
            this.listening("Malabar",variable.mali_lvl, this.mali_comms,count,"/hawkeye/reservoirs/malibar")
            count++
          }
            break;

          case "NMB_MW_R":
            if(variable.mw_r_north_cham_res_lvl  != null || variable.mw_r_north_cham_res_lvl  != undefined){
            this.moth_comms=  this.getCommunicationStatus(variable.mw_g_r_new_ut,this.moth_comms )
            this.listening("Motherwell",variable.mw_r_north_cham_res_lvl, this.moth_comms,count,"/hawkeye/reservoirs/motherwellres")

    
            const cgkData = [
              { name: "Motherwell North Chamber", level: variable.mw_r_north_cham_res_lvl},
              { name: "Motherwell South Chamber",level:variable.mw_r_south_cham_res_lvl}
            ]
            cgkData.forEach(data => {
              this.listening(data.name, data.level, this.moth_comms, count, "/hawkeye/reservoirs/motherwellres");
              count++;
            });
          }
            break;

   

            case "NMB_AIR_PRT":
              if(variable.air_prt_R_lvl  != null || variable.air_prt_R_lvl  != undefined){
                this.air_prt_comms=  this.getCommunicationStatusBattery(variable.air_prt_R_comms_UT,this.air_prt_comms, variable.air_prt_R_battery_unit_UT)
                this.listening("Airport", variable.air_prt_R_lvl, this.air_prt_comms,count,"hawkeye/reservoirs/airportres")
                count++;
              }
              break;

 

            case "GRF_TIN_R":
            if(variable.tin_r_level  != null || variable.tin_r_level  != undefined){
            this.tin_comms=  this.getCommunicationStatusBattery(variable.tin_r_ut,this.tin_comms, variable.tin_r_poll_ut )
            this.listening("Tin Roof",variable.tin_r_level, this.tin_comms,count,"/hawkeye/reservoirs/tinroof")
            count++
          }
            break;

  

        
            

             
          ////////////////////////////////////////////////////////////////////////////////////////////////////////


          case "NMB_KWANO_R":
            if(variable.kwano_r_reservoir_level  != null|| variable.kwano_r_reservoir_level  != undefined){
            this.kwano_comms= this.getCommunicationStatus(variable.kwano_r_ut, this.kwano_comms)
            this.listening("Kwanobuhle", variable.kwano_r_reservoir_level,this.kwano_comms,count,"/hawkeye/reservoirs/kwanobuhle")
            count++
          }
            break;

          case "NMB_DRIFT_R":
            if(variable.drift_r_reservoir_level  != null || variable.drift_r_reservoir_level  != undefined){
            this.drift_comms= this.getCommunicationStatus(variable.drift_r_ut, this.drift_comms)
            this.listening("Driftsands", variable.drift_r_reservoir_level,this.drift_comms,count,"/hawkeye/reservoirs/driftsands")
            count++
          }
            break;

          case "NMB_EMERALD_R":
            if(variable.emer_lvl  != null || variable.emer_lvl  != undefined){
            this.emer_comms = this.getCommunicationStatus(variable.emer_ut,this.emer_comms)
            this.listening("Emerald Hill",variable.emer_lvl,this.emer_comms,count,"/hawkeye/reservoirs/emeraldhill")
            count++
          }
          break;
          case "NMB_BHB_R":
            if(variable.bh_R_LVL  != null || variable.bh_R_LVL  != undefined){
            this.bh_comms=  this.getCommunicationStatus(variable.bh_R_UT,this.bh_comms)
            this.listening("Blue Horizon Bay",variable.bh_R_LVL,this.bh_comms,count,"/hawkeye/reservoirs/bluehorizonbay" );
            count++
          }
            break;
            case "NMB_CHT_R":
              if (variable.cht_nc_rl != null) {
                this.cht_comms = this.getCommunicationStatus(variable.cht_ut, this.cht_comms);
                const chtData = [
                  { name: "Chatty North", level: variable.cht_nc_rl },
                  { name: "Chatty South", level: variable.cht_sc_rl },
                  { name: "Chatty Overhead", level: variable.cht_oh_rl }
                ];
                chtData.forEach(data => {
                  this.listening(data.name, data.level, this.cht_comms, count, "/hawkeye/reservoirs/chatty");
                  count++;
                });
              }
              break;
       
          case "NMB_CGK_R":
            if(variable.nmb_cgk_r_reservoir_level  != null || variable.nmb_cgk_r_reservoir_level != undefined){

              this.cgk_comms=  this.getCommunicationStatusBattery(variable.nmb_cgk_r_ut,this.cgk_comms, variable.coe_kop_cloud_r_level)
              const cgkData = [
                { name: "Coega Kop Inlet Chamber 2 Ml", level: variable.nmb_cgk_r_reservoir_level},
                { name: "Coega Kop North Chamber 17 Ml",level:variable.coe_kop_cloud_r_level}
              ]
          


            cgkData.forEach(data => {
              this.listening(data.name, data.level, this.cgk_comms, count, "/hawkeye/reservoirs/coegakop");
              count++;
            });
             
              }
                break;

                case "NMB_CHE_R":
                  if (variable.che_r_lvl != null) {
                    this.che_comms = this.getCommunicationStatus(variable.che_r_ut, this.che_comms);
                    const cheData = [
                      { name: "Chelsea East", level: variable.che_r_lvl_East },
                      { name: "Chelsea West", level: variable.che_r_lvl }
                    ];
                    cheData.forEach(data => {
                      this.listening(data.name, data.level, this.che_comms, count, "/hawkeye/reservoirs/chelsea");
                      count++;
                    });
                  }
                  break;

          case "NMB_GB_R":
            if(variable.gb_R_LVL !=null || variable.gb_R_LVL  != undefined){
            this.gb_comms=  this.getCommunicationStatus(variable.gb_R_UT,this.gb_comms)
            this.listening("Greenbushes",variable.gb_R_LVL,this.gb_comms,count,"/hawkeye/reservoirs/greenbushes");
                  count++
                }
                   break;

          case "NMB_GR_R":
            if(variable.gr_R_WEST_LVL  != null || variable.gr_R_WEST_LVL  != undefined){
            this.gr_comms=  this.getCommunicationStatus(variable.gr_R_UT,this.gr_comms)
            this.listening("Grassridge East Chamber",variable.gr_R_EAST_LVL, this.gr_comms,count, "/hawkeye/reservoirs/grassridge")
            count++
            this.listening("Grassridge West Chamber", variable.gr_R_WEST_LVL, this.gr_comms,count , "/hawkeye/reservoirs/grassridge" )
            count++
          }
                  break;
         case "NMB_HB_R":
          if(variable.hb_R_LVL  != null || variable.hb_R_LVL  != undefined){
          this.hb_comms=  this.getCommunicationStatus(variable.hb_R_UT,this.hb_comms)
          this.listening("Heatherbank", variable.hb_R_LVL, this.hb_comms,count, "/hawkeye/reservoirs/heatherbank")
            count++
          }
            break;
         case "NMB_LH_R":
          if(variable.lh_R_OVER_LVL  != null || variable.lh_R_OVER_LVL  != undefined){
          this.lh_comms=  this.getCommunicationStatus(variable.lh_UT,this.lh_comms)
          // this.listening("Lovemore Heights", variable.lh_R_OVER_LVL,this.lh_comms,count, "")


          const cheData = [
            { name: "Lovemore Heights Overhead Tank", level: variable.lh_R_OVER_LVL },
            { name: "Lovemore Heights Reservoir", level: variable.lh_Res_lvl }
            
          ];
        
          cheData.forEach(data => {
            this.listening(data.name, data.level, this.lh_comms, count, "/hawkeye/reservoirs/lovemoreheights");
            count++;
          });
            }
            break;
          case "NMB_OLI_R":
            if(variable.oli_lvl  != null || variable.oli_lvl  != undefined){
            this.oli_comms=  this.getCommunicationStatusBattery(variable.oli_ut,this.oli_comms,variable.oli_batteryUnitUpdate )
            this.listening("Olifantskop",variable.oli_lvl, this.oli_comms,count,"/hawkeye/reservoirs/oliphantskop")
            count++
          }
            break;
          case "NMB_SM_R":
            if(variable.sm_r_lvl  != null || variable.sm_r_lvl  != undefined){
            this.sum_comms=  this.getCommunicationStatus(variable.sum_UT,this.sum_comms)
            this.listening("Summit", variable.sm_r_lvl, this.sum_comms,count, "/hawkeye/reservoirs/summit" )
            count++
          }
            break;
          case "NMB_TC_R":
            if(variable.tc_R_LVL  != null || variable.tc_R_LVL  != undefined){
            this.tc_comms=  this.getCommunicationStatus(variable.tc_R_UT,this.tc_comms)
            this.listening("Theescombe", variable.tc_R_LVL, this.tc_comms,count, "/hawkeye/reservoirs/theescombe" )
              count++
            }
              break;
           case "NMB_VRH_R":
            if(variable.vrh_sc_rl  != null || variable.vrh_sc_rl  != undefined){
            this.vrh_comms=  this.getCommunicationStatus(variable.vrh_ut,this.vrh_comms)
            this.listening("Van Riebeeck Hoogte Delivery", variable.vrh_del_rl,this.vrh_comms,count, "/hawkeye/reservoirs/vanriebeekhoogte" )
              count++
            this.listening("Van Riebeeck Hoogte Suction",variable.vrh_sc_rl,this.vrh_comms, count, "/hawkeye/reservoirs/vanriebeekhoogte" )
               count++
              }
                break;
            case "NMB_VS_R":
              if(variable.vs_R_LVL  != null || variable.vs_R_LVL  != undefined){
              this.vs_comms=  this.getCommunicationStatus(variable.vs_R_UT,this.vs_comms)
                  this.listening("Van Stadens",  variable.vs_R_LVL,this.vs_comms, count, "/hawkeye/reservoirs/vanstadens" )
               count++
              }
                break;

            case "NMB_RD_R":
              if(variable.rd_r_lvl  != null || variable.rd_r_lvl  != undefined){
              this.rd_comms=  this.getCommunicationStatus(variable.rd_r_ut,this.rd_comms)
              this.listening("Rosedale",  variable.rd_r_lvl,this.rd_comms, count, "/hawkeye/reservoirs/rosedale" )
                count++
              }
                  break;
        }
        }
  };
}
