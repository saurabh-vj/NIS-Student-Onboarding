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
      student.id = Math.max.apply(Math, currentData.map(function (s) { return s.id; })) + 1;
      updatedData = [...currentData, student];
    } else {
      student.id = 1;
      updatedData = [student];
    }

    localStorage.setItem('students', JSON.stringify(updatedData));
    this.students$.next(updatedData);
  }

  getStudents() {
    this.students$.next(JSON.parse(localStorage.getItem('students')));
  }

  getStudentById(id: number): Student {
    const students = JSON.parse(localStorage.getItem('students'));
    return students.find(s => s.id === id);
  }

  updateStudent(student: Student) {
    const students = JSON.parse(localStorage.getItem('students'));
    let index = students.findIndex(st => st.id === student.id);
    students[index] = student;
    localStorage.setItem('students', JSON.stringify(students));
    this.students$.next(students);
  }

  deleteStudent(id: number): any {
    const students = JSON.parse(localStorage.getItem('students'));
    let index = students.findIndex(st => st.id === id);
    if (index > -1) {
      students.splice(index, 1);
    }

    localStorage.setItem('students', JSON.stringify(students));
    this.students$.next(students);
  }
}
