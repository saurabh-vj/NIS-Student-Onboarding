import { Injectable } from '@angular/core';
import { Category } from '../enums/category.enum';
import { Documents } from '../enums/documents.enum';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: { [index: number]: Boolean } = {}

  constructor() {
    this.documents[Documents.DomicileCertificate] = true;
    this.documents[Documents.BirthCertificate] = true;
    this.documents[Documents.PreviousMarksheets] = true;
    this.documents[Documents.PoliceClearance] = true;
    this.documents[Documents.Passport] = true;
    this.documents[Documents.SignedDeclaration] = true;
  }

  getMandatoryDocuments(category: Category) {
    if (category == Category.Domestic) {
      this.documents[Documents.PoliceClearance] = false;
      this.documents[Documents.Passport] = false;
    } else {
      this.documents[Documents.PoliceClearance] = true;
      this.documents[Documents.Passport] = true;
    }

    return this.documents;
  }
}
