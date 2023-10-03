import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";
import { ServerURLService } from "../server-url.service";
 //import { ServerURLService } from "./server-url.service";


@Injectable({ providedIn: "root" })
export class GreenBushesService {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/greenbushes/values")
  }


}
@Injectable({ providedIn: "root" })
export class GrassRidgeService {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/grassridge/values")
  }


}
@Injectable({ providedIn: "root" })
export class HeatherBankService {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/pumpstations/heatherbank/values")
  }


}

@Injectable({ providedIn: "root" })
export class RosedaleService {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/rosedale/values")
  }


}
@Injectable({ providedIn: "root" })
export class SummitService {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/summit/values")
  }


}
@Injectable({ providedIn: "root" })
export class TheescombeService {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/theescombe/values")
  }


}
@Injectable({ providedIn: "root" })
export class VanRiebeekHoogteService {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/vanriebeekhoogte/values")
  }


}
@Injectable({ providedIn: "root" })
export class VanstadensReservoirService {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/vanstadens/res/values")
  }


}


@Injectable({ providedIn: "root" })
export class OliphantskopService {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/hawkeye/reservoirs/oliphantskop")
  }


}


@Injectable({ providedIn: "root" })
export class emeraldHillService {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/hawkeye/reservoirs/emeraldhill")
  }


}


@Injectable({ providedIn: "root" })
export class driftSandsService {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/hawkeye/reservoirs/driftsands")
  }


}


@Injectable({ providedIn: "root" })
export class schoemansService {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/hawkeye/reservoirs/schoemanshoek")
  }


}


@Injectable({ providedIn: "root" })
export class kwanobuhleService {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/hawkeye/reservoirs/kwanobuhle")
  }


}



@Injectable({ providedIn: "root" })
export class graafService {



  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/hawkeye/reservoirs/graaf")
  }


}

@Injectable({providedIn:"root"})
export class bushyService{

  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/hawkeye/reservoirs/bushypark")
  }


}

@Injectable({providedIn:"root"})
export class malibarService{

  constructor(private http: HttpClient, private router: Router,private su: ServerURLService,){



  }
  GetSiteValues():Observable<any[]>{//automated Number

    return this.http.get<any[]>(this.su.serverURL+"/hawkeye/reservoirs/malibar")
  }


}


