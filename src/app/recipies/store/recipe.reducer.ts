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

    default:
      return state;
  }
}
