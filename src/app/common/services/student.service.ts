import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../entities/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  students$: BehaviorSubject<Student[]> = new BehaviorSubject([]);

  constructor() { 
    console.log('Service');
  }

  addStudent(student: Student) {
    const currentData = this.students$.getValue();
    const updatedData = [...currentData, student];

    console.log(updatedData);
    this.students$.next(updatedData);
  }  
}
