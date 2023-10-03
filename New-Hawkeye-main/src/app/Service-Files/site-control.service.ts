import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServerURLService } from "./server-url.service";
import { Observable } from "rxjs";
@Injectable({ providedIn: "root" })

export class SiteControlService {

  constructor(private http: HttpClient, private su: ServerURLService) {}

  saveStanPumpControl(stan_hawkeye_enable_control:any){
  this.http.post(this.su.serverURL+"/pumpstations/stanfordroad/post/saveStanPumpControl",
   {stan_hawkeye_enable_control:stan_hawkeye_enable_control,})
  .subscribe((resp)=>{
console.log(resp)
  })
}


saveStanPump1Run(val:any){
  this.http.post(this.su.serverURL+"/pumpstations/stanfordroad/post/saveStanPump1Run",
   {stan_hawkeye_p1_run_control:val,})
  .subscribe((resp)=>{
console.log(resp)
  })
}


saveStanPump2Run(val:any){
  this.http.post(this.su.serverURL+"/pumpstations/stanfordroad/post/saveStanPump2Run",
   {stan_hawkeye_p2_run_control:val,})
  .subscribe((resp)=>{
console.log(resp)
  })
}

saveStanPump3Run(val:any){
  this.http.post(this.su.serverURL+"/pumpstations/stanfordroad/post/saveStanPump3Run",
   {stan_hawkeye_p3_run_control:val,})
  .subscribe((resp)=>{
console.log(resp)
  })
}

saveStanPump4Run(val:any){
  this.http.post(this.su.serverURL+"/pumpstations/stanfordroad/post/saveStanPump4Run",
   {stan_hawkeye_p4_run_control:val,})
  .subscribe((resp)=>{
console.log(resp)
  })
}

saveStanPumpSpeedCotrol(val:any){
return  this.http.post(this.su.serverURL+"/pumpstations/stanfordroad/post/saveStanPumpSpeedCotrol",
   {stan_hawkeye_ps_speed_control:val,})
}


// saveStanControlbyte(bool_con:any,bool_p1:any,bool_p2:any,bool_p3:any,bool_p4:any,){
//   this.http.post(this.su.serverURL+"/pumpstations/stanfordroad/post/controltoggle",
//    {bool_con:bool_con,
//     bool_p1:bool_p1,
//     bool_p2:bool_p2,
//     bool_p3:bool_p3,
//     bool_p4:bool_p4})
//   .subscribe((resp)=>{
// console.log(resp)
//   })
// }

  getStanControlByte():Observable<any[]>{
    return this.http.get<any[]>(this.su.serverURL+"/pumpstations/stanfordroad/get/controltoggle") //

}




saveTestPumpControl(test_hawkeye_enable_control:any){
  this.http.post(this.su.serverURL+"/pumpstations/testPumpstation/post/saveTestPumpControl",
   {test_hawkeye_enable_control:test_hawkeye_enable_control,})
  .subscribe((resp)=>{
console.log(resp)
  })
}


}
