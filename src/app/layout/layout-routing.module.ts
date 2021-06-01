import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { NotAllowedComponent } from '../not-allowed/not-allowed.component';

export const LayoutRoutingModule: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import('./home/home.module')
          .then(home => home.HomeModule)
      },
      {
        path: "not-allowed",
        component: NotAllowedComponent
      }
    ]
  }
];