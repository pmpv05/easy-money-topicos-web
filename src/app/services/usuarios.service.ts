import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioModel } from './models/usuario.model';
import { UsuarioCreateModel } from './models/usuario.create.model';

const API_URL = 'https://easymoneyapi.azurewebsites.net/users';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(API_URL);
  }

  getUsuario(id: string): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(`${API_URL}/${id}`);
  }

  insertUsuario(usuario: UsuarioCreateModel): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(API_URL, usuario);
  }

  deleteUsuario(id: string): any {
    return this.http.delete(`${API_URL}/${id}`);
  }
}
