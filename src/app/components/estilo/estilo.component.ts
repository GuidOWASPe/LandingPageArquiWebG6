import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarestiloComponent } from './listarestilo/listarestilo.component';

@Component({
  selector: 'app-estilo',
  standalone: true,
  imports: [RouterOutlet, ListarestiloComponent],
  templateUrl: './estilo.component.html',
  styleUrl: './estilo.component.css'
})
export class EstiloComponent {
  constructor(public route: ActivatedRoute){}
}
