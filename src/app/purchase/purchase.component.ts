import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'admin-purchase',
  templateUrl: 'purchase.component.html',
  standalone: true,
  imports: [
    TabMenuModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PurchaseComponent {
  tabItems = signal<MenuItem[]>([
    { label: 'Ventes & stocks', routerLink: 'ventes' },
    { label: 'Projections', routerLink: 'projections' }
  ])
  activeTabItem = signal<MenuItem>(this.tabItems()[0])
}
