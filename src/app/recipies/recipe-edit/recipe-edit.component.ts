import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { RecipiesService } from "../../recipies/recipies.service";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeform: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipiesService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.id = +param["id"];
      this.editMode = param["id"] != null;
      this.initform();
    });
  }

  private initform() {
    let recipeName = "",
      recipeimageurl = "",
      recipedescription = "";
    let recipeingredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getrecipies(this.id);
      recipeName = recipe.name;
      recipeimageurl = recipe.imagePath;
      recipedescription = recipe.description;
      if (recipe["ingredients"]) {
        for (let ingredient of recipe.ingredients) {
          recipeingredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name,Validators.required),
              amount: new FormControl(ingredient.amount,Validators.required)
            })
          );
        }
      }
    }

    this.recipeform = new FormGroup({
      Name: new FormControl(recipeName, Validators.required),
      ImageUrl: new FormControl(recipeimageurl, Validators.required),
      Description: new FormControl(recipedescription, Validators.required),
      ingredients: recipeingredients
    });
  }

  onsubmitRecipe() {}

 private get controls()
  {
   return (<FormArray>this.recipeform.get('ingredients')).controls;
  }
}
