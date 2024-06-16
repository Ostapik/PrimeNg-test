export type Shop = {
  id: number,
  name: string
}

export type StockStatus = 'INSTOCK' | 'OUTOFSTOCK' | 'LOWSTOCK'

export type CategoryFilter = {
  key: string,
  label: string,
  data?: any,
  children?: CategoryFilter[]
}

export type Product = {
  id: string,
  name: string,
  sellable: boolean | null,
  category: {
    id: string,
    name: string
  },
  unitOfMeasure: {
    id: string,
    name: string
  },
  stock: number,
  price: number,
  inventoryStatus: StockStatus,
  dataPerShop: {
    shop: Shop,
    price: number,
    stock: number,
    inventoryStatus: StockStatus
  }[]
}

export type ShopProduct = {
  id: string,
  name: string,
  sellable: boolean | null,
  category: {
    id: string,
    name: string
  },
  unitOfMeasure: {
    id: string,
    name: string
  },
  shop: Shop,
  price: number,
  stock: number,
  inventoryStatus: StockStatus
}