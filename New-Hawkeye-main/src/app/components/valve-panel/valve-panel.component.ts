import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-valve-panel',
  templateUrl: './valve-panel.component.html',
  styleUrls: ['./valve-panel.component.css']
})
export class ValvePanelComponent implements OnInit {

  constructor() { }

  @Input() title:any;
  @Input() array:any;

  ngOnInit(): void {
  }

}
