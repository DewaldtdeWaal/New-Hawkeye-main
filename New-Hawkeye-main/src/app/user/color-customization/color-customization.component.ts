import { Component, OnInit } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-color-customization',
  templateUrl: './color-customization.component.html',
  styleUrls: ['./color-customization.component.css']
})
export class ColorCustomizationComponent implements OnInit {
color:any
  constructor() { }

  ngOnInit(){
  }

}
