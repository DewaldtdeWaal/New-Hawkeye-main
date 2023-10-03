import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { User } from "../models/user.model";
import { ServerURLService } from "./server-url.service";

export interface Email {
  userEmail: string;
}

export interface ResetPassword {
  userEmail: any;
  resetPassword: any;
}

export interface EditedUser {
  currentEmail:any
  firstName:any;
  secondName:any;
  contactNumber:any;
  userSites:any;
}

@Injectable({ providedIn: "root" })
export class AdminService {

      firstName:any;
      secondName:any;
      contactNumber:any;
      idNumber:any;
      supervisorEmail:any;
      uEmail:any;
      password:any;
      userSites:any;

      resetPasswordErrorMsg:string
      resetPasswordError:boolean = false
      resetPasswordSuccess:boolean=false
      resetPasswordSuccessMsg ="User Password has been reset successfully"



addUserErrorMsg:string
addUserError:boolean = false
AddUserSuccess:boolean=false
AddUserSuccessMsg ="User has been added successfully"

editedUserErrorMsg:string
editedUserError:boolean = false
editedUserSuccess:boolean=false
editedUserSuccessMsg ="User has been edited successfully"

  constructor(private http: HttpClient,private su: ServerURLService) {}




  createUser(firstName: string, secondName: string, contactNumber: number, supervisorEmail: string, userEmail:string,password:string, userSites: string[]) {
    const user: User = {
      firstName: firstName,
      secondName: secondName,
      contactNumber:contactNumber,
      supervisorEmail: supervisorEmail,
      userEmail:userEmail,
      password:password,
      userSites:userSites  };
    this.http
     // .post("http://allelectrical.dyndns.org:3000/add-user", user)
      .post(this.su.serverURL+"/add-user", user)
      .subscribe(responseData => {
        this.AddUserSuccessMsg
        this.AddUserSuccess=true;
        this.addUserError = false
      }, error =>{
        this.addUserErrorMsg = error.error.message;
        this.addUserError = true;
      });
  }




Get_Users():Observable<any[]>{
    return this.http.get<any[]>(this.su.serverURL+"/admin/manage-accounts")
}

Get_Sub_Users():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/admin/manage-sub-accounts")
}



getFirstName(){
  return this.firstName;
}
getUserEmail(){
  return this.uEmail;
}
getSecondName(){
  return this.secondName;
}
getUserSites(){
  return this.userSites;
}
getSupervisorEmail(){
  return this.supervisorEmail;
}
getContactNumber(){
  return this.contactNumber;
}
status:any


delete_user_account(userEmail:string){
  const email: Email = {
    userEmail: userEmail}

    this.http.delete(this.su.serverURL + "/deleteUser").subscribe((responseData) => console.log(responseData))



}



edit_user_account(userEmail:string){
  const email: Email = {
    userEmail:userEmail,}
  this.http.post<{
         userSites:string[],
         firstName:string,
         secondName:string,
         userEmail:string,
         supervisorEmail: string,
         contactNumber: number
        }>(this.su.serverURL+"/admin/manage-accounts", email)
    .subscribe(responseData => {
this.firstName = responseData.firstName;
this.secondName= responseData.secondName;
this.contactNumber= responseData.contactNumber;
this.supervisorEmail= responseData.supervisorEmail
this.uEmail= responseData.userEmail
this.userSites= responseData.userSites;

    }, error =>{

    });
}

editedUser(currentEmail:string,firstName: string, secondName: string, contactNumber: number, userSites: string[]) {
  const editedUser: EditedUser = {
    currentEmail:currentEmail,
    firstName: firstName,
    secondName: secondName,
    contactNumber:contactNumber,
    userSites:userSites

  }
  this.http.post(this.su.serverURL+"/admin/manage-accounts/edit-account", editedUser)
    .subscribe(responseData => {

      this.editedUserSuccessMsg
      this.editedUserSuccess=true;
      this.addUserError = false
    }, error =>{
      this.editedUserErrorMsg = error.error.message;
      this.editedUserError = true
    }
    );
}



resetUserPassword(newPassword:any, currentEmail:string,) {
  const resetPassword: ResetPassword = {
    userEmail:currentEmail ,
  resetPassword: newPassword
  };
  this.http.post(this.su.serverURL+"/resetpassword", resetPassword)
    .subscribe(responseData => {
      this.resetPasswordErrorMsg
      this.resetPasswordSuccess=true;
      this.resetPasswordError = false
    }, error =>{
      this.resetPasswordErrorMsg = error.error.message;
      this.resetPasswordError = true
    });
}


}


