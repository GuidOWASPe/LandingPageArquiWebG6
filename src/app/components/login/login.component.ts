import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../services/login.service';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { JwtRequest } from '../../models/jwtRequest';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  username: string = '';
  password: string = '';
  mensaje: string = '';
  passwordVisible: boolean = false;
  ngOnInit(): void {}
  login() {
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;
    
    this.loginService.login(request).subscribe(
      (data: any) => {
        // Guardar el token en sessionStorage
        sessionStorage.setItem('token', data.jwttoken);

        // Obtener el rol del usuario desde el token
        const userRole = this.loginService.showRole();

        // Redirigir según el rol
        if (userRole === 'ADMIN') {
          this.router.navigate(['/homes']);
        } else if (userRole === 'CLIENTE') {
          this.router.navigate(['/home']);
        } else {
          this.mensaje = 'Rol no reconocido.';
          this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
        }
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas!!!';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      }
    );
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
