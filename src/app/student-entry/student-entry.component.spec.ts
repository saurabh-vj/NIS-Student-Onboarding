import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEntryComponent } from './student-entry.component';

describe('StudentEntryComponent', () => {
  let component: StudentEntryComponent;
  let fixture: ComponentFixture<StudentEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
