import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EstiloUsuario } from '../../../models/EstiloUsuario';
import { EstiloUsuarioService } from '../../../services/estilousuario.service';
import { Estilo } from '../../../models/Estilo';
import { Usuarios } from '../../../models/Usuarios';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { EstiloService } from '../../../services/estilo.service';



@Component({
  selector: 'app-creaeditaestilo-usuarios',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatButtonModule],
  templateUrl: './creaeditaestilo-usuarios.component.html',
  styleUrl: './creaeditaestilo-usuarios.component.css'
})
export class CreaeditaestiloUsuariosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaEstilos: Estilo[] = [];
  listaUsuarios: Usuarios[] = [];
  esUsu:EstiloUsuario=new EstiloUsuario()

  constructor(private formBuilder: FormBuilder,
    private eS: EstiloService,
    private uS: UsuariosService,
    private euS:EstiloUsuarioService,
    private router:Router) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hCodigo: ['', Validators.required],
      hCalificacion: ['', Validators.required],
      hFecha: ['', Validators.required],
      hEstilo: ['', Validators.required],
      hUsuario: ['', Validators.required],
    });
    this.eS.list().subscribe((data) => {
      this.listaEstilos = data;
    });
  }
  insertar(): void {
    if(this.form.valid){
      this.esUsu.idEstiloFav=this.form.value.hCodigo
      this.esUsu.calificacionEstilo=this.form.value.hCalificacion
      this.esUsu.fechaEstiloFav=this.form.value.hFecha
      this.esUsu.es.idEstilo=this.form.value.hEstilo
      this.esUsu.us.idUsuario=this.form.value.hUsuario

      this.euS.insert(this.esUsu).subscribe(data=>{
        this.euS.list().subscribe(data=>{
          this.euS.setList(data)
        })
      })
      this.router.navigate(['EstiloUsuarios'])
    }
  }
}
