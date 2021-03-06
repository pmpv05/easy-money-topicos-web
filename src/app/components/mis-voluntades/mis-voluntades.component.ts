import { VoluntadModel } from '../../services/models/voluntad.model';
import { VoluntadesService } from '../../services/voluntades.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-mis-voluntades',
  templateUrl: './mis-voluntades.component.html',
  styleUrls: ['./mis-voluntades.component.scss'],
  providers: [VoluntadesService, AuthService],
})
export class MisVoluntadesComponent {
  data: VoluntadModel[] = [];

  voluntad: string;
  usernombre: string;
  reputacion: number;
  divisa: string;
  monto: number;

  resultado = [];

  constructor(
    private service: VoluntadesService,
    private authService: AuthService,
  ) {
    this.getData();
  }

  getData() {
    this.service
      .getVoluntadesPorUsuario(this.authService.getUsuarioActualId())
      .subscribe(eventos => {
        this.data = this.sustituirIntegracionesPorValores(eventos);
        return this.data;
      });
  }

  sustituirIntegracionesPorValores(array: VoluntadModel[]): any[] {
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (element.activo) {
        this.resultado.push(element);
        this.resultado[index].reputacion = this.promedio(
          element.usuario.calificaciones,
        );
        this.resultado[index].nombre = element.usuario.nombre;
        this.resultado[index].id = element._id;
        this.resultado[index].monto = element.monto;
        this.resultado[index].divisa = element.divisa.codigoISO;

        if (element.operacion === 1) {
          this.resultado[index].voluntad = 'COMPRO ';
        } else {
          this.resultado[index].voluntad = 'VENDO ';
        }
      }
    }
    return this.resultado;
  }

  promedio(array: Array<number>): number {
    if (array.length > 0) {
      let sum = 0;
      for (const i of array) {
        sum += i;
      }
      return Math.floor(sum / array.length);
    } else {
      return 0;
    }
  }
}
