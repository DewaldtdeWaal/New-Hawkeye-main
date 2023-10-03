import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';
import {HumansdorpComponent} from 'src/app/Service-Files/WTW/wtw.service';
import { Common } from 'src/app/class/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportService } from 'src/app/Service-Files/report.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-humansdorpwtw',
  templateUrl: './humansdorpwtw.component.html',
  styleUrls: ['./humansdorpwtw.component.css']
})
export class HumansdorpwtwComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  total_flow_1_array:any
  DateArr:any
  options: EChartsOption;
  variable:any = {
    klm_hup_wtw_ut:null,

    klm_hup_wtw_FR:null,
    klm_hup_wtw_TF:null,
    comms: null,
    }
    total_flow_HD1_array:any;
    data: any=[];
    tagArr:any =[
      "klm_hup_wtw_ut",
      "klm_hup_wtw_FR",
      "klm_hup_wtw_TF",
  ]
  intervalLoop:any
  constructor( private ej: HumansdorpComponent,public recieve:Common,   public rs: ReportService,) {
    this.ej.GetSiteValues()
    .subscribe(rsp=> {
      this.data = rsp;
      this.variable =   Common.getRouteData(this.tagArr,this.variable,this.data.routingArray)
      this.variable.comms = Common.getLastUpdate(this.variable.klm_hup_wtw_ut)
    })

  }

  ngOnInit() {

    var tagVals:any = []

     tagVals = this.recieve.recieveNonMVals(this.tagArr);

    this.intervalLoop = setInterval(() =>{


      this.variable = this.recieve.NMBMAPI(tagVals, this.tagArr, this.variable);
      this.variable.comms = Common.getLastUpdate(this.variable.klm_hup_wtw_ut)


      console.log(this.variable)
    },60000);


    var trend: any = {};
    this.rs.Get_HUP_INLET_TF().subscribe(data => {
      trend=data
      this.total_flow_1_array = trend.total_flow_1_array;

      this.DateArr = trend.DateArr;



  this.options = Common.getOptions(this.options,this.DateArr,"Total Flow m³","Total Flow",this.total_flow_1_array)

    }
    )

  }
  onDateFilter(){



    const newStart = new Date(this.range.value.start).toISOString().slice(0, 10);
    const newEnd = new Date(this.range.value.end).toISOString().slice(0, 10);

    var trend :any;

    this.rs.Post_HUP_INLET_TF(newStart, newEnd).subscribe(data => {
    trend=data

    this.total_flow_1_array = trend.total_flow_1_array;
    this.DateArr = trend.DateArr;


    this.options = Common.getOptions(this.options,this.DateArr,"Total Flow m³","HD1 Total Flow",this.total_flow_1_array)
    })


    }
   ngOnDestroy(){
      if(this.intervalLoop){
        clearInterval(this.intervalLoop)
      }
    }

}
