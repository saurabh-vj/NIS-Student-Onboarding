import { Category } from '../enums/category.enum';

export interface Student {
    studentName: string;
    category: Category
    documents: string;
    dateOfBirth: Date;
    fatherName: string;
    motherName: string;
    lastClassScore: number;
}
