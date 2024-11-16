import { Component, OnInit } from '@angular/core';
import { Comentarios } from '../../../models/Comentario';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ComentariosService } from '../../../services/comentarios.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EstiloService } from '../../../services/estilo.service';
import { Estilo } from '../../../models/Estilo';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuarios } from '../../../models/Usuarios';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditacomentarios',
  standalone: true,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    provideNativeDateAdapter(),
  ],
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
  ],
  templateUrl: './creaeditacomentarios.component.html',
  styleUrl: './creaeditacomentarios.component.css',
})
export class CreaeditacomentariosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  comentario: Comentarios = new Comentarios();
  id: number = 0;
  edicion: boolean = false;
  fechaActual: Date = new Date();
  listausuarios: Usuarios[] = [];
  listaestilos: Estilo[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private comenS: ComentariosService,
    private uS: UsuariosService,
    private eS: EstiloService,
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
      hcontenido: ['', Validators.required],
      hmegustas: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      husuario: ['', Validators.required],
      hestilo: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listausuarios = data;
    });
    this.eS.list().subscribe((data) => {
      this.listaestilos = data;
    });
  }

  insertar(): void {
    if (this.form.valid) {
      const fechaIngresada = new Date(this.form.value.hfecha);
      const fechaActual = new Date();
      if (fechaIngresada > fechaActual) {
        this.openSnackBar('La fecha debe ser menor a la fecha actual');
        return;
      }
      this.comentario.idComentario = this.form.value.hcodigo;
      this.comentario.contenido = this.form.value.hcontenido;
      this.comentario.likes = this.form.value.hmegustas;
      this.comentario.fecha_publicada = new Date();
      this.comentario.us.idUsuario = this.form.value.husuario;
      this.comentario.et.idEstilo = this.form.value.hestilo;
      if (this.edicion) {
        this.comenS.update(this.comentario).subscribe((data) => {
          this.comenS.list().subscribe((data) => {
            this.comenS.setList(data);
            this.openSnackBar('Registro Actualizado correctamente.');
          });
        });
      } else {
        this.comenS.insert(this.comentario).subscribe((data) => {
          this.comenS.list().subscribe((data) => {
            this.comenS.setList(data);
            this.openSnackBar('Registro se exitosamente');
          });
        });
      }
      this.router.navigate(['comentarios']);
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
    this.router.navigate(['comentarios']);
  }

  init() {
    if (this.edicion) {
      this.comenS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idComentario),
          hcontenido: new FormControl(data.contenido),
          hmegustas: new FormControl(data.likes),
          hfechapublicada: new FormControl(data.fecha_publicada),
          husuario: new FormControl(data.us.idUsuario),
          hestilo: new FormControl(data.et.idEstilo),
        });
      });
    }
  }
}
