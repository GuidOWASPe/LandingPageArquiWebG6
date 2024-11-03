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

export const routes: Routes = [
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
    
    
  },
];
