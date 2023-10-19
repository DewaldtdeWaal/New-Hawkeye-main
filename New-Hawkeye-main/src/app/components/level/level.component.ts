import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {


  //this is important as it allows us to truncate in the html
  math = Math;

  @Input() level:any
  constructor() {


  }

  ngOnInit() {
  }

}
