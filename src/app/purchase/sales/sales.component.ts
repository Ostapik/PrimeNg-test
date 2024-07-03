import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewEncapsulation, computed, inject, signal, viewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { SalesApiService } from './sales-api.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, map, filter, shareReplay, switchMap, tap } from 'rxjs';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ChartOptions } from 'chart.js'
import { DatePipe, DecimalPipe } from '@angular/common';
import { DOCUMENT } from '@angular/common';

const periodValues = [{
  id: 'LAST_7_DAYS',
  name: '7 derniers jours'
}, {
  id: 'LAST_14_DAYS',
  name: '14 derniers jours'
}, {
  id: 'LAST_MONTH',
  name: 'Mois dernier'
}]

const byPeriodValues = [{
  id: 'DAILY_VIEW',
  name: 'Vue quotidienne'
}, {
  id: 'WEEKLY_VIEW',
  name: 'Vue hebdomadaire'
}]
const DAY = 1000 * 60 * 60 * 24

// const roundedRadius = { topLeft: Number.MAX_VALUE, topRight: Number.MAX_VALUE }

@Component({
  selector: 'admin-sales',
  templateUrl: 'sales.component.html',
  styleUrls: ['./sales.component.scss'],
  standalone: true,
  imports: [
    CardModule,
    FormsModule,
    ChartModule,
    DecimalPipe,
    CalendarModule,
    DropdownModule,
    ReactiveFormsModule
  ],
  providers: [SalesApiService, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SalesComponent {
  #fb = inject(FormBuilder)
  #datePipe = inject(DatePipe)
  #document = inject(DOCUMENT)
  #renderer = inject(Renderer2)
  #salesApi = inject(SalesApiService)

  #skipPeriodClear = false
  #products$ = this.#salesApi.fetchProducts().pipe(shareReplay({ bufferSize: 1, refCount: true }))
  products = toSignal(this.#products$)

  periodValues = signal(periodValues)
  byPeriodValues = signal(byPeriodValues)
  today = signal(new Date())
  form = this.#fb.group({
    product: this.#fb.control<{ id: string, name: string }>(null),
    dates: this.#fb.control<Date[]>(null),
    period: this.#fb.control<{ id: string, name: string }>(periodValues[0]),
    byPeriod: this.#fb.control<{ id: string, name: string }>(byPeriodValues[0])
  })
  #salesData = toSignal(
    this.form.valueChanges.pipe(
      filter(value => !!value.product && !!value.dates && !!value.dates[0] && !!value.dates[1]),
      map(value => this.#checkFormRangeForCorrectByPeriod(value)),
      switchMap(({ dates, period, byPeriod }) => this.#salesApi.fetchSales(dates, byPeriod)
        .pipe(
          map(sales => ({ sales, period, byPeriod }))
        )
      )
    ),
    { initialValue: { sales: [], period: null, byPeriod: null } }
  )
  unit = signal('unité')
  datasetsData = computed(() => this.#getDatasetsDataBySales(this.#salesData()))
  salesTotal = computed(() => this.#salesData().sales.reduce((a, b) => a + b.sales, 0))
  salesByDay = computed(() => this.salesTotal() / this.#salesData().sales.length)
  giftsTotal = computed(() => this.#salesData().sales.reduce((a, b) => a + b.gift, 0))
  consoTotal = computed(() => this.#salesData().sales.reduce((a, b) => a + b.conso, 0))
  trashTotal = computed(() => this.#salesData().sales.reduce((a, b) => a + b.trash, 0))

  breakagesCnt = viewChild<ElementRef>('breakagesCnt');

  constructor() {
    const periodCtrl = this.form.controls.period;
    periodCtrl.updateValueAndValidity = periodCtrl.updateValueAndValidity.bind(
      periodCtrl,
      { onlySelf: true }
    );

    this.#setFormRangeByPeriod(this.form.value.period)

    periodCtrl.valueChanges.pipe(
      takeUntilDestroyed()
    ).subscribe(period => this.#setFormRangeByPeriod(period))

    this.form.controls.dates.valueChanges.pipe(
      takeUntilDestroyed()
    ).subscribe(() => {
      if (this.#skipPeriodClear) {
        this.#skipPeriodClear = false
      } else {
        this.form.controls.period.setValue(null, { emitEvent: false })
      }
    })

    this.#products$.pipe(
      takeUntilDestroyed()
    ).subscribe(products => {
      this.form.controls.product.setValue(products[0])
    })
  }

  #checkFormRangeForCorrectByPeriod(value) {
    if (value.byPeriod.id === 'WEEKLY_VIEW') return value
    const diff = (value.dates[1].getTime() - value.dates[0].getTime()) / DAY
    if (diff <= 20) return value
    this.form.controls.byPeriod.setValue(byPeriodValues[1], { emitEvent: false })
    return { ...value, byPeriod: byPeriodValues[1] }
  }

  #setFormRangeByPeriod(period): void {
    const max = this.today()
    let days: number
    switch (period.id) {
      case 'LAST_7_DAYS': days = 7; break;
      case 'LAST_14_DAYS': days = 14; break;
      case 'LAST_MONTH': days = 30; break;
      default: return
    }
    const min = new Date(max.getTime() - days * DAY)
    this.#skipPeriodClear = true
    this.form.controls.dates.setValue([min, max])
  }

  #getDatasetsDataBySales({ sales, byPeriod } = { sales: null, byPeriod: null }) {
    if (!sales?.length) return
    return {
      labels: sales.map(item => byPeriod.id === 'DAILY_VIEW' ? this.#datePipe.transform(item.date, 'E'/*, 'GMT', 'fr'*/) : `S${item.weekNumber}`),
      datasets: [
        {
          label: 'Ventes',
          barPercentage: .5,
          // borderRadius: sales.map(item => (!item.gift && !item.conso && !item.trash) ? roundedRadius : null),
          data: sales.map(item => item.sales),
          backgroundColor: '#00D1B2',
        },
        {
          label: 'Ventes pastillées',
          barPercentage: .5,
          // borderRadius: sales.map(item => (!item.conso && !item.trash) ? roundedRadius : null),
          data: sales.map(item => item.gift),
          backgroundColor: '#FFE08A',
        },
        {
          label: 'Rupture',
          barPercentage: .5,
          data: [],
          backgroundColor: '#F14668',
        },
        {
          label: 'Conso cuisine',
          barPercentage: .5,
          // borderRadius: sales.map(item => (!item.trash) ? roundedRadius : null),
          data: sales.map(item => item.conso),
          backgroundColor: '#485FC7',
        },
        {
          label: 'Casse',
          barPercentage: .5,
          // borderRadius: sales.map(_ => roundedRadius),
          data: sales.map(item => item.trash),
          backgroundColor: '#B86BFF',
        }
      ]
    }
  }

  #chartOptions: ChartOptions = {
    animation: false,
    locale: 'fr-FR',
    plugins: {
      title: {
        display: false
      },
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 10,
          boxHeight: 8,
          usePointStyle: true,
          pointStyle: 'circle'
        }
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
          console.log('afterFit')
          setTimeout(() => {
            const cnt = this.breakagesCnt().nativeElement
            this.#renderer.setProperty(cnt, 'innerHTML', '');
            const breakageDatasetData = this.#salesData().sales.map(item => item.breakage)
            const marginLeft = -20
            const scaleWidth = 34
            const xPositions = axis.getLabelItems().map(item => item.options.translation[0])
            if (xPositions.length !== breakageDatasetData.length) return
            for (const [index, xPos] of xPositions.entries()) {
              if (breakageDatasetData[index]) {
                const child = this.#document.createElement('div')
                child.classList.add('breakage-icon')
                child.style.left = `${xPos + marginLeft - scaleWidth}px`
                this.#renderer.appendChild(cnt, child)
              }
            }
            // console.log('afterUpdate', axis.getLabelItems().map(item => item.options.translation[0]), axis)
          })
        },
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
  }
  chartOptions = signal(this.#chartOptions)
}
