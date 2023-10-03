import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-comms-panel',
  templateUrl: './comms-panel.component.html',
  styleUrls: ['./comms-panel.component.css']
})
export class CommsPanelComponent implements OnInit {

  constructor() { }

  @Input() communicationStatus:any
  @Input() array:any






  ngOnInit() {


  }

}
