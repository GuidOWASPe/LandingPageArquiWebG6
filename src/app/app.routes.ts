import { Routes } from '@angular/router';
import { CreaeditaformasComponent } from './components/formas/creaeditaformas/creaeditaformas.component';
import { FormasComponent } from './components/formas/formas.component';
import { RolesComponent } from './components/roles/roles.component';
import { CreaeditarolesComponent } from './components/roles/creaeditaroles/creaeditaroles.component';
import { TiposComponent } from './components/tipos/tipos.component';
import { CreaeditatiposComponent } from './components/tipos/creaeditatipos/creaeditatipos.component';
import { LandingComponent } from './components/landing/landing.component';
import { WebcamComponent } from './components/landing/webcam/webcam.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: 'webcam',
        component: WebcamComponent,
      },
    ],
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
  },
];
