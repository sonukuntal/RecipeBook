import { Action } from "@ngrx/store";

export const LOGIN_START = "[auth] loginstart";
export const LOGIN = "[auth] login";
export const LOGOUT = "[auth] logout";
export const LOGIN_FAIL = "[auth] LoginFail";

export class Login implements Action {
  readonly type = LOGIN;
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

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public payload: string) {}
}
export type AuthActions = Login | Logout | LoginStart | LoginFail;
