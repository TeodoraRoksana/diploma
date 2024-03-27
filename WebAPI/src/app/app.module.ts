import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {MatFormFieldModule} from '@angular/material/form-field';


// import {
//   FormControl,
//   FormGroupDirective,
//   NgForm,
//   Validators,
//   FormsModule,
//   ReactiveFormsModule,
// } from '@angular/forms';
// import {ErrorStateMatcher} from '@angular/material/core';
// import {MatInputModule} from '@angular/material/input';
// import {NgIf} from '@angular/common';
// import {MatIconModule} from '@angular/material/icon';
// import {MatButtonModule} from '@angular/material/button';



import {
  SocialLoginModule,
} from '@abacritt/angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './components/menu/menu.component';
import { MonthlyPlanningComponent } from './components/monthly-planning/monthly-planning.component';
import { DayCellComponent } from './components/monthly-planning/components-for-calendar/day-cell/day-cell.component';
import { WeekCellComponent } from './components/monthly-planning/components-for-calendar/week-cell/week-cell.component';
import { MonthlyPlanningDialogComponent } from './components/monthly-planning/components-for-calendar/monthly-planning-dialog/monthly-planning-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,

    LogInComponent,
    MenuComponent,
    DayCellComponent,
    WeekCellComponent,
    MonthlyPlanningComponent,
    MonthlyPlanningDialogComponent,

    SocialLoginModule,

    
    
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
