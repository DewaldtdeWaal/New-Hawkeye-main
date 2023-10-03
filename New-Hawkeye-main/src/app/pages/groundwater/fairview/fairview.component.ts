import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fairview',
  templateUrl: './fairview.component.html',
  styleUrls: ['./fairview.component.css']
})
export class FairviewComponent implements OnInit {
  comms: any;

  constructor() { }

  ngOnInit() {
    this.comms="OK";
  }

}
