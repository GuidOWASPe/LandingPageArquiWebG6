import { Component, OnInit } from '@angular/core';
import { Comentarios } from '../../../models/Comentario';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuarios } from '../../../models/Usuarios';

@Component({
  selector: 'app-creaeditacomentarios',
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
    
  ],
  templateUrl: './creaeditacomentarios.component.html',
  styleUrl: './creaeditacomentarios.component.css'
})
export class CreaeditacomentariosComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  comentario: Comentarios = new Comentarios();
  id: number = 0;
  edicion: boolean = false;
  listausuarios:Usuarios[]=[];
  listaestilos:Estilo[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private comenS: ComentariosService,
    private uS:UsuariosService,
    private eS:EstiloService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit():void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form=this.formBuilder.group({
      hcodigo: [''],
      hcontenido: ['', Validators.required],
      hmegustas: ['', Validators.required],
      hfechapublicada: ['', Validators.required],
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

      this.comentario.idcomentario = this.form.value.hcodigo;
      this.comentario.contenido = this.form.value.hcontenido;
      this.comentario.likes = this.form.value.hmegustas;
      this.comentario.fecha_publicada = this.form.value.hfechapublicada;
      this.comentario.us.idUsuario = this.form.value.husuario;
      this.comentario.et.idEstilo = this.form.value.hestilo;
      if(this.edicion){
        this.comenS.update(this.comentario).subscribe((data) => {
          this.comenS.list().subscribe(data => {
            this.comenS.setList(data);
          });

        });
      } else{
        this.comenS.insert(this.comentario).subscribe((data) => {
          this.comenS.list().subscribe((data) => {
            this.comenS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['comentarios']);
  }
  cancel(): void {
    this.router.navigate(['comentarios']);
  }

  init() {
    if (this.edicion) {
      this.comenS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo:new FormControl(data.idcomentario),
          hcontenido:new FormControl(data.contenido),
          hmegustas: new FormControl(data.likes),
          hfechapublicada: new FormControl(data.fecha_publicada),
          husuario:new FormControl(data.us.idUsuario),
          hestilo:new FormControl(data.et.idEstilo),
        
        });
      });
    }
  }

}
