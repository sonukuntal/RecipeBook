import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { ActivatedRoute, Params,Router } from "@angular/router";
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
    private recipeService: RecipiesService,
    private router:Router
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
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, Validators.required)
            })
          );
        }
      }
    }

    this.recipeform = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeimageurl, Validators.required),
      description: new FormControl(recipedescription, Validators.required),
      ingredients: recipeingredients
    });
  }

  onsubmitRecipe() {
    if(!this.editMode)
    {
      this.recipeService.addnewRecipie(this.recipeform.value);
    }
    else
    {
      this.recipeService.updateRecipe(this.id,this.recipeform.value);
    }
  }

  private get controls() {
    return (<FormArray>this.recipeform.get("ingredients")).controls;
  }

  oncancelclick()
  {
   this.router.navigate(['../',{relativeTo:this.route}]);
  }

  onaddingredient() {
    (<FormArray>this.recipeform.get("ingredients")).push(
      new FormGroup({
        name: new FormControl(),
        amount: new FormControl()
      })
    );
  }
}
