import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-res-panel',
  templateUrl: './res-panel.component.html',
  styleUrls: ['./res-panel.component.css']
})
export class ResPanelComponent implements OnInit {

  constructor() { }


  @Input() level:any
  @Input() title:any


  ngOnInit() {
  }

}
