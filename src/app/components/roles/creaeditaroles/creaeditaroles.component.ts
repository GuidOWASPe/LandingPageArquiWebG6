import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  ReactiveFormsModule, 
  Validators 
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Rol } from '../../../models/Rol';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RolesService } from '../../../services/roles.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditaroles',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatSnackBarModule
    ],
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
      hnombre: ['', Validators.required],
    });
  }

  insertar(): void {

    if (this.form.valid && this.form.value.hnombre) {
      this.rol.idRol = this.form.value.hcodigo;
      this.rol.nombre = this.form.value.hnombre;
      if(this.edicion){
        this.rS.update(this.rol).subscribe((data) => {
          
          this.rS.list().subscribe(data => {
            this.rS.setList(data);
            this.openSnackBar('Registro actualizado exitosamente');
          });
        });
      } else{
        this.rS.insert(this.rol).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
            this.openSnackBar('Registro creado exitosamente');
          });
        });
      }
      this.router.navigate(['roles']);
    }else {
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
    this.router.navigate(['roles']);
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idRol),
          hnombre: new FormControl(data.nombre),
        });
      });
    }
  }
}
