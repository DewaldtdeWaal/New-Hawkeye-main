import { Component, Injectable, Input, OnInit } from '@angular/core';
import {svgImage} from'src/app/Service-Files/SVGImage/svgImage.service';

@Injectable({ providedIn: "root" })
@Component({
  selector: 'app-ground-water',
  templateUrl: './ground-water.component.html',
  styleUrls: ['./ground-water.component.css']
})
export class GroundWaterComponent implements OnInit {

  constructor(private svg:svgImage) { }

  @Input() title:any

  @Input() pumpType:any


  @Input() array: any

  @Input() generalfaultdatasource: any

  @Input() pumpColor:any

  groundImage = this.svg.groundWaterSVG

  pumpImage = this.svg.pumpSVG


  ngOnInit() {
  }


}
