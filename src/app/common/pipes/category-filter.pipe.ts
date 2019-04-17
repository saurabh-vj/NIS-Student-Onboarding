import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../entities/student';
import { Category } from '../enums/category.enum';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(students: Student[], category: Category): Student[] {
    if (category == Category.All) {
      return students;
    } else {
      return students.filter(s => s.category == category);
    }
  }

}
