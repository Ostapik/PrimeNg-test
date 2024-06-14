import { ChangeDetectionStrategy, Component, Pipe, PipeTransform, computed, inject, signal } from '@angular/core';
import { Table } from 'primeng/table';
import { ProductApiService } from './product-api.service';
import { PrimeNgImportsModule } from '../utils/prime-ng-imports';
import { Product, Shop, StockStatus } from './product.type';
import { shareReplay } from 'rxjs';
import { AsyncPipe, CurrencyPipe, DecimalPipe } from '@angular/common';

@Pipe({
  name: 'statusToSeverity',
  standalone: true
})
export class StatusToSeverityPipe implements PipeTransform {
  transform(item: StockStatus): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined {
    switch (item) {
      case 'INSTOCK': return 'success';
      case 'LOWSTOCK': return 'warning';
      case 'OUTOFSTOCK': return 'danger';
    }
  }
}

@Component({
  selector: 'admin-products-list',
  templateUrl: 'products-list.component.html',
  standalone: true,
  imports: [PrimeNgImportsModule, StatusToSeverityPipe, AsyncPipe, CurrencyPipe, DecimalPipe],
  providers: [ProductApiService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsListComponent {
  #productApi = inject(ProductApiService)
  products$ = this.#productApi.fetchProducts().pipe(shareReplay(1))
  products = signal<Product[]>(null)
  loading = computed(() => !this.products())
  shops$ = this.#productApi.fetchShops()
  expandedRows = signal({});

  constructor() {
    this.#loadProducts()
  }

  statuses = signal<{ label: string, value: StockStatus }[]>([
    { label: 'IN STOCK', value: 'INSTOCK' },
    { label: 'LOW', value: 'LOWSTOCK' },
    { label: 'OUT', value: 'OUTOFSTOCK' }
  ]);

  clear(table: Table) {
    table.clear();
  }

  expandAll() {
    this.expandedRows.set(this.products().reduce((acc, p) => (acc[p.id] = true) && acc, {}));
  }

  collapseAll() {
    this.expandedRows.set({});
  }

  filterByShops(shops: Shop[]) {
    this.#loadProducts(shops)
  }

  #loadProducts(shops?: Shop[]) {
    this.#productApi.fetchProducts(shops).subscribe(products => this.products.set(products))
  }
}