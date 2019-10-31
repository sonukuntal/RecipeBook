import { Injectable} from '@angular/core';
import {ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable()
export class ShoopingListService {

  newingredient=new Subject<ingredient[]>();

  ingredients:ingredient[]=[
  new ingredient('Banana',10),
  new ingredient('Apple',20)
]

  constructor() { }
  getingredients()
  {
    return this.ingredients.slice();
  }
  addnewingredient(ingdt:ingredient)
  {
   this.ingredients.push(ingdt);
   this.newingredient.next(this.ingredients.slice());
  }
  addnewingredients(ingdt:ingredient[])
  {
    this.ingredients.push(...ingdt);
   this.newingredient.next(this.ingredients.slice());
  }

}