import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServerURLService } from "../server-url.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';


@Injectable({ providedIn: "root" })
export class WesselsServicenputService {

  constructor(private http: HttpClient, private su: ServerURLService) {}


  updateFeedlot(lambs1: Number, feedType1:Number,lambs2: Number, feedType2:Number,lambs3: Number, feedType3:Number,lambs4: Number, feedType4:Number,lambs5: Number, feedType5:Number,lambs6: Number, feedType6:Number,lambs7: Number, feedType7:Number,lambs8: Number, feedType8:Number,lambs9: Number, feedType9:Number,lambs10: Number, feedType10:Number,lambs11: Number, feedType11:Number,lambs12: Number, feedType12:Number,){
    this.http.post(this.su.serverURL+"/feedlots/wessels/post",
     {wes2_fl_p1_lambs:lambs1,wes2_fl_pen1_feed_type:feedType1,
      wes2_fl_p2_lambs:lambs2,wes2_fl_pen2_feed_type:feedType2,
      wes2_fl_p3_lambs:lambs3,wes2_fl_pen3_feed_type:feedType3,
      wes2_fl_p4_lambs:lambs4,wes2_fl_pen4_feed_type:feedType4,
      wes2_fl_p5_lambs:lambs5,wes2_fl_pen5_feed_type:feedType5,
      wes2_fl_p6_lambs:lambs6,wes2_fl_pen6_feed_type:feedType6,
      wes2_fl_p7_lambs:lambs7,wes2_fl_pen7_feed_type:feedType7,
      wes2_fl_p8_lambs:lambs8,wes2_fl_pen8_feed_type:feedType8,
      wes2_fl_p9_lambs:lambs9,wes2_fl_pen9_feed_type:feedType9,
      wes2_fl_p10_lambs:lambs10,wes2_fl_pen10_feed_type:feedType10,
      wes2_fl_p11_lambs:lambs11,wes2_fl_pen11_feed_type:feedType11,
      wes2_fl_p12_lambs:lambs12,wes2_fl_pen12_feed_type:feedType12,


    }
    )

     .subscribe((resp)=>{
      console.log(resp)
        })
  }







}


