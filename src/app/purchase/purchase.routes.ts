import { Routes } from '@angular/router';

import { PurchaseComponent } from './purchase.component';
import { SalesComponent } from './sales/sales.component';
import { ProjectionsComponent } from './projections/projections.component';

export const PURCHASE_ROUTES: Routes = [
  {
    path: '',
    component: PurchaseComponent,
    children: [
      {
        path: 'ventes',
        component: SalesComponent
      },
      {
        path: 'projections',
        component: ProjectionsComponent
      }
    ]
  }
];

export default PURCHASE_ROUTES;
