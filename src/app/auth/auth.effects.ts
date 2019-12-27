import { Actions, ofType, Effect } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { switchMap, catchError, tap, map } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";
import * as authActions from "./auth.action";
import { HttpClient } from "@angular/common/http";

export interface AuthServiceData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  localId: string,
  idToken: string
) => {
  const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
  return new authActions.AuthenticateSuccess({
    email: email,
    userID: localId,
    token: idToken,
    expirationDate: expirationDate
  });
};

const handleError = (errorres: any) => {
  let errorMsg = "An unknown error occured";
  if (!errorres.error || !errorres.error.error) {
    return of(new authActions.AuthenticateFailure(errorMsg));
  }
  switch (errorres.error.error.message) {
    case "EMAIL_EXISTS":
      errorMsg = "EmailId already exist in database";
      break;
    case "EMAIL_NOT_FOUND":
      errorMsg = "EmailId already doesn't exist in database";
      break;
    case "INVALID_PASSWORD":
      errorMsg = "Wrong password entered";
      break;
    case "USER_DISABLED":
      errorMsg = "This account is not active";
      break;
  }
  return of(new authActions.AuthenticateFailure(errorMsg));
};

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(authActions.SIGNUP_START),
    switchMap((signupActions: authActions.SignupStart) => {
      return this.httpclient
        .post<AuthServiceData>(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBhlzDDpekDk7sH0Yw91GNEKYTAPkse3ds",
          {
            email: signupActions.payload.email,
            password: signupActions.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          map(resData => {
            handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            );
          }),
          catchError(errorres => {
            return handleError(errorres);
          })
        );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(authActions.LOGIN_START),
    switchMap((authData: authActions.LoginStart) => {
      return this.httpclient
        .post<AuthServiceData>(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBhlzDDpekDk7sH0Yw91GNEKYTAPkse3ds",
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          map(resData => {
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            );
          }),
          catchError(errorres => {
            return handleError(errorres);
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(authActions.AUTHENTICATE_SUCCESS,authActions.LOGOUT),
    tap(() => {
      this.router.navigate(["/"]);
    })
  );
  constructor(
    private actions$: Actions,
    private httpclient: HttpClient,
    private router: Router
  ) {}
}
