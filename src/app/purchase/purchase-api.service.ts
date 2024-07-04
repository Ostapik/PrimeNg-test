import { Injectable, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormBuilder, FormGroup, ValueChangeEvent } from "@angular/forms";
import { Observable, filter, map, of, shareReplay } from "rxjs";

@Injectable()
export class PurchaseApiService {
  #fb = inject(FormBuilder)
  #purchaseData = this.fetchProductPurchaseData().pipe(shareReplay({ bufferSize: 1, refCount: true }))
  productPurchaseData = toSignal(this.#purchaseData, { initialValue: [] })
  
  form = this.#fb.group({
    orders: this.#fb.array<FormGroup>([])
  })
  productPurchaseDataWithQuantities = toSignal(this.form.valueChanges)
  activeDate$ = this.form.events.pipe(
    filter(evt => evt instanceof ValueChangeEvent),
    map(evt => evt.source.parent.parent.parent.get('date').value)
  )

  loadData(): void {
    this.#purchaseData.subscribe(data => this.#setFormValueByPurchaseData(data))
  }

  fetchProductPurchaseData() {
    const now = new Date()
    const day = 1000 * 60 * 60 * 24
    return of([
      {
        date: now.getTime(),
        salePrice: 13.456,
        suppliers: [
          {
            supplier: {
              id: 1,
              name: 'Solebio'
            },
            packaging: {
              name: 'Colis de 8 x250g',
              quantity: 8 * .25
            },
            price: 10.345
          },
          {
            supplier: {
              id: 2,
              name: 'La petite Ferme Auffervilloise'
            },
            packaging: {
              name: 'Colis de 8 x450g',
              quantity: 8 * .45
            },
            price: 2.111
          }
        ]
      },
      {
        date: now.getTime() + day,
        salePrice: 14.456,
        suppliers: [
          {
            supplier: {
              id: 1,
              name: 'Solebio'
            },
            packaging: {
              name: 'Colis de 8 x250g',
              quantity: 8 * .25
            },
            price: 10.345
          },
          {
            supplier: {
              id: 2,
              name: 'La petite Ferme Auffervilloise'
            },
            packaging: {
              name: 'Colis de 8 x450g',
              quantity: 8 * .45
            },
            price: 2.111
          },
          {
            supplier: {
              id: 3,
              name: 'L\'Atelier de Vincent - LOIRE ATLANTIQUE SAUMON FUME'
            },
            packaging: {
              name: 'Colis de 8 x600g',
              quantity: 8 * .6
            },
            price: 45.567
          }
        ]
      },
      {
        date: now.getTime() + 2 * day,
        salePrice: 14.456,
        suppliers: [
          {
            supplier: {
              id: 1,
              name: 'Solebio'
            },
            packaging: {
              name: 'Colis de 8 x250g',
              quantity: 8 * .25
            },
            price: 10.345
          },
          {
            supplier: {
              id: 2,
              name: 'La petite Ferme Auffervilloise'
            },
            packaging: {
              name: 'Colis de 8 x450g',
              quantity: 8 * .45
            },
            price: 2.111
          }
        ]
      }
    ])
  }

  #setFormValueByPurchaseData(data) {
    while (this.form.controls.orders.length !== 0) this.form.controls.orders.removeAt(0);
    for (const item of data) {
      this.form.controls.orders.push(
        this.#fb.group({
          date: this.#fb.control<number>(item.date),
          salePrice: this.#fb.control<number>(item.salePrice),
          suppliers: this.#fb.array(
            item.suppliers.map(supplierData => this.#fb.group({
              supplier: this.#fb.control<{ id: number, name: string }>(supplierData.supplier),
              packaging: this.#fb.control<string>(supplierData.packaging),
              price: this.#fb.control<number>(item.price),
              quantity: this.#fb.control(0)
            }))
          )
        })
      )
    }
    
  }
}
