import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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




  const site:SiteName = {
    SiteName:siteName
  };


 return this.http.post(this.su.serverURL+"/get-site-data", site).toPromise().then(data =>{

    this.arrayData = data;

    return this.arrayData.variables;

  });





}


}

