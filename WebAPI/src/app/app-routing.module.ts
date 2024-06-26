import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogInComponent } from './components/log-in/log-in.component';
import { MonthlyPlanningComponent } from './components/monthly-planning/monthly-planning.component'
import { DailyPlanningComponent } from './components/daily-planning/daily-planning.component'
import { RegistrationComponent } from './components/registration/registration.component';
import { WeeklyPlanningComponent } from './components/weekly-planning/weekly-planning.component';

const routes: Routes = [
  {path: '', component:LogInComponent},
  {path: 'registration', component:RegistrationComponent},
  {path: 'monthly-planning', component:MonthlyPlanningComponent},
  {path: 'weekly-planning', component:WeeklyPlanningComponent},
  {path: 'weekly-planning/:currentDate', component:WeeklyPlanningComponent},
  {path: 'daily-planning/:currentDate', component:DailyPlanningComponent},
  {path: 'daily-planning', component:DailyPlanningComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
