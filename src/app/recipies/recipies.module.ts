import { NgModule } from "@angular/core";
import { RecipieRouterModule } from "./recipie-router.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import { RecipiesComponent } from "./recipies.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";

@NgModule({
  imports: [RouterModule,RecipieRouterModule,CommonModule,FormsModule,ReactiveFormsModule],
  exports: [
    RecipiesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeStartComponent
  ],
  declarations: [
    RecipiesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeStartComponent
  ],
  providers: []
})
export class RecipiesModule {}
