import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../http/api.config';
import { Observable, tap } from 'rxjs';

export interface Grow {
  id: number;
  name: string;
  medium: string;
  description: string;
}
@Injectable({ providedIn: 'root' })
export class GrowService {

  private _grows = signal<Grow[]>([]);

  grows = this._grows.asReadonly();

  constructor(private http: HttpClient) {}

  load(): Observable<Grow[]> {
    return this.http.get<Grow[]>(`${API_URL}/grows`)
      .pipe(tap(data => this._grows.set(data)));
  }

  create(grow: Partial<Grow>) {
    return this.http.post<Grow>(`${API_URL}/grows`, grow)
      .pipe(tap(newGrow => {
        this._grows.update(g => [...g, newGrow]);
      }));
  }
}
