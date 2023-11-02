import { Component, OnInit } from '@angular/core';
import { ListeningService } from 'src/app/listening.service';
import {MatTableDataSource} from '@angular/material/table';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { UsersService } from 'src/app/Service-Files/users.service';
import { from, Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import {ControlLog} from 'src/app/models/controlLog.model'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServerURLService } from 'src/app/Service-Files/server-url.service';
import { ControlLogService } from 'src/app/Service-Files/control-log.service';
import { NgForm } from '@angular/forms';
import { SiteControlService } from 'src/app/Service-Files/site-control.service';
import { standfordRoadComponent} from 'src/app/Service-Files/Pumpstation/pumpstation.service';
import {StanOnOffService} from 'src/app/Service-Files/standfordpumponofstate.service';
import { Common } from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
export interface PeriodicElement {
  alarm: string;
  description: string;
}



@Component({
  selector: 'app-stanford-road',
  templateUrl: './stanford-road.component.html',
  styleUrls: ['./stanford-road.component.css']
})
export class StanfordRoadComponent implements OnInit {
  controlAccess=false;


ps_speed:any = 0

p1_btn:any = false
p2_btn:any= false
p3_btn:any= false
p4_btn:any= false

  public authListenerSubs!: Subscription;

  userIsAuthenticated =false;
  error:boolean = false;
  userSites:string[];
  firstName:string;
  secondName: string;

  variable :any= {


  comms: null,
    stan_common_suction_pressure:null,
    stan_common_delivery_pressure:null,
    stan_pump_station_flow:null,
    stan_ps_ut:null,
    stan_p1_stat:null,
    stan_p1_localremote:null,
    stan_p1_pumprunning:null,
    stan_p1_alarmshigh:null,
    stan_p1_pumpavailable:null,
    stan_p1_vsd_actfreq:null,
    stan_p1_motor_power:null,
    stan_p2_stat:null,
    stan_p2_localremote:null,
    stan_p2_pumprunning:null,
    stan_p2_alarmshigh:null,
    stan_p2_pumpavailable:null,
    stan_p2_vsd_actfreq:null,
    stan_p2_motor_power:null,
    stan_p3_stat:null,
    stan_p3_localremote:null,
    stan_p3_pumprunning:null,
    stan_p3_alarmshigh:null,
    stan_p3_pumpavailable:null,
    stan_p3_vsd_actfreq:null,
    stan_p3_motor_power:null,
    stan_p4_stat:null,
    stan_p4_localremote:null,
    stan_p4_pumprunning:null,
    stan_p4_alarmshigh:null,
    stan_p4_pumpavailable:null,
    stan_p4_vsd_actfreq:null,
    stan_p4_motor_power:null,

  }

    pump1OnOff:boolean
    pump2OnOff:boolean
    pump3OnOff:boolean
    pump4OnOff:boolean
    intervalLoop: any
    stan_ps_scada_speed_sp:any=0

    stan_p1_scada_run_command:any=false
    stan_p2_scada_run_command:any=false
    stan_p3_scada_run_command:any=false
    stan_p4_scada_run_command:any=false

    stan_hawkeye_enable_control:any=false


    ELEMENT_DATA_P1: PeriodicElement[] = [];
    ELEMENT_DATA_P2: PeriodicElement[] = [];
    ELEMENT_DATA_P3: PeriodicElement[] = [];
    ELEMENT_DATA_P4: PeriodicElement[] = [];

    displayedColumns :string[]= ['alarm', 'description'];

    dataSourceP1:any
    dataSourceP2:any
    dataSourceP3:any
    dataSourceP4:any


    theme:any = localStorage.getItem("theme");
  data: any=[];
  faultVariable:any={
  stan_p1_alarmstrip: {
    value: null,
  alarm:"Fault",
  description:"Alarm Trip",
    alarmTrip: 1
  },
  stan_p2_alarmstrip: {
    value: null,
  alarm:"Fault",
  description:"Alarm Trip",
    alarmTrip: 1
  },
  stan_p3_alarmstrip: {
    value: null,
  alarm:"Fault",
  description:"Alarm Trip",
    alarmTrip: 1
  },
  stan_p4_alarmstrip: {
    value: null,
  alarm:"Fault",
  description:"Alarm Trip",
    alarmTrip: 1
  }
}

   tagArr:any =[
    "stan_ps_ut",//0
    "stan_common_suction_pressure",//1
    "stan_common_delivery_pressure",//2
    "stan_pump_station_flow",//3
    "stan_p1_stat",//4
    "stan_p1_localremote",//5
    "stan_p1_pumprunning",//6
    "stan_p1_alarmshigh",//7

    "stan_p1_pumpavailable",//9
    "stan_p1_vsd_actfreq",//10
    "stan_p1_motor_power",//11
    "stan_p2_stat",//12
    "stan_p2_localremote",//13
    "stan_p2_pumprunning",//14
    "stan_p2_alarmshigh",//15

    "stan_p2_pumpavailable",//17
    "stan_p2_vsd_actfreq",//18
    "stan_p2_motor_power",//19
    "stan_p3_stat",//20
    "stan_p3_localremote",//21
    "stan_p3_pumprunning",//22
    "stan_p3_alarmshigh",//23

    "stan_p3_pumpavailable",//25
    "stan_p3_vsd_actfreq",//26
    "stan_p3_motor_power",//27
    "stan_p4_stat",//28
    "stan_p4_localremote",//29
    "stan_p4_pumprunning",//30
    "stan_p4_alarmshigh",//31

    "stan_p4_pumpavailable",//33
    "stan_p4_vsd_actfreq",//34
    "stan_p4_motor_power",//35
  ]

  faultArr:any=[
    "stan_p1_alarmstrip",//8
    "stan_p2_alarmstrip",//16
    "stan_p3_alarmstrip",//24
    "stan_p4_alarmstrip",//32
  ]

  constructor(private http: HttpClient, private su:ServerURLService, private cl:ControlLogService, private pm:pagePostMethod, private as:AuthService,  private site_Control: SiteControlService,  private onOf: StanOnOffService,public recieve:Common ) {


    this.intervalLoop = this.pm.findPageData("nmbm_stan_ps", "PS_CurrentVals").subscribe((result) => {
      this.data =  result;

      console.log(this.data)
      Common.getRouteWithFaults(this.tagArr,this.variable,this.data,this.faultArr,this.faultVariable)

     this.variable.comms = Common.getLastUpdate(this.variable.stan_ps_ut)

     var alarm1: any [] = [this.faultVariable.stan_p1_alarmstrip]
     var alarm2: any [] = [this.faultVariable.stan_p2_alarmstrip]
     var alarm3: any [] = [this.faultVariable.stan_p3_alarmstrip]
     var alarm4: any [] = [this.faultVariable.stan_p4_alarmstrip]

     this.dataSourceP1 = new MatTableDataSource(Common.getAlarmValue(alarm1))
     this.dataSourceP2 = new MatTableDataSource(Common.getAlarmValue(alarm2))
     this.dataSourceP3 = new MatTableDataSource(Common.getAlarmValue(alarm3))
     this.dataSourceP4 = new MatTableDataSource(Common.getAlarmValue(alarm4))


    })
    this.onOf.GetSiteValues()
    .subscribe(rsp=>{
      this.data = rsp;
      this.pump1OnOff = this.data.routingArray[0].p1_run;
      this.pump2OnOff = this.data.routingArray[0].p2_run;
      this.pump3OnOff = this.data.routingArray[0].p3_run;
      this.pump4OnOff = this.data.routingArray[0].p4_run;
    })


    //   setTimeout(()=>{




    // },1000)

    this.userSites = this.as.getUserSites();
    this.firstName = this.as.getFirstName();
    this.secondName = this.as.getSecondName();
    this.authListenerSubs = this.as.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.as.getUserSites();
      this.firstName = this.as.getFirstName();
      this.secondName = this.as.getSecondName();
    })
      const findval = this.userSites.includes("NMB_STAN_R_PS_CON")
      if(findval== true){
        this.controlAccess=true;
      }



  }





  ngOnInit() {





    this.site_Control.getStanControlByte().subscribe((resp:any)=>{

      this.stan_hawkeye_enable_control =  resp.ps_control
      this.stan_ps_scada_speed_sp = resp.ps_speed

      this.stan_p1_scada_run_command= resp.p1_run
      this.stan_p2_scada_run_command= resp.p2_run
      this.stan_p3_scada_run_command= resp.p3_run
      this.stan_p4_scada_run_command= resp.p4_run


      })










  }




  onP1PowerClickOn(){


   var name = this.firstName +" " +this.secondName
   var date = this.getCurrentDate()
   const controlLog : ControlLog={
    name: name,
    date: date,
    site:"Stanford Road",
    pump:"Pump 1",
    description: "Turned Pump On"
  };
    this.http.post(this.su.serverURL+"/pumpstations/stanford-road/ps/control-log",controlLog).subscribe(()=>{})

    this.stan_p1_scada_run_command= true
    this.site_Control.saveStanPump1Run(this.stan_p1_scada_run_command)
    this.pump1OnOff=true;
  }
  onP1PowerClickOff(){
     this.p1_btn ="Off"

    var name = this.firstName +" " +this.secondName
    var date = this.getCurrentDate()
    const controlLog : ControlLog={
    name: name,
    date: date,
    site:"Stanford Road",
    pump:"Pump 1",
    description: "Turned Pump OFF"
  };
    this.http.post(this.su.serverURL+"/pumpstations/stanford-road/ps/control-log",controlLog).subscribe(()=>{})

    this.stan_p1_scada_run_command= false
    this.site_Control.saveStanPump1Run(this.stan_p1_scada_run_command)


    this.pump1OnOff=false;
      }

      onP2PowerClickOn(){

        this.p2_btn ="Start"

        var name = this.firstName +" " +this.secondName
        var date = this.getCurrentDate()
        const controlLog : ControlLog={
         name: name,
         date: date,
         site:"Stanford Road",
         pump:"Pump 2",
         description: "Turned Pump On"
       };
         this.http.post(this.su.serverURL+"/pumpstations/stanford-road/ps/control-log",controlLog).subscribe(()=>{})

         this.stan_p2_scada_run_command= true
         this.site_Control.saveStanPump2Run(this.stan_p2_scada_run_command)
         this.pump2OnOff=true;
       }
       onP2PowerClickOff(){
          this.p2_btn ="Off"

         var name = this.firstName +" " +this.secondName
         var date = this.getCurrentDate()
         const controlLog : ControlLog={
         name: name,
         date: date,
         site:"Stanford Road",
         pump:"Pump 2",
         description: "Turned Pump OFF"
       };
         this.http.post(this.su.serverURL+"/pumpstations/stanford-road/ps/control-log",controlLog).subscribe(()=>{})

         this.stan_p2_scada_run_command= false
         this.site_Control.saveStanPump2Run(this.stan_p2_scada_run_command)
         this.pump2OnOff=false;
           }

           onP3PowerClickOn(){

            this.p3_btn ="Start"

            var name = this.firstName +" " +this.secondName
            var date = this.getCurrentDate()
            const controlLog : ControlLog={
             name: name,
             date: date,
             site:"Stanford Road",
             pump:"Pump 3",
             description: "Turned Pump On"
           };
             this.http.post(this.su.serverURL+"/pumpstations/stanford-road/ps/control-log",controlLog).subscribe(()=>{})

             this.stan_p3_scada_run_command= true
             this.site_Control.saveStanPump3Run(this.stan_p3_scada_run_command)
             this.pump3OnOff=true;
           }
           onP3PowerClickOff(){
              this.p3_btn ="Off"

             var name = this.firstName +" " +this.secondName
             var date = this.getCurrentDate()
             const controlLog : ControlLog={
             name: name,
             date: date,
             site:"Stanford Road",
             pump:"Pump 3",
             description: "Turned Pump OFF"
           };
            //  this.http.post(this.su.serverURL+"/pumpstations/stanford-road/ps/control-log",controlLog).subscribe(()=>{})

             this.stan_p3_scada_run_command= false
             this.site_Control.saveStanPump3Run(this.stan_p3_scada_run_command)
             this.pump3OnOff=false;
               }

               onP4PowerClickOn(){

                this.p4_btn ="Start"

                var name = this.firstName +" " +this.secondName
                var date = this.getCurrentDate()
                const controlLog : ControlLog={
                 name: name,
                 date: date,
                 site:"Stanford Road",
                 pump:"Pump 4",
                 description: "Turned Pump On"
               }


                 this.stan_p4_scada_run_command= true
                 this.site_Control.saveStanPump4Run(this.stan_p4_scada_run_command)

                 this.cl.saveControlLog(controlLog)
                 this.pump4OnOff=true;
               }
               onP4PowerClickOff(){
                  this.p4_btn ="Off"

                 var name = this.firstName +" " +this.secondName
                 var date = this.getCurrentDate()
                 const controlLog : ControlLog={
                 name: name,
                 date: date,
                 site:"Stanford Road",
                 pump:"Pump 4",
                 description: "Turned Pump OFF"
               };
                //  this.http.post(this.su.serverURL+"/pumpstations/stanford-road/ps/contro-log",controlLog).subscribe(()=>{})

                 this.stan_p4_scada_run_command= false
                 this.site_Control.saveStanPump4Run(this.stan_p4_scada_run_command)
                 this.pump4OnOff=false;
                   }

  onNewSpeedPoint(form: NgForm){

this.stan_ps_scada_speed_sp = form.value.speed
var name = this.firstName +" " +this.secondName
var date = this.getCurrentDate()
const controlLog : ControlLog={
name: name,
date: date,
site:"Stanford Road",
pump:"Pump 1",
description: "Set Speed to: " + form.value.speed +" rpm"
};
this.http.post(this.su.serverURL+"/pumpstations/stanford-road/ps/control-log",controlLog).subscribe(()=>{})

this.site_Control.saveStanPumpSpeedCotrol(this.stan_ps_scada_speed_sp).subscribe((resp:any)=>{
  console.log(resp.ps_speed)
 this.stan_ps_scada_speed_sp=resp.ps_speed
})
}





ViewLogsClick(){
this.cl.GetSiteLog("Stanford Road")
}




/////////////////////////////////////////////////////////////////////////////////////////////

toggle(){


setTimeout(() => {

  if (this.stan_hawkeye_enable_control==false)
  {

    this.stan_p1_scada_run_command= false
    this.stan_p2_scada_run_command= false
    this.stan_p3_scada_run_command= false
    this.stan_p4_scada_run_command= false

    this.site_Control.saveStanPump1Run(this.stan_p1_scada_run_command)
    this.site_Control.saveStanPump2Run(this.stan_p2_scada_run_command)
    this.site_Control.saveStanPump3Run(this.stan_p3_scada_run_command)
    this.site_Control.saveStanPump4Run(this.stan_p4_scada_run_command)

  }
  var date = this.getCurrentDate()
  var name = this.firstName +" " +this.secondName
  const controlLog : ControlLog={
  name: name,
  date: date,
  site:"Stanford Road",
  pump:"All",
  description: "Hawkeye Control set to: " + this.stan_hawkeye_enable_control
  };
  this.http.post(this.su.serverURL+"/pumpstations/stanford-road/p1/control",controlLog).subscribe(()=>{})

  this.site_Control.saveStanPumpControl(this.stan_hawkeye_enable_control)
}, 100);






}

ngOnDestroy():void{
  if(this.intervalLoop){
    this.intervalLoop.unsubscribe();

  }
}

getCurrentDate(){
  var now =  new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var min = now.getMinutes();
  var date = year + '-' + month + '-' + day +" "+ hour +":" + min;
  return date;
}
}
