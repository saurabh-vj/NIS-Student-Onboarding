import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../entities/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  students$: BehaviorSubject<Student[]> = new BehaviorSubject([]);

  constructor() {
  }

  addStudent(student: Student) {
    const currentData = JSON.parse(localStorage.getItem('students'));
    let updatedData: Student[];
    if (currentData != null) {
      updatedData = [...currentData, student];
    } else {
      updatedData = [student];
    }

    localStorage.setItem('students', JSON.stringify(updatedData));
    this.students$.next(updatedData);
  }

  getStudents() {
    this.students$.next(JSON.parse(localStorage.getItem('students')));
  }
}
