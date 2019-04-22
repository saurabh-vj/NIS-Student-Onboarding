import { Component, OnInit } from '@angular/core';
import { StudentService } from '../common/services/student.service';
import { Student } from '../common/entities/student';
import { FormControl, FormGroup } from "@angular/forms";
import { Category } from '../common/enums/category.enum';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.scss']
})
export class ViewStudentsComponent implements OnInit {

  students: Student[];
  selectedCategory: Category;
  filterByName: string;
  categories = Category;
  
  constructor(private studentService: StudentService) {
    studentService.students$.subscribe(data => this.students = data);
  }

  ngOnInit() {
    this.selectedCategory = Category.All;
    this.filterByName = '';
    this.studentService.getStudents();
  }

}
