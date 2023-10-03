import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";
import { ServerURLService } from "../server-url.service";


@Injectable({ providedIn: "root" })
export class resOverviewRouteComponent {

  constructor(
    private http: HttpClient,
    private su: ServerURLService
  ) {}

  GetSiteValues(): Promise<any> {
    return this.http.get<any[]>(this.su.serverURL + "/hawkeye/pumpstations/ps-overview/values")
      .toPromise();
  }
}
