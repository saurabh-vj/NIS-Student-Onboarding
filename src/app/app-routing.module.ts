import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentEntryComponent } from "./student-entry/student-entry.component";
import { ViewStudentsComponent } from "./view-students/view-students.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'student',
    component: StudentEntryComponent
  },
  {
    path: 'view',
    component: ViewStudentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
