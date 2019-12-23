import { Action } from "@ngrx/store";
import { ingredient } from "../../shared/ingredient.model";

export const ADD_INGREDIENT='ADD_INGREDIENT';

export class AddIngredient implements Action 
{
readonly type =ADD_INGREDIENT;
constructor(public payload:ingredient){}
}
