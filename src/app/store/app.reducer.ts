import { ActionReducerMap } from "@ngrx/Store";
import * as fromshoopingList from "../shooping-list/Store/shooping-list.reducer";
import * as fromAuth from "../auth/auth.reducer";

export interface AppState {
  shoopinglist: fromshoopingList.State;
  auth: fromAuth.State;
}

export const AppReducer: ActionReducerMap<AppState> = {
  shoopinglist:fromshoopingList.ShoopingListReducer,
  auth:fromAuth.AuthReducer
};
