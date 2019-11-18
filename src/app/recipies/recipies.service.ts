import { Injectable,EventEmitter } from '@angular/core';
import {Recipe} from './Recipe.model';
import {ingredient} from '../shared/ingredient.model';
import {ShoopingListService} from '../shooping-list/shooping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipiesService {
  recipeChange=new Subject<Recipe[]>();

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

  setRecipe(rec:Recipe[])
  {
   this.recipies=rec;
   this.recipeChange.next(this.recipies.slice());
  }

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

  addnewRecipie(recipe:Recipe)
  {
   this.recipies.push(recipe);
   this.recipeChange.next(this.recipies.slice());
  }

  updateRecipe(index:number,recipe:Recipe)
  {
   this.recipies[index]=recipe;
   this.recipeChange.next(this.recipies.slice());
  }

  deleteRecipe(index:number)
  {
    this.recipies.splice(index,1);
    this.recipeChange.next(this.recipies.slice());
  }

}