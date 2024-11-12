import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormasComponent } from './components/formas/formas.component';
import { RolesComponent } from './components/roles/roles.component';
import { TiposComponent } from './components/tipos/tipos.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogComponent } from './components/mat-dialog/mat-dialog.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RostroComponent } from './components/rostro/rostro.component';
import { EstilosComponent } from './components/estilos/estilos.component';
import { LoginService } from './services/login.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';

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
    MatButtonModule,
    MatDialogComponent,
    UsuariosComponent,
    RostroComponent, 
    EstilosComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
  title = 'backendStyleCheck';
  role: string = '';

  constructor(private loginService: LoginService){}
  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  isAdmin() {
    return this.role === 'ADMIN';
  }

  isUser() {
    return this.role === 'USUARIO';
  }
}
