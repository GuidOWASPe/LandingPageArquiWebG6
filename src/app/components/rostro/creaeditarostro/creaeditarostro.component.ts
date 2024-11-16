import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuarios } from '../../../models/Usuarios';
import { Rostro } from '../../../models/Rostro';
import { UsuariosService } from '../../../services/usuarios.service';
import { FormasService } from '../../../services/formas.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Forma } from '../../../models/Forma';
import { RostroService } from '../../../services/rostro.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MediaService } from '../../../services/media.service';

@Component({
  selector: 'app-creaeditarostro',
  standalone: true,
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,  
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatError,
    CommonModule,
    MatSnackBarModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './creaeditarostro.component.html',
  styleUrl: './creaeditarostro.component.css'
})
export class CreaeditarostroComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  ocultarBoton: boolean = true
  progress_bar: boolean = true
  eliminarImage: boolean = true

  listaUsuarios: Usuarios[] = [];
  listaFormas: Forma[] = [];
  rostro: Rostro = new Rostro();
  id: number = 0;
  edicion: boolean = false;
  previewUrls: (string | ArrayBuffer | null)[] = [null, null, null, null]
  images: (File | null)[] = [null, null, null, null];
  urlsImages: (string)[] = [];
  files: (File | null)[] = [null, null, null, null];
  uploadedImageUrl: string = ''; 
  constructor(
    private formBuilder: FormBuilder,
    private mS: MediaService  ,
    private _snackBar: MatSnackBar,
    private uS: UsuariosService,
    private fS: FormasService,
    private rS: RostroService,
    private router:Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ){}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();

    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hforma: [''],
      husuario: ['', Validators.required],
      hnombre: ['', [
        Validators.required, 
        Validators.maxLength(100), 
        Validators.pattern(/^[A-Za-z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/)
      ]],
      himagen: ['', [Validators.required, Validators.maxLength(500)]],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
    this.fS.list().subscribe((data) => {
      this.listaFormas = data;
    });
  }
  async register(file: File) {
    this.progress_bar = false;
  // Considerando que solo se almacena una imagen principal
      try {
        const res = await this.upload(file).toPromise();
        this.uploadedImageUrl = res.url;  // Guarda la URL en la propiedad
        this.form.patchValue({ himagen: this.uploadedImageUrl }); 
        this.mostrarMensaje('Imagen subida exitosamente');
      } catch (error) {
        this.mostrarMensaje('Error al registrar la imagen');
      }

  
  }
  mostrarMensaje(ms: string) {
    let mensaje = ms
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 4000,
    });
  }
  upload(file: File) {
    const formData = new FormData()
    formData.append('file', file);
    return this.mS.uploadFile(formData)
  }
  onFileSelected(event: Event, num: number) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrls[num] = reader.result;
        this.files[num] = file;
        this.register(file); 
      };
      reader.readAsDataURL(file);
      if (num == 0) { (this.ocultarBoton = false) }
    }
  }

  ClearImage(i: number) {
    const filename = this.uploadedImageUrl.split('/').pop(); // Obtiene el nombre del archivo
    if (filename) {
      this.mS.deleteFile(filename).subscribe(
        () => {
          this.mostrarMensaje('Imagen eliminada del servidor');
          this.form.patchValue({ himagen: null }); // Limpia el campo himagen
          this.previewUrls[i] = null; // Limpia la vista previa de la imagen
          this.files[i] = null;
          this.uploadedImageUrl = ''; // Limpia la URL de la imagen subida
          this.ocultarBoton = true; // Opcional: Oculta el botón si es necesario
          (document.getElementById('imagePrincipal') as HTMLInputElement).value = ''; 
        },
        (error) => {
          console.error(error);
          this.mostrarMensaje('Error al eliminar la imagen del servidor');
        }
      );
    }
  }

  
  insertar() {
    if(this.form.valid && this.form.value.hnombre && this.form.value.himagen){
      this.rostro.idRostro = this.form.value.hcodigo;
      this.rostro.fo.idForma=8;
      this.rostro.usu.idUsuario=this.form.value.husuario;
      this.rostro.nombre=this.form.value.hnombre;
      this.rostro.imagenRostro=this.form.value.himagen;
      if (this.edicion) {
        if(this.form.value.hforma == 'Cara alargada'){
        this.rostro.fo.idForma=1;
      }
    else{
      if(this.form.value.hforma == 'Cara rectangular'){
        this.rostro.fo.idForma=2;
      }
      else{
        if(this.form.value.hforma == 'Cara ovalada'){
        this.rostro.fo.idForma=3;
      } else{
        if(this.form.value.hforma == 'Cara cuadrada'){
        this.rostro.fo.idForma=4;
      } else{
        if(this.form.value.hforma == 'Cara redonda'){
        this.rostro.fo.idForma=5;
      } else{
        if(this.form.value.hforma == 'Cara hexagonal o diamante'){
        this.rostro.fo.idForma=6;
      } else{
        if(this.form.value.hforma == 'Cara triangular'){
        this.rostro.fo.idForma=7;
      } else{
        if(this.form.value.hforma == 'Forma de cara no identificada'){
        this.rostro.fo.idForma=8;
      }
    }
    }
    }
    }
    }
    }
    }
        this.rostro.idRostro = this.form.value.hcodigo;

        this.rS.update(this.rostro).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
            this.openSnackBar('Registro actualizado exitosamente');
          });
        });
      } else {
        this.rostro.fo.idForma=8;
        this.rS.insert(this.rostro).subscribe(data=>{
          this.rS.list().subscribe(data=>{
            this.rS.setList(data)
            this.openSnackBar('Registro creado exitosamente');
          })
        })
      }
      this.router.navigate(['rostros'])
    } else {
      this.rostro.fo.idForma=8;
      this.openSnackBar('Por favor, rellena todos los campos obligatorios');
    }
  }
  cancel(): void {
    this.openSnackBar('Operación cancelada');
    this.router.navigate(['rostros']);
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
  
  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idRostro),
          hforma: new FormControl(data.fo.idForma),
          husuario: new FormControl(data.usu.idUsuario),
          hnombre: new FormControl(data.nombre),
          himagen: new FormControl(data.imagenRostro),
        });
        if (data.imagenRostro) {
          this.uploadedImageUrl = data.imagenRostro;
          this.previewUrls[0] = data.imagenRostro; // Asigna la URL a la vista previa
        }
      });
    }
  }
}