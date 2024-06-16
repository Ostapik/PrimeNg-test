import { Injectable } from "@angular/core";
import { Observable, map, of, tap } from "rxjs";
import { CategoryFilter, Product, Shop, ShopProduct } from "./product.type";

@Injectable()
export class ProductApiService {
  fetchShops(): Observable<Shop[]> {
    return of([
      {
        id: 1,
        name: "Beaubourg"
      },
      {
        id: 2,
        name: "Batignolles"
      },
      {
        id: 3,
        name: "Chemin Vert"
      },
      {
        id: 4,
        name: "Faidherbe"
      },
      {
        id: 5,
        name: "Ordener"
      },
      {
        id: 6,
        name: "Chardon Lagache"
      },
      {
        id: 7,
        name: "Atelier"
      }
    ])
  }

  fetchProducts(shops?: Shop[], categoryIds?: string[]): Observable<Product[]> {
    const shopIds = shops?.map(s => s.id)
    return of<Product[]>(
      this.#products.map(product => ({
        ...product,
        dataPerShop: shops ? product.dataPerShop.filter(dps => shopIds.includes(dps.shop.id)) : product.dataPerShop
      })).filter(p => categoryIds?.length ? categoryIds.includes(p.category?.id) : true)
    )
  }

  fetchCategories(): Observable<CategoryFilter[]> {
    return of(this.#categories.map(cat => this.prepareCategoryData(cat))).pipe(tap(c => console.log(c)))
  }

  private convertToShopProducts(products: Product[]): ShopProduct[] {
    return products.map(product => {
      const { dataPerShop, ...rest } = product
      return product.dataPerShop.map(data => ({ ...rest, ...data }))
    }).flat()
  }

  private prepareCategoryData(category: CategoryFilter): CategoryFilter {
    // const data: any[] = [category.key]
    for (const child of category.children || []) child.data = child.key
    return { ...category, data: category.key }
  }

  #products: Product[] = [
    {
      sellable: true,
      id: "666ac20b852d0d0013fd5c8a",
      name: "CUISINE - Chausson du jour 200g",
      category: {
        id: "5f5b48f7be16900012db04fa",
        name: "Sandwichs/Quiches"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 76.75184231126468,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 40.21729511889607,
          stock: 527.567922680359,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 4.1387427402488575,
          stock: 916.9530319777231,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 99.20120900694451,
          stock: 431.48220086396515,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 51.549589493836415,
          stock: 513.363012061587,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 76.61849623723478,
          stock: 107.32338861938916,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 20.83128691356604,
          stock: 277.8290939847279,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 53.819697479176234,
          stock: 391.8402574867703,
          inventoryStatus: "INSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "666ab73c852d0d0013fd41c2",
      name: "CUISINE - Quiche du jour 200g",
      category: {
        id: "5f5b48f7be16900012db04fa",
        name: "Sandwichs/Quiches"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 80.5444897324222,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 77.33423796589378,
          stock: 391.82456996105077,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 79.5546060620059,
          stock: 813.6151695767728,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 93.46198202754015,
          stock: 779.9841588264118,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 74.24861022563117,
          stock: 621.3344949437944,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 60.944735991781315,
          stock: 382.88593418579507,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 47.436064858173175,
          stock: 538.0769240123875,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 11.474587456781759,
          stock: 283.12395910824773,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "66699c7257726c00130f5cb5",
      name: "CUISINE - Tourte à la viande 200g",
      category: {
        id: "5f5b48f7be16900012db04fa",
        name: "Sandwichs/Quiches"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 51.3045209758489,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 28.820790551294763,
          stock: 354.2925108710842,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 56.17544355482935,
          stock: 304.85842572257906,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 86.59009300552036,
          stock: 171.4711328862508,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 23.616879763679542,
          stock: 179.3565824365475,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 32.88573020899823,
          stock: 507.86403620885113,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 43.209911365577945,
          stock: 508.34144129044876,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 32.94212832330725,
          stock: 873.3609163855809,
          inventoryStatus: "INSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "66698920852d0d0013fc5766",
      name: "Demi chou pointu",
      category: {
        id: "649eee9370246000137b60e9",
        name: "Choux"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 57.917313707937645,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 63.370443225331165,
          stock: 481.96506444126896,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 14.7017868798917,
          stock: 843.8346266376291,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 28.077194546738006,
          stock: 411.46284010974176,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 87.65857904417092,
          stock: 207.06699013910958,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 74.3416086219357,
          stock: 394.02227897564467,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 67.31215118146359,
          stock: 40.43603745578817,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 56.115561816514,
          stock: 173.40691748552905,
          inventoryStatus: "INSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "6663f4f4dc5fb30012f1a056",
      name: "CUISINE - Salmorejo 36cl",
      category: {
        id: "5f5b48fdbe16900012db04fc",
        name: "Entrées"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 85.50144264869124,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 24.096214668481952,
          stock: 139.8433469665128,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 89.0143834874882,
          stock: 520.7585205204073,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 63.9833001957611,
          stock: 580.5903881963899,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 85.05909500619026,
          stock: 86.20686029666813,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 93.25905880386298,
          stock: 195.87492669682848,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 46.88033275358012,
          stock: 222.56855054802216,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 28.205654219195875,
          stock: 641.4725002375594,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "6663216157726c00130b31bb",
      name: "Cressonette",
      category: {
        id: "61447a53280ae8001a6ebd99",
        name: "Salades"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 72.27402721011764,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 0.8727425557089497,
          stock: 623.6505308445104,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 61.142532871386,
          stock: 637.8794142679977,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 19.363349880620852,
          stock: 829.553693796983,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 14.580291245788167,
          stock: 545.013445222817,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 55.9330834361637,
          stock: 438.22585381838894,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 58.263663592790806,
          stock: 975.0692629318363,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 46.980227779905334,
          stock: 832.9284237578753,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "66631d84852d0d0013f837ea",
      name: "CUISINE - Gaspacho de tomate 36cl",
      category: {
        id: "5f5b48fdbe16900012db04fc",
        name: "Entrées"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 92.12988503820645,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 48.346866570069636,
          stock: 492.6648774064495,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 79.99970387227336,
          stock: 326.562361146945,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 23.09492044243282,
          stock: 971.821540657386,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 93.87978552419094,
          stock: 66.35485350350501,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 2.7863523361486564,
          stock: 565.6022638950493,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 11.182929322507329,
          stock: 396.5557738535832,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 78.07496514551053,
          stock: 448.71280479914464,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "666185ec852d0d0013f6fece",
      name: "Orange cadeau FID",
      category: {
        id: "63ff8868d07cd70013cceb30",
        name: "Oranges"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 32.45456609031332,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 11.484596179400741,
          stock: 226.1782484389021,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 33.24549276923756,
          stock: 618.6138053035919,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 84.42193458901681,
          stock: 794.7818626204302,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 70.70946735082427,
          stock: 931.0605739546347,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 31.05668884714219,
          stock: 745.0788852267243,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 55.41776401448721,
          stock: 628.0782084081628,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 75.52993108812159,
          stock: 291.5640161899591,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "66589bdbbe7a6500132acfd5",
      name: "Pain de mie Artisan Gregoire",
      category: {
        id: "5f5b48f71e0f2f00112cf092",
        name: "Boulangerie"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 43.70675390163843,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 25.942576724723043,
          stock: 749.252301351069,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 8.810645013022667,
          stock: 902.2686638738793,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 74.47372874962434,
          stock: 575.5150762196432,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 55.30197458088586,
          stock: 864.2414302146217,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 70.23266939021504,
          stock: 979.3586084789856,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 72.2994948671488,
          stock: 529.0381051670116,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 58.81368398567777,
          stock: 961.4327061854966,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: false,
      id: "66583e808e6be00014d28639",
      name: "Parmesan 18 mois  portion 200g",
      category: {
        id: "63693e72185ada001a49155d",
        name: "Fromages Italiens"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 44.61431790307131,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 9.573884557424517,
          stock: 373.0962914053597,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 62.150409442057494,
          stock: 120.25707524412566,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 9.24381432374497,
          stock: 198.74351711081383,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 66.57820984817437,
          stock: 260.18768264812377,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 93.72569448646865,
          stock: 791.6457146074074,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 30.878909117930718,
          stock: 538.865194028604,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 83.83542435233635,
          stock: 245.29119303585523,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "66582af6f865150014a4553d",
      name: "Fraise 2 barquettes",
      category: {
        id: "64807fc56216960013c1812b",
        name: "Fraises"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 57.90877930819305,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 25.406363766889783,
          stock: 883.3309660777427,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 78.2454339320239,
          stock: 280.266180345929,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 20.29825723956664,
          stock: 22.8338806986792,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 95.17438592788628,
          stock: 58.75076921165934,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 40.875648346554684,
          stock: 413.57106649260487,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 75.781705634588,
          stock: 847.4112197833164,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 21.48856564412207,
          stock: 456.61303070655634,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "6650c203be7a65001324e6a2",
      name: "CUISINE - Clafoutis aux cerises 130g",
      category: {
        id: "5fdc891bef8ca50018cbd2fa",
        name: "Dessert"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 14.74671580754352,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 72.13898673504985,
          stock: 393.88770558094865,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 45.198031096669645,
          stock: 302.7721114112401,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 82.20808570624149,
          stock: 729.5362924355877,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 39.514360660408634,
          stock: 709.8748528871062,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 66.24759189812667,
          stock: 291.5331368258236,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 50.44325970984318,
          stock: 808.6499964908597,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 3.251116530840137,
          stock: 3.6296416337944226,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "664f3edabe7a65001323da74",
      name: "CUISINE - Riz de Camargue et boulettes de viande 350g",
      category: {
        id: "5f5b48fa8f0e0200115e7686",
        name: "Plats Cuisinés"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 20.024854883664478,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 13.557712675965682,
          stock: 992.4548359425307,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 93.64062525240142,
          stock: 916.7359990835769,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 78.88167118544345,
          stock: 332.7077117183772,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 8.707830836282128,
          stock: 178.19162643807763,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 20.752918913215712,
          stock: 870.4101999357297,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 98.86750686706114,
          stock: 331.007613465782,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 87.5254534032052,
          stock: 289.5606985401138,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "664f3e4ff8651500149dff11",
      name: "CUISINE - Viande et légumes de saison 350g",
      category: {
        id: "5f5b48fa8f0e0200115e7686",
        name: "Plats Cuisinés"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 63.001492967475635,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 90.06537695210575,
          stock: 329.312041189215,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 43.449561899957565,
          stock: 428.7680785119643,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 44.68473095727789,
          stock: 663.4830452611569,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 47.00199906022553,
          stock: 371.88869849225534,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 14.36729488579822,
          stock: 943.6685618245726,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 82.63461004309943,
          stock: 224.27776956018187,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 3.2953904419432245,
          stock: 157.1703495990886,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "664f0a61be7a65001323a089",
      name: "Artichaut Camus pièce",
      category: {
        id: "5f5b49148f0e0200115e76a0",
        name: "Legumes Fleurs"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 66.6786427505599,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 91.85653254439023,
          stock: 724.6163353272734,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 21.625776676931817,
          stock: 194.44705994946654,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 85.54162528817193,
          stock: 975.0938821034509,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 91.03628974450851,
          stock: 390.9816600113012,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 56.98403392079907,
          stock: 772.0475922547852,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 62.34529187829649,
          stock: 653.1050535691088,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 56.979459442171844,
          stock: 159.05594161329861,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "66478b24be7a6500131eb2ee",
      name: "CUISINE - Curry poisson 350g",
      category: {
        id: "5f5b48fa8f0e0200115e7686",
        name: "Plats Cuisinés"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 78.89662526426989,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 29.074159631032416,
          stock: 735.4912992713382,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 35.99074892833749,
          stock: 674.3361693503227,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 3.6843571502274797,
          stock: 404.1552005845139,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 61.512515012238225,
          stock: 607.0336388889243,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 59.3138408804132,
          stock: 637.6539029653841,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 34.286264648933965,
          stock: 622.5806970702172,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 39.94214912467498,
          stock: 819.1259055447906,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "66475e498e6be00014c6b6d5",
      name: "Cidre brut 75cl PACORY",
      category: {
        id: "5f5b48f6be16900012db04f9",
        name: "Cidre"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 28.754633314199406,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 35.13160474753134,
          stock: 597.7591628354775,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 20.361044580902686,
          stock: 362.61593701302354,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 27.110184101706338,
          stock: 980.4952988980253,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 72.99147105117034,
          stock: 784.3550633512604,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 20.38609241993461,
          stock: 391.7282585396611,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 86.38975356246262,
          stock: 462.13338770651393,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 19.510970393564108,
          stock: 237.33003078678382,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "66474e0c8e6be00014c6a620",
      name: "Cerise Extra 400g",
      category: {
        id: "647db301cfc0cf0013dfe83d",
        name: "Cerises"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 58.30020852995155,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 65.1729559908099,
          stock: 196.7627311581308,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 77.59218091733253,
          stock: 517.6330001839901,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 36.70662226119394,
          stock: 278.0566687717878,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 26.73951677004127,
          stock: 116.9084780628138,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 16.88635512121617,
          stock: 19.848373721836452,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 55.179079593334365,
          stock: 2.7757486156687605,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 31.073208641483106,
          stock: 672.4025043281968,
          inventoryStatus: "INSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "6639e472be7a65001314dd24",
      name: "Kefir 2x125g ALCAS",
      category: {
        id: "5f5b48fdbe16900012db04fb",
        name: "Brebis"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 50.25648337792929,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 93.68135287486541,
          stock: 219.97473333410977,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 72.29327644984562,
          stock: 884.6762517769168,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 19.345319585069486,
          stock: 321.91821498659624,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 4.925759992122125,
          stock: 194.19059972586973,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 97.09299027172347,
          stock: 103.43735792458597,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 34.14280805162233,
          stock: 745.3147132589521,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 38.548175616039536,
          stock: 666.0310345349842,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "663397a12add2f0014509d69",
      name: "Chips sel de Camargue 125g Family",
      category: {
        id: "663a31e064aa85001330f7fd",
        name: "Chips"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 54.15093620468818,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 99.09954400194196,
          stock: 650.0287551444106,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 57.218040415343374,
          stock: 19.92011915240144,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 18.470631326462296,
          stock: 476.3774459747552,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 77.18151499806305,
          stock: 343.4931727826638,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 98.92758806630542,
          stock: 460.533463918781,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 92.64421106236284,
          stock: 5.577061286578644,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 8.434933044788728,
          stock: 147.59496762226854,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "6633951cbe7a6500130f5116",
      name: "Pop-corn sucré 80g Family",
      category: {
        id: "663a32152add2f0014567704",
        name: "Pop corn"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 52.76208516786025,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 21.970467415738803,
          stock: 186.1288303338162,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 71.97046628212422,
          stock: 685.6065741335871,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 86.65215743317869,
          stock: 716.8639709779918,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 40.744475108389324,
          stock: 652.818127043419,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 52.93902452585766,
          stock: 558.6230862037795,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 30.40428677728646,
          stock: 348.34226638514633,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 85.84781835533238,
          stock: 701.7715125467354,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "6633918364aa8500132b1138",
      name: "Pop-corn salé 60g Family",
      category: {
        id: "663a32152add2f0014567704",
        name: "Pop corn"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 72.30446740717105,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 50.04715452425821,
          stock: 558.5043040661444,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 83.85766151845841,
          stock: 334.0949247523144,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 38.9388254576905,
          stock: 979.2729329126253,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 83.34831764025982,
          stock: 633.272169438924,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 59.241435133326604,
          stock: 233.08269580852837,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 3.8742265289086086,
          stock: 649.6852863552651,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 41.865151078753925,
          stock: 803.8618574941347,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "66310b1f2add2f00144e8786",
      name: "Chips herbes de Provence 125g Family",
      category: {
        id: "663a31e064aa85001330f7fd",
        name: "Chips"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 40.468680148418244,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 57.41458720644166,
          stock: 564.773001180958,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 32.11516812026065,
          stock: 374.4603696418143,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 85.33330169283641,
          stock: 666.3347303092266,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 13.911942223225227,
          stock: 655.3435628536455,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 58.93201858985992,
          stock: 831.5263342759,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 40.24293008586355,
          stock: 305.2180101760653,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 86.45409556701873,
          stock: 307.428500503808,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "663109dd52b98c0012d8208d",
      name: "Chips ondulees 125g Family",
      category: {
        id: "663a31e064aa85001330f7fd",
        name: "Chips"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 54.1582705730504,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 79.83576298763604,
          stock: 888.0571548813838,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 96.49585627982592,
          stock: 988.5627035375013,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 53.2187899915048,
          stock: 170.2102991904082,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 11.19999850356912,
          stock: 698.47326035486,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 68.61147659009137,
          stock: 815.7194491681812,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 13.266516051744626,
          stock: 767.6477518558343,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 0.8325171152258282,
          stock: 588.5879745543567,
          inventoryStatus: "INSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "6630b1b852b98c0012d71cc3",
      name: "Comté AOP Jeune - portion 200g",
      category: {
        id: "651a85cf164bd0001260a5d7",
        name: "Comte"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 67.82937602039371,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 53.76129090028314,
          stock: 808.281131217355,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 64.50398320987618,
          stock: 98.45681320146494,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 31.702242121545975,
          stock: 664.5557147131556,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 63.69556533915643,
          stock: 476.18372455995205,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 11.364151070004969,
          stock: 693.1437092727946,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 52.06033283239966,
          stock: 729.1557586811623,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 12.651565684577125,
          stock: 873.0459388400278,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "6627bf7331efa10012d9bd16",
      name: "Pesto rosso 130 g - Sauces papillon",
      category: {
        id: "647db6d31aed98001448d7ec",
        name: "Sauces fraiches"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 72.57401026583643,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 53.73131210880591,
          stock: 767.5648149185392,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 85.8631645441555,
          stock: 768.2133069815302,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 45.565318627759275,
          stock: 939.2245721106731,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 51.24135943052912,
          stock: 947.9138572129606,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 92.03549799913333,
          stock: 716.7720050623212,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 66.35228215673277,
          stock: 230.70494322229985,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 31.332540603673653,
          stock: 589.8390617357858,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: null,
      id: "6626149252b98c0012c9f5d5",
      name: "Mini moules à cakes - Marron - L 11 x P 7 x H 4 cm",
      category: {
        id: "5f5b48fe8f0e0200115e768a",
        name: "Emballages"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 94.86075478049824,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 12.260351138036697,
          stock: 683.8592990071744,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 41.78580377668426,
          stock: 80.5399402841056,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 73.70294257416666,
          stock: 756.629494390696,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 13.616919330929878,
          stock: 773.4045980940316,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 14.469765728339468,
          stock: 76.78737991674444,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 93.8161500526485,
          stock: 548.5903687224405,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 30.117522430950537,
          stock: 478.2564730778898,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "66226222375c590013b68475",
      name: "Ail nouveau pièce",
      category: {
        id: "5f5b49060d244100129fb3a3",
        name: "Bulbes"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 12.93420757653223,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 2.3029033500449936,
          stock: 644.1844763080815,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 70.41749080213393,
          stock: 653.2599067350274,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 35.32681104049209,
          stock: 235.16406560445958,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 3.1584248946443294,
          stock: 621.8802040197115,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 7.15154226417003,
          stock: 613.7186821105869,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 31.930486710023544,
          stock: 86.12988505639296,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 40.55940045338675,
          stock: 757.4867958039196,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "66225dab52b98c0012c7b502",
      name: "Buchette chevre sèche 150g RONDEA",
      category: {
        id: "5f5b490a8f0e0200115e7697",
        name: "From. Chevre"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 77.80400493154416,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 55.85499901742386,
          stock: 584.5516589287676,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 80.45004304438991,
          stock: 240.9865964357596,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 19.300126948404618,
          stock: 656.6335465376401,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 11.93992759813911,
          stock: 211.50638488501605,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 38.62616738797273,
          stock: 17.121191496829226,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 24.04112058483827,
          stock: 614.7393902782002,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 22.742389250317974,
          stock: 754.4367006880107,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "661e7e5a31efa10012cf6310",
      name: "Confiture de fraise 350 g",
      category: {
        id: "5f5b490e7b9eaf00111db60e",
        name: "Confiture - Chutney - Coulis"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 80.43101225953279,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 17.67174205936286,
          stock: 44.18193438702844,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 69.32701568868293,
          stock: 325.3124717300999,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 63.08183584771274,
          stock: 254.482984459248,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 25.554524656426448,
          stock: 723.3102463018378,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 52.188298509121765,
          stock: 541.0448289698351,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 22.937274109071804,
          stock: 324.2419787170041,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 52.11319959492731,
          stock: 347.73863003035734,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: null,
      id: "6618fcac31efa10012ca538b",
      name: "Cerneaux de noix declasses CUISINE",
      category: {
        id: "5fad7eb530dc260011d36b9e",
        name: "Ingrédients Cuisine"
      },
      unitOfMeasure: {
        id: "5db9ce3a5a026300119e9db1",
        name: "kg"
      },
      price: 73.11304309298916,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 36.01248776342325,
          stock: 476.41833832446736,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 54.80101543713991,
          stock: 735.1593490289399,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 29.837488028492064,
          stock: 399.27911549875785,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 81.80635335182336,
          stock: 224.39421062872046,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 55.236262907838075,
          stock: 109.80602580059129,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 86.3396338385885,
          stock: 515.6706527120765,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 62.76712504836017,
          stock: 28.167196339713428,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: null,
      id: "6618fba1375c590013ad992a",
      name: "Cerneaux invalides 1er choix",
      category: {
        id: "5fad7eb530dc260011d36b9e",
        name: "Ingrédients Cuisine"
      },
      unitOfMeasure: {
        id: "5db9ce3a5a026300119e9db1",
        name: "kg"
      },
      price: 80.45354464093506,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 99.06476244393596,
          stock: 780.560089415348,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 55.9276788134546,
          stock: 803.2012840083585,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 29.311372996500218,
          stock: 671.7493871469087,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 20.85075508473937,
          stock: 962.3401492162915,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 70.49819326814479,
          stock: 290.4389689509166,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 49.88796358645335,
          stock: 530.8722825353304,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 29.961954708449113,
          stock: 76.4301389199853,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: null,
      id: "6618fb7631efa10012ca51ee",
      name: "Cerneaux - moitiés extra",
      category: {
        id: "5fad7eb530dc260011d36b9e",
        name: "Ingrédients Cuisine"
      },
      unitOfMeasure: {
        id: "5db9ce3a5a026300119e9db1",
        name: "kg"
      },
      price: 69.88400254122365,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 21.11271284820344,
          stock: 854.7242657371323,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 18.42167389636944,
          stock: 477.1623175852775,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 8.571304488612652,
          stock: 224.24106349459217,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 23.352477567607256,
          stock: 353.35393912183946,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 84.71827719865821,
          stock: 215.31918685547114,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 74.46789924736848,
          stock: 459.4395634959627,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 6.390426034162,
          stock: 190.9830045890537,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "6614ff9d52b98c0012bb3cf0",
      name: "Biere L'aube 33 cl - D&D",
      category: {
        id: "5f5b48f90d244100129fb39b",
        name: "Biere"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 82.41665731444974,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 21.830268805681087,
          stock: 960.1198431951303,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 5.2952811419774815,
          stock: 495.5192709820746,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 20.698637673895593,
          stock: 728.8376498777043,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 79.11298830263969,
          stock: 957.9378629860245,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 66.2118499331551,
          stock: 235.78229697375153,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 30.12542548535957,
          stock: 119.10652744975248,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 22.74891196656359,
          stock: 346.4531052605153,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "6614fd99375c590013aa1b55",
      name: "Biere Mission Pale Ale 33 cl - D&D",
      category: {
        id: "5f5b48f90d244100129fb39b",
        name: "Biere"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 32.00052827786133,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 13.606306493746366,
          stock: 85.5930983348332,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 89.08653527043,
          stock: 860.3047059539958,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 22.566139965506938,
          stock: 969.1900171423184,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 9.557639851006371,
          stock: 140.36430936026824,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 68.25745462786301,
          stock: 439.96037537583874,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 76.36935309362639,
          stock: 712.9519506738582,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 15.674042561013458,
          stock: 462.5222962820643,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "6614f9e631efa10012c6d0a7",
      name: "Biere IPA 33 cl - D&D",
      category: {
        id: "5f5b48f90d244100129fb39b",
        name: "Biere"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 93.78788793064918,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 39.55522360571848,
          stock: 146.53175476873636,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 25.063983701462746,
          stock: 118.16911970850796,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 68.23662375582897,
          stock: 727.1545256886385,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 79.05070093273669,
          stock: 174.27539572841533,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 96.75290180444935,
          stock: 776.8971041238477,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 58.820610497948444,
          stock: 864.3340374084067,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 81.95897905469994,
          stock: 807.286352711598,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "66140b7152b98c0012ba6fb9",
      name: "Biere D Pilsner 33 cl - D&D",
      category: {
        id: "5f5b48f90d244100129fb39b",
        name: "Biere"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 44.66540991737895,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 24.000013505309003,
          stock: 228.20738224129488,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 92.290000582337,
          stock: 78.4600308415535,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 32.72397741546029,
          stock: 475.78039864591017,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 54.10471246053432,
          stock: 147.88501009048895,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 9.102224795787262,
          stock: 360.6196104624093,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 46.459959363368974,
          stock: 649.2563655305164,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 42.03715909699446,
          stock: 955.0121054043339,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65f977bde83cb1001452b077",
      name: "Truite fumée Arc-en-ciel 4T",
      category: {
        id: "5f5b490b0d244100129fb3a9",
        name: "Poisson fume"
      },
      unitOfMeasure: {
        id: "5db9ce3a5a026300119e9db1",
        name: "kg"
      },
      price: 46.37694725456378,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 8.530602199411618,
          stock: 900.3863742272946,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 35.21512598567335,
          stock: 633.0457499035938,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 76.66177915732644,
          stock: 749.6264270805542,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 76.5095035434324,
          stock: 575.5218832928352,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 36.93085372614955,
          stock: 625.8071361592071,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 19.20515457404697,
          stock: 940.8976374671109,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 29.730708077125566,
          stock: 380.1856189552206,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65ef05c81a01e000134505d7",
      name: "CUISINE - Flan salé poisson 350g",
      category: {
        id: "5f5b48fa8f0e0200115e7686",
        name: "Plats Cuisinés"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 1.2708872901309842,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 21.125319922240337,
          stock: 32.86079213215065,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 70.7431743796078,
          stock: 80.82789611987783,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 80.57395900509744,
          stock: 346.6912351428717,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 42.288055671645395,
          stock: 837.4004019498507,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 59.41145002024204,
          stock: 573.1857879341378,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 23.421359286534127,
          stock: 241.24016240209457,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 98.19328178540492,
          stock: 440.77243693993637,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65ef05474678ab0014017a00",
      name: "CUISINE - Salade de crudités et poisson fumé 180g",
      category: {
        id: "5f5b48fdbe16900012db04fc",
        name: "Entrées"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 3.8988211271048456,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 74.31086109566097,
          stock: 750.207915555589,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 96.10268254408237,
          stock: 326.94956815094645,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 84.74838636494309,
          stock: 975.0864808674793,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 12.766657893992651,
          stock: 670.7726346858394,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 77.1648235379515,
          stock: 983.6439933199879,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 79.92715999503905,
          stock: 363.97105724872847,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 9.194392366187998,
          stock: 394.23760089466975,
          inventoryStatus: "INSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65eeb8d21a01e0001344b5ed",
      name: "Pomme Mandy",
      category: {
        id: "61447a16d794cc001966ddad",
        name: "Pommes"
      },
      unitOfMeasure: {
        id: "5db9ce3a5a026300119e9db1",
        name: "kg"
      },
      price: 44.05092116374452,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 82.680911419169,
          stock: 861.8657741901923,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 29.45047049671374,
          stock: 954.4752458278311,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 89.10046386919093,
          stock: 352.7716463236645,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 40.562233541645654,
          stock: 338.3953312808634,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 68.74400270904417,
          stock: 717.4233236003886,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 82.24554435935086,
          stock: 68.80282908865954,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 93.67189519977639,
          stock: 157.7252307070498,
          inventoryStatus: "INSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65e878984678ab0014fbb117",
      name: "Pate blanche farfalle 500g Iris",
      category: {
        id: "5f5b490f7b9eaf00111db60f",
        name: "Pates riz"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 78.42255437288068,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 23.362966329354528,
          stock: 470.478784842999,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 49.66952362378259,
          stock: 107.92967772476736,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 38.1271657826006,
          stock: 963.8587943019952,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 96.59142454276504,
          stock: 381.9344571104635,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 89.67629009676499,
          stock: 668.198672703848,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 94.21785599701482,
          stock: 966.4661620869992,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 94.63337905760679,
          stock: 272.52155840407164,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65e8783f1a01e000133f32e3",
      name: "Pate blanche linguine 500g Iris",
      category: {
        id: "5f5b490f7b9eaf00111db60f",
        name: "Pates riz"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 73.73412884198005,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 81.9006791290216,
          stock: 915.760605262367,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 39.772306037172186,
          stock: 880.8330090358088,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 14.62132465787076,
          stock: 441.5543136738493,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 76.24455820586715,
          stock: 950.5366802519268,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 46.90398315390514,
          stock: 784.9389854136184,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 59.612886631942615,
          stock: 513.4666166395017,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 19.298493454716947,
          stock: 678.8757862377888,
          inventoryStatus: "INSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65e877c783433a001499e4ab",
      name: "Pate blanche spaghetti 500g Iris",
      category: {
        id: "5f5b490f7b9eaf00111db60f",
        name: "Pates riz"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 7.410532934396463,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 29.193376816118754,
          stock: 465.92635885933475,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 71.29125250462596,
          stock: 606.1481654611798,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 39.48066924627054,
          stock: 181.4036525097611,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 90.94451176866325,
          stock: 953.9540171281826,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 6.582449273612601,
          stock: 3.813047438905981,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 29.630524595697572,
          stock: 879.611186373376,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 96.1665570731578,
          stock: 222.98916046284046,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65e877834678ab0014fbaf23",
      name: "Pate blanche penne 500g Iris",
      category: {
        id: "5f5b490f7b9eaf00111db60f",
        name: "Pates riz"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 86.76708117952796,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 80.59624146186792,
          stock: 167.5929085816854,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 12.084195013391795,
          stock: 142.73906178865437,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 66.76418894819092,
          stock: 991.0020536506023,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 37.98206263255297,
          stock: 591.7612551613811,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 41.614603015789186,
          stock: 963.3310488729865,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 60.938001981774256,
          stock: 108.10970830793964,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 6.371011660452597,
          stock: 820.8755217913359,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65e877274678ab0014fbae3e",
      name: "Pate blanche fusilli 500g Iris",
      category: {
        id: "5f5b490f7b9eaf00111db60f",
        name: "Pates riz"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 27.190434889868698,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 1.8135975424897754,
          stock: 351.0538986580536,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 59.15593152119645,
          stock: 241.97021875158464,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 85.07586868545533,
          stock: 70.44339905251084,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 36.18155863568753,
          stock: 340.63307682291844,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 52.20809079060849,
          stock: 585.7665345216953,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 21.389339102228444,
          stock: 523.8323045486906,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 48.956871103852585,
          stock: 15.275659257300456,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65e876b61a01e000133f3041",
      name: "Pate blanche maccheroni 500g Iris",
      category: {
        id: "5f5b490f7b9eaf00111db60f",
        name: "Pates riz"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 5.085811326668521,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 79.9247079332923,
          stock: 535.4061077840811,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 33.549955039675524,
          stock: 231.3266416520432,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 27.565279485889093,
          stock: 533.9647005126269,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 41.24324739113621,
          stock: 1.316644846464543,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 62.7659161484619,
          stock: 343.71817037353856,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 70.05812423277622,
          stock: 905.1776946193024,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 70.75001157519402,
          stock: 535.6153618459532,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65e875b74678ab0014fbac55",
      name: "Puree de tomate 690g Iris",
      category: {
        id: "5f5b4906be16900012db0500",
        name: "Sauce"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 90.52882833440312,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 55.564109772376845,
          stock: 836.9539351483746,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 70.75311337728323,
          stock: 700.0836363301985,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 38.42654254456619,
          stock: 2.4101389714386023,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 19.115381551336785,
          stock: 358.8803067453199,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 71.25806576515376,
          stock: 110.242907814742,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 50.76712517011146,
          stock: 902.7353398114025,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 12.215653176889596,
          stock: 894.0066405267759,
          inventoryStatus: "INSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65e8756f83433a001499e0e8",
      name: "Pulpe de tomate epicee 340g Iris",
      category: {
        id: "5f5b4906be16900012db0500",
        name: "Sauce"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 98.33675625774904,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 23.22351466827264,
          stock: 773.4745322995959,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 3.650060496562091,
          stock: 257.09340144489624,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 3.4742535634907146,
          stock: 768.2285338248352,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 42.22503767070083,
          stock: 116.43817750703067,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 81.62079545447405,
          stock: 142.5692636720661,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 54.93237633610739,
          stock: 704.7954980895616,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 16.41558898480231,
          stock: 470.59627121440894,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65e8752483433a001499e0a0",
      name: "Pulpe de tomate et basilic 340g Iris",
      category: {
        id: "5f5b4906be16900012db0500",
        name: "Sauce"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 55.55423670582489,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 2.200517920123257,
          stock: 408.71300739069903,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 90.37208294856339,
          stock: 274.8283042299253,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 73.71169096986148,
          stock: 334.37894191498475,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 53.89626916034638,
          stock: 631.9661491007167,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 49.564051866953676,
          stock: 250.3179185973201,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 55.44616681021217,
          stock: 626.5346360179362,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 85.68736648831425,
          stock: 764.9437309113107,
          inventoryStatus: "INSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65e874a11a01e000133f2d91",
      name: "Pulpe de tomate aux legumes 340g Iris",
      category: {
        id: "5f5b4906be16900012db0500",
        name: "Sauce"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 52.16223355587621,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 39.82198486577187,
          stock: 320.8986385184103,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 89.9346779734987,
          stock: 103.4724558846436,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 34.77000991590613,
          stock: 409.0613907302845,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 58.1654882985307,
          stock: 794.8011673248895,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 67.10324996635204,
          stock: 721.1146260069661,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 20.850145047577918,
          stock: 548.2729504475361,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 74.40499758971977,
          stock: 785.1102129494261,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: false,
      id: "65e874251a01e000133f2ce8",
      name: "Pulpe de tomate 340g Iris",
      category: {
        id: "5f5b4906be16900012db0500",
        name: "Sauce"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 75.59826056640613,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 9.58477824395696,
          stock: 542.6266426757655,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 95.19242293697951,
          stock: 694.7636676509806,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 70.08736873589673,
          stock: 457.5338783148446,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 71.97178589646147,
          stock: 145.32395329973235,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 77.95598639534262,
          stock: 755.270954252066,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 30.665556712152696,
          stock: 438.51505542536694,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 45.73636578312878,
          stock: 6.475091699090774,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65e04e2444a544001354d313",
      name: "Kiwi par 8",
      category: {
        id: "5f5b49071e0f2f00112cf09e",
        name: "Autres fruits a pepin"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 58.442735754085916,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 54.68616589611977,
          stock: 503.55863717122395,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 29.345133243805854,
          stock: 794.5225808826555,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 88.22560461492048,
          stock: 778.4974781570833,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 33.90115607203077,
          stock: 158.32709934864454,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 16.055860759672914,
          stock: 267.6646927049184,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 48.12035360274871,
          stock: 396.1313912150033,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 42.878467247538275,
          stock: 448.0113533779921,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65de0c4644a54400135317a3",
      name: "Vin rouge - Chaponniere - Domaine Ninot",
      category: {
        id: "5f5b48ff0d244100129fb3a0",
        name: "Vin rouge"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 63.76774937800916,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 74.69148674661412,
          stock: 348.1501277026642,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 41.57955709223682,
          stock: 893.7859165454325,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 55.17912735958579,
          stock: 915.5437646149691,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 78.8334015383786,
          stock: 312.16819711274945,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 10.14089229722812,
          stock: 577.9744907129709,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 61.588252433236356,
          stock: 940.1811888932288,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 4.709593515213384,
          stock: 288.9588996597323,
          inventoryStatus: "INSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65ddcdf6824d0600134a6ef7",
      name: "Yaourt vache nature demi-ecreme 125g FROMENTEL",
      category: {
        id: "655f538fcc968d0013f168df",
        name: "Yaourt nature"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 16.719203824610606,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 69.83980829715767,
          stock: 387.7779205538909,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 45.514540832660664,
          stock: 87.35813051955344,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 40.619326150519775,
          stock: 160.06782168832223,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 93.09508781962019,
          stock: 584.7162312441143,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 52.54901331201809,
          stock: 449.8911325580832,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 47.864427737359996,
          stock: 139.02585506273945,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 65.81061431557052,
          stock: 527.6447318457216,
          inventoryStatus: "INSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65ddc84b9b58a200135ae2b2",
      name: "Truite fumée du Cathare 4 T",
      category: {
        id: "5f5b490b0d244100129fb3a9",
        name: "Poisson fume"
      },
      unitOfMeasure: {
        id: "5db9ce3a5a026300119e9db1",
        name: "kg"
      },
      price: 8.921989329463486,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 66.47779247305303,
          stock: 27.24891657915296,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 17.79477115350494,
          stock: 239.46447812366057,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 61.590315388144035,
          stock: 927.2980582155066,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 82.35352450288002,
          stock: 778.7659701390213,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 77.01746510268404,
          stock: 126.35014679543532,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 31.258897231253858,
          stock: 676.7073683202365,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 80.29161568026153,
          stock: 390.1438916475504,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65d778af44a54400134c62f5",
      name: "CUISINE - Viande sautée, riz et légumes de saison 350g",
      category: {
        id: "5f5b48fa8f0e0200115e7686",
        name: "Plats Cuisinés"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 87.1813894878815,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 64.66884212661893,
          stock: 728.1085026033697,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 56.3175059749385,
          stock: 436.6390828056599,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 30.22281372671669,
          stock: 740.007942559757,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 92.06075004852272,
          stock: 633.0901900793706,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 69.97643085604388,
          stock: 340.1661585402387,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 3.6140858706924073,
          stock: 488.6210361042049,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 69.79083478661816,
          stock: 159.9210320251816,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65d777ca9b58a20013549c23",
      name: "CUISINE - Poisson blanc, riz aux petits légumes et crème citronnée 350g",
      category: {
        id: "5f5b48fa8f0e0200115e7686",
        name: "Plats Cuisinés"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 11.913786780658997,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 72.50847641119185,
          stock: 919.2246419660162,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 98.61068948472325,
          stock: 405.7484433581897,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 85.34275249191366,
          stock: 559.6842906021558,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 8.520254069006384,
          stock: 301.20747756654697,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 69.1213103209619,
          stock: 814.8053110954365,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 74.35069372690421,
          stock: 256.73135223713814,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 31.37433779954386,
          stock: 873.7893904915288,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65d6140b824d06001342481f",
      name: "Radis botte multicolore",
      category: {
        id: "651eb6f6ae7c520012ebaabb",
        name: "Radis"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 5.715151292947307,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 32.18166413196675,
          stock: 262.2808122085134,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 73.36776745498163,
          stock: 892.1909320394606,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 62.865180698786396,
          stock: 466.5037397075038,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 92.45955975312776,
          stock: 640.6830352959494,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 89.7278899899844,
          stock: 92.56390041876882,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 8.620229924581535,
          stock: 920.1637134856024,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 95.54405043321097,
          stock: 961.9177312111049,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65d4ba009b58a2001351a25e",
      name: "CUISINE - Poêlée de pommes de terre et viande 350g",
      category: {
        id: "5f5b48fa8f0e0200115e7686",
        name: "Plats Cuisinés"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 14.574249853855736,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 10.675216427460743,
          stock: 378.7399877645847,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 25.72522544541458,
          stock: 454.31855571727,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 1.818396659833743,
          stock: 165.5394382581874,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 25.149162804691393,
          stock: 154.6717449939301,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 73.33514146726468,
          stock: 464.74311983728154,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 68.89983018557105,
          stock: 154.1037537216561,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 80.52928782947488,
          stock: 635.5479668077708,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: null,
      id: "65d4b83244a5440013496ac0",
      name: "Farine ble T55 kg",
      category: {
        id: "5fad7eb530dc260011d36b9e",
        name: "Ingrédients Cuisine"
      },
      unitOfMeasure: {
        id: "5db9ce3a5a026300119e9db1",
        name: "kg"
      },
      price: 68.47318139760871,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 98.32058736788846,
          stock: 198.41923836595555,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 7.586791876191112,
          stock: 244.60306328402925,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 92.8333611151911,
          stock: 326.2387126671997,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 65.51417219022919,
          stock: 759.041729959712,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 40.92943639881956,
          stock: 320.1675909881525,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 94.56190440190394,
          stock: 897.2134357859096,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 91.65161812563052,
          stock: 933.9094100787053,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65d36dc644a54400134833a4",
      name: "Bleu Alcas",
      category: {
        id: "5f5b490fbe16900012db0509",
        name: "From. Brebis"
      },
      unitOfMeasure: {
        id: "5db9ce3a5a026300119e9db1",
        name: "kg"
      },
      price: 19.369274198401286,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 76.0078934636671,
          stock: 510.777417580591,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 31.51191832230098,
          stock: 669.0615884176909,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 52.15589322431564,
          stock: 100.13161439625162,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 87.79487962689447,
          stock: 491.9198972800245,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 75.30076278867435,
          stock: 99.20795785573966,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 34.248562902768896,
          stock: 708.4612977835269,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 73.70866334268393,
          stock: 533.5242644527989,
          inventoryStatus: "INSTOCK"
        }
      ]
    },
    {
      sellable: false,
      id: "65d365ed824d0600133fdbb0",
      name: "Allumettes fumées CHB OPP",
      category: {
        id: "5f5b48fa8f0e0200115e7685",
        name: "Poitrine"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 53.36485293450339,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 80.48135011841995,
          stock: 417.5129062580381,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 85.28095835672272,
          stock: 769.5882192069761,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 38.36620152024863,
          stock: 754.0265638481811,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 35.22807013810423,
          stock: 620.2868122863372,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 9.412047413379444,
          stock: 200.3498592631321,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 78.61789788295772,
          stock: 685.72400216693,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 36.14827285849069,
          stock: 621.6071657870621,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: false,
      id: "65cf753c020e580013c825d2",
      name: "Avocat Corse 2 pièce",
      category: {
        id: "647db2d764b6550013f9d8d2",
        name: "Avocats"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 52.52271800585171,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 65.49828905512463,
          stock: 70.09591192968668,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 79.81128142600677,
          stock: 290.84155820018,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 43.91536090894288,
          stock: 971.1085299874536,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 89.15402368845278,
          stock: 856.2231900099571,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 38.98901564787727,
          stock: 495.6011820531596,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 89.32401064857251,
          stock: 490.098856765911,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 55.05870547040577,
          stock: 182.8205191945036,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: false,
      id: "65cf72db368e9e0012d45c8d",
      name: "Avocat Corse piece",
      category: {
        id: "647db2d764b6550013f9d8d2",
        name: "Avocats"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 72.4104441530844,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 33.756429546306045,
          stock: 666.123822095605,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 52.09838130160283,
          stock: 618.9008726001997,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 57.47015432886779,
          stock: 854.8178309943283,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 21.554714744504277,
          stock: 801.14919753372,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 40.479799143153606,
          stock: 719.3572364779479,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 62.554453851505684,
          stock: 628.9571461568042,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 88.5434650285818,
          stock: 383.97228139355155,
          inventoryStatus: "INSTOCK"
        }
      ]
    },
    {
      sellable: null,
      id: "65cf7078368e9e0012d45938",
      name: "Avocat Corse",
      category: {
        id: "647db2d764b6550013f9d8d2",
        name: "Avocats"
      },
      unitOfMeasure: {
        id: "5db9ce3a5a026300119e9db1",
        name: "kg"
      },
      price: 86.79389455406582,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 46.259859157370876,
          stock: 678.9073110626186,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 11.072770192655646,
          stock: 980.3217791455598,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 28.327221401800596,
          stock: 211.00548071831682,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 29.357092767500802,
          stock: 605.3886126230863,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 24.81675989560368,
          stock: 848.7763363141181,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 61.986441273234675,
          stock: 327.72065372618073,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 98.85653486870535,
          stock: 473.3230003740345,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65ce84944131880013f70b09",
      name: "CUISINE - Pâtes et boulettes de viande 350g",
      category: {
        id: "5f5b48fa8f0e0200115e7686",
        name: "Plats Cuisinés"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 1.458879220280429,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 3.0980500432904012,
          stock: 484.96344385173296,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 22.40246229795546,
          stock: 954.1145819229886,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 38.962427478586136,
          stock: 820.3961144654892,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 83.8329826301732,
          stock: 961.5703681455678,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 88.75890652938487,
          stock: 419.7465360653365,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 17.121758569925948,
          stock: 47.96449221939447,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 71.63432484709635,
          stock: 33.4220755525394,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65ce8297368e9e0012d34459",
      name: "CUISINE - Crémeux café 150",
      category: {
        id: "5fdc891bef8ca50018cbd2fa",
        name: "Dessert"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 45.376910541621406,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 45.46313052922451,
          stock: 381.5425450394876,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 28.748005591059588,
          stock: 669.4039952770672,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 70.95015658208939,
          stock: 435.75004024021945,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 19.171428790282754,
          stock: 535.6231801126521,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 36.37997283746037,
          stock: 48.29654590692356,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 36.36621863071956,
          stock: 761.0786300912733,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 40.52665585963724,
          stock: 303.9020023723491,
          inventoryStatus: "INSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65ce810b4131880013f70975",
      name: "CUISINE - Potée de lentilles végétarienne 350g",
      category: {
        id: "5f5b48fa8f0e0200115e7686",
        name: "Plats Cuisinés"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 75.28404872783014,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 5.117303012578889,
          stock: 459.52687060371767,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 11.244667857575074,
          stock: 71.99734277442205,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 68.71860183784584,
          stock: 279.19464770345104,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 41.541782347338454,
          stock: 715.3812305283667,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 63.6283574445218,
          stock: 462.82562369785694,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 59.198486865446576,
          stock: 814.3539015695083,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 16.71695960183368,
          stock: 922.4875018503956,
          inventoryStatus: "INSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65ce7fba4131880013f70907",
      name: "CUISINE - Salade de petit épeautre 180g",
      category: {
        id: "5f5b48fdbe16900012db04fc",
        name: "Entrées"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 30.75039284079637,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 9.929001432425899,
          stock: 302.4899968814687,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 34.30763791922564,
          stock: 660.4414759964807,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 22.740673814017143,
          stock: 996.8952584686679,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 95.03001030153571,
          stock: 308.72675582799536,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 2.004165062546015,
          stock: 775.7346655150463,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 27.166640514281816,
          stock: 622.3210855531815,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 18.040933478062414,
          stock: 660.8637599806093,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65ce7ea74131880013f708a2",
      name: "CUISINE - Légumes de saison rôtis et riz de Camargue 350g",
      category: {
        id: "5f5b48fa8f0e0200115e7686",
        name: "Plats Cuisinés"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 25.385239809411388,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 93.33142818576201,
          stock: 759.6501280780774,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 88.8305934332932,
          stock: 867.7429371648884,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 30.91612583857497,
          stock: 664.9894634664333,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 19.04613464618363,
          stock: 512.9431162324285,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 6.733460813554837,
          stock: 473.2598492948459,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 21.927138298167726,
          stock: 239.2430200522544,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 33.57748688431439,
          stock: 245.91836517411835,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65ccc2fb368e9e0012d19c00",
      name: "CUISINE - Rillettes de poisson 180g",
      category: {
        id: "648c458f640c3b0014d33ca8",
        name: "Autres"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 41.983508985986795,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 38.06788256684002,
          stock: 352.12376719164286,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 79.5704183656253,
          stock: 79.13162811291552,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 55.29015595284299,
          stock: 724.9731867852645,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 74.80518865748367,
          stock: 370.0209769449605,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 53.4490293961418,
          stock: 653.5701116708512,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 70.78879798811538,
          stock: 413.3000429561047,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 16.512388358196816,
          stock: 297.99182824703064,
          inventoryStatus: "INSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65cb45a1368e9e0012d060bd",
      name: "Grain 75cl - Domaine de la Monardière",
      category: {
        id: "5f5b48ff0d244100129fb3a0",
        name: "Vin rouge"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 98.14641436126448,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 63.71906154144318,
          stock: 146.94008069665963,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 32.50786514552371,
          stock: 497.5990330260869,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 32.444905179672936,
          stock: 716.2993109857842,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 53.485476360441986,
          stock: 651.2215002661643,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 37.432297532485734,
          stock: 336.32078963933145,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 2.852618158584286,
          stock: 243.96605606931644,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 74.66421748626246,
          stock: 49.82742287580577,
          inventoryStatus: "INSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65c646ba020e580013c00f4b",
      name: "Yaourt Brassé aux Fruits 500g FROMENTEL",
      category: {
        id: "656069938f574a0012ee292b",
        name: "Yaourt aux Fruits"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 88.04583309632883,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 35.356483076875,
          stock: 334.36220158247187,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 19.216064378806074,
          stock: 824.5714711322277,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 27.96743437450948,
          stock: 181.9862809295334,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 18.65353767047786,
          stock: 307.0719573695335,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 60.89586011481403,
          stock: 894.1462432205863,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 19.17946712806573,
          stock: 523.685955761958,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 57.414573496025966,
          stock: 813.4749938231027,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65c6458d368e9e0012cc35ef",
      name: "Yaourt Brassé Nature 500g FROMENTEL",
      category: {
        id: "655f538fcc968d0013f168df",
        name: "Yaourt nature"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 32.16071118035002,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 62.00948426446335,
          stock: 177.6667767680513,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 75.58059783149132,
          stock: 590.0117946094585,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 79.6923166695235,
          stock: 813.2377015641313,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 60.54130516304581,
          stock: 263.97053480180267,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 14.210795925565822,
          stock: 782.3075638559737,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 8.167319839351528,
          stock: 7.006374903782753,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 85.20583032377426,
          stock: 790.517491462855,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65c643a0020e580013c00aa8",
      name: "Yaourt à boire 250g FROMENTEL",
      category: {
        id: "652fac02fb708c001371d742",
        name: "nature"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 56.946954102394386,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 55.01057936319127,
          stock: 682.8995809861731,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 32.52128179506251,
          stock: 925.0519995867679,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 41.76898226187269,
          stock: 977.0746412461356,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 91.70252371654392,
          stock: 492.3656851598079,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 3.873840946164453,
          stock: 576.2821106818581,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 22.353853051884332,
          stock: 640.5158240868509,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 65.99768073152728,
          stock: 430.82016169166315,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65c4b990c9b03f001342abf6",
      name: "Demi chou de Milan",
      category: {
        id: "649eee9370246000137b60e9",
        name: "Choux"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 3.4241083753445922,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 69.81442570461043,
          stock: 833.5040371589693,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 69.07528656352527,
          stock: 911.5578234080531,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 88.13362082037337,
          stock: 792.3347745375817,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 66.13791452823274,
          stock: 909.8943777638098,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 34.834808750223885,
          stock: 669.9117190014814,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 36.22018051504136,
          stock: 338.97805606512566,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 78.23727993388697,
          stock: 753.8904170535454,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65c4b76d519d25001399ec9a",
      name: "Demi chou lisse",
      category: {
        id: "649eee9370246000137b60e9",
        name: "Choux"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 73.51443565844194,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 29.286165798961726,
          stock: 632.9451480742875,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 69.45843219604093,
          stock: 541.2116875328468,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 37.942146448508396,
          stock: 785.4683013689292,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 7.038058079046805,
          stock: 752.7349087276709,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 22.673537253167233,
          stock: 139.8496254806334,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 93.80895231228403,
          stock: 836.5494844646131,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 84.26046617561877,
          stock: 76.01820748174416,
          inventoryStatus: "INSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65c3b944d825a80012dfc751",
      name: "Velouté de lentilles corail et carottes 75c",
      category: {
        id: "5f5b4908be16900012db0502",
        name: "Accompagnements"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 24.227990373653753,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 54.9533965580705,
          stock: 972.0277505884038,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 53.08379531255007,
          stock: 456.2239703060291,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 75.10199378315522,
          stock: 431.37332864997325,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 78.38405090746517,
          stock: 316.4073212801746,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 19.577359116107097,
          stock: 198.41927776221758,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 8.7185784208917,
          stock: 776.8654421780818,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 34.421478157408615,
          stock: 76.59674234988145,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: null,
      id: "65bcc463519d2500138f8ef3",
      name: "Demi Baguette sesame pour SANDWICH",
      category: {
        id: "5fad7eb530dc260011d36b9e",
        name: "Ingrédients Cuisine"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 42.59436160047143,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 9.76806187213979,
          stock: 227.99494686703903,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 19.38704633540034,
          stock: 916.7162780977982,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 75.99961329266272,
          stock: 183.97192736660094,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 67.92736989264263,
          stock: 390.50537538175,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 7.6120765406008095,
          stock: 841.930265791476,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 38.29777894212907,
          stock: 497.7041653859924,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 59.49683109253454,
          stock: 569.3988801932405,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: null,
      id: "65bcb80ac9b03f001338374e",
      name: "Pot Verre 190 ml WC000039 x3549",
      category: {
        id: "5f5b48fe8f0e0200115e768a",
        name: "Emballages"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 84.36482794825592,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 87.22341235973536,
          stock: 859.4933964081199,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 3.763631746382967,
          stock: 663.8957437274497,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 53.651153197751796,
          stock: 289.56127828708975,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 99.88826960741875,
          stock: 805.3311576348788,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 35.48434394279314,
          stock: 390.474102507127,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 22.27758521939476,
          stock: 372.4051077783217,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 23.103555853081502,
          stock: 5.754576126139277,
          inventoryStatus: "INSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65ba65da519d2500138bd813",
      name: "Huile Tournesol 50 cl - Ursule",
      category: {
        id: "63ff86fdd07cd70013ccc806",
        name: "Huile Tournesol"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 75.53600050787507,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 74.93154775777569,
          stock: 780.4286227909906,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 67.52666430989134,
          stock: 221.38164448218788,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 17.819426967318797,
          stock: 738.4330508936307,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 24.80949866043314,
          stock: 419.4227758358362,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 75.61443092154032,
          stock: 160.76701222919553,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 14.838076568257573,
          stock: 388.0662142972262,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 57.15041669177214,
          stock: 835.0770304233619,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65ba555b519d2500138ba69f",
      name: "Crepe garnie",
      category: {
        id: "648c458f640c3b0014d33ca8",
        name: "Autres"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 50.9422026883618,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 60.83284501344781,
          stock: 978.6502866322979,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 43.10901681317225,
          stock: 838.3711888304308,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 61.33690001829064,
          stock: 20.245169123271456,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 65.58331843655887,
          stock: 788.661921379672,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 76.48209854891921,
          stock: 705.6629745053855,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 66.48888005251665,
          stock: 238.473063086444,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 36.01098069817752,
          stock: 278.9571860909024,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65b8df6bc9b03f001332b35b",
      name: "CUISINE - Galette farcie végétarienne 350",
      category: {
        id: "5f5b48fa8f0e0200115e7686",
        name: "Plats Cuisinés"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 43.834534488339116,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 82.08729873325098,
          stock: 881.020801542118,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 75.35383716946968,
          stock: 449.87765116616794,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 18.98109999803552,
          stock: 272.52830763698466,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 23.19924711585408,
          stock: 221.3824517920593,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 64.0818736508044,
          stock: 218.18103015145573,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 38.9299845052147,
          stock: 721.9065746746711,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 58.37850869150556,
          stock: 284.85914330467745,
          inventoryStatus: "INSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65b8deb0c9b03f001332b1a1",
      name: "CUISINE - Galette farcie 350g",
      category: {
        id: "5f5b48fa8f0e0200115e7686",
        name: "Plats Cuisinés"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 73.42513706803456,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 35.30197718990249,
          stock: 726.450142272031,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 83.96441349030698,
          stock: 682.6874720498073,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 85.68624588839744,
          stock: 309.3511643762064,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 12.946007865847498,
          stock: 548.8045339934946,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 21.42441186778088,
          stock: 565.8286740915856,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 2.711035940784301,
          stock: 800.392442255345,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 35.190627082193046,
          stock: 882.0222537378448,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65b8dca0519d25001389f29c",
      name: "Quinoa 500g - AP",
      category: {
        id: "62c563c25c81420014afcbca",
        name: "Légumes transformés"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 68.11781709415108,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 36.359597642635656,
          stock: 87.26187326408241,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 66.28438794662115,
          stock: 694.94722779606,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 88.02081905518658,
          stock: 570.5501269186251,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 3.046731585032969,
          stock: 918.3594172355198,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 80.89966033438303,
          stock: 514.6184006305976,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 50.19442818032345,
          stock: 991.7140823087786,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 10.714743654691095,
          stock: 787.2111664891999,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65b2a2b98c8a130013e3d8f5",
      name: "CUISINE - Boudin aux pommes et purée 350g",
      category: {
        id: "5f5b48fa8f0e0200115e7686",
        name: "Plats Cuisinés"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 73.21422128630644,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 46.76130655020625,
          stock: 743.7773601928142,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 71.34449878484703,
          stock: 835.5704837762547,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 3.6646475260259104,
          stock: 502.03987910009397,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 88.32723645862777,
          stock: 211.17951402205048,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 27.323829310090964,
          stock: 810.3675949581321,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 44.78816860199506,
          stock: 328.6622164892441,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 29.522378573389062,
          stock: 708.6945162500386,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: false,
      id: "65b0f0403ef71400134ee2cf",
      name: "Tomme fermière de montagne OPP",
      category: {
        id: "5f5b490f1e0f2f00112cf0a4",
        name: "From. Vache"
      },
      unitOfMeasure: {
        id: "5db9ce3a5a026300119e9db1",
        name: "kg"
      },
      price: 37.173124745046216,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 38.477549963729004,
          stock: 995.8528821710914,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 38.361024493561004,
          stock: 95.4374217739602,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 42.883247798586325,
          stock: 253.27859378882422,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 47.56305599202728,
          stock: 91.68374830311609,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 11.881227784187033,
          stock: 464.1382686996378,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 75.74513444360964,
          stock: 188.08986928018047,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 80.87095551424652,
          stock: 274.511460111035,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65b0d31b3ef71400134ec677",
      name: "Pesto Frais Roquette 160g - Sauces Papillon",
      category: {
        id: "647db6d31aed98001448d7ec",
        name: "Sauces fraiches"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 72.52340468344318,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 60.27888069636942,
          stock: 470.12958108904644,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 37.7234965007768,
          stock: 311.76186043579924,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 2.77472995645045,
          stock: 509.36936854626526,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 12.568064321097427,
          stock: 999.536497368608,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 62.067355447184845,
          stock: 984.7206059173785,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 94.02801094904522,
          stock: 317.47741712369293,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 1.5770103052440199,
          stock: 53.32033827800209,
          inventoryStatus: "INSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65af75ccbb23a50014b29da7",
      name: "CUISINE - Cake aux amandes 120g",
      category: {
        id: "5fdc891bef8ca50018cbd2fa",
        name: "Dessert"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 56.70913204647241,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 97.76486754575431,
          stock: 89.84554099949071,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 59.567857151129424,
          stock: 992.3221984652126,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 3.2900352951017453,
          stock: 736.3929056834595,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 32.556201376334236,
          stock: 905.0908422927511,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 96.61916101383066,
          stock: 316.38218314261724,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 91.29125867001677,
          stock: 703.1983393372763,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 91.32370405417525,
          stock: 988.1183820507438,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: null,
      id: "65a8ddc742423c0013bfb263",
      name: "CUISINE - Flan dessert 150g",
      category: {
        id: "5fdc891bef8ca50018cbd2fa",
        name: "Dessert"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 24.204151529598672,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 6.3804396010319175,
          stock: 723.1447202142518,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 30.166549417146538,
          stock: 849.6233165619185,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 35.46083908496118,
          stock: 943.601355314011,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 30.53928027860444,
          stock: 87.10865952964153,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 71.48509048490075,
          stock: 129.77399845767158,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 9.520145192709295,
          stock: 326.9645999176789,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 37.121196674470134,
          stock: 945.2865192634696,
          inventoryStatus: "INSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65a45cf542423c0013b8d4f2",
      name: "CUISINE - Pâtes à la viande 350g",
      category: {
        id: "5f5b48fa8f0e0200115e7686",
        name: "Plats Cuisinés"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 57.12607427640495,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 23.70269600559476,
          stock: 427.48364784908955,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 7.260302318041245,
          stock: 600.527134609003,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 46.35200186505322,
          stock: 36.521693909350674,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 24.969443730050166,
          stock: 510.3187909777927,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 57.12354606956929,
          stock: 377.4369044734245,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 85.41224615345189,
          stock: 587.2321674903542,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 9.752684659692811,
          stock: 956.6275025713842,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65a459d742423c0013b8d3b0",
      name: "CUISINE - Blanquette traditionnelle 350g",
      category: {
        id: "5f5b48fa8f0e0200115e7686",
        name: "Plats Cuisinés"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 99.80721244457227,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 38.142721930816535,
          stock: 864.3589385801827,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 43.16238741764129,
          stock: 840.6704000982307,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 59.55683233845899,
          stock: 603.5726657310323,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 0.3007952120642532,
          stock: 918.9419701034351,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 90.81854231720918,
          stock: 534.8237614539604,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 10.330674780673267,
          stock: 151.93907994326494,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 32.9263749666036,
          stock: 775.2312900733647,
          inventoryStatus: "INSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65a4551842423c0013b8d30a",
      name: "CUISINE - Potée de choux & cochonnaille 350",
      category: {
        id: "5f5b48fa8f0e0200115e7686",
        name: "Plats Cuisinés"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 19.896204983440068,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 20.884481895882324,
          stock: 511.8777604288498,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 82.72090430513495,
          stock: 427.70535270835694,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 71.92636573618265,
          stock: 335.86798901524804,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 58.12919717644278,
          stock: 305.38635317717143,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 94.94736707432214,
          stock: 370.84251590329154,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 1.062053140777075,
          stock: 807.7113524223982,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 58.29338591790885,
          stock: 705.2758746889145,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65a44f506fd64e00137318c2",
      name: "CUISINE - Tajine végétarien 350g",
      category: {
        id: "5f5b48fa8f0e0200115e7686",
        name: "Plats Cuisinés"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 46.016135225337315,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 62.50144361394685,
          stock: 974.0638238416601,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 51.35559950478819,
          stock: 317.8038921706061,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 68.74574955822294,
          stock: 801.500424027243,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 24.823057140581174,
          stock: 842.2838373656197,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 99.28558987830255,
          stock: 386.14992527018524,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 53.005254091052855,
          stock: 873.7984007532386,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 36.374468339714674,
          stock: 653.1268317016714,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65a44c8d19f2db0013bce05e",
      name: "CUISINE - Tajine 350",
      category: {
        id: "5f5b48fa8f0e0200115e7686",
        name: "Plats Cuisinés"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 84.99667219880283,
      inventoryStatus: "LOWSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 74.52510087569068,
          stock: 244.7660517821484,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 61.02732597442013,
          stock: 788.0096216951216,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 86.84446498835732,
          stock: 776.6639831114288,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 69.42936207319532,
          stock: 903.5390787533073,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 27.099933289542257,
          stock: 554.2070002657256,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 40.6649399367788,
          stock: 793.9807331388466,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 88.45843466276024,
          stock: 484.722124871372,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "65a44aa719f2db0013bcdfc0",
      name: "CUISINE - Soupe Chorba 36cl",
      category: {
        id: "5f5b49030d244100129fb3a2",
        name: "Soupes"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 59.85778754631379,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 31.386191481258898,
          stock: 711.7973262473228,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 23.17956659010676,
          stock: 397.68161334597016,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 36.19559890170842,
          stock: 876.5552500813038,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 47.18810172515251,
          stock: 161.51775857351035,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 6.079833112906097,
          stock: 244.06639244790628,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 47.795014389298316,
          stock: 409.81891006801783,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 52.58500455100958,
          stock: 470.5673412372224,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "659e75292a222b0013350278",
      name: "Kumquat 170g",
      category: {
        id: "5f5b490c7b9eaf00111db60c",
        name: "Agrumes"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 50.77250027617997,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 2.779649938915152,
          stock: 614.1362240334809,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 83.74631902991123,
          stock: 291.8200182989197,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 50.77361400686593,
          stock: 413.7273212347048,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 90.33350268972988,
          stock: 330.2537591893882,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 89.29628183603995,
          stock: 968.0049018779786,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 51.19623251362728,
          stock: 902.8319499041642,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 80.75655095919116,
          stock: 223.18203780022205,
          inventoryStatus: "LOWSTOCK"
        }
      ]
    },
    {
      sellable: false,
      id: "659e5c49078a230013f6cd2d",
      name: "CUISINE - Daube de sanglier 350g",
      category: {
        id: "5f5b48fa8f0e0200115e7686",
        name: "Plats Cuisinés"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 7.733113440156436,
      inventoryStatus: "INSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 99.0532391603562,
          stock: 666.9603924930607,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 4.870015533854288,
          stock: 232.3365299840603,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 93.13517420760078,
          stock: 847.7374682448764,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 68.32037658879166,
          stock: 892.2220087020974,
          inventoryStatus: "LOWSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 91.59403842137269,
          stock: 680.9242514972127,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 87.54716369902798,
          stock: 456.7228229781233,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 56.5090655527889,
          stock: 100.62868301482285,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    },
    {
      sellable: true,
      id: "6597fa9c2a222b00132c65f5",
      name: "Velouté de chou-fleur 75cl",
      category: {
        id: "5f5b4908be16900012db0502",
        name: "Accompagnements"
      },
      unitOfMeasure: {
        id: "5db9ce475a026300119e9db2",
        name: "unite"
      },
      price: 94.13898730839271,
      inventoryStatus: "OUTOFSTOCK",
      dataPerShop: [
        {
          shop: {
            id: 1,
            name: "Beaubourg"
          },
          price: 95.04317766817023,
          stock: 456.28489497050873,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 2,
            name: "Batignolles"
          },
          price: 81.48763045614069,
          stock: 118.5720607860119,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 3,
            name: "Chemin Vert"
          },
          price: 39.97407480764154,
          stock: 743.0957330215491,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 4,
            name: "Faidherbe"
          },
          price: 11.08511414722071,
          stock: 948.6379070700377,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 5,
            name: "Ordener"
          },
          price: 89.06539784801275,
          stock: 935.9636360556593,
          inventoryStatus: "INSTOCK"
        },
        {
          shop: {
            id: 6,
            name: "Chardon Lagache"
          },
          price: 77.82558702690383,
          stock: 976.5790099164556,
          inventoryStatus: "OUTOFSTOCK"
        },
        {
          shop: {
            id: 7,
            name: "Atelier"
          },
          price: 73.68880694434061,
          stock: 575.915740595206,
          inventoryStatus: "OUTOFSTOCK"
        }
      ]
    }
  ].map((p: Product) => ({ ...p, stock: p.dataPerShop.reduce((s, cur) => s + cur.stock, 0) }))

  #categories: CategoryFilter[] = [
    {
      key: "5f5b48febe16900012db04fd",
      label: "Divers",
      children: [
        {
          key: "5f5b49020d244100129fb3a1",
          label: "Recette"
        },
        {
          key: "5f5b49080d244100129fb3a7",
          label: "Digital"
        },
        {
          key: "5f5b49098f0e0200115e7696",
          label: "Notes de frais"
        },
        {
          key: "5f5b490e0d244100129fb3ab",
          label: "Transport a l' Achat"
        },
        {
          key: "63935a32067190001c362a2d",
          label: "Noël 2022"
        }
      ]
    },
    {
      key: "5f5b49018f0e0200115e768d",
      label: "Credit"
    },
    {
      key: "6272a607686f29001ab6eb96",
      label: "F&L",
      children: [
        {
          key: "5d8352f791f12500114b0132",
          label: "Fruits",
          children: [
            {
              key: "5f5b49048f0e0200115e7693",
              label: "Fruits a coques"
            },
            {
              key: "5f5b49051e0f2f00112cf09c",
              label: "Fruits a noyau",
              children: [
                {
                  key: "647db2d764b6550013f9d8d2",
                  label: "Avocats"
                },
                {
                  key: "647db2e3cfc0cf0013dfe6c7",
                  label: "Pêches"
                },
                {
                  key: "647db2f164b6550013f9db0e",
                  label: "Nectarines"
                },
                {
                  key: "647db2fa5d220700135946d1",
                  label: "Abricots"
                },
                {
                  key: "647db301cfc0cf0013dfe83d",
                  label: "Cerises"
                },
                {
                  key: "647db30e5d22070013594a2a",
                  label: "Autres fruits à noyau"
                },
                {
                  key: "647db3185d2207001359500a",
                  label: "Prunes"
                }
              ]
            },
            {
              key: "5f5b49061e0f2f00112cf09d",
              label: "Paniers fruits"
            },
            {
              key: "5f5b49071e0f2f00112cf09e",
              label: "Autres fruits a pepin",
              children: [
                {
                  key: "647db4f564b6550013fa205e",
                  label: "Melon"
                }
              ]
            },
            {
              key: "5f5b490abe16900012db0504",
              label: "Fruits exotiques"
            },
            {
              key: "5f5b490c7b9eaf00111db60c",
              label: "Agrumes",
              children: [
                {
                  key: "63ff885df2275300154bde34",
                  label: "Citrons"
                },
                {
                  key: "63ff8868d07cd70013cceb30",
                  label: "Oranges"
                },
                {
                  key: "63ff8871d07cd70013cceb3f",
                  label: "Autres Agrumes"
                },
                {
                  key: "63ff8879f2275300154be145",
                  label: "Clémentines"
                },
                {
                  key: "63ff8ac6d07cd70013cd2475",
                  label: "Mandarines"
                },
                {
                  key: "63ff8ad8d07cd70013cd27bb",
                  label: "Pomelos"
                }
              ]
            },
            {
              key: "5f5b49138f0e0200115e769e",
              label: "Petits fruits",
              children: [
                {
                  key: "64807fc56216960013c1812b",
                  label: "Fraises"
                }
              ]
            },
            {
              key: "61447a16d794cc001966ddad",
              label: "Pommes"
            },
            {
              key: "61447a2c0df21600193777ed",
              label: "Poires"
            },
            {
              key: "61447a3f734485001a278f35",
              label: "Raisins"
            },
            {
              key: "636282edf9648b00194abf33",
              label: "Fruits"
            },
            {
              key: "655b1c193ac48e0012a62706",
              label: "Fruits secs"
            }
          ]
        },
        {
          key: "5d8352fd91f12500114b0133",
          label: "Legumes",
          children: [
            {
              key: "5f5b49021e0f2f00112cf098",
              label: "Legumes Fruits",
              children: [
                {
                  key: "647db591cfc0cf0013e00b0e",
                  label: "Tomates"
                },
                {
                  key: "649d32a6088ff4001320f35e",
                  label: "Courgette"
                },
                {
                  key: "649d76242de08100147b3608",
                  label: "Ratatouille"
                }
              ]
            },
            {
              key: "5f5b49038f0e0200115e7691",
              label: "Cucurbitacees"
            },
            {
              key: "5f5b49051e0f2f00112cf09b",
              label: "Legumes racines",
              children: [
                {
                  key: "651eb6e64608fa0013d0f32c",
                  label: "Carottes"
                },
                {
                  key: "651eb6f6ae7c520012ebaabb",
                  label: "Radis"
                },
                {
                  key: "651eb70aae7c520012ebab05",
                  label: "Navets"
                },
                {
                  key: "651eb7287ecc6500132f6c62",
                  label: "Betteraves"
                },
                {
                  key: "651eb87a4608fa0013d0f987",
                  label: "Pomme de Terre"
                },
                {
                  key: "6544c73feae768001499448c",
                  label: "Patates douces"
                }
              ]
            },
            {
              key: "5f5b49057b9eaf00111db609",
              label: "Légumineuses"
            },
            {
              key: "5f5b49060d244100129fb3a3",
              label: "Bulbes",
              children: [
                {
                  key: "651eb6897ecc6500132f6a27",
                  label: "Bulbes en botte"
                }
              ]
            },
            {
              key: "5f5b49100d244100129fb3ad",
              label: "Champignons"
            },
            {
              key: "5f5b4910be16900012db050a",
              label: "Paniers legumes"
            },
            {
              key: "5f5b49118f0e0200115e769c",
              label: "Legumes Tiges"
            },
            {
              key: "5f5b49140d244100129fb3af",
              label: "Fines Herbes"
            },
            {
              key: "5f5b49140d244100129fb3b0",
              label: "Legume feuille"
            },
            {
              key: "5f5b49148f0e0200115e769f",
              label: "Tubercules"
            },
            {
              key: "5f5b49148f0e0200115e76a0",
              label: "Legumes Fleurs"
            },
            {
              key: "5f5b49158f0e0200115e76a1",
              label: "Legumes Tiges"
            },
            {
              key: "61447a05280ae8001a6ebd98",
              label: "Tomates"
            },
            {
              key: "61447a53280ae8001a6ebd99",
              label: "Salades"
            },
            {
              key: "6442b20323907e00156241e4",
              label: "Légumes - Atelier"
            },
            {
              key: "649eee9370246000137b60e9",
              label: "Choux"
            }
          ]
        }
      ]
    },
    {
      key: "6273d4a4f90e67001f9ad158",
      label: "Frais",
      children: [
        {
          key: "5f5b48f37b9eaf00111db603",
          label: "Charcuterie",
          children: [
            {
              key: "5f5b48f30d244100129fb397",
              label: "Choucroute"
            },
            {
              key: "5f5b48fa8f0e0200115e7685",
              label: "Poitrine"
            },
            {
              key: "5f5b48fb7b9eaf00111db606",
              label: "Pate terrine"
            },
            {
              key: "5f5b49060d244100129fb3a4",
              label: "Saucisse"
            },
            {
              key: "5f5b49078f0e0200115e7694",
              label: "Jambon Salaisons Decoupe"
            },
            {
              key: "5f9ab410ef12800012479b5f",
              label: "Charcuterie viande de chasse"
            },
            {
              key: "6226146187e0ca001b2abafd",
              label: "Saucissons et saucisses seches"
            },
            {
              key: "622a4ddcd1c9940013ff9aaf",
              label: "saucisson"
            },
            {
              key: "622f509da9ce7e00135f09a8",
              label: "Saucissons et saucisses seches"
            }
          ]
        },
        {
          key: "5f5b48f41e0f2f00112cf090",
          label: "Boucherie",
          children: [
            {
              key: "5f5b48f41e0f2f00112cf091",
              label: "Poulet"
            },
            {
              key: "5f5b48f4be16900012db04f5",
              label: "Oeuf"
            },
            {
              key: "5f5b48f50d244100129fb398",
              label: "Gibier"
            },
            {
              key: "5f5b48f67b9eaf00111db604",
              label: "Agneau"
            },
            {
              key: "5f5b48f6be16900012db04f8",
              label: "Veau"
            },
            {
              key: "5f5b48f98f0e0200115e7683",
              label: "Porc"
            },
            {
              key: "5f5b48f98f0e0200115e7684",
              label: "Boeuf",
              children: [
                {
                  key: "650b05eb644482001431684c",
                  label: "Piece du boucher"
                },
                {
                  key: "650b06620bbd9700121b6e8c",
                  label: "Morceau 2 cat"
                },
                {
                  key: "650b06a70bbd9700121b6ef6",
                  label: "Morceau 1 cat"
                },
                {
                  key: "650b0a280bbd9700121b73f6",
                  label: "abas"
                },
                {
                  key: "650b101e6444820014317574",
                  label: "Charcuterie de boeuf"
                }
              ]
            },
            {
              key: "60d0c3d79897d80017817467",
              label: "Canard"
            },
            {
              key: "60d0c4643467ef00185e24bd",
              label: "Dinde"
            }
          ]
        },
        {
          key: "5f5b48f71e0f2f00112cf092",
          label: "Boulangerie",
          children: [
            {
              key: "5f5b48f70d244100129fb399",
              label: "Galette des rois"
            },
            {
              key: "5f5b48f70d244100129fb39a",
              label: "Pain a la coupe"
            },
            {
              key: "5f5b49160d244100129fb3b1",
              label: "Pain tranche"
            },
            {
              key: "60c3421cbeb9e500110b07ab",
              label: "Pain entier"
            },
            {
              key: "654b882beae7680014a667bc",
              label: "Patisserie"
            },
            {
              key: "6581b1be17e1e20012f221f0",
              label: "Baguettes et flutes"
            },
            {
              key: "6581b29417e1e20012f222b6",
              label: "Pains festifs"
            }
          ]
        },
        {
          key: "5f5b48f88f0e0200115e7682",
          label: "Cremerie",
          children: [
            {
              key: "5f5b48f81e0f2f00112cf093",
              label: "Vache",
              children: [
                {
                  key: "5f5b48fc8f0e0200115e7688",
                  label: "Fromage blanc - faisselle"
                },
                {
                  key: "5f5b49008f0e0200115e768c",
                  label: "Desserts lactes - autres"
                },
                {
                  key: "652fac02fb708c001371d742",
                  label: "nature"
                },
                {
                  key: "655f538fcc968d0013f168df",
                  label: "Yaourt nature"
                },
                {
                  key: "65606889cc968d0013f45300",
                  label: "Fromage blanc"
                },
                {
                  key: "656069218f574a0012ee27a7",
                  label: "Creme"
                },
                {
                  key: "656069938f574a0012ee292b",
                  label: "Yaourt aux Fruits"
                },
                {
                  key: "656069c03ac48e0012b18b64",
                  label: "Yaourt a boire"
                },
                {
                  key: "65606a128f574a0012ee2b1c",
                  label: "Faisselle"
                },
                {
                  key: "65606ab58f574a0012ee2c6e",
                  label: "Lait"
                }
              ]
            },
            {
              key: "5f5b48fb0d244100129fb39e",
              label: "oeuf"
            },
            {
              key: "5f5b48fb8f0e0200115e7687",
              label: "Chevre"
            },
            {
              key: "5f5b48fc0d244100129fb39f",
              label: "Beurre et Creme",
              children: [
                {
                  key: "64ae7753a2f8d80014e69ed0",
                  label: "Beurre"
                },
                {
                  key: "65606f35cc968d0013f46461",
                  label: "Beurre"
                }
              ]
            },
            {
              key: "5f5b48fdbe16900012db04fb",
              label: "Brebis"
            },
            {
              key: "5f5b48fe8f0e0200115e7689",
              label: "Glace et Sorbet"
            },
            {
              key: "5f5b490dbe16900012db0507",
              label: "produits élaborés"
            }
          ]
        },
        {
          key: "5f5b490abe16900012db0503",
          label: "Fromages",
          children: [
            {
              key: "5f5b490a8f0e0200115e7697",
              label: "From. Chevre"
            },
            {
              key: "5f5b490f1e0f2f00112cf0a4",
              label: "From. Vache",
              children: [
                {
                  key: "651a85cf164bd0001260a5d7",
                  label: "Comte"
                },
                {
                  key: "651a86ac164bd0001260a6f6",
                  label: "Raclette"
                }
              ]
            },
            {
              key: "5f5b490fbe16900012db0509",
              label: "From. Brebis"
            },
            {
              key: "63693e72185ada001a49155d",
              label: "Fromages Italiens",
              children: [
                {
                  key: "658017c417e1e20012eb5a1d",
                  label: "Mozzarella"
                },
                {
                  key: "658017e517e1e20012eb5c53",
                  label: "Ricotta"
                },
                {
                  key: "658018052754150014eba986",
                  label: "Burrata"
                }
              ]
            }
          ]
        },
        {
          key: "5f5b490b8f0e0200115e7698",
          label: "Maree",
          children: [
            {
              key: "5f5b490b0d244100129fb3a9",
              label: "Poisson fume"
            },
            {
              key: "5f5b49158f0e0200115e76a2",
              label: "Coquillage Crustace"
            },
            {
              key: "5f5b4915be16900012db050b",
              label: "Poisson frais"
            },
            {
              key: "5f5b4916be16900012db050c",
              label: "Algue"
            }
          ]
        },
        {
          key: "654b5d70351adf0013698bc7",
          label: "Traiteur",
          children: [
            {
              key: "647db6d31aed98001448d7ec",
              label: "Sauces fraiches"
            },
            {
              key: "654b5d9d64f422001462289d",
              label: "Substituts végétaux"
            },
            {
              key: "654b5e7feae7680014a5d416",
              label: "Pates fraiches"
            },
            {
              key: "654b5ea0351adf0013698d9b",
              label: "Galettes et crêpes"
            }
          ]
        }
      ]
    },
    {
      key: "6273d4cc47e3e0001a5600ba",
      label: "Sec",
      children: [
        {
          key: "5f5b48f5be16900012db04f6",
          label: "Boissons",
          children: [
            {
              key: "5f5b48f58f0e0200115e7680",
              label: "Sirop"
            },
            {
              key: "5f5b48f5be16900012db04f7",
              label: "Jus de fruit"
            },
            {
              key: "5f5b48f6be16900012db04f9",
              label: "Cidre"
            },
            {
              key: "5f5b48f87b9eaf00111db605",
              label: "Alcool"
            },
            {
              key: "5f5b48f90d244100129fb39b",
              label: "Biere"
            },
            {
              key: "6298cf763da807001ba53524",
              label: "Boissons végétales"
            }
          ]
        },
        {
          key: "5f5b48fa0d244100129fb39c",
          label: "Cave",
          children: [
            {
              key: "5f5b48ff0d244100129fb3a0",
              label: "Vin rouge"
            },
            {
              key: "5f5b49028f0e0200115e7690",
              label: "Vin rosé"
            },
            {
              key: "5f5b49051e0f2f00112cf09a",
              label: "Vin pétillant"
            },
            {
              key: "5f5b49078f0e0200115e7695",
              label: "Vins blancs2"
            },
            {
              key: "611f9cb49a8094001357bafc",
              label: "Vin blanc"
            }
          ]
        },
        {
          key: "5f5b48fa1e0f2f00112cf094",
          label: "Epicerie sucree",
          children: [
            {
              key: "5f5b49080d244100129fb3a6",
              label: "Farine"
            },
            {
              key: "5f5b49081e0f2f00112cf09f",
              label: "Fruit sec & graine & noix"
            },
            {
              key: "5f5b490d1e0f2f00112cf0a3",
              label: "Biscuit"
            },
            {
              key: "5f5b490d8f0e0200115e769a",
              label: "The & cafe & tisane"
            },
            {
              key: "5f5b490e0d244100129fb3aa",
              label: "Compote & puree"
            },
            {
              key: "5f5b490e7b9eaf00111db60e",
              label: "Confiture - Chutney - Coulis"
            },
            {
              key: "5f5b490e8f0e0200115e769b",
              label: "Gateaux & Pain d'epices"
            },
            {
              key: "5f5b49168f0e0200115e76a3",
              label: "Sucre & confiserie & chocolat"
            },
            {
              key: "62b9da7e903ba1001ad15a2a",
              label: "Miel"
            },
            {
              key: "663a32152add2f0014567704",
              label: "Pop corn"
            }
          ]
        },
        {
          key: "5f5b49007b9eaf00111db607",
          label: "Epicerie salee",
          children: [
            {
              key: "5f5b4900be16900012db04ff",
              label: "Soupe"
            },
            {
              key: "5f5b49017b9eaf00111db608",
              label: "Pate Rillettes et Foie Gras"
            },
            {
              key: "5f5b49018f0e0200115e768f",
              label: "Legumineuse"
            },
            {
              key: "5f5b4906be16900012db0500",
              label: "Sauce",
              children: [
                {
                  key: "6638e8332add2f0014556e22",
                  label: "Sauces tomate"
                }
              ]
            },
            {
              key: "5f5b49070d244100129fb3a5",
              label: "Olive"
            },
            {
              key: "5f5b490a7b9eaf00111db60a",
              label: "Conserve & plat prepare"
            },
            {
              key: "5f5b490b7b9eaf00111db60b",
              label: "Huile & vinaigre",
              children: [
                {
                  key: "63ff8612f2275300154ba7ab",
                  label: "Huile Colza"
                },
                {
                  key: "63ff862c14bf9e00135a2f9b",
                  label: "Huile Olive"
                },
                {
                  key: "63ff8647d07cd70013ccb23b",
                  label: "Vinaigre"
                },
                {
                  key: "63ff86fdd07cd70013ccc806",
                  label: "Huile Tournesol"
                },
                {
                  key: "63ff87d1f2275300154bd28a",
                  label: "Autres huiles"
                }
              ]
            },
            {
              key: "5f5b490bbe16900012db0505",
              label: "Conserve poisson"
            },
            {
              key: "5f5b490c1e0f2f00112cf0a2",
              label: "Blinis"
            },
            {
              key: "5f5b490f7b9eaf00111db60f",
              label: "Pates riz",
              children: [
                {
                  key: "6638e7e2be7a650013142aff",
                  label: "Pates"
                }
              ]
            },
            {
              key: "5f5b49130d244100129fb3ae",
              label: "Legume seche"
            },
            {
              key: "5f5b49138f0e0200115e769d",
              label: "Epice & condiment"
            },
            {
              key: "5f5b4916be16900012db050d",
              label: "Vrac",
              children: [
                {
                  key: "62558c9ea5447a00146bc759",
                  label: "Vrac"
                }
              ]
            },
            {
              key: "61c333f1f3d8d1001a823e7b",
              label: "Céréales et graines"
            },
            {
              key: "623c3f206c2e47001294d427",
              label: "Biscuits sales"
            },
            {
              key: "62c563c25c81420014afcbca",
              label: "Légumes transformés"
            },
            {
              key: "663a31e064aa85001330f7fd",
              label: "Chips"
            }
          ]
        }
      ]
    },
    {
      key: "6273d50d686f29001ab9a169",
      label: "FM",
      children: [
        {
          key: "5f5b48f78f0e0200115e7681",
          label: "Cuisine fait maison",
          children: [
            {
              key: "5f5b48f7be16900012db04fa",
              label: "Sandwichs/Quiches"
            },
            {
              key: "5f5b48fa8f0e0200115e7686",
              label: "Plats Cuisinés"
            },
            {
              key: "5f5b48fdbe16900012db04fc",
              label: "Entrées"
            },
            {
              key: "5f5b48ff1e0f2f00112cf096",
              label: "Dessert (obsolète)"
            },
            {
              key: "5f5b48ff8f0e0200115e768b",
              label: "Box du Jour"
            },
            {
              key: "5f5b4900be16900012db04fe",
              label: "Menu et Midi TVA10%"
            },
            {
              key: "5f5b49030d244100129fb3a2",
              label: "Soupes"
            },
            {
              key: "5f5b49038f0e0200115e7692",
              label: "Pain"
            },
            {
              key: "5f5b490fbe16900012db0508",
              label: "Salades composées"
            },
            {
              key: "5fdc891bef8ca50018cbd2fa",
              label: "Dessert"
            },
            {
              key: "6047f03c670be800125b131c",
              label: "Gratins/ flans"
            },
            {
              key: "648c458f640c3b0014d33ca8",
              label: "Autres"
            }
          ]
        },
        {
          key: "60d0c0f69897d80017817466",
          label: "Ingrédients Fait Maison",
          children: [
            {
              key: "5fad7eb530dc260011d36b9e",
              label: "Ingrédients Cuisine"
            }
          ]
        }
      ]
    }
  ]
}