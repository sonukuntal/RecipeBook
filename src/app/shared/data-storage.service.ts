import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { RecipiesService } from "../recipies/recipies.service";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(
    private httpclient: HttpClient,
    private recipeservice: RecipiesService
  ) {}

  storeRecipes() {
    const recipies = this.recipeservice.getrecipie();
    return this.httpclient
      .put(
        "https://ng-course-recipe-book-550ed.firebaseio.com/recipies.json",
        recipies
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {}
}
