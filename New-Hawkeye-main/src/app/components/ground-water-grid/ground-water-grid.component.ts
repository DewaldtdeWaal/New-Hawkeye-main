import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-ground-water-grid',
  templateUrl: './ground-water-grid.component.html',
  styleUrls: ['./ground-water-grid.component.css']
})
export class GroundWaterGridComponent implements OnInit {

  constructor() { }
  @Input() array:any
  ngOnInit(): void {
  }

}
