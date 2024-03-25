import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogInComponent } from './components/log-in/log-in.component';
import { MonthlyPlanningComponent } from './components/monthly-planning/monthly-planning.component'

const routes: Routes = [
  {path: '', component:LogInComponent},
  {path: 'monthly-planning', component:MonthlyPlanningComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
