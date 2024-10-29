import { Component } from '@angular/core';
import { ListartiposComponent } from '../tipos/listartipos/listartipos.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { IndexComponent } from "./index/index.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterOutlet, ListartiposComponent, IndexComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  constructor(public route:ActivatedRoute){}
}
