import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

export interface AuthServiceData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable()
export class AuthService {
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
        catchError(errorres => {
          let errorMsg = "An unknown error occured";
          if(!errorres.error||!errorres.error.error)
          {
            return throwError(errorMsg);
          }
          switch (errorres.error.error.message) {
            case "EMAIL_EXISTS":
              errorMsg = "EmailId already exist in database";
          }
          return throwError(errorMsg);
        })
      );
  }
}
