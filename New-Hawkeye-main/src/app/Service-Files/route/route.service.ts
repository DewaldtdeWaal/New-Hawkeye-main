import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from 'rxjs/operators';


import { ServerURLService } from "../server-url.service";


interface pagePostInterface{
  Id:string;
  Collection:string;
}
@Injectable({ providedIn: "root" })
export class pagePostMethod{
  constructor(private http: HttpClient,private su: ServerURLService) {}

  data:any=[]

  async findPageData(id:any, collection:any){

    var returnVariable
    console.log(collection)
    const page: pagePostInterface = {
      Id:id,
      Collection:collection,
    };
    returnVariable =  this.http.post(this.su.serverURL + "/pageValues", page).toPromise().then(DATA =>{

      this.data = DATA


      return this.data;

    })

    return returnVariable


  }
}
