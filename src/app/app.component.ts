import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormasComponent } from './components/formas/formas.component';
import { ColoresComponent } from './components/colores/colores.component';
import { RolesComponent } from './components/roles/roles.component';
import { TiposComponent } from './components/tipos/tipos.component';
import { DialogComponent } from './components/colores/dialog/dialog.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    FormasComponent,
    ColoresComponent,
    RolesComponent,
    TiposComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'backendStyleCheck';
}
