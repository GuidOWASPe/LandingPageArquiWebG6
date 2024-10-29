import { Routes } from '@angular/router';
import { ColoresComponent } from './components/colores/colores.component';
import { DialogComponent } from './components/colores/dialog/dialog.component';
import { TiposComponent } from './components/tipos/tipos.component';
import { CreaeditatiposComponent } from './components/tipos/creaeditatipos/creaeditatipos.component';

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
    path: 'tipos',
    component:TiposComponent,
    children:[
        {
            path:'registrar',
            component:CreaeditatiposComponent
        },
        {
            path: 'ediciones/:id', 
            component: CreaeditatiposComponent
        }
    ]
  }
];
