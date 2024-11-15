import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Usuarios } from '../../../models/Usuarios';
import { UsuariosService } from '../../../services/usuarios.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Rol } from '../../../models/Rol';
import { RolesService } from '../../../services/roles.service';

@Component({
  selector: 'app-creaeditausuarios',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
 
  templateUrl: './creaeditausuarios.component.html',
  styleUrl: './creaeditausuarios.component.css',
})
export class CreaeditausuariosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuarios = new Usuarios();
  id: number = 0;
  edicion: boolean = false;
  listaRoles: Rol[] = [];
  fechaActual: Date = new Date();

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
    { value: 'Venezuela', viewValue: 'Venezuela' }
  ];
  listaSexo: { value: String; viewValue: string }[] = [
    { value: 'Femenino', viewValue: 'Femenino' },
    { value: 'Masculino', viewValue: 'Masculino' },
    { value: 'Otro', viewValue: 'Otro' },
  ];
  imagenes: string[] = [
    'Avatar 1.jpg',
    'Avatar 2.jpg',
    'Avatar 3.jpg',
    'Avatar 4.jpg',
    'Avatar 5.jpg',
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
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      husername: ['', Validators.required],
      hpassword: ['', [Validators.required, Validators.minLength(6)]],
      hrol: ['', Validators.required],
      hcorreo: ['', [Validators.required, Validators.email]],
      hfechanac: ['', Validators.required],
      hpais: ['', Validators.required],
      hsexo: ['', Validators.required],
      hfoto: ['', Validators.required],
    });
    this.rS.list().subscribe((data) => {
      this.listaRoles = data;
    });
  }

  insertar(): void {
    if (this.form.valid) {
      this.usuario.idUsuario = this.form.value.hcodigo;
      this.usuario.username = this.form.value.husername;
      this.usuario.password = this.form.value.hpassword;
      this.usuario.rol.idRol = this.form.value.hrol;
      this.usuario.correoUsuario = this.form.value.hcorreo;
      this.usuario.fechaNacimientoUsuario = this.form.value.hfechanac;
      this.usuario.fechaRegistroUsuario = new Date();
      this.usuario.paisUsuario = this.form.value.hpais;
      this.usuario.sexoUsuario = this.form.value.hsexo;
      this.usuario.fotoPerfilUsuario = this.form.value.hfoto;

      if (this.edicion) {
        this.uS.update(this.usuario).subscribe((data) => {
          this.openSnackBar('Actualizado correctamente.');
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
            this.openSnackBar('Registro actualizado exitosamente');
          });
        });
      } else {
        this.uS.insert(this.usuario).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
            this.openSnackBar('Registro creado exitosamente');
          });
        });
      }
      this.router.navigate(['usuarios']);
    } else {
      this.openSnackBar('Por favor, rellena todos los campos obligatorios');
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }

  cancel(): void {
    this.openSnackBar('Operación cancelada');
    this.router.navigate(['usuarios']);
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idUsuario),
          husername: new FormControl(data.username),
          hpassword: new FormControl(data.password),
          hrol: new FormControl(data.rol.idRol),
          hcorreo: new FormControl(data.correoUsuario),
          hfechanac: new FormControl(data.fechaNacimientoUsuario),
          hfechareg: new FormControl(data.fechaRegistroUsuario),
          hpais: new FormControl(data.paisUsuario),
          hsexo: new FormControl(data.sexoUsuario),
          hfoto: new FormControl(data.fotoPerfilUsuario),
        });
      });
    }
  }
}
