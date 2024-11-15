import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Comentarios } from '../../../models/Comentario';
import { Usuarios } from '../../../models/Usuarios';
import { Estilo } from '../../../models/Estilo';
import { EstiloUsuarioService } from '../../../services/estilousuario.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { EstiloService } from '../../../services/estilo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EstiloUsuario } from '../../../models/EstiloUsuario';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditaestilousuario',
  standalone: true,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    provideNativeDateAdapter()
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
  templateUrl: './creaeditaestilousuario.component.html',
  styleUrl: './creaeditaestilousuario.component.css'
})

export class CreaeditaestilousuarioComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  estilousuario: EstiloUsuario = new EstiloUsuario();
  id: number = 0;
  edicion: boolean = false;
  listausuarios:Usuarios[]=[];
  listaestilos:Estilo[]=[];
  fechaActual:Date=new Date();

  constructor(
    private formBuilder: FormBuilder,
    private euS: EstiloUsuarioService,
    private uS:UsuariosService,
    private eS:EstiloService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit():void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form=this.formBuilder.group({
      hcodigo: [''],
      hfecha: ['', Validators.required],
      hcalificacion: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      husuario:['', Validators.required],
      hestilo:['', Validators.required],
    });
    this.uS.list().subscribe((data)=>{
      this.listausuarios=data;
  });
  this.eS.list().subscribe((data)=>{
    this.listaestilos=data;
});
  }

  insertar(): void {

    if (this.form.valid) {
      
      this.estilousuario.idEstiloUsuario = this.form.value.hcodigo;
      this.estilousuario.fechaEstiloFav = this.form.value.hfecha;
      this.estilousuario.calificacion = this.form.value.hcalificacion;
      this.estilousuario.usuario.idUsuario = this.form.value.husuario;
      this.estilousuario.estilo.idEstilo = this.form.value.hestilo;
      
      if(this.edicion){
        this.euS.update(this.estilousuario).subscribe((data) => {
          this.euS.list().subscribe(data => {
            this.euS.setList(data);
            this.openSnackBar('Registro actualizado exitosamente');
          });
        });
      } else{
        this.euS.insert(this.estilousuario).subscribe((data) => {
          this.euS.list().subscribe((data) => {
            this.euS.setList(data);
            this.openSnackBar('Registro creado exitosamente');
          });
        });
      }
      this.router.navigate(['estilousuarios']);
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
    this.router.navigate(['estilousuarios']);
  }
  init() {
    if (this.edicion) {
      this.euS.listId(this.id).subscribe((data) => {
        
        this.form = new FormGroup({
          hcodigo:new FormControl(data.idEstiloUsuario),
          hfecha:new FormControl(data.fechaEstiloFav),
          hcalificacion:new FormControl(data.calificacion),
          husuario:new FormControl(data.usuario.idUsuario),
          hestilo:new FormControl(data.estilo.idEstilo),
        
        });
      });
    }
  }

}
