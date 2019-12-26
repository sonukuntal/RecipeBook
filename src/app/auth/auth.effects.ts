import { Actions, ofType, Effect } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { switchMap, catchError, tap,map } from "rxjs/operators";
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

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(authActions.LOGIN_START),
    switchMap((authData: authActions.LoginStart) => {
      return this.httpclient
        .post<AuthServiceData>(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBhlzDDpekDk7sH0Yw91GNEKYTAPkse3ds",
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(map((resData) => {
            const expirationDate = new Date(
              new Date().getTime() + +resData.expiresIn * 1000
            );
            return new authActions.Login({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate: expirationDate
            });
          }),
          catchError(errorres => {
            let errorMsg = "An unknown error occured";
            if (!errorres.error || !errorres.error.error) {
              return of(new authActions.LoginFail(errorMsg));
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
            return of(new authActions.LoginFail(errorMsg));
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(authActions.LOGIN),
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
