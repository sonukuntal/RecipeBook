import { ingredient } from "../../shared/ingredient.model";
import * as shoopinglistaction  from './shooping-list.actions';

const initialstate = {
  ingredients: [new ingredient("Banana", 10), new ingredient("Apple", 20)]
};

export function ShoopingListReducer(state = initialstate, action: shoopinglistaction.shoopingListAction) {
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
