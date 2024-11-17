import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListaritemususuarioComponent } from './listaritemususuario/listaritemususuario.component';

@Component({
  selector: 'app-itemusuario',
  standalone: true,
  imports: [RouterOutlet,ListaritemususuarioComponent],
  templateUrl: './itemusuario.component.html',
  styleUrl: './itemusuario.component.css'
})
export class ItemusuarioComponent {
  constructor(public route:ActivatedRoute){}

}
