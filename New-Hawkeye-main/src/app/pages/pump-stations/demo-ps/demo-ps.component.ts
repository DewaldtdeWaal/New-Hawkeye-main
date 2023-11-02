import { Component, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventEmitter, Input, Output } from '@angular/core';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import {svgImage} from 'src/app/Service-Files/SVGImage/svgImage.service'


@Component({
  selector: 'app-demo-ps',
  templateUrl: './demo-ps.component.html',
  styleUrls: ['./demo-ps.component.css']
})
export class DemoPSComponent  {
  @Input() heading: string;
  @Input() color: string;
  @Output() event = new EventEmitter();


  svgPump:any

  groundImage= this.svg.groundWaterSVG

  public toggle: boolean = false;

  public rgbaText: string = 'rgba(165, 26, 214, 0.2)';

  onSumbitColor(form: NgForm){
    console.log(form)
  }

public colorList = [
    { key: "flame", value: "#e45a33", friendlyName: "Flame" },
    {key: "orange", value: "#fa761e", friendlyName: "Orange" },
    {key: "infrared",     value: "#ef486e", friendlyName: "Infrared" },
    {key: "male",       value: "#4488ff", friendlyName: "Male Color" },
    {key: "female",     value: "#ff44aa", friendlyName: "Female Color" },
    {key: "paleyellow",    value: "#ffd165", friendlyName: "Pale Yellow" },
    {key: "gargoylegas",  value: "#fde84e", friendlyName: "Gargoyle Gas" },
    {key: "androidgreen",   value: "#9ac53e", friendlyName: "Android Green" },
    {key: "carribeangreen",    value: "#05d59e", friendlyName: "Carribean Green" },
    {key: "bluejeans",    value: "#5bbfea", friendlyName: "Blue Jeans" },
		{key: "cyancornflower",    value: "#1089b1", friendlyName: "Cyan Cornflower" },
		{key: "warmblack",    value: "#06394a", friendlyName: "Warm Black" },
];


  public presetValues : string[] = [];

  public selectedColor: string = 'color1';

  public cmykColor: Cmyk = new Cmyk(0, 0, 0, 0);

  constructor(public vcRef: ViewContainerRef, private cpService: ColorPickerService, private svg:svgImage) {
    this.presetValues = this.getColorValues();
  }

  getColorValues(){
  return this.colorList.map(c => c.value);
  }


  public onEventLog(event: string, data: any): void {
    console.log(event, data);
  }

  public onChangeColorCmyk(color: string): Cmyk {
    const hsva = this.cpService.stringToHsva(color);

    if (hsva) {
      const rgba = this.cpService.hsvaToRgba(hsva);

      return this.cpService.rgbaToCmyk(rgba);
    }

    return new Cmyk(0, 0, 0, 0);
  }

  public onChangeColorHex8(color: string): string {
    const hsva = this.cpService.stringToHsva(color, true);

    if (hsva) {
      return this.cpService.outputFormat(hsva, 'rgba', null);
    }

    return '';
  }



  onColorChange(event: any) {
    console.log('Selected color:', event);
  }



}
