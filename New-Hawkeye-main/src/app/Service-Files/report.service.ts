import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ServerURLService } from './server-url.service';


export interface Dates {
  startDate: string;
  endDate: string;
}

export interface Sites {
  sites: any[];
  startDate: string;
  endDate: string;
}

export interface testSites{
  sites: any[];
  startDate: string;
  endDate: string;
  stringQuery:string;
}

export interface Wessels{
  sites: any[];

}




@Injectable({
  providedIn: 'root'
})
export class ReportService {
trendDataDemo:any[]=[];
fmt_Trend_Start_Date:string;
fmt_Trend_End_Date:string;

  constructor(private http: HttpClient, private su: ServerURLService) {}
//////////////////////////////
GetAllResTrend():Observable<any[]>{
   return this.http.get<any[]>(this.su.serverURL+"/trends/reslevels/allrestrends") // for demo sites
}

GetAllResTrend_Dates( startDate: string, endDate:string):Observable<any[]>{ // for demo sites
  const dates : Dates={
    startDate: startDate,
    endDate: endDate
  };
  return this.http.post<any[]>(this.su.serverURL+"/trends/reslevels/allrestrends",dates)
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
GetFMT_Total_Flow():Observable<any[]>{
   return this.http.get<any[]>(this.su.serverURL+"/fptsites/fmtower")

 }

 GetFMT_Total_Flow_Dates( startDate: string, endDate:string):Observable<any[]>{
  const dates : Dates={
    startDate: startDate,
    endDate: endDate
  };
  return this.http.post<any[]>(this.su.serverURL+"/fptsites/fmtower",dates)
}

GetEmeraldHll():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/res/emeraldhill")

}

POST_EmeraldHill_Total_Flow_Dates( startDate: string, endDate:string):Observable<any[]>{
  const dates : Dates={
    startDate: startDate,
    endDate: endDate
  };
  return this.http.post<any[]>(this.su.serverURL+"/res/emeraldhill",dates)
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Get_Wessels_Total_Feeds():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/feedlots/wessels")

}

Post_Wessels_Total_Feeds(array:any[]){
  const obj: Wessels ={

    sites:array// [TF_wes1_fl_p1_feed_A_arr,  TF_wes1_fl_p1_feed_B_arr, TF_wes1_fl_p1_feed_C_arr]
  }
  return this.http.post(this.su.serverURL+"/feedlots/wessels", obj )

}

Get_Wessels_Total_Feeds_Dates( startDate: string, endDate:string):Observable<any[]>{
 const dates : Dates={
   startDate: startDate,
   endDate: endDate
 };
 return this.http.post<any[]>(this.su.serverURL+"/feedlots/wessels",dates)
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Get_IDZT_Total_Flows():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/fptsites/coegaidzt")

}

Get_IDZT_Total_Flows_Dates( startDate: string, endDate:string):Observable<any[]>{
 const dates : Dates={
   startDate: startDate,
   endDate: endDate
 };
 return this.http.post<any[]>(this.su.serverURL+"/fptsites/coegaidzt",dates)
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Get_BETH_Total_Flows():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/fptsites/bethelsdorp", )

}

Get_BETH_Total_Flows_Dates( startDate: string, endDate:string):Observable<any[]>{
 const dates : Dates={
   startDate: startDate,
   endDate: endDate
 };
 return this.http.post<any[]>(this.su.serverURL+"/fptsites/bethelsdorp",dates)
}




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Get_GT_BRG_Total_Flows():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/fptsites/gamtoos-bridge")

}

Get_GT_BRG_Total_Flows_Dates( startDate: string, endDate:string):Observable<any[]>{
 const dates : Dates={
   startDate: startDate,
   endDate: endDate
 };
 return this.http.post<any[]>(this.su.serverURL+"/fptsites/gamtoos-bridge",dates)
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////



Get_UIT_Total_Flows():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/fptsites/uitenhage-flow-chamber")

}

Get_UIT_Total_Flows_Dates( startDate: string, endDate:string):Observable<any[]>{
 const dates : Dates={
   startDate: startDate,
   endDate: endDate
 };
 return this.http.post<any[]>(this.su.serverURL+"/fptsites/uitenhage-flow-chamber",dates)
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////
Get_CGK_TotalFlows():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/reservoirs/coegakop")
}

Get_CGK_Total_Flows_Dates(startDate: string, endDate:string):Observable<any[]>{
  const dates : Dates={
    startDate: startDate,
    endDate: endDate
  }
  return this.http.post<any[]>(this.su.serverURL+"/reservoirs/coegakop",dates)
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////

GET_CHEL_TotalFlow():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/pumpstation/chelsea-ps")
}

GET_CHEL_Total_Flows_Dates(startDate: string, endDate:string):Observable<any[]>{
  const dates : Dates={
    startDate: startDate,
    endDate: endDate
  }
  return this.http.post<any[]>(this.su.serverURL+"/pumpstation/chelsea-ps",dates)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

GET_CHEL_RES_TotalFlow():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/reservoir/chelsea")
}

GET_CHEL_RES_Total_Flows_Dates(startDate: string, endDate:string):Observable<any[]>{
  const dates : Dates={
    startDate: startDate,
    endDate: endDate
  }
  return this.http.post<any[]>(this.su.serverURL+"/reservoir/chelsea",dates)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
Get_GB_TotalFlows():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/reservoirs/GB")
}

Get_GB_Total_Flows_Dates(startDate: string, endDate:string):Observable<any[]>{
  const dates : Dates={
    startDate: startDate,
    endDate: endDate
  }
  return this.http.post<any[]>(this.su.serverURL+"/reservoirs/GB",dates)
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
Get_Chatty_TotalFlows():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/reservoirs/chattytf")
}

Get_Chatty_Total_Flows_Dates(startDate: string, endDate:string):Observable<any[]>{
  const dates : Dates={
    startDate: startDate,
    endDate: endDate
  }
  return this.http.post<any[]>(this.su.serverURL+"/reservoirs/chattytf",dates)
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
Get_HUP1_TotalFlows():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/groundwater/KLM_HUP_TF_TREND")
}

Get_HUP1_Total_Flows_Dates(startDate: string, endDate:string):Observable<any[]>{
  const dates : Dates={
    startDate: startDate,
    endDate: endDate
  }
  return this.http.post<any[]>(this.su.serverURL+"/groundwater/KLM_HUP_TF_TREND",dates)
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


Get_HUP2_TotalFlows():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/groundwater/KLM_HUP2_TF_TREND")
}

Get_HUP2_Total_Flows_Dates(startDate: string, endDate:string):Observable<any[]>{
  const dates : Dates={
    startDate: startDate,
    endDate: endDate
  }
  return this.http.post<any[]>(this.su.serverURL+"/groundwater/KLM_HUP2_TF_TREND",dates)
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Get_HUP3_TotalFlows():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/groundwater/KLM_HUP3_TF_TREND")
}

Get_HUP3_Total_Flows_Dates(startDate: string, endDate:string):Observable<any[]>{
  const dates : Dates={
    startDate: startDate,
    endDate: endDate
  }
  return this.http.post<any[]>(this.su.serverURL+"/groundwater/KLM_HUP3_TF_TREND",dates)
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


Get_HUP4_TotalFlows():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/groundwater/KLM_HUP4_TF_TREND")
}

Get_HUP4_Total_Flows_Dates(startDate: string, endDate:string):Observable<any[]>{
  const dates : Dates={
    startDate: startDate,
    endDate: endDate
  }
  return this.http.post<any[]>(this.su.serverURL+"/groundwater/KLM_HUP4_TF_TREND",dates)
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


Get_HUP6_TotalFlows():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/groundwater/KLM_HUP6_TF_TREND")
}

Get_HUP6_Total_Flows_Dates(startDate: string, endDate:string):Observable<any[]>{
  const dates : Dates={
    startDate: startDate,
    endDate: endDate
  }
  return this.http.post<any[]>(this.su.serverURL+"/groundwater/KLM_HUP6_TF_TREND",dates)
}
//////////////////////////////////////////////////////////////////////////////////////////
Get_Kruis12_TotalFlows():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/groundwater/KLM_KRUIS12_TF")
}

Get_Kruis12_Total_Flows_Dates(startDate: string, endDate:string):Observable<any[]>{
  const dates : Dates={
    startDate: startDate,
    endDate: endDate
  }
  return this.http.post<any[]>(this.su.serverURL+"/groundwater/KLM_KRUIS12_TF",dates)
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////

Get_Kruis13_TotalFlows():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/groundwater/KLM_KRUIS13_TF")
}

Get_Kruis13_Total_Flows_Dates(startDate: string, endDate:string):Observable<any[]>{
  const dates : Dates={
    startDate: startDate,
    endDate: endDate
  }
  return this.http.post<any[]>(this.su.serverURL+"/groundwater/KLM_KRUIS13_TF",dates)
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////

Get_Kruis14_TotalFlows():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/groundwater/KLM_KRUIS14_TF")
}

Get_Kruis14_Total_Flows_Dates(startDate: string, endDate:string):Observable<any[]>{
  const dates : Dates={
    startDate: startDate,
    endDate: endDate
  }
  return this.http.post<any[]>(this.su.serverURL+"/groundwater/KLM_KRUIS14_TF",dates)
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
Get_KARK_K1_TotalFlows():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/groundwater/KARK_K1_TOTAL_FLOW")
}

Get_KARK_K1_Total_Flows_Dates(startDate: string, endDate:string):Observable<any[]>{
  const dates : Dates={
    startDate: startDate,
    endDate: endDate
  }
  return this.http.post<any[]>(this.su.serverURL+"/groundwater/KARK_K1_TOTAL_FLOW",dates)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////


Get_KARK_K2_TotalFlows():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/groundwater/KARK_K2_TOTAL_FLOW")
}

Get_KARK_K2_Total_Flows_Dates(startDate: string, endDate:string):Observable<any[]>{
  const dates : Dates={
    startDate: startDate,
    endDate: endDate
  }
  return this.http.post<any[]>(this.su.serverURL+"/groundwater/KARK_K2_TOTAL_FLOW",dates)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////


Get_NPP_TotalFlows():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/groundwater/NPP_TREND")
}

Get_NPP_Total_Flows_Dates(startDate: string, endDate:string):Observable<any[]>{
  const dates : Dates={
    startDate: startDate,
    endDate: endDate
  }
  return this.http.post<any[]>(this.su.serverURL+"/groundwater/NPP_TREND",dates)
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

GetTrend( sitesChosen: any[], newStart:string, newEnd:string, StringQuery:string ):Observable<any[]>{
  const sites : testSites={
    sites: sitesChosen,
    startDate: newStart,
    endDate: newEnd,
    stringQuery:StringQuery
  };
  return this.http.post<any[]>(this.su.serverURL+"/trends/customrestrends",sites)
}



GetTrend_Sites( sitesChosen: any[], newStart:string, newEnd:string ):Observable<any[]>{
  const sites : Sites={
    sites: sitesChosen,
    startDate: newStart,
    endDate: newEnd
  };
  return this.http.post<any[]>(this.su.trendURL+"/trends/reslevels/customrestrends",sites)
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
GetWesTrend_Sites( sitesChosen: any[], newStart:string, newEnd:string ):Observable<any[]>{
  const sites : Sites={
    sites: sitesChosen,
    startDate: newStart,
    endDate: newEnd
  };
  return this.http.post<any[]>(this.su.serverURL+"/westrends/values",sites)
}

Post_Trend_Sites( sitesChosen: any[], newStart:string, newEnd:string ):Observable<any[]>{
  const sites : Sites={
    sites: sitesChosen,
    startDate: newStart,
    endDate: newEnd
  };
  return this.http.post<any[]>(this.su.serverURL+"/trends/mongodb/customrestrends",sites)
}


///////////////////////////////////////////////////////////////////////////////////////////////////


GetHumanDorpTrend_Sites():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/fptsites/humansdorp-offtake")

}

Post_HumanDorpTrend_Sites( startDate: string, endDate:string ):Observable<any[]>{
  const dates : Dates={
    startDate: startDate,
    endDate: endDate
  }
  return this.http.post<any[]>(this.su.serverURL+"/fptsites/humansdorp-offtake",dates)
}

///////////////////////////////////////////////////////////////////////////////////////////////////
Get_PBSFO_Trend_Sites():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/fptsites/paradise-beach-st-francis-offtake")

}

Post_PBSFO_Trend_Sites( startDate: string, endDate:string ):Observable<any[]>{
  const dates : Dates={
    startDate: startDate,
    endDate: endDate
  }
  return this.http.post<any[]>(this.su.serverURL+"/fptsites/paradise-beach-st-francis-offtake",dates)
}

///////////////////////////////////////////////////////////////////////////////////////////////////
Get_JBOT_Trend_Sites():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/fptsites/jeffreys-bay-off-take")

}

Post_JBOT_Trend_Sites( startDate: string, endDate:string ):Observable<any[]>{
  const dates : Dates={
    startDate: startDate,
    endDate: endDate
  }
  return this.http.post<any[]>(this.su.serverURL+"/fptsites/jeffreys-bay-off-take",dates)
}

///////////////////////////////////////////////////////////////////////////////////////////////////
Get_ONS_Trend_Sites():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/fptsites/ons-paradys")

}

Post_ONS_Trend_Sites( startDate: string, endDate:string ):Observable<any[]>{
  const dates : Dates={
    startDate: startDate,
    endDate: endDate
  }
  return this.http.post<any[]>(this.su.serverURL+"/fptsites/ons-paradys",dates)
}

///////////////////////////////////////////////////////////////////////////////////////////////////
GetIsuzuTrendData( sitesChosen: any[] ):Observable<any[]>{
  const obj: Wessels ={

    sites:sitesChosen
  }
  return this.http.post<any[]>(this.su.serverURL+"/trends/automotive/isuzu",obj)
}




///////////////////////////////////////////////////////////////////////////////////////////////
GetJeffBayOff_Trend( sitesChosen: any[], newStart:string, newEnd:string ):Observable<any[]>{
  const sites : Sites={
    sites: sitesChosen,
    startDate: newStart,
    endDate: newEnd
  };
  return this.http.post<any[]>(this.su.serverURL+"/trends/reslevels/customrestrends",sites)
}




Get_HUP_INLET_TF():Observable<any[]>{
  return this.http.get<any[]>(this.su.serverURL+"/wtw/klm_hup_inlet_tf")

}

Post_HUP_INLET_TF( startDate: string, endDate:string ):Observable<any[]>{
  const dates : Dates={
    startDate: startDate,
    endDate: endDate
  }
  return this.http.post<any[]>(this.su.serverURL+"/wtw/klm_hup_inlet_tf",dates)
}


}





