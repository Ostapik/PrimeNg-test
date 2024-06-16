import { ChangeDetectionStrategy, Component, Pipe, PipeTransform, computed, inject, signal } from '@angular/core';
import { Table } from 'primeng/table';
import { ProductApiService } from './product-api.service';
import { CategoryFilter, Product, Shop, StockStatus } from './product.type';
import { shareReplay } from 'rxjs';
import { AsyncPipe, CurrencyPipe, DecimalPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TreeSelectModule } from 'primeng/treeselect';
import { FormsModule } from '@angular/forms';

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
  imports: [
    StatusToSeverityPipe,
    AsyncPipe,
    CurrencyPipe,
    DecimalPipe,
    ButtonModule,
    DropdownModule,
    IconFieldModule,
    InputIconModule,
    InputSwitchModule,
    InputTextModule,
    MultiSelectModule,
    TableModule,
    TagModule,
    TreeSelectModule,
    FormsModule
  ],
  providers: [ProductApiService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsListComponent {
  #productApi = inject(ProductApiService)
  #shopFilters: Shop[]
  #categoryFilters: string[]

  products$ = this.#productApi.fetchProducts().pipe(shareReplay({ bufferSize: 1, refCount: true }))
  categories$ = this.#productApi.fetchCategories().pipe(shareReplay({ bufferSize: 1, refCount: true }))
  products = signal<Product[]>(null)
  loading = computed(() => !this.products())
  shops$ = this.#productApi.fetchShops()
  expandedRows = signal({});
  selectedCategories: CategoryFilter[] = []

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
    this.#shopFilters = shops
    this.#loadProducts()
  }

  filterByCategories(values: CategoryFilter) {
    // const categoryIds: string[] = values.map(val => this.#getCategoryKeys(val)).flat()
    // this.#categoryFilters = [...new Set(categoryIds)]
    this.#categoryFilters = values && [...new Set(this.#getCategoryKeys(values))]
    this.#loadProducts()
  }

  #getCategoryKeys(cat: CategoryFilter): string[] {
    let res = [cat.key]
    for (const child of (cat.children || [])) res = res.concat(this.#getCategoryKeys(child))
    return res
  }

  #loadProducts() {
    this.#productApi.fetchProducts(this.#shopFilters, this.#categoryFilters).subscribe(products => this.products.set(products))
  }
}