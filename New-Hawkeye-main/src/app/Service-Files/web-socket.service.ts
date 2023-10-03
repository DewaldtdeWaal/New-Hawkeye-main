import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { io } from 'socket.io-client';
import { ServerURLService } from './server-url.service';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {


   socket:any;
  nmbmsocket: any;


  constructor(private su: ServerURLService ) {

      this.socket = io(this.su.wsURL+':8081', { transports : ['websocket'] });
      this.nmbmsocket = io(this.su.wsNMBMURL+':8080', { transports : ['websocket'] });

      console.log(this.nmbmsocket)
 // this.socket = io('ws://allelectrical.dyndns.org:8080', { transports : ['websocket'] });
   }


   nmbm_listen(eventName :string){
    return new Observable((subscriber)=> {
    this.nmbmsocket.on(eventName, (data:any)=>{
    subscriber.next(data);
      })
    });
  }


  listen(eventName :string){
    return new Observable((subscriber)=> {
    this.socket.on(eventName, (data:any)=>{
    subscriber.next(data);
      })
    });
  }

  // emit(eventName:string,data:any){
  //   this.socket.emit(eventName,data);
  // }

  emit(emitName:string,data:number[]){
    this.socket.emit(emitName,data);

    this.nmbmsocket.emit(emitName,data)
  }


  }

