import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { IndexComponent } from "./index/index.component";
import { WebcamComponent } from './webcam/webcam.component';
import { EstilosdiComponent } from './estilosdi/estilosdi.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterOutlet, IndexComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  constructor(public route:ActivatedRoute){}
}
