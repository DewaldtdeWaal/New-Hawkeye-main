import { Injectable } from "@angular/core";
import { WebSocketService } from "./Service-Files/web-socket.service";
import {MatTableDataSource} from '@angular/material/table';
import { VanStadensPSComponent } from "./pages/pump-stations/van-stadens-ps/van-stadens-ps.component";
import { ChattyPSComponent } from "./pages/pump-stations/chatty-ps/chatty-ps.component";


export interface PeriodicElement {
  alarm: string;
  description: string;
}
@Injectable({ providedIn: "root" })


export class ListeningService {
constructor(private ws: WebSocketService){}

listening(tagArr: any[]){
  for(let i = 0; i<tagArr.length ;i++){
    this.ws.listen(tagArr[i]).subscribe((data:any)=>{
      localStorage.setItem(tagArr[i],(data[tagArr[i]]));
      //               "mw_g_flowrate",   12.5

    })
  }
}

sessionlistening(tagArr: any[]){
  for(let i = 0; i<tagArr.length ;i++){
    this.ws.listen(tagArr[i]).subscribe((data:any)=>{
      sessionStorage.setItem(tagArr[i],(data[tagArr[i]]));
      //               "mw_g_flowrate",   12.5

    })
  }
}



}



