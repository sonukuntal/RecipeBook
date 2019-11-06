import { Component, OnInit,ElementRef,ViewChild,OnDestroy } from '@angular/core';
import {ingredient} from '../../shared/ingredient.model';
import {ShoopingListService} from '../shooping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shooping-edit',
  templateUrl: './shooping-edit.component.html',
  styleUrls: ['./shooping-edit.component.css']
})
export class ShoopingEditComponent implements OnInit,OnDestroy {
   subsc:Subscription;
   edititem=false;
   editindex:number;
    
  constructor(private shoopingListService:ShoopingListService) { }

  ngOnInit() {
   this.subsc= this.shoopingListService.editingredient.subscribe(
     (index:number)=>{
       this.editindex=index;
       this.edititem=true;
      }
   )
  }

  onAddIngredients(form:NgForm)
  {
    const values=form.value;
    this.shoopingListService.addnewingredient(new ingredient(values.name,values.amount));
  }
  ngOnDestroy()
  {
    this.subsc.unsubscribe();
  }

}