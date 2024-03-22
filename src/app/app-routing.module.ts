import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisEntryComponent } from './analysis-entry/analysis-entry.component';



const routes: Routes = [
  { path: '', redirectTo: '/analysis-entry', pathMatch: 'full' },
  { path: 'analysis-entry', component: AnalysisEntryComponent },
  {
    path: 'analysis-details',
    loadChildren: () =>
      import('./analysis-details/analysis-details.module').then((m) => m.AnalysisDetailsModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
