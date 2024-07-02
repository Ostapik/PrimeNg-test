import { Routes } from '@angular/router';
import { ProductsListComponent } from './products/products-list.component';
import { PurchaseComponent } from './purchase/purchase.component';

export const routes: Routes = [{
  path: '',
  component: ProductsListComponent
}, {
  path: 'commande',
  loadChildren: () => import('./purchase/purchase.routes').then(mod => mod.PURCHASE_ROUTES)
}];
