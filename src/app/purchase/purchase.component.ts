import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { PurchaseApiService } from './purchase-api.service';
import { TagModule } from 'primeng/tag';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'admin-purchase',
  templateUrl: 'purchase.component.html',
  standalone: true,
  imports: [
    TabMenuModule,
    TagModule,
    CurrencyPipe,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PurchaseComponent {
  #purchaseService = inject(PurchaseApiService)
  form = this.#purchaseService.form
  purchaseData = this.#purchaseService.productPurchaseData

  tabItems = signal<MenuItem[]>([
    { label: 'Ventes & stocks', routerLink: 'ventes' },
    { label: 'Projections', routerLink: 'projections' }
  ])
  activeTabItem = signal<MenuItem>(this.tabItems()[0])

  constructor() {
    this.#purchaseService.loadData()
  }
}
