import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { StudentService } from '../common/services/student.service';
import { Student } from '../common/entities/student';

@Component({
  selector: 'student-entry',
  templateUrl: './student-entry.component.html',
  styleUrls: ['./student-entry.component.scss']
})
export class StudentEntryComponent implements OnInit {
  @Input() disableControls: boolean;
  @Input() student: Student;

  onboardingForm = this.fb.group({
    studentName: ['', Validators.required],
    category: '',
    documents: this.fb.group({
      domicileCertificate: [false],
    }),
    dateOfBirth: ['', Validators.required],
    fatherName: [''],
    motherName: [''],
    lastClassScore: [''],
  });

  constructor(private fb : FormBuilder, public studentService: StudentService) { }

  ngOnInit() {
    // this.onboardingForm.setValue(this.student);
  }

  onSubmit() {
    // let key = 'Item 1';
    // sessionStorage.setItem(key, 'Value');
    const student = this.onboardingForm.value as Student;
    this.studentService.addStudent(student);
    // console.log(this.onboardingForm.value);
  }
}
