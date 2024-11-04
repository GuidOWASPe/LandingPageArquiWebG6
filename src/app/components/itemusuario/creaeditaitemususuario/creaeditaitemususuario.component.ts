import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemUsuario } from '../../../models/ItemUsuario';
import { Usuarios } from '../../../models/Usuario';
import { Item } from '../../../models/Item';
import { UsuarioService } from '../../../services/usuario.service';
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
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,

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
    private uS:UsuarioService,
    private iS:ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // idItemFavorito: number = 0
 // fechaItemFavorito : Date=new Date(Date.now())
 // Calificacion:number=0
 // us:Usuarios=new Usuarios()
 // it:Item=new Item()

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

      this.itemusuario.idItemFavorito = this.form.value.hcodigo;
      this.itemusuario.fechaItemFavorito=this.form.value.hfechaitemfav;
      this.itemusuario.calificacion=this.form.value.hcalificacion;
      this.itemusuario.us=this.form.value.husuario;
      this.itemusuario.it=this.form.value.hitem;
      
      
      if(this.edicion){
        this.itemuS.update(this.itemusuario).subscribe((data) => {
          this.itemuS.list().subscribe(data => {
            this.itemuS.setList(data);
          });

        });
      } else{
        this.itemuS.insert(this.itemusuario).subscribe((data) => {
          this.itemuS.list().subscribe((data) => {
            this.itemuS.setList(data);
          });

        });
      }
    }
    this.router.navigate(['itemusuario']);
  }

    
  cancel(): void {
    this.router.navigate(['itemusuario']);
  }

  init() {
    if (this.edicion) {
      this.itemuS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo:new FormControl(data.idItemFavorito),
          hfechaitemfav:new FormControl(data.fechaItemFavorito),
          hcalificacion: new FormControl(data.calificacion),
          husuario:new FormControl(data.us.idUsuario),
          hitem:new FormControl(data.it.idItem),
        
        });
      });
    }
  }

}
