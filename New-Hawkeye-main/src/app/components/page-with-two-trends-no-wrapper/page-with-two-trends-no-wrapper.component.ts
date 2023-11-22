import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-page-with-two-trends-no-wrapper',
  templateUrl: './page-with-two-trends-no-wrapper.component.html',
  styleUrls: ['./page-with-two-trends-no-wrapper.component.css']
})
export class PageWithTwoTrendsNoWrapperComponent implements OnInit {

  constructor() { }

  @Input() siteTitle:any = "siteTitle";
  @Input() isLoading:any;
  @Input() options: EChartsOption;

  @Input() options2:EChartsOption;

//This can be overwritten by the parent component
  @Input() trendNameOne:any = "Flow Data";
  @Input() trendNameTwo:any=  "Level Data";


  @Output() messageEvent = new EventEmitter<string>()

 range:any = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });


  range2:any = new FormGroup({
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
