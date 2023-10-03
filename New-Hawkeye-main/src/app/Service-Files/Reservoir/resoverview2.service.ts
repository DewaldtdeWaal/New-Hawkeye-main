import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServerURLService } from "../server-url.service";

@Injectable({ providedIn: "root" })
export class ResoverviewV2RoutingComponent {
  constructor(
    private http: HttpClient,
    private su: ServerURLService
  ) {}

  GetSiteValues(): Promise<any> {
    return this.http.get<any[]>(this.su.serverURL + "/res-currentvals/values")
      .toPromise();
  }
}
