import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Usuarios } from '../../models/Usuarios';
import { Rol } from '../../models/Rol';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../services/usuarios.service';
import { RolesService } from '../../services/roles.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-register',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    RouterModule,
    MatCheckboxModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuarios = new Usuarios();
  selectedSexo: string = ''; 
  fechaActual: Date = new Date();
  imagenes: string[] = [
    'Avatar 1.jpg',
    'Avatar 2.jpg',
    'Avatar 3.jpg',
    'Avatar 4.jpg',
    'Avatar 5.jpg',
  ];

  listaPaises: { value: String; viewValue: string }[] = [
    { value: 'Argentina', viewValue: 'Argentina' },
    { value: 'Australia', viewValue: 'Australia' },
    { value: 'Austria', viewValue: 'Austria' },
    { value: 'Bélgica', viewValue: 'Bélgica' },
    { value: 'Bolivia', viewValue: 'Bolivia' },
    { value: 'Brasil', viewValue: 'Brasil' },
    { value: 'Canadá', viewValue: 'Canadá' },
    { value: 'Chile', viewValue: 'Chile' },
    { value: 'China', viewValue: 'China' },
    { value: 'Colombia', viewValue: 'Colombia' },
    { value: 'Corea del Sur', viewValue: 'Corea del Sur' },
    { value: 'Costa Rica', viewValue: 'Costa Rica' },
    { value: 'Cuba', viewValue: 'Cuba' },
    { value: 'Dinamarca', viewValue: 'Dinamarca' },
    { value: 'Ecuador', viewValue: 'Ecuador' },
    { value: 'Egipto', viewValue: 'Egipto' },
    { value: 'El Salvador', viewValue: 'El Salvador' },
    { value: 'España', viewValue: 'España' },
    { value: 'Estados Unidos', viewValue: 'Estados Unidos' },
    { value: 'Filipinas', viewValue: 'Filipinas' },
    { value: 'Finlandia', viewValue: 'Finlandia' },
    { value: 'Francia', viewValue: 'Francia' },
    { value: 'Grecia', viewValue: 'Grecia' },
    { value: 'Guatemala', viewValue: 'Guatemala' },
    { value: 'Honduras', viewValue: 'Honduras' },
    { value: 'India', viewValue: 'India' },
    { value: 'Indonesia', viewValue: 'Indonesia' },
    { value: 'Inglaterra', viewValue: 'Inglaterra' },
    { value: 'Irlanda', viewValue: 'Irlanda' },
    { value: 'Israel', viewValue: 'Israel' },
    { value: 'Italia', viewValue: 'Italia' },
    { value: 'Japón', viewValue: 'Japón' },
    { value: 'México', viewValue: 'México' },
    { value: 'Noruega', viewValue: 'Noruega' },
    { value: 'Nueva Zelanda', viewValue: 'Nueva Zelanda' },
    { value: 'Panamá', viewValue: 'Panamá' },
    { value: 'Paraguay', viewValue: 'Paraguay' },
    { value: 'Perú', viewValue: 'Perú' },
    { value: 'Polonia', viewValue: 'Polonia' },
    { value: 'Portugal', viewValue: 'Portugal' },
    { value: 'Reino Unido', viewValue: 'Reino Unido' },
    { value: 'República Dominicana', viewValue: 'República Dominicana' },
    { value: 'Rusia', viewValue: 'Rusia' },
    { value: 'Sudáfrica', viewValue: 'Sudáfrica' },
    { value: 'Suecia', viewValue: 'Suecia' },
    { value: 'Suiza', viewValue: 'Suiza' },
    { value: 'Tailandia', viewValue: 'Tailandia' },
    { value: 'Turquía', viewValue: 'Turquía' },
    { value: 'Uruguay', viewValue: 'Uruguay' },
    { value: 'Venezuela', viewValue: 'Venezuela' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuariosService,
    private rS: RolesService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hcodigo: [''],
      husername: ['', Validators.required],
      hpassword: ['', [Validators.required, Validators.minLength(6)]], 
      hcorreo: ['', [Validators.required, Validators.email]],
      hfechanac: ['', Validators.required],
      hpais: ['', Validators.required],
      hsexo: ['', Validators.required],
      hfoto: ['', Validators.required],
    });
  }

  insertar(): void {
    if (this.form.valid) {
      this.usuario.idUsuario = this.form.value.hcodigo;
      this.usuario.username = this.form.value.husername;
      this.usuario.password = this.form.value.hpassword;
      this.usuario.rol.idRol = 2;
      this.usuario.correoUsuario = this.form.value.hcorreo;
      this.usuario.fechaNacimientoUsuario = this.form.value.hfechanac;
      this.usuario.fechaRegistroUsuario = new Date();
      this.usuario.paisUsuario = this.form.value.hpais;
      this.usuario.sexoUsuario = this.form.value.hsexo;
      this.usuario.fotoPerfilUsuario = this.form.value.hfoto;

      this.uS.register(this.usuario).subscribe((data) => {
        this.openSnackBar('Registro creado exitosamente');
      });
      this.router.navigate(['login']);
    } else {
      this.openSnackBar('Por favor, rellena todos los campos obligatorios');
    }
  }

  onCheckChange(value: string): void {
    if (this.selectedSexo === value) {
      this.selectedSexo = ''; 
      this.form.get('hsexo')?.setValue(''); 
    } else {
      this.selectedSexo = value; 
      this.form.get('hsexo')?.setValue(value); 
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
