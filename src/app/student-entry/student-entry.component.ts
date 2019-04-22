import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { StudentService } from '../common/services/student.service';
import { Student } from '../common/entities/student';
import { Documents } from '../common/enums/documents.enum';
import { DocumentService } from '../common/services/document.service';
import { Category } from '../common/enums/category.enum';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'student-entry',
  templateUrl: './student-entry.component.html',
  styleUrls: ['./student-entry.component.scss']
})
export class StudentEntryComponent implements OnInit {
  disableControls: boolean = false;
  student: Student;

  documentList = Documents;
  categories = Category;
  mandatoryDocuments: any;

  onboardingForm: FormGroup;
  sub: any;
  studentId: number = 0;

  constructor(
    private fb: FormBuilder,
    public studentService: StudentService,
    public documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.studentId = +params['id'];
        this.disableControls = !(/true/i).test(params['edit']);
      });

    if (this.studentId > 0) {
      this.student = this.studentService.getStudentById(this.studentId);
    } else {
      this.disableControls = false;
    }


    this.onboardingForm = this.fb.group({
      studentName: [{ value: '', disabled: this.disableControls }, Validators.required],
      category: [{ value: Category.Domestic, disabled: this.disableControls }],
      documents: this.fb.group({
        domicileCertificate: [{ value: false, disabled: this.disableControls }],
        birthCertificate: [{ value: false, disabled: this.disableControls }],
        previousMarksheets: [{ value: false, disabled: this.disableControls }],
        policeClearance: [{ value: false, disabled: this.disableControls }],
        passport: [{ value: false, disabled: this.disableControls }],
        signedDeclaration: [{ value: false, disabled: this.disableControls }],
      }),
      dateOfBirth: [{ value: '', disabled: this.disableControls }, Validators.required],
      fatherName: [{ value: '', disabled: this.disableControls }, Validators.required],
      motherName: [{ value: '', disabled: this.disableControls }, Validators.required],
      lastClassScore: [{ value: '', disabled: this.disableControls }, Validators.required],
    });

    if (this.student) {
      this.onboardingForm.patchValue(this.student);
    }

    this.mandatoryDocuments = this.documentService.getMandatoryDocuments(this.student ? this.student.category : Category.Domestic);
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
    if (this.onboardingForm.valid) {
      const student = this.onboardingForm.value as Student;
      if (this.student) {
        student.id = this.student.id;
        this.studentService.updateStudent(student);
        this.router.navigate(['/view']);
      } else {
        this.studentService.addStudent(student);
        this.onboardingForm.reset();
        this.onboardingForm.get('category').setValue(Category.Domestic);
        alert(`Student ${student.studentName} has been added successfully.`);
      }
    }
  }
}
