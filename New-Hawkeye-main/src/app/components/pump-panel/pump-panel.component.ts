import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-pump-panel',
  templateUrl: './pump-panel.component.html',
  styleUrls: ['./pump-panel.component.css']
})
export class PumpPanelComponent implements OnInit {

  constructor() { }

  @Input() variableArray:any

  ngOnInit() {
  }

}
