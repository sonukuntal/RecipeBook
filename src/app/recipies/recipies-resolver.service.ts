import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';

import{Recipe} from '../recipies/Recipe.model';
import {DataStorageService} from '../shared/data-storage.service';

@Injectable({providedIn:"root"})
export class RecipiesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService:DataStorageService) { }

  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    return this.dataStorageService.fetchRecipes();
  }

}