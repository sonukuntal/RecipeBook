import { Component, OnInit,OnDestroy } from '@angular/core';
import {ingredient} from '../shared/ingredient.model';
import {ShoopingListService} from './shooping-list.service'
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shooping-list',
  templateUrl: './shooping-list.component.html',
  styleUrls: ['./shooping-list.component.css'],

})
export class ShoopingListComponent implements OnInit, OnDestroy {
ingredients:ingredient[];
unsubsing:Subscription;
constructor(private shoopingListService:ShoopingListService) { }

  ngOnInit() {
    this.ingredients=this.shoopingListService.getingredients();
    this.unsubsing=this.shoopingListService.newingredient.subscribe();
    ((ingdt:ingredient[])=>{this.ingredients=ingdt;})
  }

  ngOnDestroy(){
   this.unsubsing.unsubscribe();
  }

  editingredients(index:number)
  {
    this.shoopingListService.newingredient.next(index);
  }

}