import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Rostro } from '../../../models/Rostro';
import { Estilo } from '../../../models/Estilo';
import { RostroService } from '../../../services/rostro.service';
import { EstiloService } from '../../../services/estilo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Item } from '../../../models/item';
import { ItemService } from '../../../services/item.service';

@Component({
  selector: 'app-creaeditaestilo',
  standalone: true,
  providers:[provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatError, CommonModule, RouterModule],
  templateUrl: './creaeditaestilo.component.html',
  styleUrl: './creaeditaestilo.component.css'
})
export class CreaeditaestiloComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  listaRostro: Rostro[] = [];
  listaItem: Item[] = [];
  estilo: Estilo = new Estilo();
  id: number = 0;
  edicion: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private rS: RostroService,
    private iS: ItemService,
    private eS: EstiloService,
    private router: Router,
    private route: ActivatedRoute,
  ){}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnombre: ['', [Validators.required, Validators.maxLength(100)]],
      hrostro: ['', Validators.required],
      hcolor: ['', [Validators.required, Validators.maxLength(100)]],
      hitem: ['', Validators.required],
    });

    this.rS.list().subscribe((data) => {
      this.listaRostro = data;
    });

    this.iS.list().subscribe((data) => {
      this.listaItem = data;
    });
  }
  insertar() {
    if(this.form.valid){
      this.estilo.idEstilo = this.form.value.hcodigo;
      this.estilo.Nombre=this.form.value.hnombre;
      this.estilo.ro.idRostro=this.form.value.hrostro;
      this.estilo.CodigoColor=this.form.value.hcolor;
      this.estilo.it.idItem=this.form.value.hitem;
      if (this.edicion) {
        this.eS.update(this.estilo).subscribe((data) => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      } else {
        this.eS.insert(this.estilo).subscribe(data=>{
          this.eS.list().subscribe(data=>{
            this.eS.setList(data)
          })
        })
      }
      this.router.navigate(['estilos']);
    }else{
      console.log(this.form.value)
      console.log("Campos invalidos")
    }
  }
  init() {
    if (this.edicion) {
      this.eS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idEstilo),
          hrostro: new FormControl(data.ro.idRostro),
          hitem: new FormControl(data.it.idItem),
          hnombre: new FormControl(data.Nombre),
          hcolor: new FormControl(data.CodigoColor),
        });
      });
    }
  }
}
