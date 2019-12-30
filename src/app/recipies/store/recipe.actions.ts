import { Action } from "@ngrx/store";
import { Recipe } from "../Recipe.model";

export const SET_RECIPE = "[recipies] SetRecipe";
export const FETCH_RECIPE = "[recipies] FetchRecipe";
export const ADD_RECIPE = "[recipies] AddRecipe";
export const UPDATE_RECIPE = "[recipies] UpdateRecipe";
export const DELETE_RECIPE = "[recipies] DeleteRecipe";

export class SetRecipe implements Action {
  readonly type = SET_RECIPE;
  constructor(public payload: Recipe[]) {}
}

export class FetchRecipe implements Action {
  readonly type = FETCH_RECIPE;
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload:Recipe){}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;
  constructor(public payload:{index: number, recipe: Recipe}){}
}
export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;
  constructor(public payload:number){}
}


export type RecipeAction = SetRecipe|FetchRecipe|AddRecipe|UpdateRecipe|DeleteRecipe;
