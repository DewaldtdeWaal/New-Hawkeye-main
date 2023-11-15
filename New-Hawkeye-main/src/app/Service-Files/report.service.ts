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
  postType:boolean;
  

}




@Injectable({
  providedIn: 'root'
})
export class ReportService {
trendDataDemo:any[]=[];
fmt_Trend_Start_Date:string;
fmt_Trend_End_Date:string;

  constructor(private http: HttpClient, private su: ServerURLService) {}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async Post_Wessels_Total_Feeds(array:any[], postType:any){
  try{
  var returnVariable
  var data;
  const obj: Wessels ={
    postType:postType,
    sites:array
  }


  returnVariable =  this.http.post(this.su.serverURL + "/feedlots/wessels/new", obj).toPromise().then(DATA =>{

    data = DATA

    console.log("data")
    console.log(data)

    console.log("data")
    return data;

  })


}catch(err){
console.log(err)
}
return returnVariable

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



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////








async GetTrend_Sites( sitesChosen: any[], newStart:string, newEnd:string ){
  const sites : Sites={
    sites: sitesChosen,
    startDate: newStart,
    endDate: newEnd
  };

  return  this.http.post(this.su.trendURL+"/trends/reslevels/customrestrends", sites).toPromise().then(data =>{
    return data;
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async GetWesTrend_Sites( sitesChosen: any[], newStart:string, newEnd:string ){
  const sites : Sites={
    sites: sitesChosen,
    startDate: newStart,
    endDate: newEnd
  };
  return  this.http.post(this.su.serverURL+"/westrends/values", sites).toPromise().then(data =>{




    return data
  });

}





// ///////////////////////////////////////////////////////////////////////////////////////////////////
GetIsuzuTrendData( sitesChosen: any[] ):Observable<any[]>{
  const obj: Wessels ={
    postType:false,
    sites:sitesChosen
  }
  return this.http.post<any[]>(this.su.serverURL+"/trends/automotive/isuzu",obj)
}




///////////////////////////////////////////////////////////////////////////////////////////////




}
