import { ActionReducerMap } from "@ngrx/Store";
import * as fromshoopingList from "../shooping-list/Store/shooping-list.reducer";
import * as fromAuth from "../auth/auth.reducer";
import * as fromRecipe from "../recipies/store/recipe.reducer";

export interface AppState {
  shoopinglist: fromshoopingList.State;
  auth: fromAuth.State;
  recipies: fromRecipe.State;
}

export const AppReducer: ActionReducerMap<AppState> = {
  shoopinglist: fromshoopingList.ShoopingListReducer,
  auth: fromAuth.AuthReducer,
  recipies: fromRecipe.RecipeReducer
};
