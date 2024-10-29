import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  FormBuilder, 
  FormControl,
  FormGroup, 
  ReactiveFormsModule, 
  Validators 
 } from '@angular/forms';
import { Tipo } from '../../../models/Tipo';
import { TiposService } from '../../../services/tipos.service';
import {  ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creaeditatipos',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './creaeditatipos.component.html',
  styleUrl: './creaeditatipos.component.css'
})
export class CreaeditatiposComponent {
  form:FormGroup=new FormGroup({})
  tipo: Tipo = new Tipo()
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder:FormBuilder,
    private tS:TiposService,
    private router: Router,
    private route: ActivatedRoute
  ){}
    ngOnInit(){
      this.route.params.subscribe((data: Params) => {
        this.id = data['id'];
        this.edicion = data['id'] != null;
        this.init();
      });
      this.form=this.formBuilder.group({
        hcodigo: [''],
        hnombre:['',Validators.required]
      })
    }
    insertar():void{
      if (this.form.valid){
        this.tipo.idTipo = this.form.value.hcodigo;
        this.tipo.nombreTipo=this.form.value.hnombre;
        if (this.edicion){
          this.tS.update(this.tipo).subscribe((data) => {
            this.tS.list().subscribe((data) => {
              this.tS.setList(data);
              this.router.navigate(['tipos'])
            });
          });
        } else{
          this.tS.insert(this.tipo).subscribe(data=>{
            this.tS.list().subscribe(data=>{
              this.tS.setList(data)
              this.router.navigate(['tipos'])
            })
          })
        }
      }
    }
    init() {
      if (this.edicion) {
        this.tS.listId(this.id).subscribe((data) => {
          this.form = new FormGroup({
            hcodigo: new FormControl(data.idTipo),
            hnombre: new FormControl(data.nombreTipo)
          });
        });
      }
    }
}
