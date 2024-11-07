import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuarios } from '../../../models/Usuarios';
import { Rostro } from '../../../models/Rostro';
import { UsuariosService } from '../../../services/usuarios.service';
import { FormasService } from '../../../services/formas.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Forma } from '../../../models/Forma';
import { RostroService } from '../../../services/rostro.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creaeditarostro',
  standalone: true,
  providers:[provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatError,
    CommonModule
  ],
  templateUrl: './creaeditarostro.component.html',
  styleUrl: './creaeditarostro.component.css'
})
export class CreaeditarostroComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  listaUsuarios: Usuarios[] = [];
  listaFormas: Forma[] = [];
  rostro: Rostro = new Rostro();
  id: number = 0;
  edicion: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuariosService,
    private fS: FormasService,
    private rS: RostroService,
    private router:Router,
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
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
    if(this.form.valid && this.form.value.hnombre && this.form.value.himagen){
      this.rostro.idRostro = this.form.value.hcodigo;
      this.rostro.fo.idForma=this.form.value.hforma;
      this.rostro.usu.idUsuario=this.form.value.husuario;
      this.rostro.nombre=this.form.value.hnombre;
      this.rostro.imagenRostro=this.form.value.himagen;
      if (this.edicion) {
        this.rS.update(this.rostro).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.rostro).subscribe(data=>{
          this.rS.list().subscribe(data=>{
            this.rS.setList(data)
          })
        })
      }
      this.router.navigate(['rostros'])
    }else{
      console.log(this.form.value)
      console.log("Campos invalidos")
    }
  }
  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idRostro),
          hforma: new FormControl(data.fo.idForma),
          husuario: new FormControl(data.usu.idUsuario),
          hnombre: new FormControl(data.nombre),
          himagen: new FormControl(data.imagenRostro),
        });
      });
    }
  }
}
