import { Routes } from '@angular/router';
import { CreaeditaformasComponent } from './components/formas/creaeditaformas/creaeditaformas.component';
import { FormasComponent } from './components/formas/formas.component';
import { RolesComponent } from './components/roles/roles.component';
import { CreaeditarolesComponent } from './components/roles/creaeditaroles/creaeditaroles.component';
import { EstiloUsuariosComponent } from './components/estilo-usuarios/estilo-usuarios.component';
import { CreaeditaestiloUsuariosComponent } from './components/estilo-usuarios/creaeditaestilo-usuarios/creaeditaestilo-usuarios.component';

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
    path: 'roles',component:RolesComponent,
    children: [
        {
            path: 'nuevo', component: CreaeditarolesComponent
        },
        {
            path: 'ediciones/:id', component: CreaeditarolesComponent,
        }
    ]
  },
  {
    path: 'EstiloUsuarios',component:EstiloUsuariosComponent,
    children: [
        {
            path: 'nuevo', component: CreaeditaestiloUsuariosComponent
        },
        {
            path: 'ediciones/:id', component: CreaeditaestiloUsuariosComponent,
        }
    ]
},
];
