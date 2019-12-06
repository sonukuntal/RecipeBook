import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject, BehaviorSubject } from "rxjs";
import {Router} from '@angular/router';

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
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer:any;

  constructor(private httpclient: HttpClient, private router:Router) {}

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
    this.autologout(+expiresIn * 1000)
    localStorage.setItem("userData", JSON.stringify(user));
  }

  private autologin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration=new Date(userData._tokenExpirationDate).getTime()-new Date().getTime();
      this.autologout(expirationDuration);
    }
  }

  private logout()
  {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer)
    {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer=null;
  }

  private autologout(expirationduration:number)
  {
   this.tokenExpirationTimer= setTimeout(()=>{
      this.logout();
    },expirationduration)
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
