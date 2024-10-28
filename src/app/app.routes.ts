import { Routes } from '@angular/router';
import { ColoresComponent } from './components/colores/colores.component';
import { DialogComponent } from './components/colores/dialog/dialog.component';
import { Component } from '@angular/core';
import { RolesComponent } from './components/roles/roles.component';

export const routes: Routes = [
  {
    path: 'colores',
    component: ColoresComponent,
    children: [
      {
        path: 'nuevo',
        component: DialogComponent,
      },
      {
        path: 'ediciones/:id',
        component: DialogComponent,
      },
    ],
  },
  {
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
];
