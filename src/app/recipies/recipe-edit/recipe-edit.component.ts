import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeform:FormGroup;

  constructor() { }

  ngOnInit() {
    this.recipeform=new FormGroup({
     Name:new FormControl(null,Validators.required),
     Description:new FormControl(null,Validators.required),
     Ingredients:new FormControl(null,Validators.required)
    })
  }

  onsubmitRecipe()
  {
    
  }

}