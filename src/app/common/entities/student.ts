import { Category } from '../enums/category.enum';

export interface Student {
    id: number;
    studentName: string;
    category: Category
    documents: string;
    dateOfBirth: Date;
    fatherName: string;
    motherName: string;
    lastClassScore: number;
}
