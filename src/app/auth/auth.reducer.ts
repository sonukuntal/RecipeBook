import { Store } from "@ngrx/Store";
import { User } from "./user.model";
import * as AuthActions from "./auth.action";

export interface State {
  user: User;
}

const initialState: State = {
  user: null
};

export function AuthReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.LOGIN:
      const newuser = new User(
        action.payload.email,
        action.payload.userID,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user:newuser
      };

    case AuthActions.LOGOUT: {
      return {
        ...state,
        user:null
      };
    }

    default:
      return state;
  }
  return state;
}
