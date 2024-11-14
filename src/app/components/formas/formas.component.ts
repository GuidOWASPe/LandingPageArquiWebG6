import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarformasComponent } from './listarformas/listarformas.component';

@Component({
  selector: 'app-formas',
  standalone: true,
  imports: [RouterOutlet, ListarformasComponent],
  templateUrl: './formas.component.html',
  styleUrl: './formas.component.css'
})
export class FormasComponent {
  constructor(public route:ActivatedRoute){}
}
