import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../entities/student';

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {

  transform(students: Student[], text: string): Student[] {
    if (text) {
      return students.filter(s => s.studentName.includes(text));
    }

    return students;
  }

}
