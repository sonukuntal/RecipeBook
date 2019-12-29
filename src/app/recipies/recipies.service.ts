import { Injectable, EventEmitter } from "@angular/core";
import { Recipe } from "./Recipe.model";
import { ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";
import { Store } from "@ngrx/store";
import * as shoopinglistaction from "../shooping-list/Store/shooping-list.actions";
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipiesService {
  recipeChange = new Subject<Recipe[]>();
  private recipies: Recipe[] = [];

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  setRecipe(rec: Recipe[]) {
    this.recipies = rec;
    this.recipeChange.next(this.recipies.slice());
  }

  getrecipie() {
    return this.recipies.slice();
  }
  getrecipies(id: number) {
    return this.recipies[id];
  }

  addingredientstoshoopinglist(ingrdt: ingredient[]) {
     //this.shoopingListService.addnewingredients(ingrdt);
    this.store.dispatch(new shoopinglistaction.AddIngredients(ingrdt));
  }

  addnewRecipie(recipe: Recipe) {
    this.recipies.push(recipe);
    this.recipeChange.next(this.recipies.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipies[index] = recipe;
    this.recipeChange.next(this.recipies.slice());
  }

  deleteRecipe(index: number) {
    this.recipies.splice(index, 1);
    this.recipeChange.next(this.recipies.slice());
  }
}
