import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProductService {
  #products = [
    {
      id: "666ac20b852d0d0013fd5c8a",
      name: "CUISINE - Chausson du jour 200g"
    },
    {
      id: "666ab73c852d0d0013fd41c2",
      name: "CUISINE - Quiche du jour 200g"
    },
    {
      id: "66699c7257726c00130f5cb5",
      name: "CUISINE - Tourte à la viande 200g"
    },
    {
      id: "66698920852d0d0013fc5766",
      name: "Demi chou pointu"
    },
    {
      id: "6663f4f4dc5fb30012f1a056",
      name: "CUISINE - Salmorejo 36cl"
    },
    {
      id: "6663216157726c00130b31bb",
      name: "Cressonette"
    },
    {
      id: "66631d84852d0d0013f837ea",
      name: "CUISINE - Gaspacho de tomate 36cl"
    },
    {
      id: "666185ec852d0d0013f6fece",
      name: "Orange cadeau FID"
    },
    {
      id: "66589bdbbe7a6500132acfd5",
      name: "Pain de mie Artisan Gregoire"
    },
    {
      id: "66583e808e6be00014d28639",
      name: "Parmesan 18 mois  portion 200g"
    },
    {
      id: "66582af6f865150014a4553d",
      name: "Fraise 2 barquettes"
    },
    {
      id: "6650c203be7a65001324e6a2",
      name: "CUISINE - Clafoutis aux cerises 130g"
    },
    {
      id: "664f3edabe7a65001323da74",
      name: "CUISINE - Riz de Camargue et boulettes de viande 350g"
    },
    {
      id: "664f3e4ff8651500149dff11",
      name: "CUISINE - Viande et légumes de saison 350g"
    },
    {
      id: "664f0a61be7a65001323a089",
      name: "Artichaut Camus pièce"
    },
    {
      id: "66478b24be7a6500131eb2ee",
      name: "CUISINE - Curry poisson 350g"
    },
    {
      id: "66475e498e6be00014c6b6d5",
      name: "Cidre brut 75cl PACORY"
    },
    {
      id: "66474e0c8e6be00014c6a620",
      name: "Cerise Extra 400g"
    },
    {
      id: "6639e472be7a65001314dd24",
      name: "Kefir 2x125g ALCAS"
    },
    {
      id: "663397a12add2f0014509d69",
      name: "Chips sel de Camargue 125g Family"
    },
    {
      id: "6633951cbe7a6500130f5116",
      name: "Pop-corn sucré 80g Family"
    },
    {
      id: "6633918364aa8500132b1138",
      name: "Pop-corn salé 60g Family"
    },
    {
      id: "66310b1f2add2f00144e8786",
      name: "Chips herbes de Provence 125g Family"
    },
    {
      id: "663109dd52b98c0012d8208d",
      name: "Chips ondulees 125g Family"
    },
    {
      id: "6630b1b852b98c0012d71cc3",
      name: "Comté AOP Jeune - portion 200g"
    },
    {
      id: "6627bf7331efa10012d9bd16",
      name: "Pesto rosso 130 g - Sauces papillon"
    },
    {
      id: "6626149252b98c0012c9f5d5",
      name: "Mini moules à cakes - Marron - L 11 x P 7 x H 4 cm"
    },
    {
      id: "66226222375c590013b68475",
      name: "Ail nouveau pièce"
    },
    {
      id: "66225dab52b98c0012c7b502",
      name: "Buchette chevre sèche 150g RONDEA"
    },
    {
      id: "661e7e5a31efa10012cf6310",
      name: "Confiture de fraise 350 g"
    },
    {
      id: "6618fcac31efa10012ca538b",
      name: "Cerneaux de noix declasses CUISINE"
    },
    {
      id: "6618fba1375c590013ad992a",
      name: "Cerneaux invalides 1er choix"
    },
    {
      id: "6618fb7631efa10012ca51ee",
      name: "Cerneaux - moitiés extra"
    },
    {
      id: "6614ff9d52b98c0012bb3cf0",
      name: "Biere L'aube 33 cl - D&D"
    },
    {
      id: "6614fd99375c590013aa1b55",
      name: "Biere Mission Pale Ale 33 cl - D&D"
    },
    {
      id: "6614f9e631efa10012c6d0a7",
      name: "Biere IPA 33 cl - D&D"
    },
    {
      id: "66140b7152b98c0012ba6fb9",
      name: "Biere D Pilsner 33 cl - D&D"
    },
    {
      id: "65f977bde83cb1001452b077",
      name: "Truite fumée Arc-en-ciel 4T"
    },
    {
      id: "65ef05c81a01e000134505d7",
      name: "CUISINE - Flan salé poisson 350g"
    },
    {
      id: "65ef05474678ab0014017a00",
      name: "CUISINE - Salade de crudités et poisson fumé 180g"
    },
    {
      id: "65eeb8d21a01e0001344b5ed",
      name: "Pomme Mandy"
    },
    {
      id: "65e878984678ab0014fbb117",
      name: "Pate blanche farfalle 500g Iris"
    },
    {
      id: "65e8783f1a01e000133f32e3",
      name: "Pate blanche linguine 500g Iris"
    },
    {
      id: "65e877c783433a001499e4ab",
      name: "Pate blanche spaghetti 500g Iris"
    },
    {
      id: "65e877834678ab0014fbaf23",
      name: "Pate blanche penne 500g Iris"
    },
    {
      id: "65e877274678ab0014fbae3e",
      name: "Pate blanche fusilli 500g Iris"
    },
    {
      id: "65e876b61a01e000133f3041",
      name: "Pate blanche maccheroni 500g Iris"
    },
    {
      id: "65e875b74678ab0014fbac55",
      name: "Puree de tomate 690g Iris"
    },
    {
      id: "65e8756f83433a001499e0e8",
      name: "Pulpe de tomate epicee 340g Iris"
    },
    {
      id: "65e8752483433a001499e0a0",
      name: "Pulpe de tomate et basilic 340g Iris"
    },
    {
      id: "65e874a11a01e000133f2d91",
      name: "Pulpe de tomate aux legumes 340g Iris"
    },
    {
      id: "65e874251a01e000133f2ce8",
      name: "Pulpe de tomate 340g Iris"
    },
    {
      id: "65e04e2444a544001354d313",
      name: "Kiwi par 8"
    },
    {
      id: "65de0c4644a54400135317a3",
      name: "Vin rouge - Chaponniere - Domaine Ninot"
    },
    {
      id: "65ddcdf6824d0600134a6ef7",
      name: "Yaourt vache nature demi-ecreme 125g FROMENTEL"
    },
    {
      id: "65ddc84b9b58a200135ae2b2",
      name: "Truite fumée du Cathare 4 T"
    },
    {
      id: "65d778af44a54400134c62f5",
      name: "CUISINE - Viande sautée, riz et légumes de saison 350g"
    },
    {
      id: "65d777ca9b58a20013549c23",
      name: "CUISINE - Poisson blanc, riz aux petits légumes et crème citronnée 350g"
    },
    {
      id: "65d6140b824d06001342481f",
      name: "Radis botte multicolore"
    },
    {
      id: "65d4ba009b58a2001351a25e",
      name: "CUISINE - Poêlée de pommes de terre et viande 350g"
    },
    {
      id: "65d4b83244a5440013496ac0",
      name: "Farine ble T55 kg"
    },
    {
      id: "65d36dc644a54400134833a4",
      name: "Bleu Alcas"
    },
    {
      id: "65d365ed824d0600133fdbb0",
      name: "Allumettes fumées CHB OPP"
    },
    {
      id: "65cf753c020e580013c825d2",
      name: "Avocat Corse 2 pièce"
    },
    {
      id: "65cf72db368e9e0012d45c8d",
      name: "Avocat Corse piece"
    },
    {
      id: "65cf7078368e9e0012d45938",
      name: "Avocat Corse"
    },
    {
      id: "65ce84944131880013f70b09",
      name: "CUISINE - Pâtes et boulettes de viande 350g"
    },
    {
      id: "65ce8297368e9e0012d34459",
      name: "CUISINE - Crémeux café 150"
    },
    {
      id: "65ce810b4131880013f70975",
      name: "CUISINE - Potée de lentilles végétarienne 350g"
    },
    {
      id: "65ce7fba4131880013f70907",
      name: "CUISINE - Salade de petit épeautre 180g"
    },
    {
      id: "65ce7ea74131880013f708a2",
      name: "CUISINE - Légumes de saison rôtis et riz de Camargue 350g"
    },
    {
      id: "65ccc2fb368e9e0012d19c00",
      name: "CUISINE - Rillettes de poisson 180g"
    },
    {
      id: "65cb45a1368e9e0012d060bd",
      name: "Grain 75cl - Domaine de la Monardière"
    },
    {
      id: "65c646ba020e580013c00f4b",
      name: "Yaourt Brassé aux Fruits 500g FROMENTEL"
    },
    {
      id: "65c6458d368e9e0012cc35ef",
      name: "Yaourt Brassé Nature 500g FROMENTEL"
    },
    {
      id: "65c643a0020e580013c00aa8",
      name: "Yaourt à boire 250g FROMENTEL"
    },
    {
      id: "65c4b990c9b03f001342abf6",
      name: "Demi chou de Milan"
    },
    {
      id: "65c4b76d519d25001399ec9a",
      name: "Demi chou lisse"
    },
    {
      id: "65c3b944d825a80012dfc751",
      name: "Velouté de lentilles corail et carottes 75c"
    },
    {
      id: "65bcc463519d2500138f8ef3",
      name: "Demi Baguette sesame pour SANDWICH"
    },
    {
      id: "65bcb80ac9b03f001338374e",
      name: "Pot Verre 190 ml WC000039 x3549"
    },
    {
      id: "65ba65da519d2500138bd813",
      name: "Huile Tournesol 50 cl - Ursule"
    },
    {
      id: "65ba555b519d2500138ba69f",
      name: "Crepe garnie"
    },
    {
      id: "65b8df6bc9b03f001332b35b",
      name: "CUISINE - Galette farcie végétarienne 350"
    },
    {
      id: "65b8deb0c9b03f001332b1a1",
      name: "CUISINE - Galette farcie 350g"
    },
    {
      id: "65b8dca0519d25001389f29c",
      name: "Quinoa 500g - AP"
    },
    {
      id: "65b2a2b98c8a130013e3d8f5",
      name: "CUISINE - Boudin aux pommes et purée 350g"
    },
    {
      id: "65b0f0403ef71400134ee2cf",
      name: "Tomme fermière de montagne OPP"
    },
    {
      id: "65b0d31b3ef71400134ec677",
      name: "Pesto Frais Roquette 160g - Sauces Papillon"
    },
    {
      id: "65af75ccbb23a50014b29da7",
      name: "CUISINE - Cake aux amandes 120g"
    },
    {
      id: "65a8ddc742423c0013bfb263",
      name: "CUISINE - Flan dessert 150g"
    },
    {
      id: "65a45cf542423c0013b8d4f2",
      name: "CUISINE - Pâtes à la viande 350g"
    },
    {
      id: "65a459d742423c0013b8d3b0",
      name: "CUISINE - Blanquette traditionnelle 350g"
    },
    {
      id: "65a4551842423c0013b8d30a",
      name: "CUISINE - Potée de choux & cochonnaille 350"
    },
    {
      id: "65a44f506fd64e00137318c2",
      name: "CUISINE - Tajine végétarien 350g"
    },
    {
      id: "65a44c8d19f2db0013bce05e",
      name: "CUISINE - Tajine 350"
    },
    {
      id: "65a44aa719f2db0013bcdfc0",
      name: "CUISINE - Soupe Chorba 36cl"
    },
    {
      id: "659e75292a222b0013350278",
      name: "Kumquat 170g"
    },
    {
      id: "659e5c49078a230013f6cd2d",
      name: "CUISINE - Daube de sanglier 350g"
    },
    {
      id: "6597fa9c2a222b00132c65f5",
      name: "Velouté de chou-fleur 75cl"
    }
  ]

  products$ = new BehaviorSubject(this.#products)
}