import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss']
})
export class StudentCardComponent implements OnInit {

  @Input() student;

  constructor() { }

  ngOnInit() {
  }

}
