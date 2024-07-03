import { Routes } from '@angular/router';

import { PurchaseComponent } from './purchase.component';
import { SalesComponent } from './sales/sales.component';
import { ProjectionsComponent } from './projections/projections.component';
import { PurchaseApiService } from './purchase-api.service';

export const PURCHASE_ROUTES: Routes = [
  {
    path: '',
    component: PurchaseComponent,
    providers: [PurchaseApiService],
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
