import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-glendinningvale',
  templateUrl: './glendinningvale.component.html',
  styleUrls: ['./glendinningvale.component.css']
})
export class GlendinningvaleComponent implements OnInit {

  comms: any;

  constructor() { }

  ngOnInit() {
    this.comms="OK";
  }

}
