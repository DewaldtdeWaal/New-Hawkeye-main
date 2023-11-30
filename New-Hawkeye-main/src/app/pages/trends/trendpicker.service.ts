import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from 'rxjs/operators';

//import { User } from "../models/user.model";
import { ServerURLService } from "src/app/Service-Files/server-url.service";



@Injectable({ providedIn: "root" })
export class TrendPickerService {

selectedTags:string[]=[]


presetName :any
presetDescription:any
selectedSites:any[]
rightSelectedSites:any[]

rightSelectedTags:any[]
//selectedTagsV2:string[]=[]



  constructor(private http: HttpClient,private su: ServerURLService) {}


getSelectedTags(){
    return this.selectedTags;
  }

  editUserPreset(userEmail:string, presetName:string){
    let info ={
        userEmail: userEmail,
        presetName:presetName
    }
       this.http.post<{
              presetName:string,
              presetDescription:string,
              selectedSites:string[],
              rightSelectedSites:string[],
             }>(this.su.serverURL+"/get-user-edit-preset", info)
         .subscribe(responseData => {
            var  data:any = responseData
     this.presetName = data.record.presetName;
     this.presetDescription= data.record.presetDescription;
     this.selectedSites= data.record.selectedSites
     this.rightSelectedSites= data.record.rightSelectedSites


         }, error =>{
     
         });
     }
  getPresetName(){
    return this.presetName;
  }
  getPresetDescription(){
    return this.presetDescription;
  }
  getSelectedSites(){
    return this.selectedSites;
  }
  getRightSelectedSites(){
    return this.rightSelectedSites;
  }







}