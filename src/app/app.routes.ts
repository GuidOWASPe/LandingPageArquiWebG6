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
import { VincularFormaComponent } from './components/rostro/vincular-forma/vincular-forma.component';

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
  },
  {
    path: 'EstiloUsuarios',component:EstilousuarioComponent,
    children: [
        {
            path: 'nuevo', component: CreaeditaestilousuarioComponent
        },
        {
            path: 'ediciones/:id', component: CreaeditaestilousuarioComponent,
        }
    ]
},
];
