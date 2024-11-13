import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Usuarios } from '../../../models/Usuarios';
import { Forma } from '../../../models/Forma';
import { Rostro } from '../../../models/Rostro';
import { UsuariosService } from '../../../services/usuarios.service';
import { FormasService } from '../../../services/formas.service';
import { RostroService } from '../../../services/rostro.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vincular-forma',
  standalone: true,
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatError,
    CommonModule,
    MatSnackBarModule,
  ],
  templateUrl: './vincular-forma.component.html',
  styleUrl: './vincular-forma.component.css'
})
export class VincularFormaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  listaUsuarios: Usuarios[] = [];
  listaFormas: Forma[] = [];
  rostro: Rostro = new Rostro();
  id: number = 0;
  vincular: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuariosService,
    private fS: FormasService,
    private rS: RostroService,
    private router:Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private http: HttpClient,
  ){}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.vincular = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hforma: ['', Validators.required],
      husuario: ['', Validators.required],
      hnombre: ['', [Validators.required, Validators.maxLength(100)]],
      himagen: ['', [Validators.required, Validators.maxLength(500)]],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
    this.fS.list().subscribe((data) => {
      this.listaFormas = data;
    });
  }
  
  insertar() {
    this.rostro.idRostro = this.form.value.hcodigo;
    this.rostro.usu.idUsuario=this.form.value.husuario;
    this.rostro.nombre=this.form.value.hnombre;
    this.rostro.imagenRostro=this.form.value.himagen;
    if (this.vincular) {
      this.rS.update(this.rostro).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
          this.openSnackBar('Forma reconocida exitosamente');
          this.router.navigate(['rostros']);

        });
      });
    } else {
      this.openSnackBar('Error al reconocer forma');
    }
  }

  cancel(): void {
    this.openSnackBar('Operación cancelada');
    this.router.navigate(['rostros']);
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
  
  init() {
    if (this.vincular) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idRostro),
          hforma: new FormControl(data.fo.nombreForma),
          husuario: new FormControl(data.usu.idUsuario),
          hnombre: new FormControl(data.nombre),
          himagen: new FormControl(data.imagenRostro),
        });
      });
    }
  }

  ejecutarDeteccion() {
    const imagenPath = 'C:/Users/lapul/Pictures/Camera Roll/7289bcaa-1beb-45bb-862c-0cdd1b9b7802.jpg';

    this.http.post<any>(`http://127.0.0.1:5000/api/detectar-forma`, { imagen_path: imagenPath })
      .subscribe(response => {
        console.log('Forma de rostro:', response.nombreForma);
        console.log('Descripción:', response.descripcionForma);

        // Llenar los campos del formulario con los datos de la respuesta
        this.form.controls['hforma'].setValue(response.nombreForma);
      if(this.form.value.hforma == 'Cara alargada'){
        this.rostro.fo.idForma=1;
      }
    else{
      if(this.form.value.hforma == 'Cara rectangular'){
        this.rostro.fo.idForma=2;
      }
      else{
        if(this.form.value.hforma == 'Cara ovalada'){
        this.rostro.fo.idForma=3;
      } else{
        if(this.form.value.hforma == 'Cara cuadrada'){
        this.rostro.fo.idForma=4;
      } else{
        if(this.form.value.hforma == 'Cara redonda'){
        this.rostro.fo.idForma=5;
      } else{
        if(this.form.value.hforma == 'Cara hexagonal o diamante'){
        this.rostro.fo.idForma=6;
      } else{
        if(this.form.value.hforma == 'Cara triangular'){
        this.rostro.fo.idForma=7;
      } else{
        if(this.form.value.hforma == 'Forma de cara no identificada'){
        this.rostro.fo.idForma=8;
      }
    }
    }
    }
    }
    }
    }
    }
      
      }, error => {
        console.error('Error en la detección de rostro:', error);
      });
  }
}
