import { Action } from "@ngrx/store";
import { Recipe } from "../Recipe.model";

const SET_RECIPE = "[recipe] setRecipe";

export class SetRecipe implements Action {
  readonly type = SET_RECIPE;
  constructor(public payload: Recipe[]) {}
}

export type RecipeAction = SetRecipe;
