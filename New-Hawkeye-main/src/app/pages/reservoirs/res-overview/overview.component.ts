import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import {ResoverviewV2RoutingComponent} from 'src/app/Service-Files/Reservoir/resoverview2.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {MatTableModule} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { ServerURLService } from 'src/app/Service-Files/server-url.service';
import { Common } from 'src/app/class/common';


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


  variable = {
  mw_g_res_level:null,
  mw_g_ut:null,
  oli_batteryUnitUpdate:null,
  drift_r_reservoir_level: null,
  drift_r_ut: null,
  nmb_schoe_r_res_level: null,
  nmb_schoe_r_ut: null,
  kwano_r_ut: null,
  kwano_r_reservoir_level: null,
  bergen_r_ut: null,
  bergen_r_level: null,
  bergen_r_poll_ut: null,
  kroon_r_level: null,
  kroon_r_ut: null,
  kroon_r_poll_ut: null,
  uma_r_poll_ut: null,
  uma_r_level: null,
  uma_r_ut: null,
  wolwas_r_ut: null,
  wolwas_r_poll_ut: null,
  wolwas_r_level: null,
  damp_r_ut:null,
  damp_r_level:null,
  hol_r_ut:null,
  hol_r_level:null,
  tin_r_ut:null,
  tin_r_level:null,
  tin_r_poll_ut: null,
  hol_r_poll_ut: null,
  mali_ut:null,
  mali_lvl:null,
  emer_lvl:null,
  emer_ut:null,
  bh_R_UT: null,
  cht_oh_rl: null,
  bh_R_LVL: null,
  nmb_cgk_r_reservoir_level:null,
  nmb_cgk_r_ut: null,
  che_r_lvl_East: null,
  che_r_ut: null,
  cht_ut: null,
  gb_R_LVL: null,
  gb_R_UT: null,
  cht_nc_rl: null,
  cht_sc_rl: null,
  gr_R_EAST_LVL: null,
  gr_R_UT: null,
  gr_R_WEST_LVL: null,
  hb_R_LVL: null,
  hb_R_UT: null,
  lh_R_OVER_LVL: null,
  lh_UT: null,
  rd_r_lvl: null,
  rd_r_ut: null,
  sm_r_lvl: null,
  sum_UT: null,
  tc_R_LVL: null,
  tc_R_UT: null,
  vs_R_LVL: null,
  vs_R_UT: null,
  vrh_del_rl: null,
  vrh_sc_rl: null,
  vrh_ut: null,
  che_r_lvl: null,
  oli_lvl: null,
  oli_ut: null,

  air_prt_R_comms_UT:null,
  air_prt_R_battery_unit_UT:null,
  air_prt_R_lvl:null
  }

  tagArr:any =[
    "mw_g_res_level",
    "mw_g_ut",
    "oli_batteryUnitUpdate",
    "drift_r_reservoir_level",
    "drift_r_ut",
    "nmb_schoe_r_res_level",
    "nmb_schoe_r_ut",
    "kwano_r_ut",
    "kwano_r_reservoir_level",
    "bergen_r_ut",
    "bergen_r_level",
    "bergen_r_poll_ut",
    "kroon_r_level",
    "kroon_r_ut",
    "kroon_r_poll_ut",
    "uma_r_poll_ut",
    "uma_r_level",
    "uma_r_ut",
    "wolwas_r_ut",
    "wolwas_r_poll_ut",
    "wolwas_r_level",
    "damp_r_ut",
    "damp_r_level",
    "hol_r_ut",
    "hol_r_level",
    "tin_r_ut",
    "tin_r_level",
    "tin_r_poll_ut",
    "hol_r_poll_ut",
    "mali_ut",
    "mali_lvl",
    "emer_lvl",
    "emer_ut",
    "bh_R_UT",
    "cht_oh_rl",
    "bh_R_LVL",
    "nmb_cgk_r_reservoir_level",
    "nmb_cgk_r_ut",
    "che_r_lvl_East",
    "che_r_ut",
    "cht_ut",
    "gb_R_LVL",
    "gb_R_UT",
    "cht_nc_rl",
    "cht_sc_rl",
    "gr_R_EAST_LVL",
    "gr_R_UT",
    "gr_R_WEST_LVL",
    "hb_R_LVL",
    "hb_R_UT",
    "lh_R_OVER_LVL",
    "lh_UT",
    "rd_r_lvl",
    "rd_r_ut",
    "sm_r_lvl",
    "sum_UT",
    "tc_R_LVL",
    "tc_R_UT",
    "vs_R_LVL",
    "vs_R_UT",
    "vrh_del_rl",
    "vrh_sc_rl",
    "vrh_ut",
    "che_r_lvl",
    "oli_lvl",
    "oli_ut",

    "air_prt_R_comms_UT",
"air_prt_R_battery_unit_UT",
"air_prt_R_lvl"

  ]

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


  constructor(private webSocketService: WebSocketService,private route:ResoverviewV2RoutingComponent, private ws:WebSocketService,private authService: AuthService, private router: Router ,public recieve:Common )
  {

    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })






  this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);


  this.getRouteInformation(this.variable).then((response) => {
    this.responseData = response


    this.renderPage(this.responseData)
  })











  }


  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = this.filterValue.trim().toLowerCase();
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


  recieveVals_nmbm(tagArr: any[]){
    var tagVals:any = []
    for(let i = 0; i<tagArr.length ;i++){
      this.webSocketService.nmbm_listen(tagArr[i]).subscribe((data:any)=>{
        tagVals[i] = data[tagArr[i]];

      })
    }
    return tagVals
  }



  ngOnInit() {


    var tagVals:any=[]
    var tagValsNMBM:any=[]
    var tagArr =[
      "bh_ut",//0
      "bh_rl",//1
      "cht_ut",//2
      "cht_nc_rl",//3
      "cht_sc_rl",//4
      "cht_oh_rl",//5
      "nmb_cgk_r_reservoir_level",//6
      "nmb_cgk_r_ut",//7
      "che_r_lvl",//8
      "che_r_lvl_East",//9
      "che_r_ut",//10
      "gb_rl",//11
      "gb_ut",//12
      "gr_east_rl",//13
      "gr_ut",//14
      "gr_west_rl",//15
      "hb_rl",//16
      "hb_ut",//17
      "lh_R_OVER_LVL",//18
      "lh_UT",//19
      "oli_ut",//20
      "oli_lvl",//21
      "sm_r_lvl",//22
      "sum_UT",//23
      "tc_rl",//24
      "tc_ut",//25
      "vrh_del_rl",//26
      "vrh_sc_rl",//27
      "vrh_ut",//28
      "vs_rl",//29
      "vs_ut",//30
      "rd_r_lvl",//31
      "rd_r_ut",//32
      "emer_lvl",//33
      "emer_ut",//34
      "batteryUnitUpdate",//35
      "drift_r_ut",//36
      "drift_r_reservoir_level",//37
      "nmb_schoe_r_ut",//38
      "nmb_schoe_r_res_level",//39
      "kwano_r_ut",//40
      "kwano_r_reservoir_level",//41
      "bergen_r_ut",//42
      "bergen_r_level",//43
      "bergen_r_poll_ut",//44
      "kroon_r_ut",//45
      "kroon_r_level",//46
      "kroon_r_poll_ut",//47
      "uma_r_ut",//48
      "uma_r_level",//49
      "uma_r_poll_ut",//50
      "wolwas_r_ut",//51
      "wolwas_r_level",//52
      "wolwas_r_poll_ut",//53
      "damp_r_ut",//54
      "damp_r_level",//55
      "hol_r_ut",//56
      "hol_r_level",//57
      "hol_r_poll_ut",//58
      "tin_r_ut",//59
      "tin_r_level",//60
      "tin_r_poll_ut",//61
      "mw_g_res_level",//62
      "mw_g_ut",//63
      "mali_ut",//64
      "mali_lvl",//65

      "air_prt_R_comms_UT",
      "air_prt_R_battery_unit_UT",
      "air_prt_R_lvl"


    ]

    tagVals = this.recieveVals(tagArr)
    tagValsNMBM = this.recieveVals_nmbm(tagArr)




    this.resOverviewInterval = setInterval(() =>{


      this.getRouteInformation(this.variable).then((response) => {
        this.responseData = response


        this.renderPage(this.responseData)
      })

    },60000)



    }


    ngOnDestroy(){
      if(this.resOverviewInterval){
        clearInterval(this.resOverviewInterval)
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

  async getRouteInformation(variable:any): Promise<any> {


    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.route.GetSiteValues();

        this.data = response;

        variable = await this.recieve.recieveRouteData(this.tagArr,variable, this.data.routingArray);

        console.log(variable)
        resolve(variable);
      } catch (error) {

        console.error(error);
        reject(error);
      }
    });
  };


  async renderPage(variable:any){

    console.log(variable);


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
            if(variable.mw_g_res_level  != null || variable.mw_g_res_level  != undefined){
            this.moth_comms=  this.getCommunicationStatus(variable.mw_g_ut,this.moth_comms )
            this.listening("Motherwell",variable.mw_g_res_level, this.moth_comms,count,"/hawkeye/reservoirs/motherwellres")
            count++
          }
            break;

          case "GRF_DAMP_R":
            if(variable.damp_r_level  != null || variable.damp_r_level  != undefined){
            this.damp_comms=  this.getCommunicationStatus(variable.damp_r_ut,this.damp_comms )
            this.listening("Damcamp",variable.damp_r_level, this.damp_comms,count,"/hawkeye/reservoirs/damcamp")
            count++
          }
            break;

            case "NMB_AIR_PRT":
              if(variable.air_prt_R_lvl  != null || variable.air_prt_R_lvl  != undefined){
                this.air_prt_comms=  this.getCommunicationStatusBattery(variable.air_prt_R_comms_UT,this.air_prt_comms, variable.air_prt_R_battery_unit_UT)
                this.listening("Airport", variable.air_prt_R_lvl, this.air_prt_comms,count,"hawkeye/reservoirs/airportres")
                count++;
              }
              break;

            case "GRF_HOLD_R":
            if(variable.hol_r_level  != null || variable.hol_r_level  != undefined){
            this.hol_comms=  this.getCommunicationStatusBattery(variable.hol_r_ut,this.hol_comms, variable.hol_r_poll_ut)
            this.listening("Holding",variable.hol_r_level, this.hol_comms,count,"/hawkeye/reservoirs/holding")
            count++
          }
            break;

            case "GRF_TIN_R":
            if(variable.tin_r_level  != null || variable.tin_r_level  != undefined){
            this.tin_comms=  this.getCommunicationStatusBattery(variable.tin_r_ut,this.tin_comms, variable.tin_r_poll_ut )
            this.listening("Tin Roof",variable.tin_r_level, this.tin_comms,count,"/hawkeye/reservoirs/tinroof")
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

          case "NMB_SCHOE_R":
            if(variable.nmb_schoe_r_res_level != null ||variable.nmb_schoe_r_res_level != undefined ){
            this.schoe_comms= this.getCommunicationStatus(variable.nmb_schoe_r_ut, this.schoe_comms)
            this.listening("Schoemanshoek", variable.nmb_schoe_r_res_level,this.schoe_comms,count,"/hawkeye/reservoirs/schoemanshoek")
            count++
          }
            break;

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
               case "HWK_DEMO_R":
                if(variable.nmb_cgk_r_reservoir_level  != null || variable.nmb_cgk_r_reservoir_level  != undefined){
                this.demo_comms = this.getCommunicationStatus(variable.nmb_cgk_r_ut,this.demo_comms)
                this.listening("Demo Reservoir", variable.nmb_cgk_r_reservoir_level, this.demo_comms,count,"/hawkeye/reservoirs/demo-res")
                count++;
              }
                break;
          case "NMB_CGK_R":
            if(variable.nmb_cgk_r_reservoir_level  != null || variable.nmb_cgk_r_reservoir_level != undefined){
            this.cgk_comms=  this.getCommunicationStatus(variable.nmb_cgk_r_ut,this.cgk_comms)
            this.listening("Coega Kop",variable.nmb_cgk_r_reservoir_level, this.cgk_comms,count,"/hawkeye/reservoirs/coegakop")
                count++
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
          this.listening("Lovemore Heights", variable.lh_R_OVER_LVL,this.lh_comms,count, "/hawkeye/reservoirs/lovemoreheights")
            count++
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
