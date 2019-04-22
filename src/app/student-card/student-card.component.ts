import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from '../common/services/student.service';
import { Student } from '../common/entities/student';

@Component({
  selector: 'student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss']
})
export class StudentCardComponent implements OnInit {

  @Input() student;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
  }

  deleteStudent(student: Student) {
    if (confirm(`Are you sure you want to delete the information for ${student.studentName}?`)) {
      this.studentService.deleteStudent(student.id);
    }
  }

}
