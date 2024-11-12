import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Rostro } from '../../../models/Rostro';
import { Estilo } from '../../../models/Estilo';
import { RostroService } from '../../../services/rostro.service';
import { EstiloService } from '../../../services/estilo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ItemService } from '../../../services/item.service';
import { Item } from '../../../models/Item';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-creaeditaestilo',
  standalone: true,
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    provideNativeDateAdapter(),

  ],
  imports: [
    CommonModule,
     ReactiveFormsModule, 
     MatFormFieldModule, 
     MatSelectModule, 
     MatInputModule, 
     MatButtonModule, 
     RouterModule,
    MatDatepickerModule],
     
  templateUrl: './creaeditaestilos.component.html',
  styleUrl: './creaeditaestilos.component.css'
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
    private snackBar: MatSnackBar
  ){}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnombre: ['', Validators.required],
      hrostro: ['', Validators.required],
      hcolor: ['', Validators.required],
      hitem: ['', Validators.required],
      himagen: ['', Validators.required],
      hfechacre: ['', Validators.required],
    });

    this.rS.list().subscribe((data) => {
      this.listaRostro = data;
    });

    this.iS.list().subscribe((data) => {
      this.listaItem = data;
    });
  }

  insertar(): void {
    if(this.form.valid){
      this.estilo.idEstilo = this.form.value.hcodigo;
      this.estilo.NombreEstilo = this.form.value.hnombre;
      this.estilo.CodigoColor = this.form.value.hcolor;
      this.estilo.ro.idRostro = this.form.value.hrostro;
      this.estilo.it.idItem = this.form.value.hitem;
      this.estilo.FechaCreado = this.form.value.hfechacre;
      this.estilo.ImagenEstilo = this.form.value.himagen;
      if (this.edicion) {
        this.eS.update(this.estilo).subscribe((data) => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
            this.openSnackBar('Registro actualizado exitosamente');
          });
        });
      } else {
        this.eS.insert(this.estilo).subscribe(data=>{
          this.eS.list().subscribe(data=>{
            this.eS.setList(data)
            this.openSnackBar('Registro creado exitosamente');
          })
        })
      }
      this.router.navigate(['estilos']);
    }else{
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
    this.router.navigate(['estilos']);
  }

  init() {
    if (this.edicion) {
      this.eS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idEstilo),
          hnombre: new FormControl(data.NombreEstilo),
          hrostro: new FormControl(data.ro.idRostro),
          hitem: new FormControl(data.it.idItem),
          hcolor: new FormControl(data.CodigoColor),
          himagen: new FormControl(data.ImagenEstilo),
          hfechacre: new FormControl(data.FechaCreado), 
        });
      });
    }
  }
}