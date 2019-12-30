import { Action } from "@ngrx/store";
import { Recipe } from "../Recipe.model";

export const SET_RECIPE = "[recipies] SetRecipe";

export class SetRecipe implements Action {
  readonly type = SET_RECIPE;
  constructor(public payload: Recipe[]) {}
}


export type RecipeAction = SetRecipe;
