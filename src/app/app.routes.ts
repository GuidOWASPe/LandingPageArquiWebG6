import { Routes } from '@angular/router';
<<<<<<< HEAD
import { ColoresComponent } from './components/colores/colores.component';
import { DialogComponent } from './components/colores/dialog/dialog.component';
import { Component } from '@angular/core';
import { RolesComponent } from './components/roles/roles.component';
=======
import { CreaeditaformasComponent } from './components/formas/creaeditaformas/creaeditaformas.component';
import { FormasComponent } from './components/formas/formas.component';
import { RolesComponent } from './components/roles/roles.component';
import { CreaeditarolesComponent } from './components/roles/creaeditaroles/creaeditaroles.component';
>>>>>>> 85cc9481059a073c33eccf22ca6c9261c8fc8cc1

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
<<<<<<< HEAD
    path: 'roles',
    component: RolesComponent,
    children: [
      {
        path:'nuevo',
        component: DialogComponent,
      },
      {
        path: 'ediciones/:id',
        component: DialogComponent,
      },
    ]
  }
=======
    path: 'roles',component:RolesComponent,
    children: [
        {
            path: 'nuevo', component: CreaeditarolesComponent
        },
        {
            path: 'ediciones/:id', component: CreaeditarolesComponent,
        }
    ]
}
>>>>>>> 85cc9481059a073c33eccf22ca6c9261c8fc8cc1
];
