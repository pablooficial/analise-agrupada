import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnalysisService } from '../analysis.service';

@Component({
  selector: 'app-analysis-details-component',
  templateUrl: './analysis-details-component.component.html',
  styleUrls: ['./analysis-details-component.component.scss']
})
export class AnalysisDetailsComponent implements OnInit {
  analysisData: any;
  documentId!: string | null;

  constructor(private route: ActivatedRoute, private analysisService: AnalysisService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.documentId = params.get('documentId');
      if (this.documentId) {
        this.loadAnalysisData(this.documentId);
      }
    });
  }

  loadAnalysisData(documentId: string): void {
    this.analysisService.getAnalysisDataByDocumentId(documentId).subscribe({
      next: (data: any) => {
        this.analysisData = data;
      },
      error: (error: any) => {
        console.error('Erro ao carregar dados da análise:', error);
      }
    });
  }
}
