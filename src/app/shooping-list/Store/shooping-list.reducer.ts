import { ingredient } from "../../shared/ingredient.model";
import * as shoopinglistaction  from './shooping-list.actions';

export interface State{
  ingredients:ingredient[],
  editIngredient,
  editIngredientIndex
}

export interface AppState
{
  shoopingList:State;
}

const initialstate:State = {
  ingredients: [new ingredient("Banana", 10), new ingredient("Apple", 20)],
  editIngredient:null,
  editIngredientIndex:-1
};

export function ShoopingListReducer(state:State = initialstate, action: shoopinglistaction.shoopingListAction) {
  switch (action.type) {
    case shoopinglistaction.ADD_INGREDIENT:
    return {
      ...state,
      ingredients:[...state.ingredients,action.payload]
    }

    case shoopinglistaction.ADD_INGREDIENTS:
    return {
      ...state,
      ingredients:[...state.ingredients,...action.payload]
    }
    default:
    return state;
  }
}
