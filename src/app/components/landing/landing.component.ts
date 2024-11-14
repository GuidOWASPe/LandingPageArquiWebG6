import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { IndexComponent } from "./index/index.component";


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterOutlet, RouterModule, IndexComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  constructor(public route:ActivatedRoute){}
}
