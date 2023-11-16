import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EChartsOption } from 'echarts';


@Component({
  selector: 'app-page-with-trend',
  templateUrl: './page-with-trend.component.html',
  styleUrls: ['./page-with-trend.component.css']
})
export class PageWithTrendComponent implements OnInit {

  constructor() { }

  @Input() siteTitle:any = "siteTitle";
  @Input() isLoading:any = true;
  @Input() options: EChartsOption;

  //This can be overwritten by the parent component
  @Input() trendNameOne:any = "Trend";

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

  

    
    this.messageEvent.emit(this.range);
  }




}
