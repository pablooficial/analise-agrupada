import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisDetailsComponent } from './analysis-details-component.component';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';

const routes: Routes = [
  { path: ':documentId', component: AnalysisDetailsComponent }
];

@NgModule({
  declarations: [AnalysisDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AccordionModule,
    ButtonModule
  ]
})
export class AnalysisDetailsModule { }
