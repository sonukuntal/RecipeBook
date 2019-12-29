import { Injectable } from "@angular/core";
import { HttpClient,HttpParams } from "@angular/common/http";

import { RecipiesService } from "../recipies/recipies.service";
import { AuthService } from "../auth/auth.service";

import { Recipe } from "../recipies/Recipe.model";
import { ingredient } from "../shared/ingredient.model";
import { map, tap,take,exhaustMap } from "rxjs/operators";
import {Store} from '@ngrx/store';
import * as  fromApp from '../store/app.reducer';
import * as fromRecipeAction from '../recipies/store/recipe.actions';

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(
    private httpclient: HttpClient,
    private recipeservice: RecipiesService,
    private authService: AuthService,
    private store:Store<fromApp.AppState>
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
   // return this.authService.user.pipe(
     return this.store.select('auth').pipe(
      take(1),
      map(authstate=>{return authstate.user}),
      exhaustMap(user => {
        return this.httpclient.get<Recipe[]>(
          'https://ng-course-recipe-book-550ed.firebaseio.com/recipies.json',
          {
            params: new HttpParams().set('auth', user.token)
          }
        );
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipies => {
       this.store.dispatch(new fromRecipeAction.SetRecipe(recipies));
      })
    );
  }
}
