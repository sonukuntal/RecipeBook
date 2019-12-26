import { Action } from "@ngrx/store";
import { ingredient } from "../../shared/ingredient.model";

export const ADD_INGREDIENT = "[shooping list] addIngredient";
export const ADD_INGREDIENTS = "[shooping list] addIngredients";
export const UPDATE_INGREDIENT = "[shooping list] updateIngredient";
export const DELETE_INGREDIENT = "[shooping list] deleteIngredient";
export const START_EDIT = "[shooping list] startEdit";
export const STOP_EDIT = "[shooping list] stopEdit";

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: ingredient) {}
}
export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: ingredient[]) {}
}
export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload:ingredient) {}
}
export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
  constructor(public payload: number) {}
}

export class StartEdit implements Action {
  readonly type = START_EDIT;
  constructor(public payload:number){}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}
export type shoopingListAction =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;
