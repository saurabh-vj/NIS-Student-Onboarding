import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { StudentService } from '../common/services/student.service';
import { Student } from '../common/entities/student';
import { Documents } from '../common/enums/documents.enum';
import { DocumentService } from '../common/services/document.service';
import { Category } from '../common/enums/category.enum';

@Component({
  selector: 'student-entry',
  templateUrl: './student-entry.component.html',
  styleUrls: ['./student-entry.component.scss']
})
export class StudentEntryComponent implements OnInit {
  @Input() disableControls: boolean;
  @Input() student: Student;

  documentList = Documents;
  categories = Category;
  mandatoryDocuments: any;

  onboardingForm: FormGroup;

  constructor(private fb: FormBuilder, public studentService: StudentService, public documentService: DocumentService) { }

  ngOnInit() {
    this.mandatoryDocuments = this.documentService.getMandatoryDocuments(Category.Domestic);

    this.onboardingForm = this.fb.group({
      studentName: ['', Validators.required],
      category: [Category.Domestic],
      documents: this.fb.group({
        domicileCertificate: [false],
        birthCertificate: [false],
        previousMarksheets: [false],
        policeClearance: [false],
        passport: [false],
        signedDeclaration: [false],
      }),
      dateOfBirth: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      lastClassScore: ['', Validators.required],
    });

    this.setDocumentValidations();
    this.formControlValueChanged();
  }

  formControlValueChanged() {
    this.onboardingForm.get('category').valueChanges.subscribe(
      (category: Category) => {
        this.mandatoryDocuments = this.documentService.getMandatoryDocuments(category);
        this.setDocumentValidations();
      });
  }

  setDocumentValidations() {
    const domicileCertificate = this.onboardingForm.get('documents').get('domicileCertificate');
    domicileCertificate.clearValidators();
    if (this.mandatoryDocuments[Documents.DomicileCertificate]) {
      domicileCertificate.setValidators([Validators.requiredTrue]);
    }

    const birthCertificate = this.onboardingForm.get('documents').get('birthCertificate');
    birthCertificate.clearValidators();
    if (this.mandatoryDocuments[Documents.BirthCertificate]) {
      birthCertificate.setValidators([Validators.requiredTrue]);
    }
    
    const previousMarksheets = this.onboardingForm.get('documents').get('previousMarksheets');
    previousMarksheets.clearValidators();
    if (this.mandatoryDocuments[Documents.PreviousMarksheets]) {
      previousMarksheets.setValidators([Validators.requiredTrue]);
    }

    const policeClearance = this.onboardingForm.get('documents').get('policeClearance');
    policeClearance.clearValidators();
    if (this.mandatoryDocuments[Documents.PoliceClearance]) {
      policeClearance.setValidators([Validators.requiredTrue]);
    }

    const passport = this.onboardingForm.get('documents').get('passport');
    passport.clearValidators();
    if (this.mandatoryDocuments[Documents.Passport]) {
      passport.setValidators([Validators.requiredTrue]);
    }

    const signedDeclaration = this.onboardingForm.get('documents').get('signedDeclaration');
    signedDeclaration.clearValidators();
    if (this.mandatoryDocuments[Documents.SignedDeclaration]) {
      signedDeclaration.setValidators([Validators.requiredTrue]);
    }
  }

  onSubmit() {
    const student = this.onboardingForm.value as Student;
    this.studentService.addStudent(student);
  }
}
