import { Component, OnInit, OnDestroy } from "@angular/core";
import { map } from "rxjs/operators";
import { Subscription } from "rxjs";
import { Recipe } from "../Recipe.model";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipies: Recipe[];
  subscription: Subscription;

  constructor(private route: Router, private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.subscription = this.store
      .select("recipies")
      .pipe(map(recipeState => recipeState.recipies))
      .subscribe((recipies: Recipe[]) => {
        this.recipies = recipies;
      });
  }
  onnewrecipeclick() {
    this.route.navigate(["recipies", "new"]);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
