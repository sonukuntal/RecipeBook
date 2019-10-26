import { Injectable,EventEmitter } from '@angular/core';
import {ingredient} from '../shared/ingredient.model';

@Injectable()
export class ShoopingListService {

  newingredient=new EventEmitter<ingredient[]>();

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
   this.newingredient.emit(this.ingredients.slice());
  }
  addnewingredients(ingdt:ingredient[])
  {
    this.ingredients.push(...ingdt);
   this.newingredient.emit(this.ingredients.slice());
  }

}