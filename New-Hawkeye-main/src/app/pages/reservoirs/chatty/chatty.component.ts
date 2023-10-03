import { Component, OnInit} from '@angular/core';
import { ListeningService } from 'src/app/listening.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import { ChattyService} from 'src/app/Service-Files/Reservoir/chatty.service';
import { ReportService } from 'src/app/Service-Files/report.service';
import { EChartsOption } from 'echarts';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/Service-Files/users.service';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { Subscription } from 'rxjs';
import {Common} from 'src/app/class/common';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
@Component({
  selector: 'app-chatty',
  templateUrl: './chatty.component.html',
  styleUrls: ['./chatty.component.css']
})

export class ChattyComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  options: EChartsOption;
  DateArr: any;

  //So first I declare the variable and give it properties.
  variable :any= {
  cht_nc_rl:null,
  cht_sc_rl:null,
  cht_oh_rl:null,
  cht_ut:null,
  cht_fr:null,
  cht_tf:null,
  comms:null
  }

  theme:any;


  intervalLoop: any
  public authListenerSubs!: Subscription;
  userSites:string[];



  // So this is the array of valuebles we are looking for
     tagArr:any=[
    'cht_nc_rl', //0
    'cht_sc_rl', //1
    'cht_oh_rl', //2
    'cht_ut', //3
    'cht_fr', //4
    'cht_tf' //5
  ]


  testVar = 0;
  data:any=[]
  chattyTF: any;
  showNavigationButton: string;



  constructor(private webSocketService: WebSocketService,private ls:ListeningService,public rs: ReportService, private chat: ChattyService, private userService: UsersService,private authService: AuthService,public recieve:Common,private pm:pagePostMethod ) {

    this.pm.findPageData("nmbm_cht_ps_res", "PS_CurrentVals").then((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteData(this.tagArr,this.variable,this.data)


    this.variable.comms = Common.getLastUpdate(this.variable.cht_ut)
    });


  //   this.chat.GetSiteValues()
  //   .subscribe(rsp => {
  //      this.data = rsp;


  //      this.variable =   Common.getRouteData(this.tagArr,this.variable,this.data.routingArray)

  //      this.variable.comms = Common.getLastUpdate(this.variable.cht_ut)

  //   })

  //   this.theme = localStorage.getItem("theme");
  // }

  }

  ngOnInit() {
    this.showNavigationButton = "false";
    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })
    for (let i = 0; i < this.userSites.length; i++) {

      switch (this.userSites[i]) {
        case "NMB_CHT_PS":
          this.showNavigationButton = "true";
          break;
      }
    }







    var updateTemp:any;
    this.intervalLoop = setInterval(() =>{



      this.pm.findPageData("nmbm_cht_ps_res", "PS_CurrentVals").then((result) => {
        this.data =  result;

        console.log(this.data)
       this.variable =   Common.getRouteData(this.tagArr,this.variable,this.data)


      this.variable.comms = Common.getLastUpdate(this.variable.cht_ut)
      });
     },60000)





     var trend: any = {};
     this.rs.Get_Chatty_TotalFlows().subscribe(data => {
       trend=data
       this.chattyTF = trend.chattyTF;

       this.DateArr = trend.DateArr;
         var theme:any
         var tooltipBackground:any

         if (localStorage.getItem("theme") == "dark-theme"||localStorage.getItem("theme") == "dark-theme")
         {
           theme = '#FFFFFF'
           tooltipBackground = 'rgba(50,50,50,0.7)'
         }else  if (localStorage.getItem("theme") == "light-theme"||localStorage.getItem("theme") == "light-theme")
         {
         theme = '#797979'
         tooltipBackground = 'rgba(255, 255, 255, 1)'
         }
         this.options = {
           tooltip: {
             backgroundColor: tooltipBackground,
             textStyle:{ color: theme,},
              trigger: 'axis',
              position: ['10%', '10%']
            },
           grid: {
             bottom:"18%"
           },
           xAxis: {
               type: 'category',
               data: this.DateArr,
               axisLabel: { interval: 0, rotate: 90, color: theme },
           },
           yAxis:   {
             type: 'value',
             scale: true,
             name: 'Total Flow Ml',
             nameTextStyle: { color: theme},
             boundaryGap: [0.2, 0.2],
             min: 0,
             axisLabel: { rotate: 90, color: theme},
         },
           series: [
             {
             name: 'Chatty Total Flow',
               data: this.chattyTF,
               type: 'bar',
           },

         ]
         };

     })


   }

   onDateFilter(){
     var start = this.range.value.start+'';
     var end = this.range.value.end+'';

    var startARR = start.toString().split(" ")
    var endARR = end.toString().split(" ")


    switch (startARR[1]) {
     case "Jan":
       startARR[1] = "1"
         break;
         case "Feb":
           startARR[1] = "2"
             break;
             case "Mar":
               startARR[1] = "3"
                 break;
                 case "Apr":
                   startARR[1] = "4"
                     break;
                     case "May":
                       startARR[1] = "5"
                         break;
                         case "Jun":
                           startARR[1] = "6"
                             break;
                             case "Jul":
                               startARR[1] = "7"
                                 break;
                                 case "Aug":
                                   startARR[1] = "8"
                                     break;
                                     case "Sep":
                                       startARR[1] = "9"
                                         break;
                                         case "Oct":
                                           startARR[1] = "10"
                                             break;
                                             case "Nov":
                                               startARR[1] = "11"
                                                 break;
                                                 case "Dec":
                                                   startARR[1] = "12"
                                                     break;
                                                   }
 switch (endARR[1]) {
     case "Jan":
       endARR[1] = "1"
         break;
         case "Feb":
           endARR[1] = "2"
             break;
             case "Mar":
               endARR[1] = "3"
                 break;
                 case "Apr":
                   endARR[1] = "4"
                     break;
                     case "May":
                       endARR[1] = "5"
                         break;
                         case "Jun":
                           endARR[1] = "6"
                             break;
                             case "Jul":
                               endARR[1] = "7"
                                 break;
                                 case "Aug":
                                   endARR[1] = "8"
                                     break;
                                     case "Sep":
                                       endARR[1] = "9"
                                         break;
                                         case "Oct":
                                           endARR[1] = "10"
                                             break;
                                             case "Nov":
                                               endARR[1] = "11"
                                                 break;
                                                 case "Dec":
                                                   endARR[1] = "12"
                                                     break;
                                                   }

 if (startARR[1].length==1){
   startARR[1] = "0" + startARR[1]
 }

 if (endARR[1].length==1){
   endARR[1] = "0" + endARR[1]
 }


 var newStart = startARR[3] +"-"+startARR[1]+"-"+startARR[2]
 var newEnd = endARR[3] +"-"+endARR[1]+"-"+endARR[2]

 var trend :any;

 this.rs.Get_Chatty_Total_Flows_Dates(newStart, newEnd).subscribe(data => {
   trend=data

   this.chattyTF = trend.chattyTF;
   this.DateArr = trend.DateArr;
   var theme:any
   var tooltipBackground:any;

   if (localStorage.getItem("theme") == "dark-theme"||localStorage.getItem("theme") == "dark-theme")
 {
   theme = '#FFFFFF'
   tooltipBackground = 'rgba(50,50,50,0.7)'
 }else  if (localStorage.getItem("theme") == "light-theme"||localStorage.getItem("theme") == "light-theme")
 {
 theme = '#797979'
 tooltipBackground = 'rgba(255, 255, 255, 1)'
 }

 this.options = {
   tooltip: {
     backgroundColor: tooltipBackground,
     textStyle:{ color: theme,},
      trigger: 'axis',
      position: ['10%', '10%']
    },
   grid: {
     bottom:"18%"
   },

   xAxis: {
       type: 'category',
       data: this.DateArr,
       axisLabel: { interval: 0, rotate: 90, color: theme },
   },
   yAxis:   {
     type: 'value',
     scale: true,
     name: 'Total Flow Ml',
     nameTextStyle: { color: theme},
     boundaryGap: [0.2, 0.2],
     min: 0,
     axisLabel: { rotate: 90, color: theme},
 },
 series: [
  {
  name: 'Chatty Total Flow',
    data: this.chattyTF,
    type: 'bar',
},

]
 };
 })


   }
   ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }

}
