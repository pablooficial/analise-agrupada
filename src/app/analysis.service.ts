import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor(private http: HttpClient) { }

  getAnalysisDataByDocumentId(documentId: string): Observable<any> {
    return this.http.get<any>('assets/grouped_analysis.json').pipe(
      map((data: any) => {
        if (data && Array.isArray(data.documents)) {
          return data;
        } else {
          throw new Error('Os dados retornados não estão no formato esperado.');
        }
      }),
      catchError(error => {
        console.error('Erro ao obter dados de análise:', error);
        return throwError('Ocorreu um erro ao obter os dados da análise. Por favor, tente novamente mais tarde.');
      })
    );
  }

}
