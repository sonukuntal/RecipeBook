import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import {ingredient} from '../../shared/ingredient.model';
import {ShoopingListService} from '../shooping-list.service'

@Component({
  selector: 'app-shooping-edit',
  templateUrl: './shooping-edit.component.html',
  styleUrls: ['./shooping-edit.component.css']
})
export class ShoopingEditComponent implements OnInit {
  @ViewChild('spname',{static:false}) shoopingName:ElementRef;
  @ViewChild('spamount',{static:false}) shoopingAmount:ElementRef;
    
  constructor(private shoopingListService:ShoopingListService) { }

  ngOnInit() {
  }

  onAddIngredients()
  {
    if(this.shoopingName.nativeElement.value!=='' && this.shoopingAmount.nativeElement.value!=='')
    {
    this.shoopingListService.addnewingredient(new ingredient(this.shoopingName.nativeElement.value,this.shoopingAmount.nativeElement.value));
    }
  }

}