import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { LoginComponent } from './login/login.component';
import { StudentEntryComponent } from './student-entry/student-entry.component';
import { ViewStudentsComponent } from './view-students/view-students.component';
import { StudentCardComponent } from './student-card/student-card.component';
import { CategoryFilterPipe } from './common/pipes/category-filter.pipe';
import { NameFilterPipe } from './common/pipes/name-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    LoginComponent,
    StudentEntryComponent,
    ViewStudentsComponent,
    StudentCardComponent,
    CategoryFilterPipe,
    NameFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
