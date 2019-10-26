import { Injectable,EventEmitter } from '@angular/core';
import {Recipe} from './Recipe.model';
import {ingredient} from '../shared/ingredient.model';
import {ShoopingListService} from '../shooping-list/shooping-list.service';

@Injectable()
export class RecipiesService {
  selectedrecipe=new EventEmitter<Recipe>();

  recipies:Recipe[]=[
  new Recipe('Test Recipe','Recipe is awesome for eating and server',
  'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.826.620.suffix/1537973085542.jpeg',
  [new ingredient('meat',2),
   new ingredient('french fries',4)
  ]
  ),
new Recipe('Test Recipe','Recipe is awesome for eating and server',
  'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.826.620.suffix/1537973085542.jpeg',
  [new ingredient('beans',2),
   new ingredient('mushroom',4)
  ]
  )];

  constructor(private shoopingListService:ShoopingListService) { }

  getrecipie()
  {
    return this.recipies.slice();
  }
  getrecipies(id:number)
  {
   return this.recipies[id];
  }

  addingredientstoshoopinglist(ingrdt:ingredient[])
  {
    this.shoopingListService.addnewingredients(ingrdt);
  }

}