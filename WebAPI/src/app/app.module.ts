import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {MatFormFieldModule} from '@angular/material/form-field';

import { HttpClientModule } from '@angular/common/http';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import { 
	IgxInputGroupModule,
	IgxDateTimeEditorModule,
	IgxTextSelectionModule
 } from "igniteui-angular";
 
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
import { RegistrationComponent } from './components/registration/registration.component';
import { DailyPlanningComponent } from './components/daily-planning/daily-planning.component';
import { TagDialogComponent } from './components/tag-dialog/tag-dialog.component';
import { TagEditDialogComponent } from './components/menu/components-for-menu/tag-edit-dialog/tag-edit-dialog.component';
import { MonthPickerComponent } from './components/monthly-planning/components-for-calendar/monthly-planning-dialog/month-picker/month-picker.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { StoreModule } from '@ngrx/store';
import { tagReducer } from './store/tags/tag.reducer';
import { TaskCellComponent } from './components/task-cell/task-cell.component';
import { TaskEditDialogComponent } from './components/task-cell/components-for-task/task-edit-dialog/task-edit-dialog.component';
import { WeeklyPlanningComponent } from './components/weekly-planning/weekly-planning.component';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    MenuComponent,
    DayCellComponent,
    WeekCellComponent,
    MonthlyPlanningDialogComponent,
    MonthlyPlanningComponent,
    RegistrationComponent,
    DailyPlanningComponent,
    TagDialogComponent,
    TagEditDialogComponent,
    MonthPickerComponent,
    TaskCellComponent,
    TaskEditDialogComponent,
    WeeklyPlanningComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule, 
    NgIf, 
    NgFor,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatDialogModule,
    MatInputModule, 
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatChipsModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatDividerModule,
    IgxInputGroupModule,
    IgxDateTimeEditorModule,
    IgxTextSelectionModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,

    StoreModule.forRoot({ tags: tagReducer }),
    SocialLoginModule,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
