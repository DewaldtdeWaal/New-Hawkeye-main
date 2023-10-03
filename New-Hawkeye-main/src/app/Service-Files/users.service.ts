import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from 'rxjs/operators';
import {ControlLog} from 'src/app/models/controlLog.model'
import { User } from "../models/user.model";
import { ServerURLService } from "./server-url.service";
import { AuthService } from "./auth.service";

export interface Passwords {
  userEmail:any;
  currentPassword: string;
  newPassword: string;
}
export interface Theme {
 userEmail:string,
 theme:string}


@Injectable({ providedIn: "root" })
export class UsersService {
errorMessage:string;
error:boolean =false
editPasswordSuccess=false
editPasswordSuccessMsg ="Your Password has been changed Successfully"

addUserErrorMsg:string
addUserError:boolean = false
AddUserSuccess:boolean=false
AddUserSuccessMsg ="User has been added successfully"
theme: any


  constructor(private http: HttpClient,private su: ServerURLService, private as:AuthService) {}




  SaveTheme(userTheme: any, userEmail:any){
    const theme:Theme ={
      userEmail:userEmail,
      theme: userTheme
    }
this.http.post(this.su.serverURL+"/save-theme", theme).subscribe(() => {});

  }

  createUser(firstName: string, secondName: string, contactNumber: number, supervisorEmail: string, userEmail:string,password:string, userSites: string[]) {
    const user: User = {
      firstName: firstName,
      secondName: secondName,
      contactNumber:contactNumber,
      supervisorEmail: userEmail,
      userEmail:userEmail,
      password:password,
      userSites:userSites  };
    this.http.post(this.su.serverURL+"/add-user", user)
      .subscribe(responseData => {
        console.log(responseData);
        this.AddUserSuccessMsg
        this.AddUserSuccess=true;
        this.addUserError = false
      }, error =>{
        console.log(error.error.message)
        this.addUserErrorMsg = error.error.message;
        this.addUserError = true
      });
  }


editPassword(currentPassword: string, newPassword:string){
  const passwords : Passwords={
    userEmail: this.as.getUserEmail(),
    currentPassword: currentPassword,
    newPassword: newPassword
  };
  //this.http.post("http://allelectrical.dyndns.org:3000/edit-password",passwords)
   this.http.post(this.su.serverURL+"/edit-password",passwords)
 .subscribe(responseData => {

  this.editPasswordSuccess=true;
  this.editPasswordSuccessMsg ;
  this.error=false;
}, error =>{
  console.log(error)
  this.errorMessage=error.error.message
  this.error=true;
  this.editPasswordSuccess=false;
});
}



}


