import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { map, tap, take } from "rxjs/operators";
import { Router, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    // return this.authService.user.pipe(
    return this.store.select("auth").pipe(
      take(1),
      map(authstate => {
        return authstate.user;
      }),
      map(user => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(["/auth"]);
      })
    );
  }
}
