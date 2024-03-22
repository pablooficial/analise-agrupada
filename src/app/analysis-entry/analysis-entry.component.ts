import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnalysisService } from '../analysis.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-analysis-entry',
  templateUrl: './analysis-entry.component.html',
  styleUrls: ['./analysis-entry.component.scss'],
  providers: [MessageService],
})
export class AnalysisEntryComponent {
  analysisForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private analysisService: AnalysisService,
    private messageService: MessageService
  ) {
    this.analysisForm = this.formBuilder.group({
      documentId: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const documentIdControl = this.analysisForm.get('documentId');
    if (!documentIdControl) {
      return;
    }

    if (documentIdControl.invalid) {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Insira um documento válido',
      });
      return;
    }

    const trimmedDocumentId = documentIdControl.value.trim();

    this.analysisService
      .getAnalysisDataByDocumentId(trimmedDocumentId)
      .subscribe({
        next: (data: any) => {
          if (data && data.documents) {
            const matchingDocument = data.documents.find(
              (document: any) => document.document === trimmedDocumentId
            );

            if (matchingDocument) {
              this.router.navigate(['/analysis-details', trimmedDocumentId]);
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Documento não encontrado',
              });
            }
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'data ou documentos não está definido',
            });
          }
        },
        error: (error: any) => {
          console.error('Erro ao verificar o documento:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ocorreu um erro, por favor tente mais tarde',
          });
        },
      });
  }
}
