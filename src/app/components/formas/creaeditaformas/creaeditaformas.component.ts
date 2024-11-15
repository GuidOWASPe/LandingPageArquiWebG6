import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Forma } from '../../../models/Forma';
import { FormasService } from '../../../services/formas.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-creaeditaformas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './creaeditaformas.component.html',
  styleUrls: ['./creaeditaformas.component.css'],
})
export class CreaeditaformasComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  forma: Forma = new Forma();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private fS: FormasService,
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

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hdescripcion: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],   
      hnombre: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],   
    });
  }

  insertar(): void {
    if (this.form.valid && this.form.value.hdescripcion && this.form.value.hnombre) {
      this.forma.idForma = this.form.value.hcodigo;
      this.forma.descripcionForma = this.form.value.hdescripcion;
      this.forma.nombreForma = this.form.value.hnombre;
      if (this.edicion) {
        this.fS.update(this.forma).subscribe((data) => {
          this.fS.list().subscribe((data) => {
            this.fS.setList(data);
          });
        });
      } else {
        this.fS.insert(this.forma).subscribe((data) => {
          this.fS.list().subscribe((data) => {
            this.fS.setList(data);
          });
        });
      }
      this.router.navigate(['formas']);
    }else{
      this.openSnackBar('Por favor, rellena todos los campos obligatorios.');
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000, 
    });
  }

  cancel(): void {
    this.openSnackBar('Operación cancelada');
    this.router.navigate(['formas']);
  }

  init() {
    if (this.edicion) {
      this.fS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idForma),
          hdescripcion: new FormControl(data.descripcionForma),
          hnombre: new FormControl(data.nombreForma),
        });
      });
    }
  }
}
