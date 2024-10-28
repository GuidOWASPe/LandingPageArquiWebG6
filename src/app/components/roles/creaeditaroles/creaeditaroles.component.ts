import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Rol } from '../../../models/Rol';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RolesService } from '../../../services/roles.service';

@Component({
  selector: 'app-creaeditaroles',
  standalone: true,
  imports: [MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,],
  templateUrl: './creaeditaroles.component.html',
  styleUrl: './creaeditaroles.component.css'
})
export class CreaeditarolesComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  rol: Rol = new Rol();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private rS: RolesService,
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
      hCodigo: [''],
      hNombre: ['', Validators.required],
    });
  }

  insertar(): void {

    if (this.form.valid) {
      this.rol.idRol = this.form.controls['hCodigo'].value;
      this.rol.nombre = this.form.controls['hNombre'].value;
      if(this.edicion){
        this.rS.update(this.rol).subscribe(data => {
          alert('Rol actualizado');
          this.rS.list().subscribe(data => {
            this.rS.setList(data);
          });
        });
      } else{
        this.rS.insert(this.rol).subscribe((data) => {
          alert('Rol insertado');
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['roles']);
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hCodigo: new FormControl(data.idRol),
          hNombre: new FormControl(data.nombre),
        });
      });
    }
  }
}
