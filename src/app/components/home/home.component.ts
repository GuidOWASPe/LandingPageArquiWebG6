import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { IndexComponent } from '../landing/index/index.component';
import { ListartiposComponent } from '../tipos/listartipos/listartipos.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, ListartiposComponent, IndexComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(public route:ActivatedRoute){}
}
