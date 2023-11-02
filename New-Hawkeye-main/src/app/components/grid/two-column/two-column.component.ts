import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-two-column',
  templateUrl: './two-column.component.html',
  styleUrls: ['./two-column.component.css']
})
export class TwoColumnComponent implements OnInit {
  value:any
  constructor() { }
  @Input() array:any
  ngOnInit() {
  }
  setTwoNumberDecimal(event:any) {
    this.value = parseFloat(this.value).toFixed(2);
}
}
