import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';


import { ServerURLService } from "../server-url.service";


interface pagePostInterface{
  Id:string;
  Collection:string;
}
@Injectable({ providedIn: "root" })
export class pagePostMethod {
  constructor(private http: HttpClient, private su: ServerURLService) {}

  data: any = [];

  findPageData(id: any, collection: any): Observable<any> {
    return timer(0, 60000).pipe(
      switchMap(() => {
        const page: pagePostInterface = {
          Id: id,
          Collection: collection,
        };
        return this.http.post(this.su.serverURL + "/pageValues", page);
      })
    );
  }




  findPageDataForNewSites(id: any, collection: any): Observable<any> {
    return timer(0, 60000).pipe(
      switchMap(() => {
        const page: pagePostInterface = {
          Id: id,
          Collection: collection,
        };
        return this.http.post(this.su.serverURL + "/newPageValue", page);
      })
    );
  }
}
