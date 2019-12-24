import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { DataStorageService } from "../shared/data-storage.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as fromActions from '../auth/auth.action';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isauthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorage: DataStorageService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    //this.userSub = this.authService.user.subscribe(user => {
    this.userSub = this.store
      .select("auth")
      .pipe(
        map(authstate => {
          return authstate.user;
        })
      )
      .subscribe(user => {
        this.isauthenticated = !!user;
      });
  }

  onlogout() {
   // this.authService.logout();
   this.store.dispatch(new fromActions.Logout());
  }

  onSaveData() {
    this.dataStorage.storeRecipes();
  }

  onFetchData() {
    this.dataStorage.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
