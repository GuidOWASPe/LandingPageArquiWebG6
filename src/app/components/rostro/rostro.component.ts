import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarrostroComponent } from './listarrostro/listarrostro.component';

@Component({
  selector: 'app-rostro',
  standalone: true,
  imports: [RouterOutlet, ListarrostroComponent],
  templateUrl: './rostro.component.html',
  styleUrl: './rostro.component.css'
})
export class RostroComponent {
  constructor(public route: ActivatedRoute) {}
}
