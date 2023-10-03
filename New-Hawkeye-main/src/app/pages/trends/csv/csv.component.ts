import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Service-Files/auth.service';
import { ReportService } from 'src/app/Service-Files/report.service';
//import { TrendPickerComponent } from '../trendpicker/trend-picker.component';
import { saveAs } from 'file-saver';
import{trendArray,variables,TrendPicker,siteVariableMap} from 'src/app/class/trendpicker';
@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.css'],
})
export class CsvComponent implements OnInit {
  Sites = new FormControl();
  SitesList: string[] = [];



 // Right = new FormControl();
 range = new FormGroup({
  start: new FormControl(),
  end: new FormControl()
});
  options: any;
  userSites:string[];
  isLoading: boolean = false;
  public authListenerSubs!: Subscription;
  newStart:any
  newEnd:any

timeStamps= new FormControl();
selectedItem: string[]=["1 Min", "10 Min", "1 Hour", "6 Hours","12 Hours", "1 Day"];
variable:any = variables;
nmb_schoe_r_actuator_valve_feedback_signal_error_arr:any[]=[];
nmb_schoe_r_actuator_valve_command_signal_error_arr:any[]=[];
nmb_schoe_r_reservoir_level_signal_error_arr:any[]=[];
nmb_schoe_r_actuator_valve_fault_arr:any[]=[];
nmb_schoe_r_actuator_valve_torque_fail_close_arr:any[]=[];
nmb_schoe_r_actuator_valve_torque_fail_open_arr:any[]=[];
nmb_schoe_r_general_fault_arr:any[]=[];
nmb_schoe_r_actuator_general_fault_arr:any[]=[];
nmb_schoe_r_actuator_valve_timeout_arr:any[]=[];








  constructor(private authService: AuthService,public rs: ReportService) {



    window.addEventListener("load", () => {
      const button = document.getElementById("export");
      if (button) {
        button.style.display = "none";
      }
    });



  }

  formula: string;
  ngOnInit() {

    this.userSites = this.authService.getUserSites();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(() => {
      this.userSites = this.authService.getUserSites();
    })

    var count=0

for (let i = 0; i < this.userSites.length; i++) {

  switch (this.userSites[i]) {

    case"KLM_HUP_GW":
    this.SitesList[count]="Humansdorp 1 Water Level"
    count++
    this.SitesList[count]="Humansdorp 1 Flow Rate"
    count++
    this.SitesList[count]="Humansdorp 1 Total Flow"
    count++
    break;

    case"KLM_HUP2_GW":
    this.SitesList[count]="Humansdorp 2C Water Level"
    count++
    this.SitesList[count]="Humansdorp 2C Flow Rate"
    count++
    this.SitesList[count]="Humansdorp 2C Total Flow"
    count++
    break;

     case"KLM_HUP3_GW":
     this.SitesList[count]="Humansdorp 3 Water Level"
     count++
     this.SitesList[count]="Humansdorp 3 Flow Rate"
     count++
     this.SitesList[count]="Humansdorp 3 Total Flow"
     count++
     break;

  case"KLM_HUP4_GW":
  this.SitesList[count]="Humansdorp 4 Water Level "
  count++
  this.SitesList[count]="Humansdorp 4 Flow Rate"
  count++
  this.SitesList[count]="Humansdorp 4 Total Flow"
  count++
  break;


  case"KLM_HUP6_GW":
  this.SitesList[count]="Humansdorp 6 Water Level"
  count++
  this.SitesList[count]="Humansdorp 6 Flow Rate"
  count++
  this.SitesList[count]="Humansdorp 6 Total Flow"
  count++
  break;

  case "NMB_SCHOE_R":
    this.SitesList[count]="Schoemanshoek Actuator Valve Feedback Signal"
    count++
    this.SitesList[count]="Schoemanshoek Actuator Valve Command Signal"
    count++
    this.SitesList[count]="Schoemanshoek Reservoir Level Signal Error"
    count++
    this.SitesList[count]="Schoemanshoek Actuator Valve Fault"
    count++
    this.SitesList[count]="Schoemanshoek Actuator Valve Torque Fail Close"
    count++
    this.SitesList[count]="Schoemanshoek Actuator Valve Torque Fail Open"
    count++
    this.SitesList[count]="Schoemanshoek General Fault"
    count++
    this.SitesList[count]="Schoemanshoek Actuator General Fault"
    count++
    this.SitesList[count]="Schoemanshoek Actuator Valve Timeout"
    count++

    break;

 }

  this.SitesList.sort(function(a,b){
    return a.localeCompare(b);

  })

  //console.log(this.SitesList)
}

  }
    //Why is this data invaid
    getValue:any
  onTrendFilter(){

    var options = {
      title: 'User Details',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      noDownload: false,
      showTitle: false,
      useBom: false,
    };

    var start = this.range.value.start;
    var end = this.range.value.end;

    var trend :any;
      if (start!=null && end!=null){
        this.newStart = new Date(this.range.value.start).toISOString().slice(0, 10);
        this.newEnd = new Date(this.range.value.end).toISOString().slice(0, 10);
        }
      if (this.Sites.value==null || this.Sites.value==undefined){}
      else{
        this.rs.GetTrend_Sites(this.Sites.value,this.newStart,this.newEnd).subscribe(data => {
          trend= data;

          this.variable = TrendPicker.getRouteDataForTrendPicker(data,this.variable,trendArray)

          console.log(this.variable.KLM_HUP_FLOWRATE_Arr)


          const button = document.getElementById("export");
          if (button) {
            button.style.display = "block";
          }





        })
      }
  }



   handleClick() {
// Define an interface called AxisMap which allows any string key and value of any type.
interface AxisMap {
  [key: string]: any;
}

// Declare two variables called fileInfo and objArr (Note: They are not initialized yet).
var fileInfo, objArr;

// Create a constant called axisMap and assign it a value of siteVariableMap (which should be defined somewhere else)
const axisMap: AxisMap = siteVariableMap;

// Assign the value of the selected site from the Sites object to a variable called siteWhichWasPicked.
let siteWhichWasPicked: string = this.Sites.value;

// Get the first character of siteWhichWasPicked and assign it to a constant called siteName.


for(let i =0; i<siteWhichWasPicked.length; i ++){

const siteName = siteWhichWasPicked[i];
// Get the axis map for the site corresponding to the first letter of the site name.
// If it doesn't exist, throw an error.
const arr = axisMap[siteName];
if (!arr) {
  throw new Error(`Invalid site name: ${siteName}`);
}



// Map items in the `variable` property of `this` (whatever 'this' refers to) using a callback function
// that formats each item as a Javascript object with "date" and "data" properties.
// The formatting is done using the `convertDateTime()` function.
objArr = this.variable[arr].map((item: any[]) => {
  return {
    date: convertDateTime(item[0]),
    data: item[1]
  };
});

// Set the options for the CSV file to be downloaded.
// This includes a title, field separator, quotes, headers, decimal separator, and more.
const options = {
  title: 'User Details',
  fieldSeparator: ',',
  quoteStrings: '"',
  headers: ["Date", "Value"],
  decimalseparator: '.',
  showLabels: false,
  noDownload: false,
  showTitle: false,
  useBom: false,
};

// Generate a new CSV file using the objArr data, siteName as the filename, and the options above.
fileInfo = new ngxCsv(objArr, siteName, options);

}
  }
}




//So what you are going to do is take the the sitemap and use that to merge all the data in the trend variable into a single merged array for csv file




function convertDateTime(inputDateTime:any){

const dateObject = new Date(inputDateTime);
const day = dateObject.getDate().toString().padStart(2, '0');
const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
const year = dateObject.getFullYear();
const hours = dateObject.getHours().toString().padStart(2, '0');
const minutes = dateObject.getMinutes().toString().padStart(2, '0');
const seconds = dateObject.getSeconds().toString().padStart(2, '0')
const outputDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

return outputDateTime;

}



