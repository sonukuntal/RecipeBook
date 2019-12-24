import { ingredient } from "../../shared/ingredient.model";
import * as shoopinglistaction  from './shooping-list.actions';

export interface State{
  ingredients:ingredient[],
  editIngredient,
  editIngredientIndex
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
    };

    case shoopinglistaction.ADD_INGREDIENTS:
    return {
      ...state,
      ingredients:[...state.ingredients,...action.payload]
    };

    case shoopinglistaction.UPDATE_INGREDIENT:
    const ingredient=state.ingredients[state.editIngredientIndex];
    const updatedingredient={
      ...ingredient,
      ...action.payload
    };
    const updatedingredients=[...state.ingredients];
    updatedingredients[state.editIngredientIndex]=updatedingredient;
    return {
      ...state,
      ingredients:updatedingredients,
      editIngredient:null,
      editIngredientIndex:-1
    };

    case shoopinglistaction.DELETE_INGREDIENT:
    return {
      ...state,
      ingredients:state.ingredients.filter((ig,igIndex)=>{
      return igIndex!==state.editIngredientIndex;
      }),
      editIngredient:null,
      editIngredientIndex:-1
    };

    case shoopinglistaction.START_EDIT:
    return{
      ...state,
      editIngredientIndex:action.payload,
      editIngredient:{...state.ingredients[action.payload]}
    }

    case shoopinglistaction.STOP_EDIT:
    return{
      ...state,
      editIngredientIndex:-1,
      editIngredient:null
    }

    default:
    return state;
  }
}
