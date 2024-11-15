import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
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
  providers: [
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
    MatDatepickerModule,
  ],

  templateUrl: './creaeditaestilos.component.html',
  styleUrl: './creaeditaestilos.component.css',
})
export class CreaeditaestiloComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaRostro: Rostro[] = [];
  listaItem: Item[] = [];
  estilo: Estilo = new Estilo();
  id: number = 0;
  edicion: boolean = false;
  fechaActual: Date = new Date();
  
  imagenesAleatorias: string[] = [
    'assets/estilos/estilo1.png',
    'assets/estilos/estilo2.png',
    'assets/estilos/estilo3.png',
    'assets/estilos/estilo4.png',
    'assets/estilos/estilo5.png',
    'assets/estilos/estilo6.png',
    'assets/estilos/estilo7.png',
    'assets/estilos/estilo8.png',
    'assets/estilos/estilo9.png',
    'assets/estilos/estilo10.png',
    'assets/estilos/estilo11.png',
    'assets/estilos/estilo12.png',
    'assets/estilos/estilo13.png',
    'assets/estilos/estilo14.png',
    'assets/estilos/estilo15.png',
    'assets/estilos/estilo16.png',
    'assets/estilos/estilo17.png',
    'assets/estilos/estilo18.png',
    'assets/estilos/estilo19.png',
    'assets/estilos/estilo20.png',
    'assets/estilos/estilo21.png',
    'assets/estilos/estilo22.png',
    'assets/estilos/estilo23.png',
    'assets/estilos/estilo24.png',
    'assets/estilos/estilo25.png',
    'assets/estilos/estilo26.png',
    'assets/estilos/estilo27.png',
    'assets/estilos/estilo28.png',
    'assets/estilos/estilo29.png',
    'assets/estilos/estilo30.png',
  ];

  imagenSeleccionada: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private rS: RostroService,
    private iS: ItemService,
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
      hnombre: ['', Validators.required],
      hrostro: ['', Validators.required],
      hcolor: ['', [Validators.required, Validators.pattern(/^#([A-Fa-f0-9]{6})$/)],],
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
    this.form.get('hrostro')?.valueChanges.subscribe((value) => {
      console.log(`Cambio detectado en hrostro: ${value}`);
      this.actualizarImagenAleatoria();
    });

    this.form.get('hitem')?.valueChanges.subscribe((value) => {
      console.log(`Cambio detectado en hitem: ${value}`);
      this.actualizarImagenAleatoria();
    });
  }
  actualizarImagenAleatoria(): void {
    const rostroSeleccionado = this.form.get('hrostro')?.value;
    const itemSeleccionado = this.form.get('hitem')?.value;
  
    // Verificar si ambos campos tienen valores
    if (rostroSeleccionado && itemSeleccionado) {
      const nuevaImagen =
        this.imagenesAleatorias[
          Math.floor(Math.random() * this.imagenesAleatorias.length)
        ];
  
      // Actualizar el campo himagen y la vista previa de la imagen
      this.form.patchValue({ himagen: nuevaImagen });
      this.imagenSeleccionada = nuevaImagen;
    }
  }
  insertar(): void {
    if (this.form.valid) {
      this.estilo.idEstilo = this.form.value.hcodigo;
      this.estilo.nombreEstilo = this.form.value.hnombre;
      this.estilo.codigoColor = this.form.value.hcolor;
      this.estilo.ro.idRostro = this.form.value.hrostro;
      this.estilo.it.idItem = this.form.value.hitem;
      this.estilo.fechaCreado = this.form.value.hfechacre;
      this.estilo.imagenEstilo = this.form.value.himagen;
      if (this.edicion) {
        this.eS.update(this.estilo).subscribe((data) => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
            this.openSnackBar('Registro actualizado exitosamente');
          });
        });
      } else {
        this.eS.insert(this.estilo).subscribe((data) => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
            this.openSnackBar('Registro creado exitosamente');
          });
        });
      }
      this.router.navigate(['estilos']);
    } else {
      this.openSnackBar('Por favor, rellena todos los campos obligatorios');
    }
  }

  updateColor(event: Event): void {
    const color = (event.target as HTMLInputElement).value;
    this.form.patchValue({ hcolor: color });
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
          hnombre: new FormControl(data.nombreEstilo),
          hrostro: new FormControl(data.ro.idRostro),
          hitem: new FormControl(data.it.idItem),
          hcolor: new FormControl(data.codigoColor),
          himagen: new FormControl(data.imagenEstilo),
          hfechacre: new FormControl(data.fechaCreado),
        });
        this.imagenSeleccionada = data.imagenEstilo;
      });
    }
  }
}
