import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcoloresComponent } from './listarcolores/listarcolores.component';

@Component({
  selector: 'app-colores',
  standalone: true,
  imports: [RouterOutlet, ListarcoloresComponent],
  templateUrl: './colores.component.html',
  styleUrl: './colores.component.css'
})
export class ColoresComponent {
  constructor(public route:ActivatedRoute){}
}
