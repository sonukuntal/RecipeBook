import { Recipe } from "../Recipe.model";
import * as RecipeAction from "./recipe.actions";

export interface State {
  recipies: Recipe[];
}
const initialState: State = {
  recipies: []
};
export function RecipeReducer(
  state = initialState,
  action: RecipeAction.RecipeAction
) {
  switch (action.type) {
    case RecipeAction.SET_RECIPE:
      return {
        ...state,
        recipies: [...action.payload]
      };

      case RecipeAction.ADD_RECIPE:
      return {
        ...state,
        recipies: [...state.recipies,action.payload]
      };

      case RecipeAction.UPDATE_RECIPE:
      const updatedRecipe={...state.recipies[action.payload.index],...action.payload.recipe};
      const updatedRecipies={...state.recipies};
      updatedRecipies[action.payload.index]=updatedRecipe;
      return {
        ...state,
        recipies: updatedRecipies
      };

      case RecipeAction.DELETE_RECIPE:
      return {
        ...state,
        recipies:state.recipies.filter((recipe,index)=>{
          return index!== action.payload;
        })
      };
  
    default:
      return state;
  }
}
