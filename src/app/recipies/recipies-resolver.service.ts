import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';

import{Recipe} from '../recipies/Recipe.model';
import {DataStorageService} from '../shared/data-storage.service';
import {RecipiesService} from '../recipies/recipies.service';

@Injectable({providedIn:"root"})
export class RecipiesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService:DataStorageService,private recipiesService:RecipiesService) { }

  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    const recipies=this.recipiesService.getrecipie();
    if(recipies.length===0)
    {
    return this.dataStorageService.fetchRecipes();
    }
    else
    {
      return recipies;
    }
  }

}