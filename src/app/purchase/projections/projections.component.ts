import { DatePipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Pipe, PipeTransform, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { ProductService } from '../../services/product-api.service';
import { filter, map, of, pairwise, shareReplay, startWith, switchMap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ChartOptions } from 'chart.js';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProjectionsApiService } from './projections-api.service';
import { PurchaseApiService } from '../purchase-api.service';

const periodValues = [{
  id: 'CURRENT_WEEK',
  name: 'Cette semaine'
}, {
  id: 'LAST_WEEK',
  name: 'Semaine dernière'
}, {
  id: 'LAST_YEAR_WEEK',
  name: 'Semaine de l\'année dernière'
}]

const options: ChartOptions = {
  animation: false,
  locale: 'fr-FR',
  plugins: {
    title: {
      display: false
    },
    legend: {
      display: false
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
      border: {
        display: false
      },
      grid: {
        display: false
      }
    },
    y: {
      offsetAfterAutoskip: true,
      backgroundColor: '#F4F4F4',
      stacked: true,
      border: {
        display: false
      },
      ticks: {
        crossAlign: 'center'
      },
      grid: {
        tickBorderDash: [10, 10],
        tickBorderDashOffset: 10
      },
      afterFit: (axe) => {
        axe.width = 34
        axe.maxWidth = 34
      }
    }
  }
};

@Component({
  selector: 'admin-projections',
  templateUrl: 'projections.component.html',
  standalone: true,
  imports: [
    CardModule,
    FormsModule,
    ChartModule,
    DecimalPipe,
    DropdownModule,
    InputNumberModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe, ProjectionsApiService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectionsComponent {
  #fb = inject(FormBuilder)
  #datePipe = inject(DatePipe)
  #productService = inject(ProductService)
  #purchaseService = inject(PurchaseApiService)
  #projectionsApi = inject(ProjectionsApiService)

  #products$ = this.#productService.products$.pipe(shareReplay({ bufferSize: 1, refCount: true }))
  products = toSignal(this.#products$)
  chartOptions = signal(options)
  periodValues = signal(periodValues)

  form = this.#fb.group({
    product: this.#fb.control<{ id: string, name: string }>(null),
    model: this.#fb.control<{ id: string, name: string }>(periodValues[0]),
    goal: this.#fb.control(0)
  })
  #salesData = toSignal(
    this.form.valueChanges.pipe(
      startWith(this.form.getRawValue()),
      pairwise(),
      filter(([_, currentFormValues]) => !!currentFormValues.product),
      switchMap(([previousFormValues, currentFormValues]) => {
        if (currentFormValues.product !== previousFormValues.product || currentFormValues.model !== previousFormValues.model) {
          return this.#projectionsApi.fetchSales().pipe(
            map(sales => ({ sales, goal: currentFormValues.goal }))
          )
        }
        return of({ sales: this.#salesData().sales, goal: currentFormValues.goal } as any)
      })
    ),
    { initialValue: { sales: [], goal: 0 } }
  )
  orderingData = this.#purchaseService.productPurchaseDataWithQuantities
  datasetsData = computed(() => this.#getDatasetsDataBySales({ ...this.#salesData(), ...this.orderingData() }))
  unit = signal('unité')

  constructor() {
    this.#products$.pipe(
      takeUntilDestroyed()
    ).subscribe(products => {
      this.form.controls.product.setValue(products[0])
    })
  }

  #getDatasetsDataBySales({ sales, goal, orders } = { sales: null, goal: 0, orders: null }) {
    if (!sales?.length || !orders) return
    console.log(orders)
    let redundandQuantity = 0
    const dataWithOrdered = sales.map(item => {
      const plannedQuantity = this.#getSalesByGoal(item.sales || 0, goal)
      const dateOrder = orders.find(order => new Date(item.date).toLocaleDateString() === new Date(order.date).toLocaleDateString())
      const orderedQuantity = (dateOrder?.suppliers || []).reduce((sum, sup) => sum + sup.quantity, 0) + redundandQuantity
      redundandQuantity = Math.max(0, orderedQuantity - plannedQuantity)
      const orderedForDate = Math.min(orderedQuantity, plannedQuantity)
      const plannedDiff = plannedQuantity - orderedForDate
      return {
        date: item.date,
        plannedDiff: item.enabled ? plannedDiff : null,
        disabledDiff: item.enabled ? null : plannedDiff,
        orderedQuantity: Math.min(orderedQuantity, plannedQuantity)
      }
    })
    return {
      labels: dataWithOrdered.map(item => this.#datePipe.transform(item.date, 'E'/*, 'GMT', 'fr'*/)),
      datasets: [
        {
          barPercentage: .5,
          data: dataWithOrdered.map(item => item.orderedQuantity),
          backgroundColor: '#00D1B2',
        },
        {
          barPercentage: .5,
          data: dataWithOrdered.map(item => item.plannedDiff),
          backgroundColor: '#EBFFFC',
        },
        {
          barPercentage: .5,
          data: dataWithOrdered.map(item => item.disabledDiff),
          backgroundColor: '#D9D9D9',
        }
      ]
    }
  }

  #getSalesByGoal(sales, goal) {
    return sales * (100 + goal) / 100
  }
}
