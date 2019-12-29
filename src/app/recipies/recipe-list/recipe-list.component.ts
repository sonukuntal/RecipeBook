import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { Recipe } from "../Recipe.model";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit {


  constructor(
    private route: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.store
      .select("recipies")
      .pipe(
        map(recipeState => {
          recipeState.recipies;
        })
      )
      .subscribe((recipies: Recipe[])=>{
        this.recipies = recipies;
      });
  }
  onnewrecipeclick() {
    this.route.navigate(["recipies", "new"]);
  }
}
