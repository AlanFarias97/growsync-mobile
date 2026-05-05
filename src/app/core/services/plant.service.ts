import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../http/api.config';
import { tap } from 'rxjs';

export interface Plant {
  id: number;
  name: string;
  strain: string;
  stage: string;
  notes: string;
  germinationDate: string;
  growId: number;
}

@Injectable({ providedIn: 'root' })
export class PlantService {

  private _plants = signal<Plant[]>([]);

  plants = this._plants.asReadonly();

  constructor(private http: HttpClient) {}

  load() {
    return this.http.get<Plant[]>(`${API_URL}/plants`)
      .pipe(tap(data => this._plants.set(data)));
  }

  byGrow(growId: number) {
    return this._plants().filter(p => p.growId === growId);
  }

  create(plant: Partial<Plant>) {
    return this.http.post<Plant>(`${API_URL}/plants`, plant)
      .pipe(tap(newPlant => {
        this._plants.update(p => [...p, newPlant]);
      }));
  }
}
