import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-me',
  templateUrl: './user-me.component.html',
  styleUrls: ['./user-me.component.scss']
})
export class UserMeComponent implements OnInit {
  @Output() editUsername = new EventEmitter<any>();
  @Input() me;

  constructor() { }

  ngOnInit() {}

}
