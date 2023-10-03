import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-two-column',
  templateUrl: './two-column.component.html',
  styleUrls: ['./two-column.component.css']
})
export class TwoColumnComponent implements OnInit {

  constructor() { }
  @Input() array:any
  ngOnInit() {
  }

}
