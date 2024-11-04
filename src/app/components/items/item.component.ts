import { Component } from '@angular/core';
import { ListaritemsComponent } from "./listaritems/listaritems.component";
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [RouterModule ,ListaritemsComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  constructor(public route: ActivatedRoute){}
}
