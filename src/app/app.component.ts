import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormasComponent } from './components/formas/formas.component';
import { RolesComponent } from './components/roles/roles.component';
import { TiposComponent } from './components/tipos/tipos.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    FormasComponent,
    RolesComponent,
    TiposComponent,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
  title = 'backendStyleCheck';
}
