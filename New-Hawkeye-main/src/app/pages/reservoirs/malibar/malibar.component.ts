import { Component, OnInit } from '@angular/core';
import {malibarService} from 'src/app/Service-Files/Reservoir/reservoir.service';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';
import { Common } from 'src/app/class/common';
@Component({
  selector: 'app-malibar',
  templateUrl: './malibar.component.html',
  styleUrls: ['./malibar.component.css']
})
export class MalibarComponent implements OnInit {

  variable :any= {
    mali_ut:null,
    mali_lvl:null,
    comms:null
    }

    intervalLoop: any
    tagArr:any =[

      "mali_ut",
      "mali_lvl"

    ]
    data: any=[];

  constructor( private mali: malibarService,private authService: AuthService,public recieve:Common,private pm:pagePostMethod) {


    this.pm.findPageData("nmbm_mali_r", "R_CurrentVals").then((result) => {
      this.data =  result;

      console.log(this.data)
     this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


    this.variable.comms = Common.getLastUpdate(this.variable.mali_ut)
    });
  }

  ngOnInit() {

    // var tagVals:any=[]


    // tagVals = this.recieve.recieveNMBMVals(this.tagArr);


    this.intervalLoop = setInterval(() =>{
      this.pm.findPageData("nmbm_mali_r", "R_CurrentVals").then((result) => {
        this.data =  result;

        console.log(this.data)
       this.variable =   Common.getRouteDatas(this.tagArr,this.variable,this.data)


      this.variable.comms = Common.getLastUpdate(this.variable.mali_ut)
      });
    },60000);


  }

  ngOnDestroy(){
    if(this.intervalLoop){
      clearInterval(this.intervalLoop)
    }
  }

}
