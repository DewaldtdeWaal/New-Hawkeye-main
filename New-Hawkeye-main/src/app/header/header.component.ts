import { Subscription } from 'rxjs';
import { AuthService } from '../Service-Files/auth.service';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 ,OnDestroy } from '@angular/core';
import { UsersService } from '../Service-Files/users.service';
import { AdminService } from '../Service-Files/admin.service';
import { Router } from "@angular/router";
import { ListeningService } from '../listening.service';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  theme: any

  color:any;

firstName: string;
secondName: string;
userIsAuthenticated =false;
userSites:string[];
userEmail:string;

showAuto: boolean = false;
showResMenu: boolean = false;

showPSMenu: boolean = false;
showTrendsMenu: boolean = false;
showFM_Menu: boolean = false;
showWTW_Menu: boolean = false;
showAdminMenu: boolean = false;
showNmbmMenu:boolean = false;
showDriveMenu:boolean = false
showDemoMenu:boolean = false;


showNonNmbmMenu:boolean = false;

showGWMenu: boolean = false;
showFLMenu: boolean = false;

showNmbmResMenu: boolean = false;
showNmbmPSMenu:boolean = false;
showNmbmGWMenu:boolean=false;
showNmbmFPTMenu:boolean=false;
showNmbmWTWMenu:boolean=false;

showNmbmSubMenu:boolean=false;



isExpanded = true;
isShowing = false;

subExpanded = true;
subShowing = false;


  countAuto:any
  countR:any
  countPS:any
  countFPT:any
  countWTW:any
  countT:any
  countAdmin:any
  countGW:any
  countFL:any
  countBM:any
  countDR:any
  countSubNmbm:any
  countTT:any

  countNmbm:any;
  countNonNmbm:any;
  countNmbmRes:any;
public authListenerSubs!: Subscription;

vs_fault_count:number
bhb_fault_count:number
lh_fault_count:number
bf_fault_count:number
tc_fault_count:number
hb_fault_count:number
cg_fault_count:number
vrh_fault_count:number
cht_fault_count:number
vw_fault_count:number


constructor(private authService: AuthService,private ls:ListeningService,  private userService: UsersService,public as: AdminService, private router: Router,
  @Inject(DOCUMENT) private document: Document,
  private renderer: Renderer2,) {

  this.countAuto = 0;
  this.countR=0
  this.countPS=0
  this.countFPT=0
  this.countWTW=0
  this.countT=0
  this.countAdmin=0
  this.countNmbm=0
  this.countNonNmbm=0;
  this.countGW=0
  this.countFL=0
  this.countBM=0
  this.countSubNmbm=0
  this.countDR=0
  this.countTT= 0;
  this.countNmbmRes=0

this.userIsAuthenticated=this.authService.getIsAuth();


this.authListenerSubs = this.authService.getAuthStatusListener()
.subscribe(isAuthenticated => {
  this.userIsAuthenticated = isAuthenticated;
    this.theme =this.authService.getTheme();
  this.userSites = this.authService.getUserSites();

  this.firstName = this.authService.getFirstName();
  this.secondName= this.authService.getSecondName();
  this.userEmail = this.authService.getUserEmail();
  this.countAuto = 0;
  this.countR=0
  this.countPS=0
  this.countFPT=0
  this.countWTW=0
  this.countT=0
  this.countAdmin=0
  this.countNmbm=0;
  this.countNonNmbm=0
  this.countGW= 0
  this.countFL=0
  this.countSubNmbm=0
  this.countDR = 0;
  this.countTT= 0;
  this.countBM=0;
  this.countNmbmRes=0


if(localStorage.getItem("mode")!=null){
  this.theme=(localStorage.getItem("mode"));
  localStorage.setItem("theme",this.theme)

}

 this.initializeTheme();

setTimeout(() => {
  this.initializeTheme();
},1000)

  setTimeout(() => {
    this.initializeTheme();
  },100)

if (this.userIsAuthenticated==false) {}
else{
  console.log(this.userSites)
  for (var i = 0; i < this.userSites.length;i++){
    var last2Char = this.userSites[i].substr(this.userSites[i].length - 2);
    if (last2Char=="RO"||last2Char=="_R") {
      this.countR++;
    }
    if(last2Char == "TO"){
      this.countAuto++
    }
     if (last2Char=="PS"||last2Char=="FF") {
      this.countPS++;
    }
    if (last2Char=="DS") {
      this.countT++;
    }
    if (last2Char=="PT") {
      this.countFPT++;
    }
    if(last2Char=="GW"){
      this.countGW++;
    }
    if (last2Char=="TW") {
      this.countWTW++;
    }
    if (last2Char=="IN") {
      this.countAdmin++;
      this.countDR++;
    }
    if(last2Char=="FL"){
      this.countFL++;
    }
    if(last2Char=="BM"){
      this.countBM++;
    }

    if(last2Char == "TT"){
      this.countTT++;
    }
  }
}

if(this.userIsAuthenticated==false){}
else{
  for (var i = 0; i < this.userSites.length;i++){
    var first3Char = this.userSites[i].slice(0,3);
    if (first3Char=="NMB") {
      this.countNmbm++;
    }
    else if(first3Char != "NMB" && first3Char != "ADM" && first3Char != "PIC" && first3Char != "V2_" && first3Char != "HWK"){
    this.countNonNmbm++;
    }
  }
}

if(this.userIsAuthenticated==false){}
else{
  for (var i = 0; i < this.userSites.length;i++){
    var first4Char = this.userSites[i]
    if (first4Char=="ADMIN_NMBM") {
      this.countSubNmbm++;
      console.log(this.countSubNmbm)

    }
  }
}

//sO THIS IS THERE SO THAT i CAN SEE HOW THE NMBM ADMIN PAGE LOOKS LIKE.  i DON'T WANT TO CODE BLIND.
if(this.userIsAuthenticated!=false){
  for (var i = 0; i < this.userSites.length;i++){
    var first4Char = this.userSites[i]
    if (first4Char=="ADMIN") {
      this.countSubNmbm++;
      console.log(this.countSubNmbm)

    }
  }
}
}
);

}

  ngOnInit() {
    console.log(this.userSites)
  }

closeAllSnackBars(){
  this.userService.editPasswordSuccess=false;
  this.userService.error=false;
  this.as.resetPasswordError=false;
  this.as.resetPasswordSuccess=false;
  this.as.addUserError=false;
  this.as.AddUserSuccess=false;
  this.as.editedUserError=false;
  this.as.editedUserSuccess=false;
}

  onLogout() {

    this.authService.logout();

    this.theme = localStorage.getItem("theme")
    window.location.reload();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

onRefresh(){
  window.location.reload();
}

switchTheme() {
  this.document.body.classList.replace(
    this.theme,
    this.theme === 'light-theme'
      ? (this.theme = 'dark-theme')
      : (this.theme = 'light-theme')
  );
 localStorage.setItem("mode",this.theme)
 localStorage.setItem("theme",this.theme)
  this.userService.SaveTheme(this.theme,this.userEmail)

  window.location.reload();

}

initializeTheme =():void=>
 this.renderer.addClass(this.document.body,this.theme)
}
