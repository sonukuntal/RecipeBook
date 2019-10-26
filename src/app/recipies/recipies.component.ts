import { Component, OnInit} from '@angular/core';
import {Recipe} from './Recipe.model';
import {RecipiesService} from './recipies.service';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.css']
})
export class RecipiesComponent implements OnInit {
 recipe:Recipe;
  constructor(private recipiesService:RecipiesService ) { }

  ngOnInit() {
    this.recipiesService.selectedrecipe.subscribe(
      (recipies:Recipe)=>{
         this.recipe=recipies;
      }
    )
  }

}