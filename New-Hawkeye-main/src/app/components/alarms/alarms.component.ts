import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.css']
})
export class AlarmsComponent implements OnInit {


  @Input() dataSource:any

  displayedColumns :string[]= ['alarm', 'description'];
  constructor() { }

  ngOnInit(): void {
  }

}
