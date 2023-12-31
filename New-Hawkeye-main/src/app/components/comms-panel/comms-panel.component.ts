import { Component, OnInit,Input } from '@angular/core';
import { pageBuilder } from 'src/app/class/pageBulder';

@Component({
  selector: 'app-comms-panel',
  templateUrl: './comms-panel.component.html',
  styleUrls: ['./comms-panel.component.css']
})
export class CommsPanelComponent implements OnInit {

  constructor(public pb:pageBuilder,) { }

  @Input() communicationStatus:any
  @Input() lastUpdate:any

  @Input() batteryUnit:any

  @Input() batteryUnitNames: any




  variables:any = [{}]




  ngOnInit() {

    this.variables = [{
      value:this.batteryUnit,
      tagName:this.batteryUnitNames
    }]




  }

}
