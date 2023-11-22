import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-comms',
  templateUrl: './common-comms.component.html',
  styleUrls: ['./common-comms.component.css']
})
export class CommonCommsComponent implements OnInit {

  constructor() { }

  @Input() comms:any;
  @Input() lastUpdate:any;

  ngOnInit(): void {
  }

}
