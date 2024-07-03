import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable()
export class ProjectionsApiService {

  fetchSales(dates: Date[], byPeriod) {
    let sales = this.#getSales()
    const min = new Date(dates[0])
    min.setHours(0, 0, 0, 0)
    const max = new Date(dates[1])
    max.setHours(23, 59, 59, 999)
    sales = sales.filter(({ date }) => date <= max.getTime() && date >= min.getTime())
    if (byPeriod.id === 'DAILY_VIEW') return of(sales)
    const res = []
    for (const saleItem of sales) {
      const curItem = res.find(s => s.weekNumber === saleItem.weekNumber)
      if (curItem) {
        curItem.sales += (saleItem.sales || 0)
        curItem.gift += (saleItem.gift || 0)
        curItem.conso += (saleItem.conso || 0)
        curItem.trash += (saleItem.trash || 0)
        curItem.breakage = curItem.breakage || saleItem.breakage
      } else {
        res.push({ ...saleItem, sales: saleItem.sales || 0 })
      }
    }
    return of(res)
  }

  #getSales = () => {
    const now = new Date()
    const day = 1000 * 60 * 60 * 24
    const len = 300
    return new Array(len).fill(null).map((v, index) => {
      const date = now.getTime() - (len - 1 - index) * day
      return {
        date,
        sales: new Date(date).getDay() ? Math.random() * 50 : null,
        gift: (new Date(date).getDay() && Math.random() < 0.2) ? Math.random() * 10 : null,
        conso: (new Date(date).getDay() && Math.random() < 0.2) ? Math.random() * 10 : null,
        trash: (new Date(date).getDay() && Math.random() < 0.2) ? Math.random() * 10 : null,
        breakage: Math.random() < 0.1,
        weekNumber: this.#getDateWeek(date)
      }
    })
  }

  #getDateWeek(date) {
    const currentDate = 
        (typeof date === 'object') ? date : new Date(date);
    const januaryFirst = 
        new Date(currentDate.getFullYear(), 0, 1);
    const daysToNextMonday = 
        (januaryFirst.getDay() === 1) ? 0 : 
        (7 - januaryFirst.getDay()) % 7;
    const nextMonday = 
        new Date(currentDate.getFullYear(), 0, 
        januaryFirst.getDate() + daysToNextMonday);
 
    return (currentDate < nextMonday) ? 52 : 
    (currentDate > nextMonday ? Math.ceil(
    (currentDate - nextMonday.getTime()) / (24 * 3600 * 1000) / 7) : 1);
``}
}
