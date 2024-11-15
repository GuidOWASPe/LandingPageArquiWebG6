import { Routes } from '@angular/router';
import { CreaeditaformasComponent } from './components/formas/creaeditaformas/creaeditaformas.component';
import { FormasComponent } from './components/formas/formas.component';
import { RolesComponent } from './components/roles/roles.component';
import { CreaeditarolesComponent } from './components/roles/creaeditaroles/creaeditaroles.component';
import { TiposComponent } from './components/tipos/tipos.component';
import { CreaeditatiposComponent } from './components/tipos/creaeditatipos/creaeditatipos.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { CreaeditacomentariosComponent } from './components/comentarios/creaeditacomentarios/creaeditacomentarios.component';
import { ItemusuarioComponent } from './components/itemusuario/itemusuario.component';
import { CreaeditaitemususuarioComponent } from './components/itemusuario/creaeditaitemususuario/creaeditaitemususuario.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CreaeditausuariosComponent } from './components/usuarios/creaeditausuarios/creaeditausuarios.component';
import { ItemComponent } from './components/items/item.component';
import { CreaeditaitemsComponent } from './components/items/creaeditaitems/creaeditaitems.component';
import { RostroComponent } from './components/rostro/rostro.component';
import { CreaeditarostroComponent } from './components/rostro/creaeditarostro/creaeditarostro.component';
import { EstilosComponent } from './components/estilos/estilos.component';
import { CreaeditaestiloComponent } from './components/estilos/creaeditaestilos/creaeditaestilos.component';
import { EstilousuarioComponent } from './components/estilousuario/estilousuario.component';
import { CreaeditaestilousuarioComponent } from './components/estilousuario/creaeditaestilousuario/creaeditaestilousuario.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ReportecantidadusuariosporComponent } from './components/reportes/reportecantidadusuariospor/reportecantidadusuariospor.component';
import { PorcentajeusuariospormesComponent } from './components/reportes/porcentajeusuariospormes/porcentajeusuariospormes.component';
import { PorcentajeusuariosporgeneroComponent } from './components/reportes/porcentajeusuariosporgenero/porcentajeusuariosporgenero.component';
import { CantidadusuariosporpaisesComponent } from './components/reportes/cantidadusuariosporpaises/cantidadusuariosporpaises.component';
import { ItemmasusadoporusuarioComponent } from './components/reportes/itemmasusadoporusuario/itemmasusadoporusuario.component';
import { CantidadestilosporusuarioComponent } from './components/reportes/cantidadestilosporusuario/cantidadestilosporusuario.component';
import { PopularidadcoloresestiloComponent } from './components/reportes/popularidadcoloresestilo/popularidadcoloresestilo.component';
import { ReporteitemspornrousosComponent } from './components/reportes/reporteitemspornrousos/reporteitemspornrousos.component';
import { ReportecantidadcomentariosnegativosComponent } from './components/reportes/reportecantidadcomentariosnegativos/reportecantidadcomentariosnegativos.component';
import { ReporterostrosegunformaComponent } from './components/reportes/reporterostrosegunforma/reporterostrosegunforma.component';
import { ReporteestilosconpeorcalificacionComponent } from './components/reportes/reporteestilosconpeorcalificacion/reporteestilosconpeorcalificacion.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './components/landing/landing.component';
import { ConocenosComponent } from './components/landing/conocenos/conocenos.component';
import { EstilosdiComponent } from './components/landing/estilosdi/estilosdi.component';
import { WebcamComponent } from './components/landing/webcam/webcam.component';
import { VincularFormaComponent } from './components/rostro/vincular-forma/vincular-forma.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    component: LandingComponent,
    children: [
      {
        path: 'webcam',
        component: WebcamComponent,
      },
      {
        path: 'estilosdi',
        component: EstilosdiComponent,
      },
      {
        path: 'conocenos',
        component: ConocenosComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [seguridadGuard],
  },
  {
    path: 'formas',
    component: FormasComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditaformasComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaformasComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'roles',
    component: RolesComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditarolesComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditarolesComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditausuariosComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditausuariosComponent,
      },
    ],
  },
  {
    path: 'items',
    component: ItemComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditaitemsComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaitemsComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'tipos',
    component: TiposComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditatiposComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditatiposComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'comentarios',
    component: ComentariosComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditacomentariosComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditacomentariosComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'itemusuario',
    component: ItemusuarioComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditaitemususuarioComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaitemususuarioComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'rostros',
    component: RostroComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditarostroComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditarostroComponent,
      },
      {
        path: 'vincularForma/:id',
        component: VincularFormaComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'estilousuarios',
    component: EstilousuarioComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditaestilousuarioComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaestilousuarioComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'estilos',
    component: EstilosComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditaestiloComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaestiloComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'homes',
    component: HomeComponent,
    canActivate: [seguridadGuard],
  },

  {
    path: 'reportes',
    component: ReportesComponent,
    children: [
      {
        path: 'porcentajeusuariospormes',
        component: PorcentajeusuariospormesComponent,
      },
      {
        path: 'porcentajeusuariosporgenero',
        component: PorcentajeusuariosporgeneroComponent,
      },
      {
        path: 'cantidadusuariosporpaises',
        component: CantidadusuariosporpaisesComponent,
      },
      {
        path: 'itemmasusadoporusuario',
        component: ItemmasusadoporusuarioComponent,
      },
      {
        path: 'estilosconpeorcalificacion',
        component: ReporteestilosconpeorcalificacionComponent,
      },
      {
        path: 'cantidadestilosporusuario',
        component: CantidadestilosporusuarioComponent,
      },
      {
        path: 'popularidadcoloresestilo',
        component: PopularidadcoloresestiloComponent,
      },
      {
        path: 'listaritemspornrousos',
        component: ReporteitemspornrousosComponent,
      },
      {
        path: 'cantidadcomentariosnegativos',
        component: ReportecantidadcomentariosnegativosComponent,
      },
      {
        path: 'cantidadrostrosegunforma',
        component: ReporterostrosegunformaComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
];
