import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable()
export class ProjectionsApiService {

  fetchSales(): Observable<any> {
    const sales = this.#getSales()
    return of(sales)
  }

  #getSales = () => {
    const now = new Date()
    const day = 1000 * 60 * 60 * 24
    const len = 7
    const enabledDays = 3
    return new Array(len).fill(null).map((v, index) => {
      const date = now.getTime() + index * day
      return {
        date,
        sales: new Date(date).getDay() ? Math.random() * 50 : null,
        enabled: index < enabledDays
      }
    })
  }
}
