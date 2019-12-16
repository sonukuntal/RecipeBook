import { Component, OnInit,OnDestroy } from '@angular/core';
import {ingredient} from '../shared/ingredient.model';
import {ShoopingListService} from './shooping-list.service'
import {LoggingService} from '../logging.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shooping-list',
  templateUrl: './shooping-list.component.html',
  styleUrls: ['./shooping-list.component.css'],

})
export class ShoopingListComponent implements OnInit, OnDestroy {
ingredients:ingredient[];
unsubsing:Subscription;
constructor(private shoopingListService:ShoopingListService, private loggingService:LoggingService) { }

  ngOnInit() {
    this.ingredients=this.shoopingListService.getingredients();
    this.unsubsing=this.shoopingListService.newingredient.subscribe(
      (ing:ingredient[])=>{
       this.ingredients=ing;
      }
    );
    ((ingdt:ingredient[])=>{this.ingredients=ingdt;})

    this.loggingService.printLog('Hello from shooping list ngoninit');
  }

  ngOnDestroy(){
   this.unsubsing.unsubscribe();
  }

  editingredients(index:number)
  {
    this.shoopingListService.editingredient.next(index);
  }

}