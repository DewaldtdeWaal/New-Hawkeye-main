import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";
import { ServerURLService } from "../server-url.service";
// import { ServerURLService } from "./server-url.service";


@Injectable({ providedIn: "root" })
export class BuffelsFonteinComponent {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/buffelsfontein/values")
  }


}


@Injectable({ providedIn: "root" })
export class crownGardensComponent {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/crowngardens/values")
  }


}

@Injectable({ providedIn: "root" })
export class motherwellComponent {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/motherwell/values")
  }


}


@Injectable({ providedIn: "root" })
export class nmuEffleuntComponent {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/nmu-effluent/values")
  }


}

@Injectable({ providedIn: "root" })
export class vanStadensComponent {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/vanstadens/values")
  }


}

@Injectable({ providedIn: "root" })
export class blueHorizonBayComponent {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/bluehorizonbay/values")
  }


}



@Injectable({ providedIn: "root" })
export class heatherBankComponent {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/pumpstations/heatherbank/values")
  }


}

@Injectable({ providedIn: "root" })
export class standfordRoadComponent {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/hawkeye/pumpstations/stanford-road")
  }


}
