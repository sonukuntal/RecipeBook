import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject } from "rxjs";

import { User } from "./user.model";

export interface AuthServiceData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  user = new Subject<User>();

  constructor(private httpclient: HttpClient) {}

  signup(email: string, pass: string) {
    return this.httpclient
      .post<AuthServiceData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBhlzDDpekDk7sH0Yw91GNEKYTAPkse3ds",
        {
          email: email,
          password: pass,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthenticated(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, pass: string) {
    return this.httpclient
      .post<AuthServiceData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBhlzDDpekDk7sH0Yw91GNEKYTAPkse3ds",
        {
          email: email,
          password: pass,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthenticated(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  private handleAuthenticated(
    email: string,
    userID: string,
    token: string,
    expiresIn: Number
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userID, token, expirationDate);
    this.user.next(user);
  }

  private handleError(errorres: HttpErrorResponse) {
    let errorMsg = "An unknown error occured";
    if (!errorres.error || !errorres.error.error) {
      return throwError(errorMsg);
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
    return throwError(errorMsg);
  }
}
