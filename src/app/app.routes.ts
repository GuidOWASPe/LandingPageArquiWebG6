import { Routes } from '@angular/router';
import { CreaeditaformasComponent } from './components/formas/creaeditaformas/creaeditaformas.component';
import { FormasComponent } from './components/formas/formas.component';

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
  }
];
