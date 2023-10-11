import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { AuthService } from 'src/app/Service-Files/auth.service';
import { ReportService } from 'src/app/Service-Files/report.service';
import { UsersService } from 'src/app/Service-Files/users.service';
import { WebSocketService } from 'src/app/Service-Files/web-socket.service';

import {MatDialog} from '@angular/material/dialog';


import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
export interface PeriodicElement {
  name: string;
  min: number;
  max: number;
  average: number;
}
@Component({
  selector: 'app-waplaastrends',
  templateUrl: './waplaastrends.component.html',
  styleUrls: ['./waplaastrends.component.css']
})


export class WaplaastrendsComponent implements OnInit {
  isLoading: boolean = false;
  options: any;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
newStart:any
newEnd:any

public authListenerSubs!: Subscription;
userSites:string[];

  Sites = new FormControl();
  SitesList: string[] = [];

  Right = new FormControl();

//#region Arrays
  WES_FL_P1_FEED_A_array:any[]=[]
  WES_FL_P1_FEED_B_array:any[]=[]
  WES_FL_P1_FEED_C_array:any[]=[]
  WES_FL_P2_FEED_A_array:any[]=[]
  WES_FL_P2_FEED_B_array:any[]=[]
  WES_FL_P2_FEED_C_array:any[]=[]
  WES_FL_P3_FEED_A_array:any[]=[]
  WES_FL_P3_FEED_B_array:any[]=[]
  WES_FL_P3_FEED_C_array:any[]=[]
  WES_FL_P4_FEED_A_array:any[]=[]
  WES_FL_P4_FEED_B_array:any[]=[]
  WES_FL_P4_FEED_C_array:any[]=[]
  WES_FL_P5_FEED_A_array:any[]=[]
  WES_FL_P5_FEED_B_array:any[]=[]
  WES_FL_P5_FEED_C_array:any[]=[]
  WES_FL_P6_FEED_A_array:any[]=[]
  WES_FL_P6_FEED_B_array:any[]=[]
  WES_FL_P6_FEED_C_array:any[]=[]
  WES_FL_P7_FEED_A_array:any[]=[]
  WES_FL_P7_FEED_B_array:any[]=[]
  WES_FL_P7_FEED_C_array:any[]=[]
  WES_FL_P8_FEED_A_array:any[]=[]
  WES_FL_P8_FEED_B_array:any[]=[]
  WES_FL_P8_FEED_C_array:any[]=[]
  WES_FL_P9_FEED_A_array:any[]=[]
  WES_FL_P9_FEED_B_array:any[]=[]
  WES_FL_P9_FEED_C_array:any[]=[]
  WES_FL_P10_FEED_A_array:any[]=[]
  WES_FL_P10_FEED_B_array:any[]=[]
  WES_FL_P10_FEED_C_array:any[]=[]
  WES_FL_P11_FEED_A_array:any[]=[]
  WES_FL_P11_FEED_B_array:any[]=[]
  WES_FL_P11_FEED_C_array:any[]=[]
  WES_FL_P12_FEED_A_array:any[]=[]
  WES_FL_P12_FEED_B_array:any[]=[]
  WES_FL_P12_FEED_C_array:any[]=[]
  WES_FL_FEED_A_TOTAL_array:any[]=[]
  WES_FL_FEED_B_TOTAL_array:any[]=[]
  WES_FL_FEED_C_TOTAL_array:any[]=[]
  WES_FL_SA_SILO_LEVELS_array:any[]=[]
  WES_FL_SB_SILO_LEVELS_array:any[]=[]
  WES_FL_SC_SILO_LEVELS_array:any[]=[]
  WES_FL_P1_LAMBS_array:any[]=[]
  WES_FL_P2_LAMBS_array:any[]=[]
  WES_FL_P3_LAMBS_array:any[]=[]
  WES_FL_P4_LAMBS_array:any[]=[]
  WES_FL_P5_LAMBS_array:any[]=[]
  WES_FL_P6_LAMBS_array:any[]=[]
  WES_FL_P7_LAMBS_array:any[]=[]
  WES_FL_P8_LAMBS_array:any[]=[]
  WES_FL_P9_LAMBS_array:any[]=[]
  WES_FL_P10_LAMBS_array:any[]=[]
  WES_FL_P11_LAMBS_array:any[]=[]
  WES_FL_P12_LAMBS_array:any[]=[]

//#endregion

//#region Axis


  WES_FL_P1_FEED_A_axis:any
  WES_FL_P1_FEED_B_axis:any
  WES_FL_P1_FEED_C_axis:any
  WES_FL_P2_FEED_A_axis:any
  WES_FL_P2_FEED_B_axis:any
  WES_FL_P2_FEED_C_axis:any
  WES_FL_P3_FEED_A_axis:any
  WES_FL_P3_FEED_B_axis:any
  WES_FL_P3_FEED_C_axis:any
  WES_FL_P4_FEED_A_axis:any
  WES_FL_P4_FEED_B_axis:any
  WES_FL_P4_FEED_C_axis:any
  WES_FL_P5_FEED_A_axis:any
  WES_FL_P5_FEED_B_axis:any
  WES_FL_P5_FEED_C_axis:any
  WES_FL_P6_FEED_A_axis:any
  WES_FL_P6_FEED_B_axis:any
  WES_FL_P6_FEED_C_axis:any
  WES_FL_P7_FEED_A_axis:any
  WES_FL_P7_FEED_B_axis:any
  WES_FL_P7_FEED_C_axis:any
  WES_FL_P8_FEED_A_axis:any
  WES_FL_P8_FEED_B_axis:any
  WES_FL_P8_FEED_C_axis:any
  WES_FL_P9_FEED_A_axis:any
  WES_FL_P9_FEED_B_axis:any
  WES_FL_P9_FEED_C_axis:any
  WES_FL_P10_FEED_A_axis:any
  WES_FL_P10_FEED_B_axis:any
  WES_FL_P10_FEED_C_axis:any
  WES_FL_P11_FEED_A_axis:any
  WES_FL_P11_FEED_B_axis:any
  WES_FL_P11_FEED_C_axis:any
  WES_FL_P12_FEED_A_axis:any
  WES_FL_P12_FEED_B_axis:any
  WES_FL_P12_FEED_C_axis:any
  WES_FL_FEED_A_TOTAL_axis:any
  WES_FL_FEED_B_TOTAL_axis:any
  WES_FL_FEED_C_TOTAL_axis:any
  WES_FL_SA_SILO_LEVELS_axis:any
  WES_FL_SB_SILO_LEVELS_axis:any
  WES_FL_SC_SILO_LEVELS_axis:any
  WES_FL_P1_LAMBS_axis:any
  WES_FL_P2_LAMBS_axis:any
  WES_FL_P3_LAMBS_axis:any
  WES_FL_P4_LAMBS_axis:any
  WES_FL_P5_LAMBS_axis:any
  WES_FL_P6_LAMBS_axis:any
  WES_FL_P7_LAMBS_axis:any
  WES_FL_P8_LAMBS_axis:any
  WES_FL_P9_LAMBS_axis:any
  WES_FL_P10_LAMBS_axis:any
  WES_FL_P11_LAMBS_axis:any
  WES_FL_P12_LAMBS_axis:any
//#endregion

filterValue: any="";
ELEMENT_DATA: PeriodicElement[] = [];
displayedColumns :string[]= ['name','min', 'max', 'average'];

dataSource:any;


animal: string;
name: string ;
gamtoosArr:string[]

selectedTags:string[]

  onTrendFilter(){
    this.isLoading=true;

    this.WES_FL_P1_FEED_A_axis = 0
    this.WES_FL_P1_FEED_B_axis = 0
    this.WES_FL_P1_FEED_C_axis = 0
    this.WES_FL_P2_FEED_A_axis = 0
    this.WES_FL_P2_FEED_B_axis = 0
    this.WES_FL_P2_FEED_C_axis = 0
    this.WES_FL_P3_FEED_A_axis = 0
    this.WES_FL_P3_FEED_B_axis = 0
    this.WES_FL_P3_FEED_C_axis = 0
    this.WES_FL_P4_FEED_A_axis = 0
    this.WES_FL_P4_FEED_B_axis = 0
    this.WES_FL_P4_FEED_C_axis = 0
    this.WES_FL_P5_FEED_A_axis = 0
    this.WES_FL_P5_FEED_B_axis = 0
    this.WES_FL_P5_FEED_C_axis = 0
    this.WES_FL_P6_FEED_A_axis = 0
    this.WES_FL_P6_FEED_B_axis = 0
    this.WES_FL_P6_FEED_C_axis = 0
    this.WES_FL_P7_FEED_A_axis = 0
    this.WES_FL_P7_FEED_B_axis = 0
    this.WES_FL_P7_FEED_C_axis = 0
    this.WES_FL_P8_FEED_A_axis = 0
    this.WES_FL_P8_FEED_B_axis = 0
    this.WES_FL_P8_FEED_C_axis = 0
    this.WES_FL_P9_FEED_A_axis = 0
    this.WES_FL_P9_FEED_B_axis = 0
    this.WES_FL_P9_FEED_C_axis = 0
    this.WES_FL_P10_FEED_A_axis = 0
    this.WES_FL_P10_FEED_B_axis = 0
    this.WES_FL_P10_FEED_C_axis = 0
    this.WES_FL_P11_FEED_A_axis = 0
    this.WES_FL_P11_FEED_B_axis = 0
    this.WES_FL_P11_FEED_C_axis = 0
    this.WES_FL_P12_FEED_A_axis = 0
    this.WES_FL_P12_FEED_B_axis = 0
    this.WES_FL_P12_FEED_C_axis = 0
    this.WES_FL_FEED_A_TOTAL_axis = 0
    this.WES_FL_FEED_B_TOTAL_axis = 0
    this.WES_FL_FEED_C_TOTAL_axis = 0
    this.WES_FL_SA_SILO_LEVELS_axis = 0
    this.WES_FL_SB_SILO_LEVELS_axis = 0
    this.WES_FL_SC_SILO_LEVELS_axis = 0
    this.WES_FL_P1_LAMBS_axis = 0
    this.WES_FL_P2_LAMBS_axis = 0
    this.WES_FL_P3_LAMBS_axis = 0
    this.WES_FL_P4_LAMBS_axis = 0
    this.WES_FL_P5_LAMBS_axis = 0
    this.WES_FL_P6_LAMBS_axis = 0
    this.WES_FL_P7_LAMBS_axis = 0
    this.WES_FL_P8_LAMBS_axis = 0
    this.WES_FL_P9_LAMBS_axis = 0
    this.WES_FL_P10_LAMBS_axis = 0
    this.WES_FL_P11_LAMBS_axis = 0
    this.WES_FL_P12_LAMBS_axis = 0

    if(this.Right.value!=null){

      for(var i=0; i<this.Right.value.length; i++){
        switch (this.Right.value[i]) {

        case "Feedlot 1 A":
          this.WES_FL_P1_FEED_A_axis=1
          break;

         case "Feedlot 1 B":
          this.WES_FL_P1_FEED_B_axis=1
          break;

        case "Feedlot 1 C":
          this.WES_FL_P1_FEED_C_axis=1
          break;


          case "Feedlot 2 A":
          this.WES_FL_P2_FEED_A_axis=1
          break;

         case "Feedlot 2 B":
          this.WES_FL_P2_FEED_B_axis=1
          break;

        case "Feedlot 2 C":
          this.WES_FL_P2_FEED_C_axis=1
          break;

        case "Feedlot 3 A":
          this.WES_FL_P3_FEED_A_axis=1
          break;

         case "Feedlot 3 B":
          this.WES_FL_P3_FEED_B_axis=1
          break;

        case "Feedlot 3 C":
          this.WES_FL_P3_FEED_C_axis=1
          break;


        case "Feedlot 4 A":
          this.WES_FL_P4_FEED_A_axis=1
          break;

         case "Feedlot 4 B":
          this.WES_FL_P4_FEED_B_axis=1
          break;

        case "Feedlot 4 C":
          this.WES_FL_P4_FEED_C_axis=1
          break;

        case "Feedlot 5 A":
          this.WES_FL_P5_FEED_A_axis=1
          break;

         case "Feedlot 5 B":
          this.WES_FL_P5_FEED_B_axis=1
          break;

        case "Feedlot 5 C":
          this.WES_FL_P5_FEED_C_axis=1
          break;


        case "Feedlot 6 A":
          this.WES_FL_P6_FEED_A_axis=1
          break;

         case "Feedlot 6 B":
          this.WES_FL_P6_FEED_B_axis=1
          break;

        case "Feedlot 6 C":
          this.WES_FL_P6_FEED_C_axis=1
          break;

          case "Feedlot 7 A":
            this.WES_FL_P7_FEED_A_axis=1
            break;

           case "Feedlot 7 B":
            this.WES_FL_P7_FEED_B_axis=1
            break;

          case "Feedlot 7 C":
            this.WES_FL_P7_FEED_C_axis=1
            break;


            case "Feedlot 8 A":
            this.WES_FL_P8_FEED_A_axis=1
            break;

           case "Feedlot 8 B":
            this.WES_FL_P8_FEED_B_axis=1
            break;

          case "Feedlot 8 C":
            this.WES_FL_P8_FEED_C_axis=1
            break;

          case "Feedlot 9 A":
            this.WES_FL_P9_FEED_A_axis=1
            break;

           case "Feedlot 9 B":
            this.WES_FL_P9_FEED_B_axis=1
            break;

          case "Feedlot 9 C":
            this.WES_FL_P9_FEED_C_axis=1
            break;


          case "Feedlot 10 A":
            this.WES_FL_P10_FEED_A_axis=1
            break;

           case "Feedlot 10 B":
            this.WES_FL_P10_FEED_B_axis=1
            break;

          case "Feedlot 10 C":
            this.WES_FL_P10_FEED_C_axis=1
            break;

          case "Feedlot 11 A":
            this.WES_FL_P11_FEED_A_axis=1
            break;

           case "Feedlot 11 B":
            this.WES_FL_P11_FEED_B_axis=1
            break;

          case "Feedlot 11 C":
            this.WES_FL_P11_FEED_C_axis=1
            break;


          case "Feedlot 12 A":
            this.WES_FL_P12_FEED_A_axis=1
            break;

           case "Feedlot 12 B":
            this.WES_FL_P12_FEED_B_axis=1
            break;

          case "Feedlot 12 C":
            this.WES_FL_P12_FEED_C_axis=1
            break;

          case "Feedlot A Total":
            this.WES_FL_FEED_A_TOTAL_axis=1
            break;

          case "Feedlot B Total":
            this.WES_FL_FEED_B_TOTAL_axis=1
            break;

            case "Feedlot C Total":
              this.WES_FL_FEED_C_TOTAL_axis=1
              break;

          case "Silo A Levels":
            this.WES_FL_SA_SILO_LEVELS_axis=1
            break;

          case "Silo B Levels":
            this.WES_FL_SB_SILO_LEVELS_axis=1
            break;

          case "Silo C Levels":
            this.WES_FL_SC_SILO_LEVELS_axis=1
            break;

          case "Feedlot 1 Lambs":
            this.WES_FL_P1_LAMBS_axis=1
            break;

          case "Feedlot 2 Lambs":
            this.WES_FL_P2_LAMBS_axis=1
            break;

          case "Feedlot 3 Lambs":
            this.WES_FL_P1_LAMBS_axis=1
            break;

          case "Feedlot 4 Lambs":
            this.WES_FL_P4_LAMBS_axis=1
            break;

         case "Feedlot 5 Lambs":
           this.WES_FL_P5_LAMBS_axis=1
           break;

         case "Feedlot 6 Lambs":
           this.WES_FL_P6_LAMBS_axis=1
           break;


        case "Feedlot 7 Lambs":
          this.WES_FL_P7_LAMBS_axis=1
          break;

        case "Feedlot 8 Lambs":
         this.WES_FL_P8_LAMBS_axis=1
          break;

        case "Feedlot 9 Lambs":
          this.WES_FL_P9_LAMBS_axis=1
          break;

        case "Feedlot 10 Lambs":
          this.WES_FL_P10_LAMBS_axis=1
          break;

       case "Feedlot 11 Lambs":
         this.WES_FL_P11_LAMBS_axis=1
          break;

        case "Feedlot 12 Lambs":
         this.WES_FL_P12_LAMBS_axis=1
         break;

        }
      }

    }

    //#region Date Configuration

    var start = this.range.value.start;
    var end = this.range.value.end;

    if (start!=null && end!=null){
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
this.newStart = startARR[3] +"-"+startARR[1]+"-"+startARR[2]
this.newEnd = endARR[3] +"-"+endARR[1]+"-"+endARR[2]
    }
    //#endregion

    var trend :any;
    if (this.Sites.value==null || this.Sites.value==undefined){}
    else{
    // this.rs.GetTrend_Sites(this.Sites.value,this.newStart,this.newEnd).subscribe(data => {
      console.log(this.Sites.value)
      console.log(this.selectedTags)
      this.rs.GetWesTrend_Sites(this.Sites.value,this.newStart,this.newEnd).then((data) => {


     trend= data

  this.WES_FL_P1_FEED_A_array = trend.WES_FL_P1_FEED_A_array
  this.WES_FL_P1_FEED_B_array = trend.WES_FL_P1_FEED_B_array
  this.WES_FL_P1_FEED_C_array = trend.WES_FL_P1_FEED_C_array
  this.WES_FL_P2_FEED_A_array = trend.WES_FL_P2_FEED_A_array
  this.WES_FL_P2_FEED_B_array = trend.WES_FL_P2_FEED_B_array
  this.WES_FL_P2_FEED_C_array = trend.WES_FL_P2_FEED_C_array
  this.WES_FL_P3_FEED_A_array = trend.WES_FL_P3_FEED_A_array
  this.WES_FL_P3_FEED_B_array = trend.WES_FL_P3_FEED_B_array
  this.WES_FL_P3_FEED_C_array = trend.WES_FL_P3_FEED_C_array
  this.WES_FL_P4_FEED_A_array = trend.WES_FL_P4_FEED_A_array
  this.WES_FL_P4_FEED_B_array = trend.WES_FL_P4_FEED_B_array
  this.WES_FL_P4_FEED_C_array = trend.WES_FL_P4_FEED_C_array
  this.WES_FL_P5_FEED_A_array = trend.WES_FL_P5_FEED_A_array
  this.WES_FL_P5_FEED_B_array = trend.WES_FL_P5_FEED_B_array
  this.WES_FL_P5_FEED_C_array = trend.WES_FL_P5_FEED_C_array
  this.WES_FL_P6_FEED_A_array = trend.WES_FL_P6_FEED_A_array
  this.WES_FL_P6_FEED_B_array = trend.WES_FL_P6_FEED_B_array
  this.WES_FL_P6_FEED_C_array = trend.WES_FL_P6_FEED_C_array
  this.WES_FL_P7_FEED_A_array = trend.WES_FL_P7_FEED_A_array
  this.WES_FL_P7_FEED_B_array = trend.WES_FL_P7_FEED_B_array
  this.WES_FL_P7_FEED_C_array = trend.WES_FL_P7_FEED_C_array
  this.WES_FL_P8_FEED_A_array = trend.WES_FL_P8_FEED_A_array
  this.WES_FL_P8_FEED_B_array = trend.WES_FL_P8_FEED_B_array
  this.WES_FL_P8_FEED_C_array = trend.WES_FL_P8_FEED_C_array
  this.WES_FL_P9_FEED_A_array = trend.WES_FL_P9_FEED_A_array
  this.WES_FL_P9_FEED_B_array = trend.WES_FL_P9_FEED_B_array
  this.WES_FL_P9_FEED_C_array = trend.WES_FL_P9_FEED_C_array
  this.WES_FL_P10_FEED_A_array = trend.WES_FL_P10_FEED_A_array
  this.WES_FL_P10_FEED_B_array = trend.WES_FL_P10_FEED_B_array
  this.WES_FL_P10_FEED_C_array = trend.WES_FL_P10_FEED_C_array
  this.WES_FL_P11_FEED_A_array = trend.WES_FL_P11_FEED_A_array
  this.WES_FL_P11_FEED_B_array = trend.WES_FL_P11_FEED_B_array
  this.WES_FL_P11_FEED_C_array = trend.WES_FL_P11_FEED_C_array
  this.WES_FL_P12_FEED_A_array = trend.WES_FL_P12_FEED_A_array
  this.WES_FL_P12_FEED_B_array = trend.WES_FL_P12_FEED_B_array
  this.WES_FL_P12_FEED_C_array = trend.WES_FL_P12_FEED_C_array
  this.WES_FL_FEED_A_TOTAL_array = trend.WES_FL_FEED_A_TOTAL_array
  this.WES_FL_FEED_B_TOTAL_array = trend.WES_FL_FEED_B_TOTAL_array
  this.WES_FL_FEED_C_TOTAL_array = trend.WES_FL_FEED_C_TOTAL_array
  this.WES_FL_SA_SILO_LEVELS_array = trend.WES_FL_SA_SILO_LEVELS_array
  this.WES_FL_SB_SILO_LEVELS_array = trend.WES_FL_SB_SILO_LEVELS_array
  this.WES_FL_SC_SILO_LEVELS_array = trend.WES_FL_SC_SILO_LEVELS_array
  this.WES_FL_P1_LAMBS_array = trend.WES_FL_P1_LAMBS_array
  this.WES_FL_P2_LAMBS_array = trend.WES_FL_P2_LAMBS_array
  this.WES_FL_P3_LAMBS_array = trend.WES_FL_P3_LAMBS_array
  this.WES_FL_P4_LAMBS_array = trend.WES_FL_P4_LAMBS_array
  this.WES_FL_P5_LAMBS_array = trend.WES_FL_P5_LAMBS_array
  this.WES_FL_P6_LAMBS_array = trend.WES_FL_P6_LAMBS_array
  this.WES_FL_P7_LAMBS_array = trend.WES_FL_P7_LAMBS_array
  this.WES_FL_P8_LAMBS_array = trend.WES_FL_P8_LAMBS_array
  this.WES_FL_P9_LAMBS_array = trend.WES_FL_P9_LAMBS_array
  this.WES_FL_P10_LAMBS_array = trend.WES_FL_P10_LAMBS_array
  this.WES_FL_P11_LAMBS_array = trend.WES_FL_P11_LAMBS_array
  this.WES_FL_P12_LAMBS_array = trend.WES_FL_P12_LAMBS_array


  var theme:any
  var tooltipBackground:any
  var countD =0 ;
  var countL =0 ;


  this.TrendInfoTable(this.Sites.value)

  if (localStorage.getItem("theme") == "dark-theme")
       {
         theme = '#FFFFFF'
         tooltipBackground = 'rgba(50,50,50,0.7)'
         countD++
         countL=0
  if (countD==1) {}
       }else if (localStorage.getItem("theme") == "light-theme")
       {
       theme = '#797979'
       tooltipBackground = 'rgba(255, 255, 255, 1)'
       countL++
       countD=0
       if (countL==1) {}
    }

    this.options = {
      grid: {
        left: '6%',
        right: '7%',
        top:'10%',
        bottom: '10%',
        containLabel: true
    },
    toolbox:{
    feature: {
    feature: {
      saveAsImage: {}
    }

    }},

    dataZoom:[{

    type: 'slider',
    start: 0,
    end: 100,
    paddingTop:'10px',
    handleSize: 8

    },
    { start: 0,
     end:100}
    ],
    tooltip: {
      backgroundColor: tooltipBackground,
      textStyle:{ color: theme,},
      axisPointer: {
        type: 'cross'
      },
       trigger: 'axis',

       position: ['10%', '10%']

     },
      legend:{
        //bottom: 'bottom',
        data: this.Sites.value,
          top:'auto',
    type:'scroll',
    textStyle: {color:theme },
             },
             axisPointer:{

                  color: {color: theme}

             },

      xAxis: {
        type: 'time'  ,
        axisLabel: {color: theme},
        splitLine: {
          show: true
        },
      },
      yAxis: [
        {
          axisLabel: {color: theme},
        type: 'value',
        boundaryGap: [0, 0.05],
        },
        {
          axisLabel: {color: theme},
        type: 'value',
        boundaryGap: [0, 0.05],
        }

    ],

    //reservoir
      series: [{
        name: 'Feedlot 1 A',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P1_FEED_A_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P1_FEED_A_axis,
      },
      {
        name: 'Feedlot 1 B',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P1_FEED_B_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P1_FEED_B_axis,
      },
      {
        name: 'Feedlot 1 C',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P1_FEED_C_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P1_FEED_C_axis,
      },
      {
        name: 'Feedlot 2 A',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P2_FEED_A_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P2_FEED_A_axis,
      },
      {
        name: 'Feedlot 2 B',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P2_FEED_B_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P2_FEED_B_axis,
      },
      {
        name: 'Feedlot 2 C',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P2_FEED_C_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P2_FEED_C_axis,
      },
      {
        name: 'Feedlot 3 A',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P3_FEED_A_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P3_FEED_A_axis,
      },
      {
        name: 'Feedlot 3 B',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P3_FEED_B_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P3_FEED_B_axis,
      },
      {
        name: 'Feedlot 3 C',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P3_FEED_C_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P3_FEED_C_axis,
      },
      {
        name: 'Feedlot 4 A',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P4_FEED_A_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P4_FEED_A_axis,
      },
      {
        name: 'Feedlot 4 B',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P4_FEED_B_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P4_FEED_B_axis,
      },
      {
        name: 'Feedlot 4 C',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P4_FEED_C_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P4_FEED_C_axis,
      },
      {
        name: 'Feedlot 5 A',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P5_FEED_A_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P5_FEED_A_axis,
      },
      {
        name: 'Feedlot 5 B',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P5_FEED_B_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P5_FEED_B_axis,
      },
      {
        name: 'Feedlot 5 C',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P5_FEED_C_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P5_FEED_C_axis,
      },
      {
        name: 'Feedlot 6 A',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P6_FEED_A_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P6_FEED_A_axis,
      },
      {
        name: 'Feedlot 6 B',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P6_FEED_B_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P6_FEED_B_axis,
      },
      {
        name: 'Feedlot 6 C',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P6_FEED_C_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P6_FEED_C_axis,
      },
      {
        name: 'Feedlot 7 A',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P7_FEED_A_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P7_FEED_A_axis,
      },
      {
        name: 'Feedlot 7 B',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P7_FEED_B_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P7_FEED_B_axis,
      },
      {
        name: 'Feedlot 7 C',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P7_FEED_C_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P7_FEED_C_axis,
      },
      {
        name: 'Feedlot 8 A',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P8_FEED_A_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P8_FEED_A_axis,
      },
      {
        name: 'Feedlot 8 B',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P8_FEED_B_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P8_FEED_B_axis,
      },
      {
        name: 'Feedlot 8 C',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P8_FEED_C_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P8_FEED_C_axis,
      },
      {
        name: 'Feedlot 9 A',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P9_FEED_A_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P9_FEED_A_axis,
      },
      {
        name: 'Feedlot 9 B',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P9_FEED_B_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P9_FEED_B_axis,
      },
      {
        name: 'Feedlot 9 C',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P9_FEED_C_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P9_FEED_C_axis,
      },
      {
        name: 'Feedlot 10 A',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P10_FEED_A_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P10_FEED_A_axis,
      },
      {
        name: 'Feedlot 10 B',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P10_FEED_B_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P10_FEED_B_axis,
      },
      {
        name: 'Feedlot 10 C',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P10_FEED_C_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P10_FEED_C_axis,
      },
      {
        name: 'Feedlot 11 A',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P11_FEED_A_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P11_FEED_A_axis,
      },
      {
        name: 'Feedlot 11 B',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P11_FEED_B_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P11_FEED_B_axis,
      },
      {
        name: 'Feedlot 11 C',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P11_FEED_C_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P11_FEED_C_axis,
      },
      {
        name: 'Feedlot 12 A',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P12_FEED_A_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P12_FEED_A_axis,
      },
      {
        name: 'Feedlot 12 B',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P12_FEED_B_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P12_FEED_B_axis,
      },
      {
        name: 'Feedlot 12 C',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P12_FEED_C_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P12_FEED_C_axis,
      },
      {
        name: 'Feedlot A Total',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_FEED_A_TOTAL_array,
        smooth: true,
        yAxisIndex:this.WES_FL_FEED_A_TOTAL_axis,
      },
      {
        name: 'Feedlot B Total',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_FEED_B_TOTAL_array,
        smooth: true,
        yAxisIndex:this.WES_FL_FEED_B_TOTAL_axis,
      },
      {
        name: 'Feedlot C Total',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_FEED_C_TOTAL_array,
        smooth: true,
        yAxisIndex:this.WES_FL_FEED_C_TOTAL_axis,
      },
      {
        name: 'Silo A Levels',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_SA_SILO_LEVELS_array,
        smooth: true,
        yAxisIndex:this.WES_FL_SA_SILO_LEVELS_axis,
      },
      {
        name: 'Silo B Levels',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_SB_SILO_LEVELS_array,
        smooth: true,
        yAxisIndex:this.WES_FL_SB_SILO_LEVELS_axis,
      },
      {
        name: 'Silo C Levels',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_SC_SILO_LEVELS_array,
        smooth: true,
        yAxisIndex:this.WES_FL_SC_SILO_LEVELS_axis,
      },
      {
        name: 'Feedlot 1 Lambs',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P1_LAMBS_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P1_LAMBS_axis,
      },
      {
        name: 'Feedlot 2 Lambs',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P2_LAMBS_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P2_LAMBS_axis,
      },
      {
        name: 'Feedlot 3 Lambs',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P3_LAMBS_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P3_LAMBS_axis,
      },
      {
        name: 'Feedlot 4 Lambs',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P4_LAMBS_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P4_LAMBS_axis,
      },
      {
        name: 'Feedlot 5 Lambs',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P5_LAMBS_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P5_LAMBS_axis,
      },
      {
        name: 'Feedlot 6 Lambs',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P6_LAMBS_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P6_LAMBS_axis,
      },
      {
        name: 'Feedlot 7 Lambs',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P7_LAMBS_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P7_LAMBS_axis,
      },
      {
        name: 'Feedlot 8 Lambs',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P8_LAMBS_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P8_LAMBS_axis,
      },
      {
        name: 'Feedlot 9 Lambs',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P9_LAMBS_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P9_LAMBS_axis,
      },
      {
        name: 'Feedlot 10 Lambs',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P10_LAMBS_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P10_LAMBS_axis,
      },
      {
        name: 'Feedlot 11 Lambs',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P11_LAMBS_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P11_LAMBS_axis,
      },
      {
        name: 'Feedlot 12 Lambs',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: this.WES_FL_P12_LAMBS_array,
        smooth: true,
        yAxisIndex:this.WES_FL_P12_LAMBS_axis,
      },




    ]
  };
    this.isLoading=false;

  })

}
}

  constructor(public dialog: MatDialog ,public rs: ReportService,private authService: AuthService, private userService: UsersService, private webSocketService: WebSocketService) { }


  ngOnInit() {


    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })

var count=0

for (let i = 0; i < this.userSites.length; i++) {

  switch (this.userSites[i]) {

    case "WES_FL":
      this.SitesList[count]="Feedlot 1 A"
      count++
      this.SitesList[count]="Feedlot 1 B"
      count++
      this.SitesList[count]="Feedlot 1 C"
      count++
      this.SitesList[count]="Feedlot 2 A"
      count++
      this.SitesList[count]="Feedlot 2 B"
      count++
      this.SitesList[count]="Feedlot 2 C"
      count++
      this.SitesList[count]="Feedlot 3 A"
      count++
      this.SitesList[count]="Feedlot 3 B"
      count++
      this.SitesList[count]="Feedlot 3 C"
      count++
      this.SitesList[count]="Feedlot 4 A"
      count++
      this.SitesList[count]="Feedlot 4 B"
      count++
      this.SitesList[count]="Feedlot 4 C"
      count++
      this.SitesList[count]="Feedlot 5 A"
      count++
      this.SitesList[count]="Feedlot 5 B"
      count++
      this.SitesList[count]="Feedlot 5 C"
      count++
      this.SitesList[count]="Feedlot 6 A"
      count++
      this.SitesList[count]="Feedlot 6 B"
      count++
      this.SitesList[count]="Feedlot 6 C"
      count++
      this.SitesList[count]="Feedlot 7 A"
      count++
      this.SitesList[count]="Feedlot 7 B"
      count++
      this.SitesList[count]="Feedlot 7 C"
      count++
      this.SitesList[count]="Feedlot 8 A"
      count++
      this.SitesList[count]="Feedlot 8 B"
      count++
      this.SitesList[count]="Feedlot 8 C"
      count++
      this.SitesList[count]="Feedlot 9 A"
      count++
      this.SitesList[count]="Feedlot 9 B"
      count++
      this.SitesList[count]="Feedlot 9 C"
      count++
      this.SitesList[count]="Feedlot 10 A"
      count++
      this.SitesList[count]="Feedlot 10 B"
      count++
      this.SitesList[count]="Feedlot 10 C"
      count++
      this.SitesList[count]="Feedlot 11 A"
      count++
      this.SitesList[count]="Feedlot 11 B"
      count++
      this.SitesList[count]="Feedlot 11 C"
      count++
      this.SitesList[count]="Feedlot 12 A"
      count++
      this.SitesList[count]="Feedlot 12 B"
      count++
      this.SitesList[count]="Feedlot 12 C"
      count++
      this.SitesList[count]="Feedlot A Total"
      count++
      this.SitesList[count]="Feedlot B Total"
      count++
      this.SitesList[count]="Feedlot C Total"
      count++
      this.SitesList[count]="Silo A Levels"
      count++
      this.SitesList[count]="Silo B Levels"
      count++
      this.SitesList[count]="Silo C Levels"
      count++
      this.SitesList[count]="Feedlot 1 Lambs"
      count++
      this.SitesList[count]="Feedlot 2 Lambs"
      count++
      this.SitesList[count]="Feedlot 3 Lambs"
      count++
      this.SitesList[count]="Feedlot 4 Lambs"
      count++
      this.SitesList[count]="Feedlot 5 Lambs"
      count++
      this.SitesList[count]="Feedlot 6 Lambs"
      count++
      this.SitesList[count]="Feedlot 7 Lambs"
      count++
      this.SitesList[count]="Feedlot 8 Lambs"
      count++
      this.SitesList[count]="Feedlot 9 Lambs"
      count++
      this.SitesList[count]="Feedlot 10 Lambs"
      count++
      this.SitesList[count]="Feedlot 11 Lambs"
      count++
      this.SitesList[count]="Feedlot 12 Lambs"
      count++
      break;

  }
}

}

TrendInfoTable(sitesChosen:any[]){
  var maxValues=[]
  var minValues=[]
  var avgValues=[]
  this.dataSource=[];
  this.dataSource = new MatTableDataSource();
  this.ELEMENT_DATA=[];
  for (var m = 0; m < this.SitesList.length; m++) {
    switch (sitesChosen[m]) {

            case "Feedlot 1 A":
                if (this.WES_FL_P1_FEED_A_array.length==0){break;}
                  else{
           var arr = this.MinMaxAvg(m,this.WES_FL_P1_FEED_A_array,sitesChosen[m],"Feedlot 1 A")!
           minValues[m]= arr[0]
           maxValues[m]=arr[1]
           avgValues[m]=arr[2]
              }

                  break;


             case "Feedlot 1 B":
               if (this.WES_FL_P1_FEED_B_array.length==0){break;}
                 else{
          var arr = this.MinMaxAvg(m,this.WES_FL_P1_FEED_B_array,sitesChosen[m],"Feedlot 1 B")!
          minValues[m]= arr[0]
          maxValues[m]=arr[1]
          avgValues[m]=arr[2]
             }

                 break;

                 case "Feedlot 1 C":
                  if (this.WES_FL_P1_FEED_C_array.length==0){break;}
                    else{
             var arr = this.MinMaxAvg(m,this.WES_FL_P1_FEED_C_array,sitesChosen[m],"Feedlot 1 C")!
             minValues[m]= arr[0]
             maxValues[m]=arr[1]
             avgValues[m]=arr[2]
                }

                    break;


                 case "Feedlot 2 A":
                   if (this.WES_FL_P2_FEED_A_array.length==0){break;}
                     else{
              var arr = this.MinMaxAvg(m,this.WES_FL_P2_FEED_A_array,sitesChosen[m],"Feedlot 2 A")!
              minValues[m]= arr[0]
              maxValues[m]=arr[1]
              avgValues[m]=arr[2]
                 }

                     break;


                case "Feedlot 2 B":
                  if (this.WES_FL_P2_FEED_B_array.length==0){break;}
                    else{
             var arr = this.MinMaxAvg(m,this.WES_FL_P2_FEED_B_array,sitesChosen[m],"Feedlot 2 B")!
             minValues[m]= arr[0]
             maxValues[m]=arr[1]
             avgValues[m]=arr[2]
                }

                    break;

                    case "Feedlot 2 C":
                     if (this.WES_FL_P2_FEED_C_array.length==0){break;}
                       else{
                var arr = this.MinMaxAvg(m,this.WES_FL_P2_FEED_C_array,sitesChosen[m],"Feedlot 2 C")!
                minValues[m]= arr[0]
                maxValues[m]=arr[1]
                avgValues[m]=arr[2]
                   }

                       break;


                       case "Feedlot 3 A":
                        if (this.WES_FL_P3_FEED_A_array.length==0){break;}
                          else{
                   var arr = this.MinMaxAvg(m,this.WES_FL_P3_FEED_A_array,sitesChosen[m],"Feedlot 3 A")!
                   minValues[m]= arr[0]
                   maxValues[m]=arr[1]
                   avgValues[m]=arr[2]
                      }

                          break;


                     case "Feedlot 3 B":
                       if (this.WES_FL_P3_FEED_B_array.length==0){break;}
                         else{
                  var arr = this.MinMaxAvg(m,this.WES_FL_P3_FEED_B_array,sitesChosen[m],"Feedlot 3 B")!
                  minValues[m]= arr[0]
                  maxValues[m]=arr[1]
                  avgValues[m]=arr[2]
                     }

                         break;

                         case "Feedlot 3 C":
                          if (this.WES_FL_P3_FEED_C_array.length==0){break;}
                            else{
                     var arr = this.MinMaxAvg(m,this.WES_FL_P3_FEED_C_array,sitesChosen[m],"Feedlot 3 C")!
                     minValues[m]= arr[0]
                     maxValues[m]=arr[1]
                     avgValues[m]=arr[2]
                        }

                            break;




                               break;
                               case "Feedlot 4 A":
                                if (this.WES_FL_P4_FEED_A_array.length==0){break;}
                                  else{
                           var arr = this.MinMaxAvg(m,this.WES_FL_P4_FEED_A_array,sitesChosen[m],"Feedlot 4 A")!
                           minValues[m]= arr[0]
                           maxValues[m]=arr[1]
                           avgValues[m]=arr[2]
                              }

                                  break;


                             case "Feedlot 4 B":
                               if (this.WES_FL_P4_FEED_B_array.length==0){break;}
                                 else{
                          var arr = this.MinMaxAvg(m,this.WES_FL_P4_FEED_B_array,sitesChosen[m],"Feedlot 4 B")!
                          minValues[m]= arr[0]
                          maxValues[m]=arr[1]
                          avgValues[m]=arr[2]
                             }

                                 break;

                                 case "Feedlot 4 C":
                                  if (this.WES_FL_P4_FEED_C_array.length==0){break;}
                                    else{
                             var arr = this.MinMaxAvg(m,this.WES_FL_P4_FEED_C_array,sitesChosen[m],"Feedlot 4 C")!
                             minValues[m]= arr[0]
                             maxValues[m]=arr[1]
                             avgValues[m]=arr[2]
                                }

                                    break;


                                 case "Feedlot 5 A":
                                   if (this.WES_FL_P5_FEED_A_array.length==0){break;}
                                     else{
                              var arr = this.MinMaxAvg(m,this.WES_FL_P5_FEED_A_array,sitesChosen[m],"Feedlot 5 A")!
                              minValues[m]= arr[0]
                              maxValues[m]=arr[1]
                              avgValues[m]=arr[2]
                                 }

                                     break;


                                case "Feedlot 5 B":
                                  if (this.WES_FL_P5_FEED_B_array.length==0){break;}
                                    else{
                             var arr = this.MinMaxAvg(m,this.WES_FL_P5_FEED_B_array,sitesChosen[m],"Feedlot 5 B")!
                             minValues[m]= arr[0]
                             maxValues[m]=arr[1]
                             avgValues[m]=arr[2]
                                }

                                    break;

                                    case "Feedlot 5 C":
                                     if (this.WES_FL_P5_FEED_C_array.length==0){break;}
                                       else{
                                var arr = this.MinMaxAvg(m,this.WES_FL_P5_FEED_C_array,sitesChosen[m],"Feedlot 5 C")!
                                minValues[m]= arr[0]
                                maxValues[m]=arr[1]
                                avgValues[m]=arr[2]
                                   }

                                       break;

                                 case "Feedlot 6 A":
                                        if (this.WES_FL_P6_FEED_A_array.length==0){break;}
                                          else{
                                   var arr = this.MinMaxAvg(m,this.WES_FL_P6_FEED_A_array,sitesChosen[m],"Feedlot 6 A")!
                                   minValues[m]= arr[0]
                                   maxValues[m]=arr[1]
                                   avgValues[m]=arr[2]
                                      }

                                          break;


                                     case "Feedlot 6 B":
                                       if (this.WES_FL_P6_FEED_B_array.length==0){break;}
                                         else{
                                  var arr = this.MinMaxAvg(m,this.WES_FL_P6_FEED_B_array,sitesChosen[m],"Feedlot 6 B")!
                                  minValues[m]= arr[0]
                                  maxValues[m]=arr[1]
                                  avgValues[m]=arr[2]
                                     }

                                         break;

                                         case "Feedlot 6 C":
                                          if (this.WES_FL_P6_FEED_C_array.length==0){break;}
                                            else{
                                     var arr = this.MinMaxAvg(m,this.WES_FL_P6_FEED_C_array,sitesChosen[m],"Feedlot 6 C")!
                                     minValues[m]= arr[0]
                                     maxValues[m]=arr[1]
                                     avgValues[m]=arr[2]
                                        }

                                            break;
                                            case "Feedlot 7 A":
                                              if (this.WES_FL_P7_FEED_A_array.length==0){break;}
                                                else{
                                         var arr = this.MinMaxAvg(m,this.WES_FL_P7_FEED_A_array,sitesChosen[m],"Feedlot 7 A")!
                                         minValues[m]= arr[0]
                                         maxValues[m]=arr[1]
                                         avgValues[m]=arr[2]
                                            }

                                                break;


                                           case "Feedlot 7 B":
                                             if (this.WES_FL_P7_FEED_B_array.length==0){break;}
                                               else{
                                        var arr = this.MinMaxAvg(m,this.WES_FL_P7_FEED_B_array,sitesChosen[m],"Feedlot 7 B")!
                                        minValues[m]= arr[0]
                                        maxValues[m]=arr[1]
                                        avgValues[m]=arr[2]
                                           }

                                               break;

                                               case "Feedlot 7 C":
                                                if (this.WES_FL_P7_FEED_C_array.length==0){break;}
                                                  else{
                                           var arr = this.MinMaxAvg(m,this.WES_FL_P7_FEED_C_array,sitesChosen[m],"Feedlot 7 C")!
                                           minValues[m]= arr[0]
                                           maxValues[m]=arr[1]
                                           avgValues[m]=arr[2]
                                              }

                                                  break;


                                               case "Feedlot 8 A":
                                                 if (this.WES_FL_P8_FEED_A_array.length==0){break;}
                                                   else{
                                            var arr = this.MinMaxAvg(m,this.WES_FL_P8_FEED_A_array,sitesChosen[m],"Feedlot 8 A")!
                                            minValues[m]= arr[0]
                                            maxValues[m]=arr[1]
                                            avgValues[m]=arr[2]
                                               }

                                                   break;


                                              case "Feedlot 8 B":
                                                if (this.WES_FL_P8_FEED_B_array.length==0){break;}
                                                  else{
                                           var arr = this.MinMaxAvg(m,this.WES_FL_P8_FEED_B_array,sitesChosen[m],"Feedlot 8 B")!
                                           minValues[m]= arr[0]
                                           maxValues[m]=arr[1]
                                           avgValues[m]=arr[2]
                                              }

                                                  break;

                                                  case "Feedlot 8 C":
                                                   if (this.WES_FL_P8_FEED_C_array.length==0){break;}
                                                     else{
                                              var arr = this.MinMaxAvg(m,this.WES_FL_P8_FEED_C_array,sitesChosen[m],"Feedlot 8 C")!
                                              minValues[m]= arr[0]
                                              maxValues[m]=arr[1]
                                              avgValues[m]=arr[2]
                                                 }

                                                     break;


                                                     case "Feedlot 9 A":
                                                      if (this.WES_FL_P9_FEED_A_array.length==0){break;}
                                                        else{
                                                 var arr = this.MinMaxAvg(m,this.WES_FL_P9_FEED_A_array,sitesChosen[m],"Feedlot 9 A")!
                                                 minValues[m]= arr[0]
                                                 maxValues[m]=arr[1]
                                                 avgValues[m]=arr[2]
                                                    }

                                                        break;


                                                   case "Feedlot 9 B":
                                                     if (this.WES_FL_P9_FEED_B_array.length==0){break;}
                                                       else{
                                                var arr = this.MinMaxAvg(m,this.WES_FL_P9_FEED_B_array,sitesChosen[m],"Feedlot 9 B")!
                                                minValues[m]= arr[0]
                                                maxValues[m]=arr[1]
                                                avgValues[m]=arr[2]
                                                   }

                                                       break;

                                                       case "Feedlot 9 C":
                                                        if (this.WES_FL_P9_FEED_C_array.length==0){break;}
                                                          else{
                                                   var arr = this.MinMaxAvg(m,this.WES_FL_P9_FEED_C_array,sitesChosen[m],"Feedlot 9 C")!
                                                   minValues[m]= arr[0]
                                                   maxValues[m]=arr[1]
                                                   avgValues[m]=arr[2]
                                                      }

                                                          break;

                                                             case "Feedlot 10 A":
                                                              if (this.WES_FL_P10_FEED_A_array.length==0){break;}
                                                                else{
                                                         var arr = this.MinMaxAvg(m,this.WES_FL_P10_FEED_A_array,sitesChosen[m],"Feedlot 10 A")!
                                                         minValues[m]= arr[0]
                                                         maxValues[m]=arr[1]
                                                         avgValues[m]=arr[2]
                                                            }

                                                                break;


                                                           case "Feedlot 10 B":
                                                             if (this.WES_FL_P10_FEED_B_array.length==0){break;}
                                                               else{
                                                        var arr = this.MinMaxAvg(m,this.WES_FL_P10_FEED_B_array,sitesChosen[m],"Feedlot 10 B")!
                                                        minValues[m]= arr[0]
                                                        maxValues[m]=arr[1]
                                                        avgValues[m]=arr[2]
                                                           }

                                                               break;

                                                               case "Feedlot 10 C":
                                                                if (this.WES_FL_P10_FEED_C_array.length==0){break;}
                                                                  else{
                                                           var arr = this.MinMaxAvg(m,this.WES_FL_P10_FEED_C_array,sitesChosen[m],"Feedlot 10 C")!
                                                           minValues[m]= arr[0]
                                                           maxValues[m]=arr[1]
                                                           avgValues[m]=arr[2]
                                                              }

                                                                  break;


                                                               case "Feedlot 11 A":
                                                                 if (this.WES_FL_P11_FEED_A_array.length==0){break;}
                                                                   else{
                                                            var arr = this.MinMaxAvg(m,this.WES_FL_P11_FEED_A_array,sitesChosen[m],"Feedlot 11 A")!
                                                            minValues[m]= arr[0]
                                                            maxValues[m]=arr[1]
                                                            avgValues[m]=arr[2]
                                                               }

                                                                   break;


                                                              case "Feedlot 11 B":
                                                                if (this.WES_FL_P11_FEED_B_array.length==0){break;}
                                                                  else{
                                                           var arr = this.MinMaxAvg(m,this.WES_FL_P11_FEED_B_array,sitesChosen[m],"Feedlot 11 B")!
                                                           minValues[m]= arr[0]
                                                           maxValues[m]=arr[1]
                                                           avgValues[m]=arr[2]
                                                              }

                                                                  break;

                                                                  case "Feedlot 11 C":
                                                                   if (this.WES_FL_P11_FEED_C_array.length==0){break;}
                                                                     else{
                                                              var arr = this.MinMaxAvg(m,this.WES_FL_P11_FEED_C_array,sitesChosen[m],"Feedlot 11 C")!
                                                              minValues[m]= arr[0]
                                                              maxValues[m]=arr[1]
                                                              avgValues[m]=arr[2]
                                                                 }

                                                                     break;

                                                               case "Feedlot 12 A":
                                                                      if (this.WES_FL_P12_FEED_A_array.length==0){break;}
                                                                        else{
                                                                 var arr = this.MinMaxAvg(m,this.WES_FL_P12_FEED_A_array,sitesChosen[m],"Feedlot 12 A")!
                                                                 minValues[m]= arr[0]
                                                                 maxValues[m]=arr[1]
                                                                 avgValues[m]=arr[2]
                                                                    }

                                                                        break;


                                                                   case "Feedlot 12 B":
                                                                     if (this.WES_FL_P12_FEED_B_array.length==0){break;}
                                                                       else{
                                                                var arr = this.MinMaxAvg(m,this.WES_FL_P12_FEED_B_array,sitesChosen[m],"Feedlot 12 B")!
                                                                minValues[m]= arr[0]
                                                                maxValues[m]=arr[1]
                                                                avgValues[m]=arr[2]
                                                                   }

                                                                       break;

                                                                       case "Feedlot 12 C":
                                                                        if (this.WES_FL_P12_FEED_C_array.length==0){break;}
                                                                          else{
                                                                   var arr = this.MinMaxAvg(m,this.WES_FL_P12_FEED_C_array,sitesChosen[m],"Feedlot 12 C")!
                                                                   minValues[m]= arr[0]
                                                                   maxValues[m]=arr[1]
                                                                   avgValues[m]=arr[2]
                                                                      }

                                                                          break;
                                         case "Feedlot A Total":
                                           if (this.WES_FL_FEED_A_TOTAL_array.length==0){break;}
                                             else{
                                      var arr = this.MinMaxAvg(m,this.WES_FL_FEED_A_TOTAL_array,sitesChosen[m],"Feedlot A Total")!
                                      minValues[m]= arr[0]
                                      maxValues[m]=arr[1]
                                      avgValues[m]=arr[2]
                                         }

                                             break;

                                      case "Feedlot B Total":
                                       if (this.WES_FL_FEED_B_TOTAL_array.length==0){break;}
                                         else{
                                  var arr = this.MinMaxAvg(m,this.WES_FL_FEED_B_TOTAL_array,sitesChosen[m],"Feedlot B Total")!
                                  minValues[m]= arr[0]
                                  maxValues[m]=arr[1]
                                  avgValues[m]=arr[2]
                                     }

                                         break;



                                 case "Feedlot C Total":
                                   if (this.WES_FL_FEED_C_TOTAL_array.length==0){break;}
                                     else{
                              var arr = this.MinMaxAvg(m,this.WES_FL_FEED_C_TOTAL_array,sitesChosen[m],"Feedlot C Total")!
                              minValues[m]= arr[0]
                              maxValues[m]=arr[1]
                              avgValues[m]=arr[2]
                                 }

                                     break;


                                     case "Silo A Levels":
                                      if (this.WES_FL_SA_SILO_LEVELS_array.length==0){break;}
                                        else{
                                 var arr = this.MinMaxAvg(m,this.WES_FL_SA_SILO_LEVELS_array,sitesChosen[m],"Silo A Levels")!
                                 minValues[m]= arr[0]
                                 maxValues[m]=arr[1]
                                 avgValues[m]=arr[2]
                                    }

                                        break;

                                        case "Silo B Levels":
                                          if (this.WES_FL_SB_SILO_LEVELS_array.length==0){break;}
                                            else{
                                     var arr = this.MinMaxAvg(m,this.WES_FL_SB_SILO_LEVELS_array,sitesChosen[m],"Silo B Levels")!
                                     minValues[m]= arr[0]
                                     maxValues[m]=arr[1]
                                     avgValues[m]=arr[2]
                                        }

                                            break;



                                   case "Silo C Levels":
                                     if (this.WES_FL_SC_SILO_LEVELS_array.length==0){break;}
                                       else{
                                var arr = this.MinMaxAvg(m,this.WES_FL_SC_SILO_LEVELS_array,sitesChosen[m],"Silo C Levels")!
                                minValues[m]= arr[0]
                                maxValues[m]=arr[1]
                                avgValues[m]=arr[2]
                                   }

                                       break;

                                       case "Feedlot 1 Lambs":
                                        if (this.WES_FL_P1_LAMBS_array.length==0){break;}
                                          else{
                                   var arr = this.MinMaxAvg(m,this.WES_FL_P1_LAMBS_array,sitesChosen[m],"Feedlot 1 Lambs")!
                                   minValues[m]= arr[0]
                                   maxValues[m]=arr[1]
                                   avgValues[m]=arr[2]
                                      }

                                          break;

                                  case "Feedlot 2 Lambs":
                                    if (this.WES_FL_P2_LAMBS_array.length==0){break;}
                                      else{
                               var arr = this.MinMaxAvg(m,this.WES_FL_P2_LAMBS_array,sitesChosen[m],"Feedlot 2 Lambs")!
                               minValues[m]= arr[0]
                               maxValues[m]=arr[1]
                               avgValues[m]=arr[2]
                                  }

                                      break;

                                      case "Feedlot 3 Lambs":
                                        if (this.WES_FL_P3_LAMBS_array.length==0){break;}
                                          else{
                                   var arr = this.MinMaxAvg(m,this.WES_FL_P3_LAMBS_array,sitesChosen[m],"Feedlot 3 Lambs")!
                                   minValues[m]= arr[0]
                                   maxValues[m]=arr[1]
                                   avgValues[m]=arr[2]
                                      }

                                          break;

                                  case "Feedlot 4 Lambs":
                                    if (this.WES_FL_P4_LAMBS_array.length==0){break;}
                                      else{
                               var arr = this.MinMaxAvg(m,this.WES_FL_P4_LAMBS_array,sitesChosen[m],"Feedlot 4 Lambs")!
                               minValues[m]= arr[0]
                               maxValues[m]=arr[1]
                               avgValues[m]=arr[2]
                                  }

                                      break;

                                      case "Feedlot 5 Lambs":
                                        if (this.WES_FL_P5_LAMBS_array.length==0){break;}
                                          else{
                                   var arr = this.MinMaxAvg(m,this.WES_FL_P5_LAMBS_array,sitesChosen[m],"Feedlot 5 Lambs")!
                                   minValues[m]= arr[0]
                                   maxValues[m]=arr[1]
                                   avgValues[m]=arr[2]
                                      }

                                          break;

                                  case "Feedlot 6 Lambs":
                                    if (this.WES_FL_P6_LAMBS_array.length==0){break;}
                                      else{
                               var arr = this.MinMaxAvg(m,this.WES_FL_P6_LAMBS_array,sitesChosen[m],"Feedlot 6 Lambs")!
                               minValues[m]= arr[0]
                               maxValues[m]=arr[1]
                               avgValues[m]=arr[2]
                                  }

                                      break;

                                      case "Feedlot 7 Lambs":
                                        if (this.WES_FL_P7_LAMBS_array.length==0){break;}
                                          else{
                                   var arr = this.MinMaxAvg(m,this.WES_FL_P7_LAMBS_array,sitesChosen[m],"Feedlot 7 Lambs")!
                                   minValues[m]= arr[0]
                                   maxValues[m]=arr[1]
                                   avgValues[m]=arr[2]
                                      }

                                          break;

                                  case "Feedlot 8 Lambs":
                                    if (this.WES_FL_P8_LAMBS_array.length==0){break;}
                                      else{
                               var arr = this.MinMaxAvg(m,this.WES_FL_P8_LAMBS_array,sitesChosen[m],"Feedlot 8 Lambs")!
                               minValues[m]= arr[0]
                               maxValues[m]=arr[1]
                               avgValues[m]=arr[2]
                                  }

                                      break;

                                      case "Feedlot 9 Lambs":
                                        if (this.WES_FL_P9_LAMBS_array.length==0){break;}
                                          else{
                                   var arr = this.MinMaxAvg(m,this.WES_FL_P9_LAMBS_array,sitesChosen[m],"Feedlot 9 Lambs")!
                                   minValues[m]= arr[0]
                                   maxValues[m]=arr[1]
                                   avgValues[m]=arr[2]
                                      }

                                          break;

                                  case "Feedlot 10 Lambs":
                                    if (this.WES_FL_P10_LAMBS_array.length==0){break;}
                                      else{
                               var arr = this.MinMaxAvg(m,this.WES_FL_P10_LAMBS_array,sitesChosen[m],"Feedlot 10 Lambs")!
                               minValues[m]= arr[0]
                               maxValues[m]=arr[1]
                               avgValues[m]=arr[2]
                                  }

                                      break;

                                      case "Feedlot 11 Lambs":
                                        if (this.WES_FL_P11_LAMBS_array.length==0){break;}
                                          else{
                                   var arr = this.MinMaxAvg(m,this.WES_FL_P11_LAMBS_array,sitesChosen[m],"Feedlot 11 Lambs")!
                                   minValues[m]= arr[0]
                                   maxValues[m]=arr[1]
                                   avgValues[m]=arr[2]
                                      }

                                          break;

                                  case "Feedlot 12 Lambs":
                                    if (this.WES_FL_P12_LAMBS_array.length==0){break;}
                                      else{
                               var arr = this.MinMaxAvg(m,this.WES_FL_P12_LAMBS_array,sitesChosen[m],"Feedlot 12 Lambs")!
                               minValues[m]= arr[0]
                               maxValues[m]=arr[1]
                               avgValues[m]=arr[2]
                                  }

                                      break;





    }
}
for(var i = 0; i < sitesChosen.length;i++)
{
  this.ELEMENT_DATA[i]={ name: sitesChosen[i],min:minValues[i],max:maxValues[i],average:avgValues[i]};
}
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.filter = this.filterValue.trim().toLowerCase();



}



MinMaxAvg(m:any, siteArray:any[], sitesChosen:any, Site:string){
  var maxValues=[]
    var minValues=[]
    var avgValues=[]
      var avg: any = 0
maxValues[m] = siteArray[0][1]
minValues[m] = siteArray[0][1]
avgValues[m] = siteArray[0][1]

for (let i = 0; i < siteArray.length; i++) {

if (maxValues[m]<siteArray[i][1]) {
maxValues[m] = siteArray[i][1]
}
if (minValues[m]>siteArray[i][1]) {
minValues[m] = siteArray[i][1]
}

avg  = siteArray[i][1] + avg
}
avg = (avg/siteArray.length).toFixed(2)
avgValues[m]=avg

var arr =[minValues[m],maxValues[m],avg]
return arr
}
}
