import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { AuthService } from "../auth.service";
import { ServerURLService } from "../server-url.service";
import { pageBuilder} from "src/app/class/pageBulder";

export interface SiteName{
  SiteName: string;
}
@Injectable({ providedIn: "root" })




export class pageBuilderMethod {
  arrayData:any = []
  constructor(private http: HttpClient,private su: ServerURLService,private pb:pageBuilder) {}

async getSiteData(siteName: any){

  var returnVariable


  const site:SiteName = {
    SiteName:siteName
  };


  returnVariable = this.http.post(this.su.serverURL+"/get-site-data", site).toPromise().then(data =>{

    this.arrayData = data;





    return this.arrayData.variables;

  });



  return returnVariable;

}


}

