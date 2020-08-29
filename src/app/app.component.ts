import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Desafio Practico 1 - Jaime Navarrete';

  registros = [];

  activarAlerta(ubicacion:string) {
    let alerta = document.querySelector(ubicacion + ' .alert');

    alerta.classList.add('active');

    setTimeout(() => {
      alerta.classList.remove('active');
    }, 2000);
  }

  agregarRegistro() {
    const listaRegistros = document.getElementById('listaRegistros'),
          nombre = document.getElementById('nombre') as HTMLInputElement,
          dui = document.getElementById('dui') as HTMLInputElement,
          vehiculo = document.getElementById('vehiculo') as HTMLInputElement,
          costo = document.getElementById('costo') as HTMLInputElement,
          cantRegistros = this.registros.length;

    if(nombre.value && dui.value && vehiculo.value && costo.value) {
      this.registros.push({id:cantRegistros, nombre: nombre.value, dui: dui.value, vehiculo: vehiculo.value, costo: costo.value});

      let registro = document.createElement('div');
      registro.classList.add('card', 'mb-4');
      registro.innerHTML = `<div class="card-body">
          <h5 class="card-title">Registro de visita ${cantRegistros + 1}</h5>
          <h6 class="card-subtitle text-muted pb-3 mb-4">Reparación de vehículo</h6>

          <p class="card-text"><strong>Cliente</strong>: ${nombre.value} <strong>DUI</strong>: ${dui.value}</p>
          <p class="card-text"><strong>Vehículo</strong>: ${vehiculo.value}</p>
          <p class="card-text"><strong>Costo de reparación</strong>: ${costo.value}</p>
        </div>`;

      listaRegistros.appendChild(registro);

      this.activarAlerta('#listaRegistros');
    }
    else {
      this.activarAlerta('#formCliente');
    }
  }
}
