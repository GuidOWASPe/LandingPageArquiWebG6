import { Routes } from '@angular/router';
import { CreaeditaformasComponent } from './components/formas/creaeditaformas/creaeditaformas.component';
import { FormasComponent } from './components/formas/formas.component';
import { RolesComponent } from './components/roles/roles.component';
import { CreaeditarolesComponent } from './components/roles/creaeditaroles/creaeditaroles.component';
import { TiposComponent } from './components/tipos/tipos.component';
import { CreaeditatiposComponent } from './components/tipos/creaeditatipos/creaeditatipos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CreaeditausuariosComponent } from './components/usuarios/creaeditausuarios/creaeditausuarios.component';
import { ItemComponent } from './components/items/item.component';
import { CreaeditaitemsComponent } from './components/items/creaeditaitems/creaeditaitems.component';
import { RostroComponent } from './components/rostro/rostro.component';
import { CreaeditarostroComponent } from './components/rostro/creaeditarostro/creaeditarostro.component';

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
    path: 'usuarios',
    component: UsuariosComponent,
    children:[
      {
        path:'nuevo',
        component: CreaeditausuariosComponent
      },
      {
        path: 'ediciones/:id',
        component:CreaeditausuariosComponent
      }
    ]
  },
  {
    path: 'items',
    component: ItemComponent,
    children:[
      {
        path:'nuevo',
        component: CreaeditaitemsComponent
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaitemsComponent
      }
    ]
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
    path: 'rostros',
    component: RostroComponent,
    children:[
      {
        path:'nuevo',
        component: CreaeditarostroComponent
      },
      {
        path: 'ediciones/:id',
        component:CreaeditarostroComponent
      }
    ]
  }
];
