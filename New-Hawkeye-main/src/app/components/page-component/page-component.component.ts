import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-component',
  templateUrl: './page-component.component.html',
  styleUrls: ['./page-component.component.css']
})
export class PageComponentComponent implements OnInit {

  constructor() { }
  @Input() siteTitle:any
  ngOnInit() {
  }

}
