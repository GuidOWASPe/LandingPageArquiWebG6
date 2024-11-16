import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Tipo } from '../../../models/Tipo';
import { Item } from '../../../models/Item';
import { ItemService } from '../../../services/item.service';
import { TiposService } from '../../../services/tipos.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditaitems',
  standalone: true,
  imports: [
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './creaeditaitems.component.html',
  styleUrl: './creaeditaitems.component.css',
})
export class CreaeditaitemsComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  items: Item = new Item();
  id: number = 0;
  edicion: boolean = false;
  listaTipos: Tipo[] = [];
  Imagenes: string[] = [
    'assets/items/item1.png',
    'assets/items/item2.png',
    'assets/items/item3.png',
    'assets/items/item4.png',
    'assets/items/item5.png',
    'assets/items/item6.png',
    'assets/items/item7.png',
    'assets/items/item8.png',
    'assets/items/item9.png',
    'assets/items/item10.png',
    'assets/items/item11.png',
    'assets/items/item12.png',
    'assets/items/item13.png',
    'assets/items/item14.png',
    'assets/items/item15.png',
    'assets/items/item16.png',
    'assets/items/item17.png',
    'assets/items/item18.png',
    'assets/items/item19.png',
    'assets/items/item20.png',
    'assets/items/item21.png',
    'assets/items/item22.png',
    'assets/items/item23.png',
    'assets/items/item24.png',
    'assets/items/item25.png',
    'assets/items/item26.png',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private iS: ItemService,
    private tS: TiposService,
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
      hnombre: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],   
      htipo: ['', Validators.required],
      hdescripcion: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],   
      hcalificacion: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      husos: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      himagen: ['', Validators.required],
    });
    this.tS.list().subscribe((data) => {
      this.listaTipos = data;
    });
  }

  insertar(){
    if (this.form.valid) {
      this.items.idItem = this.form.value.hcodigo;
      this.items.nombreItem = this.form.value.hnombre;
      this.items.ti.idTipo = this.form.value.htipo;
      this.items.descripcionItem = this.form.value.hdescripcion;
      this.items.calificacionItem = this.form.value.hcalificacion;
      this.items.nrUsos = this.form.value.husos;
      this.items.imagen = this.form.value.himagen;

      if (this.edicion) {
        this.iS.update(this.items).subscribe((data) => {
          this.openSnackBar('Actualizado correctamente.');
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
            this.openSnackBar('Registro actualizado exitosamente');
          });
        });
      } else {
        this.iS.insert(this.items).subscribe((data) => {
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
            this.openSnackBar('Registro creado exitosamente');
          });
        });
      }
      this.router.navigate(['items']);
    } else {
      this.openSnackBar('Por favor, rellena todos los campos obligatorios');
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }

  getImageName(imagen: string): string {
    const nameWithExtension = imagen.split('/').pop() || '';
    return nameWithExtension.split('.')[0] || ''; 
  }

  cancel(): void {
    this.openSnackBar('Operación cancelada');
    this.router.navigate(['items']);
  }

  init(){
    if (this.edicion) {
      this.iS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idItem),
          hnombre: new FormControl(data.nombreItem),
          htipo: new FormControl(data.ti.idTipo),
          hdescripcion: new FormControl(data.descripcionItem),
          hcalificacion: new FormControl(data.calificacionItem),
          husos: new FormControl(data.nrUsos),
          himagen: new FormControl(data.imagen),
        });
      });
    }
  }
}