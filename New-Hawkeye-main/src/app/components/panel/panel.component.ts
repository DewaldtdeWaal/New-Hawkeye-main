import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  constructor() { }

  @Input() communicationStatus:any
  @Input() array:any
  @Input() level:any
  @Input() title:any





  ngOnInit(): void {
  }

}
