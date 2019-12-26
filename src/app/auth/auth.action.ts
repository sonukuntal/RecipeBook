export { Action } from "@ngrx/store";

export const LOGIN = "[auth] login";
export const LOGOUT = "[auth] logout";

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: {
    email:string, 
    userID:string, 
    token:string, 
    expirationDate:Date
  }) {}
}
export class Logout implements Action {
  readonly type=LOGOUT;
}
export type AuthActions=Login|Logout;
