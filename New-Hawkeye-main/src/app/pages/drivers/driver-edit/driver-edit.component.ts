import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Router, NavigationStart} from '@angular/router'
import { createDriverService } from 'src/app/Service-Files/Driver/addDriver.service';
import { Subscription } from 'rxjs';
import { browser } from 'protractor';
import { variable } from '@angular/compiler/src/output/output_ast';

export let browserRefresh = false;

export interface PeriodicElement {
  tagName: string;
  description: string;
  type: string;
  unit:string;
  wordSwap: boolean;
  register: string;
  trend:boolean;
  period:string;
  scaling:number;

}
let variableCreation: any[] = [];
let sortedTagList: any[] = []
@Component({
  selector: 'app-driver-edit',
  templateUrl: './driver-edit.component.html',
  styleUrls: ['./driver-edit.component.css']
})

export class DriverEditComponent implements OnInit {

  checked = false;
  disabled = false;

  @ViewChild('myForm') myForm!:NgForm;
  @ViewChild('fontSize') fontSize:MatSelect
  resetForm(form:NgForm) {
    form.resetForm();
  }
//So the clear Selection function should deselect the
  clearSelection(){
    this.fontSize.value = "";
  }

  ipaddress:any;
  driverName:any;
  description:any;
  siteType:any;
  dataArray:any;
  tagName:any;

  message:any;



  siteTypeDropDownValue:any;
  typeDropDownValue:any;
  periodDropDownValue:any;
  measurement :any;
  numberDropDownValue:any;
  word_swap_control:any = false;
  trend_control:any = false;
  selectedPeriod: any;
  finalRegister:any;
  asdfasdfasfdasf:any;
  filterValue: any="";
  @ViewChild(MatSort) sort: MatSort;
  ELEMENT_DATA: PeriodicElement[] = [];
  dataSource:any;
  dataOptions:any = ['BOOL', 'INT', 'UINT', 'DINT', 'UDINT','FLOAT'];
  periodOptions:any = ['1 Minute',  '10 Minutes', '1 Hour',  '6 Hours', '12 Hours', 'Midnight'];
   displayedColumns :string[]= ['tagName', 'description','unit', 'type','wordSwap', 'register',"scaling", 'trend','period',"edit","delete"];
  numberTypeOptions:any=["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"];
  siteTypeOptions:any =  ['Reservoir', 'Pump Station', 'Ground Water', 'FPT', 'WTW'];
  siteDescription:any;
  tagNameFill:any;
  descriptionNameFill:any;
  memoryWordFill:any;
  scalingWordFill:any;
  unitFill:any;
  typeDropDownSelected:any;
  unitDropDownSelected:any;
  numberDropDownSelected:any;
  periodDropDownSelecteds:any;
  numberSelected:any;
  subscription: Subscription;

  //These variables are there inorder to restore the value selcted by the drop down lists.  Incase a drop down value wasn't changed
  previoustypeDropDownSelected:any;
  previousNumberDropDownSelected:any;
  previousPeriodDropDownValue:any;
  displayOverWriteButton:any;
  displayTagButton:any

  showScalling:boolean = false;

  constructor(private el:ElementRef, private cdr:ChangeDetectorRef, private CDS: createDriverService, private router: Router) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    })
  }

  OverWriteButton(element:any){

    this.displayOverWriteButton = document.getElementById("idOverWriteButton");
       this.displayOverWriteButton.style.display = element;
  }

  blockTagName(element:any){
    this.displayTagButton = document.getElementById("tagName");
    this.displayTagButton = element;
  }

  ngOnInit() {

    this.blockTagName("disabled")
    this.fillPage();
    this.OverWriteButton('none');

  }

  async fillPage(){
    variableCreation = await this.getVariableData(variableCreation);

   this.pushVariableOnPageLoad(variableCreation)
  }

  trendToggle(event:any){

  }
  wordSwapToggle(){
  }

  overWrite(form:NgForm){
    this.siteType = this.siteTypeDropDownValue

   this.OverWriteButton('none');
   this.deleteFromTable(form.value.tagName);
   this.onAddToTable(form);

  }

  deleteFromTable(valueSearched:any){

    for ( var i = 0; i < variableCreation.length; i++)
    {
      if (variableCreation[i].tagName  == valueSearched){

        variableCreation.splice(i, 1);

        i =variableCreation.length;
      }
    }

    sortedTagList = this.binarySearchAndDelete(sortedTagList,valueSearched);
  }

   linearSearch(tagList: string[], searchName: string): boolean {
    for (const name of tagList) {
      if (name === searchName) {
        return true; // Name found
      }
    }
    return false; // Name not found
  }


   binarySearchAndDelete(tagList: string[], searchName: string): string[] {
    let left = 0;
    let right = tagList.length - 1;
    let foundIndex = -1;

    while (left <= right) {
      const middle = Math.floor((left + right) / 2);
      const middleName = tagList[middle];

      if (middleName === searchName) {
        foundIndex = middle;
        break;
      } else if (middleName < searchName) {
        left = middle + 1;
      } else {
        right = middle - 1;
      }
    }

    if (foundIndex !== -1) {
      tagList.splice(foundIndex, 1); // Remove the name at the found index
    }

    return tagList;
  }

  onSiteType(event:any){
    this.siteTypeDropDownValue = event.value
  }
  onTypeSelected(event:any){
  this.typeDropDownValue =event.value
  }

  onUnitSelected(event:any){
    this.measurement  = event.value;
  }

  onNumberSelect(event:any){
    this.numberDropDownValue = event.value;
  }

  onPeriodSelected(event:any){
    this.periodDropDownValue =event.value;
  }

  onSubmitToDataBase(form:NgForm){
    if(form.invalid){
      return;
    }

   this.CDS.updateDriver(form.value.ipaddress, this.driverName,form.value.siteDescription,this.siteTypeDropDownValue,variableCreation,true)

  }

  pushVariableOnPageLoad(variableCreation:any){

    for(var i = 0; i<variableCreation.length;i++){

      this.listening(variableCreation[i].tagName,variableCreation[i].description,variableCreation[i].typeDropDownValue,variableCreation[i].word_swap_control,variableCreation[i].register,variableCreation[i].trend_control,variableCreation[i].periodDropDownValue,variableCreation[i].measurement ,variableCreation[i].scaling,i)
    }
  }

  listening(TagName: string,description: string,Type: string,WordSwap: boolean,Register: string,Trend:boolean,Period:string,measurement :string,Scaling:any,Count:number){

    this.ELEMENT_DATA.length =  Count ;
    this.ELEMENT_DATA[Count]={ tagName:TagName, description:description, type:Type, unit:measurement ,wordSwap:WordSwap,register:Register,trend:Trend,period:Period,scaling:Scaling };
     this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
     this.dataSource.sort = this.sort;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
   }

   editRow(event:NgForm)
   {
    this.OverWriteButton('block');
     for(var i = 0; i < variableCreation.length; i++)
     {
      if(variableCreation[i].tagName == event)
      {
        this.fillFieldsWithValues(variableCreation[i])
      }
     }
   }

   workoutScalingValue(variable:any){

    if(variable == undefined || variable == null || variable == "undefined" || variable == "null" ){
      return 1;
    }
    else{
      return variable;
    }
   }

   fillFieldsWithValues(variableCreation:any)
    {

      console.log(variableCreation)
      this.tagNameFill = variableCreation.tagName;
      this.descriptionNameFill = variableCreation.description;
      this.typeDropDownSelected = variableCreation.typeDropDownValue;
      this.unitFill = variableCreation.measurement ;
      this.periodDropDownSelecteds = variableCreation.periodDropDownValue
      this.trend_control = variableCreation.trend_control;
      this.word_swap_control = variableCreation.word_swap_control;

      this.trendToggle(variableCreation.trend_control)
      this.scalingWordFill = this.workoutScalingValue(variableCreation.scaling)
      this.previoustypeDropDownSelected =  variableCreation.typeDropDownValue;
      this.previousPeriodDropDownValue = variableCreation.periodDropDownValue;

      if(this.typeDropDownSelected == 'BOOL'){
       var slicer = variableCreation.register.toString().slice(-2);
        var slicedValue = slicer.startsWith(".") ? slicer.slice(-1) : slicer;

        //rounding the value down. If I just round the value up the register will go up if the bit is above 4
        this.memoryWordFill = Math.floor(parseFloat(variableCreation.register))
        this.numberSelected = slicedValue;
        this.scalingWordFill = variableCreation.scaling;

        this.previousNumberDropDownSelected = this.numberSelected;
      }
      else{
        this.memoryWordFill = variableCreation.register;
      }
    }

  deleteRow(form: NgForm){
    if(form.invalid)
    return

    this.deleteFromTable(form);

    this.pushVariableOnPageLoad(variableCreation);
  }

  onAddToTable(form: NgForm){
    if (form.invalid) {
      return;
    }

    var doesTagExist = this.linearSearch(sortedTagList,form.value.tagName )

    if(doesTagExist != true){
    this.OverWriteButton('none');

    if(this.trend_control == false){
      this.periodDropDownValue = undefined;
    }
    else {
      if(this.periodDropDownValue == undefined){
        this.periodDropDownValue = this.previousPeriodDropDownValue;
      }
    }
    //Make this into a function
    if (this.typeDropDownValue == undefined){
      this.typeDropDownValue = this.previoustypeDropDownSelected;
    }

    if(this.typeDropDownValue == "BOOL"){

      if(this.numberDropDownValue == undefined){
        this.numberDropDownValue = this.previousNumberDropDownSelected;
      }
      this.finalRegister = form.value.register.toString() + "." +  this.numberDropDownValue.toString();

      variableCreation.push({tagName:form.value.tagName,description:form.value.description,typeDropDownValue:this.typeDropDownValue,word_swap_control:this.word_swap_control,register: this.finalRegister,trend_control:this.trend_control,periodDropDownValue:this.periodDropDownValue,measurement :form.value.tagUnit,scaling:form.value.scaling  })

    }
    else{
      this.finalRegister = form.value.register.toString()
      variableCreation.push({tagName:form.value.tagName,description:form.value.description,typeDropDownValue:this.typeDropDownValue,word_swap_control:this.word_swap_control,register: this.finalRegister,trend_control:this.trend_control,periodDropDownValue:this.periodDropDownValue,measurement :form.value.tagUnit,scaling:form.value.scaling  })
    }

    for(var i = 0; i<variableCreation.length;i++){

    this.listening(variableCreation[i].tagName,variableCreation[i].description,variableCreation[i].typeDropDownValue,variableCreation[i].word_swap_control,variableCreation[i].register,variableCreation[i].trend_control,variableCreation[i].periodDropDownValue,variableCreation[i].measurement ,variableCreation[i].scaling,i)
    }

    this.resetForm(form);
    this.clearSelection()
    this.trend_control = false
    this.word_swap_control = false
    this.periodDropDownValue = undefined;
    this.typeDropDownValue = undefined;
    this.numberDropDownValue = undefined;
  }
  }

//turn this into a async function
async getVariableData(variableCreation: any) {
  this.cdr.detectChanges();
  this.ipaddress = await this.restoreItem(this.ipaddress,this.CDS.getIPAddress(), "IpAddress");
  this.driverName = await this.restoreItem(this.driverName,this.CDS.getDriverName(), "DriverNames");
  this.siteDescription = await this.restoreItem(this.siteDescription,this.CDS.getSiteDescription(), "SiteDescription");
  this.siteType = await this.restoreItem(this.siteType,this.CDS.getSiteType(), "SiteType");
  this.siteTypeDropDownValue = this.siteType
  variableCreation = await this.restoreTable(variableCreation,this.driverName);

  this.storeInSortedArray(variableCreation)
  return variableCreation;
}

storeInSortedArray(variable:any){
  for(var i = 0; i < variable.length;i++){
    sortedTagList[i] = variable[i].tagName;
  }
  sortedTagList = this.sortArray(sortedTagList)
}

sortArray(names: string[]): string[] {
  return names.slice().sort();
}

  async restoreTable(localVariable:any,driverName:any){
    localVariable = await this.CDS.getDriverData(driverName).then();

   return localVariable;
  }

  restoreItem(localVariable:any, method:any, sessionStorageVariable:any ){
    localVariable = method;

    if(localVariable ===undefined)
    {
      localVariable = sessionStorage.getItem(sessionStorageVariable)
    }
    else{
    sessionStorage.setItem(sessionStorageVariable,localVariable)
    }
    return localVariable;
  }

  ngOnDestroy(){
    sessionStorage.clear()
  }
}
