import { Action } from "@ngrx/store";

export const LOGIN_START = "[auth] loginstart";
export const AUTHENTICATE_SUCCESS = "[auth] login";
export const LOGOUT = "[auth] logout";
export const AUTHENTICATE_FAILURE = "[auth] LoginFail";
export const SIGNUP_START = "[auth] SignupStart";
export const CLEAR_ERROR="[auth] ClearError"

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
  constructor(
    public payload: {
      email: string;
      userID: string;
      token: string;
      expirationDate: Date;
    }
  ) {}
}
export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticateFailure implements Action {
  readonly type = AUTHENTICATE_FAILURE;
  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class ClearError implements Action{
  readonly type=CLEAR_ERROR;
}

export type AuthActions =
  | AuthenticateSuccess
  | Logout
  | LoginStart
  | AuthenticateFailure
  | SignupStart
  | ClearError;
