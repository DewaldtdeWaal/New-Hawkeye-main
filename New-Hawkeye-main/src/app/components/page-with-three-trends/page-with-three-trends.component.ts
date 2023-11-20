import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-page-with-three-trends',
  templateUrl: './page-with-three-trends.component.html',
  styleUrls: ['./page-with-three-trends.component.css']
})
export class PageWithThreeTrendsComponent implements OnInit {

  constructor() { }

  @Input() siteTitle:any = "siteTitle";
  @Input() isLoading:any;
  @Input() options: EChartsOption;
  @Input() options2:EChartsOption;
  @Input() options3:EChartsOption;

//This can be overwritten by the parent component
  @Input() trendNameOne:any = "Flow Data";
  @Input() trendNameTwo:any=  "Level Data";
  @Input() trendNameThree:any=  "Level Data";


  @Output() messageEvent = new EventEmitter<string>()

 range:any = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });





  ngOnInit() {
    this.onDateOutPut();

  }

  onDateOutPut(){
    this.messageEvent.emit(this.range)
  }




}
