import {Injectable} from '@angular/core';
import {Actions,Effect,ofType} from '@ngrx/effects';
import {switchMap,map} from 'rxjs/operators';
import { HttpClient,HttpParams } from "@angular/common/http";
import {Recipe} from '../Recipe.model';
import * as RecipeActions from './recipe.actions';


@Injectable()
export class RecipeEffects {

@Effect()
fetchRecipe=this.actions$.pipe(
  ofType(RecipeActions.FETCH_RECIPE),
   switchMap(()=>{
    return this.httpclient.get<Recipe[]>(
          'https://ng-course-recipe-book-550ed.firebaseio.com/recipies.json'
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
      map(recipes=>{
        return new RecipeActions.SetRecipe(recipes);
      })
)
  constructor(private actions$:Actions,private httpclient:HttpClient){}
}