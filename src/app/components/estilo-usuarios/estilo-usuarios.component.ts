import { Component } from '@angular/core';
import { ActivatedRoute,RouterOutlet } from '@angular/router';
import { ListarestiloUsuariosComponent } from './listarestilo-usuarios/listarestilo-usuarios.component';

@Component({
  selector: 'app-estilo-usuarios',
  standalone: true,
  imports: [RouterOutlet, ListarestiloUsuariosComponent],
  templateUrl: './estilo-usuarios.component.html',
  styleUrl: './estilo-usuarios.component.css'
})
export class EstiloUsuariosComponent {
  constructor(public route: ActivatedRoute) {}

}
