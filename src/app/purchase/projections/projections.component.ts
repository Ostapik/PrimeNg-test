import { DatePipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
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

@Component({
  selector: 'admin-projections',
  templateUrl: 'projections.component.html',
  styleUrls: ['./projections.component.scss'],
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
  #orderingData = this.#purchaseService.productPurchaseDataWithQuantities
  #chartData = computed(() => {
    const sales = this.#salesData()
    return {
      datasetsData: this.#getDatasetsDataBySales({ ...sales, ...this.#orderingData() }),
      chartOptions: this.#getChartOptions(sales)
    }
  })
  datasetsData = computed(() => this.#chartData()?.datasetsData)
  chartOptions = computed(() => this.#chartData()?.chartOptions)
  #deliveryBlocks = signal([])
  #activeDate = toSignal(this.#purchaseService.activeDate$)
  deliveryBlocksWithActive = computed(() => {
    const activeDt = new Date(this.#activeDate()).toLocaleDateString()
    return this.#deliveryBlocks().map(block => ({
      ...block,
      active: new Date(block.date).toLocaleDateString() === activeDt
    }))
  })
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

  #getChartOptions({ sales, goal }): ChartOptions {
    if (!sales?.length) return
    const max = this.#getSalesByGoal(
      Math.max(...sales.map(item => item.sales).filter(Boolean)),
      goal
    )
    return {
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
          },
          afterFit: (axis) => {
            setTimeout(() => {
              const scaleWidth = 34
              const sales = this.#salesData().sales
              const xPositions = axis.getLabelItems().map(item => item.options.translation[0])
              this.#deliveryBlocks.set(
                xPositions.map((xPos, index) => ({
                  left: xPos - scaleWidth,
                  disabled: index > 3,
                  date: sales[index].date
                }))
              )
            })
          }
        },
        y: {
          offsetAfterAutoskip: true,
          backgroundColor: '#F4F4F4',
          stacked: true,
          suggestedMax: max * 1.15,
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
    }
  }

  #getSalesByGoal(sales, goal) {
    return sales * (100 + goal) / 100
  }
}
