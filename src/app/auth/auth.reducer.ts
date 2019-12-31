import { Store } from "@ngrx/Store";
import { User } from "./user.model";
import * as AuthActions from "./auth.action";

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
};

export function AuthReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const newuser = new User(
        action.payload.email,
        action.payload.userID,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        authError: null,
        user: newuser,
        loading: false
      };

    case AuthActions.SIGNUP_START:
      const signupuser = new User(action.payload.email,action.payload.userID,action.payload.token,);
      return {
        ...state,
        authError: null,
        user: signupuser,
        loading: false
      };

    case AuthActions.LOGOUT: {
      return {
        ...state,
        user: null,
        loading: false
      };
    }

    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true
      };

    case AuthActions.AUTHENTICATE_FAILURE:
      return {
        ...state,
        user: null,
        loading: false,
        authError: action.payload
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      };

    default:
      return state;
  }
  return state;
}
