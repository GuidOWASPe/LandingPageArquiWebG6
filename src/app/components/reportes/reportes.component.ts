import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReportecantidadusuariosporComponent } from './reportecantidadusuariospor/reportecantidadusuariospor.component';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterOutlet,ReportecantidadusuariosporComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  constructor(public route: ActivatedRoute) {}
}
