import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Desafio Practico 1 - Jaime Navarrete';

  // Crear el array que contendra todos los objetos registro
  registros = [];

  // Esta funcion permite activar cualquier alerta que sea contenida por un elemento con el id
  activarAlerta(id:string) {
    let alerta:HTMLElement = document.querySelector(id + ' .alert');
    alerta.classList.add('active');

    setTimeout(() => {
      alerta.classList.remove('active');
    }, 2000);
  }

  // Al hacer clic en crear registro, se llama esta funcion que permite crear un objeto registro que se agregara al array
  agregarRegistro() {
    const listaRegistros:HTMLElement = document.getElementById('listaRegistros'),
          nombre = document.getElementById('nombre') as HTMLInputElement,
          dui = document.getElementById('dui') as HTMLInputElement,
          vehiculo = document.getElementById('vehiculo') as HTMLInputElement,
          costo = document.getElementById('costo') as HTMLInputElement,
          cantRegistros:number = this.registros.length + 1;

    // Comprueba que todos los campos esten llenados, en caso contrario muestra un error
    if(nombre.value && dui.value && vehiculo.value && costo.value) {

      // Comprobamos la cantidad de visitas que ha realizado el cliente
      let comprobarVisitas:Array<Object> = this.registros.filter(cliente => cliente.dui == dui.value),
          cantVisitas:number = comprobarVisitas.length + 1,
          porcDescuento:number,
          descuento:number,
          costoTotal:number;

      // En caso que aplique para un descuento, lo agregamos
      if(cantVisitas < 2) {
        porcDescuento = 0;
      }
      else if(cantVisitas <= 4) {
        porcDescuento = 0.05;
      }
      else {
        porcDescuento = 0.1;
      }

      descuento = parseFloat(costo.value) * porcDescuento;
      costoTotal = parseFloat(costo.value) - descuento;

      // Agregamos el objeto al array registros
      this.registros.push(
        {id:cantRegistros, nombre: nombre.value, dui: dui.value, vehiculo: vehiculo.value, costo: costoTotal}
      );

      // Creamos el card que representara al registro de cliente agregado
      let registro = document.createElement('div');
      registro.classList.add('card', 'mb-4');

      // Lo rellenamos con los elementos que acabamos de agregar y lo insertamos en la pagina
      registro.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">Registro de visita ${cantRegistros}</h5>
          <h6 class="card-subtitle text-muted pb-3 mb-4">Reparación de vehículo</h6>

          <p class="card-text"><span><strong>Cliente</strong>: ${nombre.value}</span><span><strong>DUI</strong>: ${dui.value}</span></p>
          <p class="card-text"><span><strong>Vehículo</strong>: ${vehiculo.value}</span></p>
          <p class="card-text"><span><strong>Costo de reparación</strong>: $${costo.value}</span><span><strong>N° de visitas</strong>: ${cantVisitas}</span><span><strong>Descuento (${porcDescuento*100}%)</strong>: $${descuento}</span></p>
          <p class="card-text costoTotal"><strong>COSTO TOTAL: <span>$${costoTotal}</span></strong></p>
        </div>
      `;
      listaRegistros.appendChild(registro);

      this.activarAlerta('#listaRegistros');
    }
    else {
      this.activarAlerta('#formCliente');
    }
  }
}
