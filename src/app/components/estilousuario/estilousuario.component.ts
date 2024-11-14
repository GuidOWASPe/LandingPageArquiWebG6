import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarestilousuarioComponent } from './listarestilousuario/listarestilousuario.component';

@Component({
  selector: 'app-estilousuario',
  standalone: true,
  imports: [RouterOutlet,ListarestilousuarioComponent],
  templateUrl: './estilousuario.component.html',
  styleUrl: './estilousuario.component.css'
})
export class EstilousuarioComponent {
  constructor(public route:ActivatedRoute){}
}
