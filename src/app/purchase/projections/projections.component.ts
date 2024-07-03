import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Pipe, PipeTransform, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { ProductService } from '../../services/product-api.service';
import { shareReplay } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChartOptions } from 'chart.js';

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
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectionsComponent {
  #fb = inject(FormBuilder)
  #productService = inject(ProductService)

  #products$ = this.#productService.products$.pipe(shareReplay({ bufferSize: 1, refCount: true }))
  products = toSignal(this.#products$)
  chartOptions = signal(options)

  form = this.#fb.group({
    product: this.#fb.control<{ id: string, name: string }>(null),
    model: this.#fb.control<{ id: string, name: string }>(null),
    goal: this.#fb.control<{ id: string, name: string }>(null)
  })
}
