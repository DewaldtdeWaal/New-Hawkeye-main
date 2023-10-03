import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fortnottingham',
  templateUrl: './fortnottingham.component.html',
  styleUrls: ['./fortnottingham.component.css']
})
export class FortnottinghamComponent implements OnInit {

  comms: any;

  constructor() { }

  ngOnInit() {
    this.comms="OK";
  }

}
