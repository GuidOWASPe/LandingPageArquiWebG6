import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartiposComponent } from './listartipos/listartipos.component';

@Component({
  selector: 'app-tipos',
  standalone: true,
  imports: [RouterOutlet, ListartiposComponent],
  templateUrl: './tipos.component.html',
  styleUrl: './tipos.component.css'
})
export class TiposComponent {
  constructor(public route:ActivatedRoute){}
}
