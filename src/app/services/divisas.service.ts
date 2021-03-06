import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DivisaModel } from './models/divisa.model';
import { Observable } from 'rxjs';
import { DivisaCreateModel } from './models/divisa.create.model';

const API_URL = 'https://easymoneyapi.azurewebsites.net/divisas';

@Injectable({
  providedIn: 'root',
})
export class DivisasService {
  constructor(private http: HttpClient) {}

  getDivisas(): Observable<DivisaModel[]> {
    return this.http.get<DivisaModel[]>(API_URL);
  }

  getDivisa(id: string): Observable<DivisaModel[]> {
    return this.http.get<DivisaModel[]>(`${API_URL}/${id}`);
  }

  getDivisaPorCodigo(codigo: string): Observable<DivisaModel[]> {
    return this.http.get<DivisaModel[]>(`${API_URL}/codigo/${codigo}`);
  }

  insertDivisa(divisa: DivisaCreateModel): Observable<DivisaModel> {
    return this.http.post<DivisaModel>(API_URL, divisa);
  }

  deleteDivisa(id: string): any {
    return this.http.delete(`${API_URL}/${id}`);
  }

  updateDivisa(id: string, divisa: DivisaCreateModel): any {
    return this.http.patch(`${API_URL}/${id}`, divisa);
  }
}
