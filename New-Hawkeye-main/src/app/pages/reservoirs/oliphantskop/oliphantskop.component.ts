import { Component, Input, OnInit } from '@angular/core';
import {OliphantskopService}from 'src/app/Service-Files/Reservoir/reservoir.service';
import {Common} from 'src/app/class/common';
import {pageBuilderMethod} from "src/app/Service-Files/pageBuilder/pageBuilder.service";
import { pageBuilder} from "src/app/class/pageBulder";
import { pagePostMethod } from 'src/app/Service-Files/route/route.service';




@Component({

  selector: 'app-oliphantskop',
  templateUrl: './oliphantskop.component.html',
  styleUrls: ['./oliphantskop.component.css']
})

export class OliphantskopComponent implements OnInit {
  data: any=[];
  intervalLoop: any;

   tagArr:any =[
    "oli_ut",
    "oli_lvl",
    "batteryUnitUpdate"
  ]

  siteTitle:string = "Olifantskop";



  testArr:any = [
    "wakeupperiod",
    "lastupdate",
    "battery_status",
    "level1",
    "comms",
    "commsMatrix"
  ]

  lastUpdate:any
   jsonFormData:any;
  variables:any = {}
  title:string = "Reservoir";
  title1:string = "Communication";

  theme:any= localStorage.getItem("theme");


  commsTitle = "Last Update"
  jsonFile:string;

  constructor(public recieve:Common,public pbm:pageBuilderMethod, public pb:pageBuilder,private pm:pagePostMethod ) {

    this.fillPage()

  }

   async fillPage(){

   // pageBuilder.convertDate(this.variables)

    this.pbm.getSiteData("WBLK_OLIF_RES_BTU01",this.testArr,this.variables).then((result) => {
      this.variables =  result;

     this.variables.comms = pageBuilder.getLastUpdate(this.variables.lastupdate, this.variables.wakeupperiod)

    });

   }

  ngOnInit() {}
  ngOnDestroy(){}
}

