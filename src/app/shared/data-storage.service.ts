import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { RecipiesService } from "../recipies/recipies.service";
import{Recipe} from '../recipies/Recipe.model';
import {ingredient} from '../shared/ingredient.model';
import {map,tap} from 'rxjs/operators';

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

  fetchRecipes() {
    return this.httpclient
      .get<Recipe[]>("https://ng-course-recipe-book-550ed.firebaseio.com/recipies.json").pipe(map((recipies)=>{
       return recipies.map(recipie=>{
         return{...recipie,ingredient:recipie.ingredients?recipie.ingredients:[]};});
      }),tap(recipie=>{
        this.recipeservice.setRecipe(recipie);
      })
      )
  }
}
