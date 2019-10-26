import { Component, OnInit } from '@angular/core';
import {ingredient} from '../shared/ingredient.model';
import {ShoopingListService} from './shooping-list.service'

@Component({
  selector: 'app-shooping-list',
  templateUrl: './shooping-list.component.html',
  styleUrls: ['./shooping-list.component.css'],

})
export class ShoopingListComponent implements OnInit {
ingredients:ingredient[];
  constructor(private shoopingListService:ShoopingListService) { }

  ngOnInit() {
    this.ingredients=this.shoopingListService.getingredients();
    this.shoopingListService.newingredient.subscribe
    ((ingdt:ingredient[])=>{this.ingredients=ingdt;})
  }

}