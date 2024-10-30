import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Tipo } from '../../../models/Tipo';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { TiposService } from '../../../services/tipos.service';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditatipos',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  MatSnackBarModule,
],
  templateUrl: './creaeditatipos.component.html',
  styleUrl: './creaeditatipos.component.css'
})
export class CreaeditatiposComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  tipo: Tipo = new Tipo();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private FormBuilder: FormBuilder,
    private tS: TiposService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.FormBuilder.group({
      hcodigo: [''],
      hnombre: ['', Validators.required],
    });
  }

  insertar(): void {

    if (this.form.valid && this.form.value.hnombre) {
      this.tipo.idTipo = this.form.value.hcodigo;
      this.tipo.nombreTipo = this.form.value.hnombre;
      if(this.edicion){
        this.tS.update(this.tipo).subscribe(data => {
          this.tS.list().subscribe(data => {
            this.tS.setList(data);
          });
        });
      } else{
        this.tS.insert(this.tipo).subscribe((data) => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
        });
      }
      this.router.navigate(['tipos']);
    } else{
      this.openSnackBar('Por favor, rellena todos los campos obligatorios.');
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000, 
    });
  }

  cancel(): void {
    this.router.navigate(['tipos']);
  }

  init() {
    if (this.edicion) {
      this.tS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idTipo),
          hnombre: new FormControl(data.nombreTipo),
        });
      });
    }
  }
}
