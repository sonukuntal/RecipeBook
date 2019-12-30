import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {Actions,ofType} from '@ngrx/effects';
import{take} from 'rxjs/operators';

import{Recipe} from '../recipies/Recipe.model';
import {DataStorageService} from '../shared/data-storage.service';
import {RecipiesService} from '../recipies/recipies.service';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from './store/recipe.actions';


@Injectable({providedIn:"root"})
export class RecipiesResolverService implements Resolve<Recipe[]> {

  constructor(private store:Store<fromApp.AppState>,private actions$:Actions) { }

  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
  //  const recipies=this.recipiesService.getrecipie();
   // if(recipies.length===0)
   // {

    //return this.dataStorageService.fetchRecipes();
    this.store.dispatch(new RecipeActions.FetchRecipe());
    return this.actions$.pipe(ofType(RecipeActions.SET_RECIPE),take(1));
   // }
   // else
   // {
   //   return recipies;
   // }
  }

}