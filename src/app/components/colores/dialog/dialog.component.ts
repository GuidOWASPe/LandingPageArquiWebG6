import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ColoresService } from '../../../services/colores.service';
import { Color } from '../../../models/Color';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatSelectModule, CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  color: Color = new Color();
  id: number = 0;
  edicion: boolean = false;

  listaColores: { value: string; viewValue: string }[] = [
    { value: 'Blanco', viewValue: 'Blanco' },
    { value: 'Rojo', viewValue: 'Rojo' },
    { value: 'Negro', viewValue: 'Negro' },
    { value: 'Verde', viewValue: 'Verde' },
    { value: 'Cyan', viewValue: 'Cyan' },
    { value: 'Marrón', viewValue: 'Marrón' },
  ];

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>, 
    private formBuilder: FormBuilder,
    private cS: ColoresService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnombre: ['', Validators.required],
    });
  }

  insertar(): void {
    if (this.form.valid) {
      this.color.nombreColor = this.form.value.hnombre;
      if (this.edicion) {
        this.cS.update(this.color).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.color).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
          this.dialogRef.close();
        });
      }
    }
    this.router.navigate(['colores']);
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idColor),
          hnombre: new FormControl(data.nombreColor),
        });
      });
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
