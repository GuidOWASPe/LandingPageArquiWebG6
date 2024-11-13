import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Item } from '../../../models/Item';
import { UsuariosService } from '../../../services/usuarios.service';
import { ItemusuarioService } from '../../../services/itemusuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ItemService } from '../../../services/item.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { Usuarios } from '../../../models/Usuarios';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ItemUsuario } from '../../../models/ItemUsuario';


@Component({
  selector: 'app-creaeditaitemususuario',
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
  templateUrl: './creaeditaitemususuario.component.html',
  styleUrl: './creaeditaitemususuario.component.css'
})
export class CreaeditaitemususuarioComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  itemusuario: ItemUsuario= new ItemUsuario();
  id: number = 0;
  edicion: boolean = false;
  listausuarios:Usuarios[]=[];
  listaitems:Item[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private itemuS:ItemusuarioService,
    private uS:UsuariosService,
    private iS:ItemService,
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
      hfechaitemfav: ['', Validators.required],
      hcalificacion: ['', Validators.required],
      husuario:['', Validators.required],
      hitem:['', Validators.required],
    });
    this.uS.list().subscribe((data)=>{
      this.listausuarios=data;
  });
  this.iS.list().subscribe((data)=>{
    this.listaitems=data;
});
  }

  insertar(): void {

    if (this.form.valid) {
      const fechaIngresada = new Date(this.form.value.hfechaitemfav);
      const fechaActual = new Date();
      if (fechaIngresada > fechaActual) {
        this.openSnackBar('La fecha debe ser menor a la fecha actual');
        return;
      }
      this.itemusuario.idItemUsuario = this.form.value.hcodigo;
      this.itemusuario.fechaItemFavorito=this.form.value.hfechaitemfav;
      this.itemusuario.calificacion=this.form.value.hcalificacion;
      this.itemusuario.us.idUsuario=this.form.value.husuario;
      this.itemusuario.it.idItem=this.form.value.hitem;
      
      if(this.edicion){
        this.itemuS.update(this.itemusuario).subscribe((data) => {
          this.itemuS.list().subscribe(data => {
            this.itemuS.setList(data);
            this.openSnackBar('Registro actualizado exitosamente');
          });

        });
      } else{
        this.itemuS.insert(this.itemusuario).subscribe((data) => {
          this.itemuS.list().subscribe((data) => {
            this.itemuS.setList(data);
            this.openSnackBar('Registro creado exitosamente');
          });

        });
      }
      this.router.navigate(['itemusuario']);
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
    this.router.navigate(['itemusuario']);
  }

  init() {
    if (this.edicion) {
      this.itemuS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo:new FormControl(data.idItemUsuario),
          hfechaitemfav:new FormControl(data.fechaItemFavorito),
          hcalificacion: new FormControl(data.calificacion),
          husuario:new FormControl(data.us.idUsuario),
          hitem:new FormControl(data.it.idItem)
        
        });
      });
    }
  }

}
