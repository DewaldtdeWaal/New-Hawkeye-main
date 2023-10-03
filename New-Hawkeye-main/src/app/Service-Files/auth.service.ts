import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { User } from "../models/user.model";
import { Router } from "@angular/router";
import { ServerURLService } from "./server-url.service";
import { data } from "jquery";

export interface Email {
  userEmail: string;

}

@Injectable({ providedIn: "root" })

export class AuthService {

  theme:string;
  private userEmail:string;
  private firstName: string;
  private secondName: string;
  private userSites: Array<string>;

  private tokenTimer : any;
  private isAuthenticated= false;
  private token:string ="";
  private authStatusListener = new Subject<boolean>();
errorMessage: string;
error:boolean = false;



constructor(private http: HttpClient, private router: Router, private su: ServerURLService) {}


getTheme(){
  return this.theme
}

getFirstName(){
  return this.firstName;
}
getUserEmail(){
  return this.userEmail;
}

getSecondName(){
  return this.secondName;
}

getUserSites(){
  return this.userSites;
}

getIsAuth(){
  return this.isAuthenticated;
 }

 getToken(){
   return this.token;

 }

 getAuthStatusListener() {
  return this.authStatusListener.asObservable();
}



login(firstName: string, secondName: string, contactNumber: number, supervisorEmail: string, userEmail:string,password:string, userSites: string[]){
  const user: User = {  firstName: '', secondName: '', contactNumber: 1111111111, supervisorEmail: '', userEmail:userEmail, password:password,userSites:[]   };
 this.http.post<{theme:string,token:string, expiresIn: number, userSites:string[], firstName:string, secondName:string, userEmail:string}>(this.su.serverURL+"/login",user)
  .subscribe(response=>{
 const token = response.token;
 this.token =token;

 if (token){
    const expiresInDuration = response.expiresIn;
      this.setAuthTimer(expiresInDuration);
      this.isAuthenticated=true;

      this.theme= response.theme;

      this.firstName=response.firstName;
      this.secondName=response.secondName;
      this.userSites=response.userSites;
      this.userEmail=response.userEmail;
      this.authStatusListener.next(true);
      const now = new Date();
      const expirationDate = new Date (now.getTime() + expiresInDuration*1000);

      function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

      this.userSites.sort(function(a,b){
        return a.localeCompare(b);
      })

      var first = "HWK_RO";
      this.userSites.sort(function(x,y){ return x == first ? -1 : y == first ? 1 : 0; });

      var second ="HWK_PO"
      this.userSites.sort(function(x,y){ return x == second ? -1 : y == second ? 1 : 0; });

      var third ="HWK_FO"
      this.userSites.sort(function(x,y){ return x == third ? -1 : y == third ? 1 : 0; });

        this.saveAuthData(token,expirationDate,this.userSites, this.firstName,this.secondName,this.userEmail, this.theme)
        this.router.navigate(['/hawkeye/home']);

}
  }, error=>{
    this.authStatusListener.next(false);
    this.errorMessage = error.error.message;
this.error= true;

  }
  )
}

autoAuthUser(){
 const authInformation = this.getAuthData();
 if(!authInformation){
   return;
 }
const now = new Date();
const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
if(expiresIn>0){
this.token = authInformation.token;
this.isAuthenticated=true;
this.theme = authInformation.theme;
this.userSites = authInformation.userSites;
this.firstName = authInformation.firstName;
this.secondName = authInformation.secondName;
this.userEmail = authInformation.userEmail;
this.setAuthTimer(expiresIn/1000);
this.authStatusListener.next(true);

}

}



onLogout(){

}

logout(){
this.token = "";
this.isAuthenticated = false;
this.authStatusListener.next(false);
clearTimeout(this.tokenTimer);
this.clearAuthData();
this.userSites = [];
this.firstName='';
this.secondName='';
this.router.navigate(['/login']);
}


private setAuthTimer(duration: number){
  this.tokenTimer = setTimeout(()=>{

   this.logout();
  },duration * 1000) ;
}

private saveAuthData(token:string, expirationDate: Date, userSites: Array<string>, firstName:string, secondName:string, userEmail:string, theme:string){
  localStorage.setItem("token", token);
  localStorage.setItem("expiration", expirationDate.toISOString());
  localStorage.setItem("firstName", firstName);

  localStorage.setItem("theme", theme);
  localStorage.setItem("secondName", secondName);
  localStorage.setItem("userSites", JSON.stringify(userSites));
  localStorage.setItem("userEmail", userEmail);
}

private clearAuthData(){
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  localStorage.removeItem("userSites");
  localStorage.removeItem("firstName");
  localStorage.removeItem("secondName");
  localStorage.removeItem("userEmail")
 localStorage.removeItem("mode")

}

private getAuthData(){
  const theme = localStorage.getItem("theme")!;
  const token = localStorage.getItem("token");
  const expirationDate = localStorage.getItem("expiration");
  const firstName = localStorage.getItem("firstName")!;
  const secondName = localStorage.getItem("secondName")!;
  const userSites = JSON.parse(localStorage.getItem("userSites")!);
const userEmail = (localStorage.getItem("userEmail")!);

  if(!token || !expirationDate ){
return;
  }
  return{
    theme: theme,
    token: token,
    expirationDate: new Date(expirationDate),
    userSites: userSites,
    firstName: firstName,
    secondName: secondName,
    userEmail: userEmail,

  }

}

}
