import { Component, OnInit } from '@angular/core';
import {Recipe} from '../Recipe.model';
import {RecipiesService} from '../recipies.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipies:Recipe[];

  constructor(private recipiesService:RecipiesService,private route:Router) { }

  ngOnInit() {
    this.recipies=this.recipiesService.getrecipie();
  }
  onnewrecipeclick()
  {
    this.route.navigate(['recipies','new']);
  }
}