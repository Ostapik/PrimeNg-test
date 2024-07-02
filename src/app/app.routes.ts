import { Routes } from '@angular/router';
import { ProductsListComponent } from './products/products-list.component';
import { PurchaseComponent } from './purchase/purchase.component';

export const routes: Routes = [{
  path: '',
  // component: ProductsListComponent
  loadChildren: () => import('./purchase/purchase.routes').then(mod => mod.PURCHASE_ROUTES)
}, {
  path: 'commande',
  loadChildren: () => import('./purchase/purchase.routes').then(mod => mod.PURCHASE_ROUTES)
}];
