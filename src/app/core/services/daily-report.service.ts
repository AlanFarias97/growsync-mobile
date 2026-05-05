import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../http/api.config';
import { tap } from 'rxjs';
import { DailyReport } from '../models/daily-report.model';

@Injectable({ providedIn: 'root' })
export class DailyReportService {

  private _reports = signal<DailyReport[]>([]);

  reports = this._reports.asReadonly();

  constructor(private http: HttpClient) {}

  loadByPlant(plantId: number) {
    return this.http.get<DailyReport[]>(
      `${API_URL}/reports/plant/${plantId}`
    ).pipe(
      tap(data => this._reports.set(data))
    );
  }

  create(report: DailyReport) {
    return this.http.post<DailyReport>(`${API_URL}/reports`, report)
      .pipe(
        tap(r => this._reports.update(list => [...list, r]))
      );
  }

  byPlant(plantId: number) {
    return this._reports().filter(r => r.plantId === plantId);
  }
}
